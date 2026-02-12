import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Award,
  DollarSign,
  Clock,
  FileText
} from 'lucide-react';

const Recommendations = ({ analysis, recommendations, schemes, onNext, onBack }) => {
  const getSuitabilityIcon = (suitability) => {
    switch (suitability) {
      case 'suitable':
        return <CheckCircle size={20} />;
      case 'caution':
      case 'risky':
        return <AlertTriangle size={20} />;
      case 'not_recommended':
        return <XCircle size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  const getSuitabilityClass = (suitability) => {
    switch (suitability) {
      case 'suitable':
        return 'suitable';
      case 'caution':
      case 'risky':
        return 'caution';
      case 'not_recommended':
        return 'not-recommended';
      default:
        return '';
    }
  };

  const getBadgeClass = (suitability) => {
    switch (suitability) {
      case 'suitable':
        return 'badge-success';
      case 'caution':
      case 'risky':
        return 'badge-warning';
      case 'not_recommended':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Analysis Summary */}
      <div className="card fade-in">
        <h2 style={{ marginBottom: '1.5rem' }}>
          <TrendingUp size={28} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
          Your Financial Analysis
        </h2>

        <div className="analysis-grid">
          <div className="metric-card">
            <div className="metric-label">Income Pattern</div>
            <div className="metric-value" style={{ textTransform: 'capitalize' }}>
              {analysis.incomePattern.type}
            </div>
            <div className="metric-description">
              {analysis.incomePattern.volatility} volatility
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Risk Level</div>
            <div className="metric-value" style={{ textTransform: 'capitalize' }}>
              {analysis.riskAssessment.level}
            </div>
            <div className="metric-description">
              {analysis.riskAssessment.factors.length} risk factors identified
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Monthly Repayment Capacity</div>
            <div className="metric-value">
              ₹{analysis.repaymentCapacity.monthlyCapacity?.toLocaleString() || 'N/A'}
            </div>
            <div className="metric-description">
              Available for loan repayment
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Confidence Score</div>
            <div className="metric-value">
              {analysis.confidenceScore}%
            </div>
            <div className="metric-description">
              Based on provided data
            </div>
          </div>
        </div>

        {analysis.warningFlags && analysis.warningFlags.length > 0 && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'rgba(247, 127, 0, 0.1)',
            borderRadius: '12px',
            borderLeft: '4px solid #F77F00'
          }}>
            <h4 style={{ color: '#C65F00', marginBottom: '0.75rem', fontSize: '1rem' }}>
              <AlertTriangle size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Important Considerations
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {analysis.warningFlags.map((flag, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem', color: 'rgba(61, 64, 91, 0.8)' }}>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Scheme Recommendations */}
      {recommendations.schemeRecommendations && recommendations.schemeRecommendations.length > 0 && (
        <div className="recommendation-section slide-in-right">
          <h2 style={{ marginBottom: '1rem' }}>
            <Award size={28} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
            Government Schemes
          </h2>

          {recommendations.schemeRecommendations.map((rec, idx) => {
            const scheme = schemes.find(s => s.id === rec.schemeId);
            if (!scheme) return null;

            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`recommendation-card ${getSuitabilityClass(rec.suitability)}`}
              >
                <div className="recommendation-header">
                  <div>
                    <h3 className="recommendation-title">{scheme.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(61, 64, 91, 0.6)', margin: '0.25rem 0' }}>
                      {scheme.description}
                    </p>
                  </div>
                  <span className={`badge ${getBadgeClass(rec.suitability)}`}>
                    {getSuitabilityIcon(rec.suitability)}
                    {rec.suitability === 'suitable' ? 'Recommended' : 
                     rec.suitability === 'caution' ? 'Consider Carefully' : 
                     'Not Recommended'}
                  </span>
                </div>

                <div className="recommendation-body">
                  <p style={{ marginBottom: '1rem' }}>{rec.reasoning}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                        <DollarSign size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Benefit Amount
                      </div>
                      <div style={{ fontWeight: '600', color: '#3D405B' }}>
                        ₹{scheme.benefits.amount?.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Processing Time
                      </div>
                      <div style={{ fontWeight: '600', color: '#3D405B' }}>
                        {scheme.processingTime}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                        Effort Level
                      </div>
                      <div style={{ fontWeight: '600', color: '#3D405B', textTransform: 'capitalize' }}>
                        {scheme.effort}
                      </div>
                    </div>
                  </div>

                  {rec.actionSteps && rec.actionSteps.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#3D405B' }}>
                        Next Steps:
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {rec.actionSteps.map((step, stepIdx) => (
                          <li key={stepIdx} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Loan Evaluation */}
      {recommendations.loanEvaluation && (
        <div className="recommendation-section slide-in-right" style={{ animationDelay: '0.2s' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            <DollarSign size={28} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
            Loan Suitability
          </h2>

          <div className={`recommendation-card ${getSuitabilityClass(recommendations.loanEvaluation.suitability)}`}>
            <div className="recommendation-header">
              <h3 className="recommendation-title">Loan Assessment</h3>
              <span className={`badge ${getBadgeClass(recommendations.loanEvaluation.suitability)}`}>
                {getSuitabilityIcon(recommendations.loanEvaluation.suitability)}
                {recommendations.loanEvaluation.suitability === 'suitable' ? 'Suitable' : 
                 recommendations.loanEvaluation.suitability === 'risky' ? 'Proceed with Caution' : 
                 'Not Recommended'}
              </span>
            </div>

            <div className="recommendation-body">
              <p style={{ marginBottom: '1rem' }}>{recommendations.loanEvaluation.reasoning}</p>

              {recommendations.loanEvaluation.suitability !== 'not_recommended' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                      Recommended Amount
                    </div>
                    <div style={{ fontWeight: '600', color: '#3D405B' }}>
                      ₹{recommendations.loanEvaluation.recommendedAmount?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                      Repayment Frequency
                    </div>
                    <div style={{ fontWeight: '600', color: '#3D405B', textTransform: 'capitalize' }}>
                      {recommendations.loanEvaluation.repaymentFrequency}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)', marginBottom: '0.25rem' }}>
                      Tenure
                    </div>
                    <div style={{ fontWeight: '600', color: '#3D405B' }}>
                      {recommendations.loanEvaluation.recommendedTenure} months
                    </div>
                  </div>
                </div>
              )}

              {recommendations.loanEvaluation.mitigationSteps && 
               recommendations.loanEvaluation.mitigationSteps.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#3D405B' }}>
                    Risk Mitigation:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {recommendations.loanEvaluation.mitigationSteps.map((step, stepIdx) => (
                      <li key={stepIdx} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.loanEvaluation.alternatives && 
               recommendations.loanEvaluation.alternatives.length > 0 && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(69, 123, 157, 0.1)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#2F5A7A' }}>
                    Alternative Options:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {recommendations.loanEvaluation.alternatives.map((alt, altIdx) => (
                      <li key={altIdx} style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: '#2F5A7A' }}>
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Decision Comparison */}
      {recommendations.comparison && (
        <div className="card slide-in-right" style={{ animationDelay: '0.3s', background: 'linear-gradient(135deg, rgba(129, 178, 154, 0.1), rgba(82, 183, 136, 0.1))' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Our Recommendation
          </h2>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#3D405B', marginBottom: '1rem' }}>
            <strong>Best Path Forward:</strong> {recommendations.comparison.bestOption === 'scheme' ? 'Focus on Government Schemes' :
              recommendations.comparison.bestOption === 'loan' ? 'Consider a Loan' :
              recommendations.comparison.bestOption === 'both' ? 'Combine Scheme with Loan' :
              'Explore Other Options'}
          </div>
          <p style={{ marginBottom: '1rem' }}>{recommendations.comparison.reasoning}</p>
          {recommendations.comparison.timeline && (
            <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Suggested Timeline:</h4>
              <p style={{ margin: 0 }}>{recommendations.comparison.timeline}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary">
          ← Back
        </button>
        <button onClick={onNext} className="btn btn-primary" style={{ flex: 1 }}>
          View Next Steps
          <span style={{ marginLeft: '0.5rem' }}>→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Recommendations;
