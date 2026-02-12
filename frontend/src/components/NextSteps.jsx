import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  FileText, 
  Phone, 
  MapPin, 
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react';

const NextSteps = ({ recommendations, schemes, onRestart }) => {
  const suitableSchemes = recommendations.schemeRecommendations?.filter(
    rec => rec.suitability === 'suitable'
  ) || [];

  const getSupportContacts = () => {
    return [
      { 
        name: 'Nearest Bank Branch',
        type: 'Banking Services',
        action: 'Visit for loan applications and KCC'
      },
      {
        name: 'Jan Samarth Portal',
        type: 'Government Schemes',
        action: 'https://jansamarth.in/',
        link: true
      },
      {
        name: 'District Agriculture Office',
        type: 'Farming Support',
        action: 'For agriculture schemes and subsidies'
      },
      {
        name: 'Local NGO/Self-Help Group',
        type: 'Community Support',
        action: 'For financial literacy and guidance'
      }
    ];
  };

  const getCommonDocuments = () => {
    return [
      'Aadhaar Card',
      'PAN Card',
      'Bank Account Passbook',
      'Address Proof (Voter ID/Ration Card)',
      'Income Proof (if available)',
      'Passport Size Photographs'
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card fade-in">
        <h2 style={{ marginBottom: '1.5rem' }}>
          <CheckCircle size={28} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle', color: '#52B788' }} />
          Your Action Plan
        </h2>

        {/* Priority Actions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            <span style={{ 
              display: 'inline-block',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E07A5F, #F4A261)',
              color: 'white',
              textAlign: 'center',
              lineHeight: '32px',
              marginRight: '0.75rem',
              fontSize: '1rem'
            }}>1</span>
            Priority Actions
          </h3>
          
          <ol className="action-steps">
            {suitableSchemes.length > 0 ? (
              <>
                {suitableSchemes.map((rec, idx) => {
                  const scheme = schemes.find(s => s.id === rec.schemeId);
                  return (
                    <li key={idx}>
                      <strong>{scheme?.name}</strong>
                      <p style={{ margin: '0.5rem 0 0 0' }}>{rec.actionSteps?.[0] || 'Visit the application portal or nearest office'}</p>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <li>
                  <strong>Review your financial situation</strong>
                  <p style={{ margin: '0.5rem 0 0 0' }}>Based on our analysis, consider improving income stability before taking on debt</p>
                </li>
                <li>
                  <strong>Explore alternative support</strong>
                  <p style={{ margin: '0.5rem 0 0 0' }}>Connect with local self-help groups or community organizations</p>
                </li>
              </>
            )}
            <li>
              <strong>Gather required documents</strong>
              <p style={{ margin: '0.5rem 0 0 0' }}>Prepare all necessary documentation (see list below)</p>
            </li>
            <li>
              <strong>Seek expert guidance</strong>
              <p style={{ margin: '0.5rem 0 0 0' }}>Consult with a financial advisor or trusted community leader before finalizing decisions</p>
            </li>
          </ol>
        </div>

        {/* Required Documents */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            <FileText size={24} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
            Documents to Prepare
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '1rem' 
          }}>
            {getCommonDocuments().map((doc, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1rem',
                  background: 'white',
                  border: '2px solid rgba(129, 178, 154, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(129, 178, 154, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={16} style={{ color: '#81B29A' }} />
                </div>
                <span style={{ fontSize: '0.9rem', color: '#3D405B' }}>{doc}</span>
              </div>
            ))}
          </div>

          {suitableSchemes.length > 0 && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(69, 123, 157, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <AlertCircle size={20} style={{ color: '#457B9D', marginTop: '0.125rem', flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', color: '#2F5A7A' }}>
                <strong>Additional documents may be required</strong> based on specific schemes. Check scheme details or contact the relevant office.
              </div>
            </div>
          )}
        </div>

        {/* Support Contacts */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            <Phone size={24} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
            Where to Get Help
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {getSupportContacts().map((contact, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1.25rem',
                  background: 'white',
                  border: '2px solid rgba(129, 178, 154, 0.2)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: '#3D405B' }}>
                      {contact.name}
                    </h4>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)' }}>
                      {contact.type}
                    </div>
                  </div>
                  {contact.link && (
                    <ExternalLink size={18} style={{ color: '#81B29A' }} />
                  )}
                </div>
                {contact.link ? (
                  <a 
                    href={contact.action} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#81B29A', 
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    Visit Website →
                  </a>
                ) : (
                  <div style={{ fontSize: '0.9rem', color: 'rgba(61, 64, 91, 0.8)' }}>
                    {contact.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scheme Details */}
        {suitableSchemes.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              <MapPin size={24} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
              Application Details
            </h3>
            
            {suitableSchemes.map((rec, idx) => {
              const scheme = schemes.find(s => s.id === rec.schemeId);
              if (!scheme) return null;

              return (
                <div 
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(to right, rgba(82, 183, 136, 0.05), white)',
                    border: '2px solid rgba(82, 183, 136, 0.3)',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}
                >
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#2D6A4F' }}>
                    {scheme.name}
                  </h4>
                  
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)' }}>
                        Required Documents:
                      </span>
                      <div style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#3D405B' }}>
                        {scheme.documents.join(', ')}
                      </div>
                    </div>
                    
                    <div>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(61, 64, 91, 0.6)' }}>
                        Processing Time:
                      </span>
                      <div style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#3D405B' }}>
                        {scheme.processingTime}
                      </div>
                    </div>
                    
                    {scheme.applicationUrl && (
                      <a 
                        href={scheme.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.5rem',
                          background: '#52B788',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontWeight: '500',
                          fontSize: '0.9rem',
                          marginTop: '0.5rem',
                          width: 'fit-content',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Apply Now
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Important Reminders */}
        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(224, 122, 95, 0.1), rgba(244, 162, 97, 0.1))',
          borderLeft: '4px solid #E07A5F',
          borderRadius: '12px'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#8B4513' }}>
            Important Reminders
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem', color: 'rgba(61, 64, 91, 0.8)' }}>
              This analysis is informational only and not financial advice
            </li>
            <li style={{ marginBottom: '0.5rem', color: 'rgba(61, 64, 91, 0.8)' }}>
              Always consult with experts before making financial decisions
            </li>
            <li style={{ marginBottom: '0.5rem', color: 'rgba(61, 64, 91, 0.8)' }}>
              Scheme eligibility and terms can change - verify current information
            </li>
            <li style={{ marginBottom: '0.5rem', color: 'rgba(61, 64, 91, 0.8)' }}>
              Never pay bribes or unofficial fees for applications
            </li>
            <li style={{ color: 'rgba(61, 64, 91, 0.8)' }}>
              Keep copies of all submitted documents
            </li>
          </ul>
        </div>

        <button 
          onClick={onRestart} 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '2rem' }}
        >
          Start New Analysis
        </button>
      </div>
    </motion.div>
  );
};

export default NextSteps;
