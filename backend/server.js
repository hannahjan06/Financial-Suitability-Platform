import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import GeminiService from './services/geminiService.js';
import SchemeService from './services/schemeService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const result = dotenv.config({ path: envPath });
if (result.error && process.env.NODE_ENV !== 'production') {
  console.warn('Could not load .env from', envPath, result.error.message);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Resolve API key once (trim in case .env has trailing space)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim?.() || process.env.GEMINI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const geminiService = new GeminiService(GEMINI_API_KEY);
const schemeService = new SchemeService();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Financial Suitability Platform API' });
});

// Get all schemes
app.get('/api/schemes', (req, res) => {
  try {
    const schemes = schemeService.getSchemes();
    res.json({ success: true, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Analyze financial profile
app.post('/api/analyze-profile', async (req, res) => {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(503).json({
        success: false,
        error: 'Gemini API key not set. Add your GEMINI_API_KEY to backend/.env (get one at https://makersuite.google.com/app/apikey)'
      });
    }

    const profileData = req.body;
    if (!Array.isArray(profileData.riskExposure)) {
      profileData.riskExposure = [];
    }

    // Validate required fields
    const requiredFields = ['incomeType', 'monthlyIncome', 'incomeStability',
                           'householdExpenses', 'purpose'];
    const missingFields = requiredFields.filter(field => !profileData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Analyze profile using Gemini
    const analysis = await geminiService.analyzeFinancialProfile(profileData);
    
    res.json({
      success: true,
      data: {
        profile: profileData,
        analysis
      }
    });
  } catch (error) {
    console.error('Profile analysis error:', error);
    const msg = error?.message || String(error);
    const isApiKey = /API key|invalid|401|403|429|quota|exhausted/i.test(msg);
    const userMessage = isApiKey
      ? 'Gemini API error: check your GEMINI_API_KEY in backend/.env (valid key at https://makersuite.google.com/app/apikey).'
      : (msg.length < 200 && !msg.includes(' at ') ? msg : 'Failed to analyze profile. Please try again.');
    res.status(500).json({
      success: false,
      error: userMessage
    });
  }
});

// Get recommendations
app.post('/api/get-recommendations', async (req, res) => {
  try {
    const { profileData, analysis } = req.body;
    
    if (!profileData || !analysis) {
      return res.status(400).json({
        success: false,
        error: 'Profile data and analysis are required'
      });
    }

    // Get filtered schemes
    const relevantSchemes = schemeService.filterSchemesByProfile(profileData);
    
    // Generate recommendations using Gemini
    const recommendations = await geminiService.generateRecommendations(
      profileData,
      analysis,
      relevantSchemes
    );
    
    // Get simple explanation
    const explanation = await geminiService.explainInSimpleLanguage({
      analysis,
      recommendations
    });
    
    res.json({
      success: true,
      data: {
        recommendations,
        explanation,
        schemes: relevantSchemes
      }
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate recommendations. Please try again.'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Financial Suitability Platform API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔑 GEMINI_API_KEY: ${GEMINI_API_KEY ? 'set' : 'NOT SET (add to backend/.env)'}`);
});
