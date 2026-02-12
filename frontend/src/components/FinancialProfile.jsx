import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, AlertCircle, Target } from 'lucide-react';

const FinancialProfile = ({ onNext }) => {
  const [formData, setFormData] = useState({
    incomeType: '',
    monthlyIncome: '',
    incomeStability: '',
    householdExpenses: '',
    businessExpenses: '',
    existingDebts: '',
    riskExposure: [],
    purpose: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      riskExposure: checked
        ? [...prev.riskExposure, value]
        : prev.riskExposure.filter(item => item !== value)
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.incomeType) newErrors.incomeType = 'Please select income type';
    if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
      newErrors.monthlyIncome = 'Please enter valid monthly income';
    }
    if (!formData.incomeStability) newErrors.incomeStability = 'Please select income stability';
    if (!formData.householdExpenses || formData.householdExpenses < 0) {
      newErrors.householdExpenses = 'Please enter household expenses';
    }
    if (!formData.purpose) newErrors.purpose = 'Please select purpose';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #E07A5F, #F4A261)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <User size={24} />
          </div>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Your Financial Profile</h2>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>Help us understand your situation</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Income Type */}
          <div className="form-group">
            <label className="form-label">
              <TrendingUp size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              What type of income do you have?
            </label>
            <select
              name="incomeType"
              value={formData.incomeType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select income type</option>
              <option value="seasonal">Seasonal (Farming, specific seasons)</option>
              <option value="daily">Daily (Street vendor, daily wage)</option>
              <option value="irregular">Irregular (Gig work, project-based)</option>
              <option value="stable">Stable (Monthly salary, regular business)</option>
              <option value="mixed">Mixed (Multiple sources)</option>
            </select>
            {errors.incomeType && (
              <span style={{ color: '#D62828', fontSize: '0.875rem' }}>{errors.incomeType}</span>
            )}
          </div>

          {/* Monthly Income */}
          <div className="form-group">
            <label className="form-label">Average Monthly Income (₹)</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="e.g., 15000"
              className="form-input"
            />
            {errors.monthlyIncome && (
              <span style={{ color: '#D62828', fontSize: '0.875rem' }}>{errors.monthlyIncome}</span>
            )}
          </div>

          {/* Income Stability */}
          <div className="form-group">
            <label className="form-label">How stable is your income?</label>
            <select
              name="incomeStability"
              value={formData.incomeStability}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select stability level</option>
              <option value="very_stable">Very Stable (Predictable every month)</option>
              <option value="somewhat_stable">Somewhat Stable (Usually predictable)</option>
              <option value="variable">Variable (Changes month to month)</option>
              <option value="highly_variable">Highly Variable (Very unpredictable)</option>
            </select>
            {errors.incomeStability && (
              <span style={{ color: '#D62828', fontSize: '0.875rem' }}>{errors.incomeStability}</span>
            )}
          </div>

          {/* Household Expenses */}
          <div className="form-group">
            <label className="form-label">Monthly Household Expenses (₹)</label>
            <input
              type="number"
              name="householdExpenses"
              value={formData.householdExpenses}
              onChange={handleChange}
              placeholder="e.g., 8000"
              className="form-input"
            />
            {errors.householdExpenses && (
              <span style={{ color: '#D62828', fontSize: '0.875rem' }}>{errors.householdExpenses}</span>
            )}
          </div>

          {/* Business Expenses */}
          <div className="form-group">
            <label className="form-label">Monthly Business Expenses (₹) - Optional</label>
            <input
              type="number"
              name="businessExpenses"
              value={formData.businessExpenses}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="form-input"
            />
          </div>

          {/* Existing Debts */}
          <div className="form-group">
            <label className="form-label">Existing Monthly Debt Payments (₹)</label>
            <input
              type="number"
              name="existingDebts"
              value={formData.existingDebts}
              onChange={handleChange}
              placeholder="e.g., 2000"
              className="form-input"
            />
          </div>

          {/* Risk Exposure */}
          <div className="form-group">
            <label className="form-label">
              <AlertCircle size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              What risks do you face? (Select all that apply)
            </label>
            <div className="checkbox-group">
              {[
                { value: 'weather', label: 'Weather/Climate' },
                { value: 'health', label: 'Health Emergency' },
                { value: 'market', label: 'Market Fluctuation' },
                { value: 'competition', label: 'Business Competition' },
                { value: 'seasonal', label: 'Seasonal Slowdown' }
              ].map(risk => (
                <label key={risk.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={risk.value}
                    checked={formData.riskExposure.includes(risk.value)}
                    onChange={handleCheckboxChange}
                  />
                  {risk.label}
                </label>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="form-group">
            <label className="form-label">
              <Target size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              What do you need financial support for?
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select purpose</option>
              <option value="working_capital">Working Capital</option>
              <option value="business_expansion">Business Expansion</option>
              <option value="crop_cultivation">Crop Cultivation</option>
              <option value="equipment_purchase">Equipment Purchase</option>
              <option value="emergency">Emergency Needs</option>
              <option value="education">Education</option>
              <option value="home_improvement">Home Improvement</option>
            </select>
            {errors.purpose && (
              <span style={{ color: '#D62828', fontSize: '0.875rem' }}>{errors.purpose}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Analyze My Profile
            <span style={{ marginLeft: '0.5rem' }}>→</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default FinancialProfile;
