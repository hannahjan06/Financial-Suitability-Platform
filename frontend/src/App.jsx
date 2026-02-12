import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import FinancialProfile from './components/FinancialProfile';
import Recommendations from './components/Recommendations';
import NextSteps from './components/NextSteps';
import { api } from './utils/api';
import './styles/App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfileSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Analyze profile
      const analysisResponse = await api.analyzeProfile(data);
      
      if (analysisResponse.success) {
        setProfileData(data);
        setAnalysis(analysisResponse.data.analysis);
        
        // Get recommendations
        const recsResponse = await api.getRecommendations(
          data,
          analysisResponse.data.analysis
        );
        
        if (recsResponse.success) {
          setRecommendations(recsResponse.data.recommendations);
          setSchemes(recsResponse.data.schemes);
          setCurrentStep(2);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to analyze your profile. Please check if the backend server is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setProfileData(null);
    setAnalysis(null);
    setRecommendations(null);
    setSchemes([]);
    setError(null);
  };

  const steps = [
    { number: 1, label: 'Profile', active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, label: 'Analysis', active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, label: 'Action Plan', active: currentStep === 3, completed: false }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Financial Suitability Platform</h1>
        <p className="app-subtitle">
          Smart guidance for loans and schemes — because not all financial support is good support
        </p>
      </header>

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        <h4>⚠️ Important Disclaimer</h4>
        <ul className="disclaimer-list">
          <li>This is an informational tool, not financial advice</li>
          <li>No guarantee of loan approval or scheme eligibility</li>
          <li>Based on user-provided data — accuracy depends on your input</li>
          <li>Always consult with financial experts before making decisions</li>
          <li>Scheme information is regularly updated but may change</li>
        </ul>
      </div>

      {/* Progress Steps */}
      {currentStep > 0 && (
        <div className="progress-steps">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className={`step ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                <div className="step-number">{step.number}</div>
                <span>{step.label}</span>
              </div>
              {idx < steps.length - 1 && <div className="step-connector" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <AlertCircle size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <h3>Analyzing Your Financial Profile</h3>
          <p>This may take a few moments...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          {currentStep === 1 && (
            <FinancialProfile onNext={handleProfileSubmit} />
          )}

          {currentStep === 2 && analysis && recommendations && (
            <Recommendations
              analysis={analysis}
              recommendations={recommendations}
              schemes={schemes}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && recommendations && (
            <NextSteps
              recommendations={recommendations}
              schemes={schemes}
              onRestart={handleRestart}
            />
          )}
        </>
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem 0', 
        color: 'rgba(61, 64, 91, 0.5)',
        fontSize: '0.875rem'
      }}>
        <p style={{ margin: 0 }}>
          Built to protect people who can't afford bad financial advice
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>
          "Not all financial support is good financial support"
        </p>
      </footer>
    </div>
  );
}

export default App;
