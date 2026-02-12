# 🎯 Financial Suitability Platform

A smart financial guidance system that evaluates income patterns and risk exposure to recommend the right support—loan, scheme, both, or neither—with clear explanations. Built for farmers, micro-entrepreneurs, and underserved communities.

**Key Insight:** Not all financial support is good financial support.

![Platform Preview](https://via.placeholder.com/800x400?text=Financial+Suitability+Platform)

## 🌟 Features

### Core Capabilities
- **Financial Profile Analysis**: AI-powered evaluation of income patterns, volatility, and risk exposure
- **Scheme Discovery**: Smart matching with 6+ major government schemes (PM-KISAN, MUDRA, KCC, etc.)
- **Loan Suitability Assessment**: Not approval prediction, but genuine suitability evaluation
- **Decision Comparison**: Unique comparative analysis between loans and schemes
- **Multi-Language Support**: Simple, culturally appropriate explanations

### What Makes This Different
- ✅ **Recommends AGAINST** unsuitable debt when appropriate
- ✅ **Explains "why not"** with clear reasoning
- ✅ **Harm-aware design** with prominent ethical guardrails
- ✅ **No overpromising** - transparent about limitations
- ✅ **Multi-instrument approach** - considers loans AND schemes together

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Gemini API Integration**: Advanced AI analysis using Google's Gemini 1.5 Flash
- **Scheme Database**: Comprehensive government schemes with eligibility criteria
- **RESTful API**: Clean endpoints for profile analysis and recommendations

### Frontend (React + Vite)
- **3-Screen Flow**: Profile → Analysis → Action Plan
- **Beautiful UI**: Warm, earthy design inspired by Indian landscapes
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Design**: Works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd financial-suitability-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend Server (Port 3001)**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend Dev Server (Port 5173)**
```bash
cd frontend
npm run dev
```

**Access the app**: Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
financial-suitability-platform/
├── backend/
│   ├── server.js                    # Express server
│   ├── services/
│   │   ├── geminiService.js        # AI analysis engine
│   │   └── schemeService.js        # Government schemes database
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main application
│   │   ├── components/
│   │   │   ├── FinancialProfile.jsx   # Screen 1: Profile input
│   │   │   ├── Recommendations.jsx    # Screen 2: Analysis results
│   │   │   └── NextSteps.jsx          # Screen 3: Action plan
│   │   ├── utils/
│   │   │   └── api.js              # API client
│   │   └── styles/
│   │       └── App.css             # Global styles
│   └── package.json
│
└── README.md
```

## 🎨 Design Philosophy

### Aesthetic Direction: Warm & Trustworthy
- **Color Palette**: Earthy tones inspired by Indian landscapes (terracotta, sage, clay)
- **Typography**: Fraunces (display) + Work Sans (body) for elegance and readability
- **Motion**: Smooth, purposeful animations that guide without distracting
- **Layout**: Generous whitespace with focused content hierarchy

### User Experience Principles
1. **Progressive Disclosure**: Information revealed step-by-step
2. **Clear Feedback**: Every action has visible response
3. **Error Prevention**: Validation and helpful error messages
4. **Transparency**: Always show confidence levels and limitations

## 🤖 AI Components

### 1. Financial Profile Analyzer
- Classifies income patterns (seasonal/daily/irregular/stable/mixed)
- Calculates volatility scores
- Identifies risk factors
- Estimates repayment capacity

### 2. Suitability Matcher
- Multi-factor decision tree
- Explainable outputs (no black box)
- Context-aware recommendations

### 3. Natural Language Explainer
- Converts technical analysis → plain language
- Culturally appropriate phrasing
- Available in English (expandable to Hindi)

### 4. Edge Case Detector
- Flags unusual situations
- Uncertainty quantification
- Human review triggers

## 📊 Government Schemes Included

1. **PM-KISAN** - ₹6,000/year direct income support for farmers
2. **MUDRA Shishu** - Up to ₹50,000 collateral-free loans
3. **PM Fasal Bima** - Crop insurance for natural calamities
4. **Kisan Credit Card** - Revolving credit for agricultural expenses
5. **Stand-Up India** - ₹10L-₹1Cr for SC/ST/Women entrepreneurs
6. **PM SVANidhi** - Working capital for street vendors

## 🔒 Ethical Guardrails

### System Limitations (Displayed Prominently)
- ⚠️ Not financial advice—informational only
- ⚠️ No guarantee of loan approval
- ⚠️ Based on user-provided data
- ⚠️ Encourages consultation with experts
- ⚠️ Regularly updated for scheme changes

### Built-in Safety Features
- Warns against unsuitable debt
- Highlights hidden costs
- Explains rejection reasons honestly
- Never overpromises
- Prioritizes harm reduction over engagement

## 🎯 Success Metrics

**What we DON'T measure:**
- ❌ Number of loans recommended
- ❌ Approval rates
- ❌ App downloads

**What we DO measure:**
- ✅ Inappropriate recommendations prevented
- ✅ Scheme enrollment in suitable cases
- ✅ Debt stress reduction
- ✅ User understanding (qualitative)
- ✅ False positive rate

## 🛣️ Roadmap

### V1 (Current - Hackathon Demo)
- ✅ Core financial profile builder
- ✅ 6 major schemes integration
- ✅ Loan suitability logic
- ✅ Comparison layer
- ✅ Clean 3-screen UX

### V2 (Post-Hackathon)
- [ ] Regional scheme database expansion
- [ ] Multi-language support (Hindi, Tamil, Bengali)
- [ ] Integration with Jan Samarth portal
- [ ] Offline mode for low connectivity areas

### V3 (Future)
- [ ] Bank API partnerships (real-time eligibility)
- [ ] Community verification system
- [ ] Financial literacy modules
- [ ] Mobile app (React Native)

## 🔧 API Reference

### POST `/api/analyze-profile`
Analyze user's financial profile

**Request Body:**
```json
{
  "incomeType": "seasonal|daily|irregular|stable|mixed",
  "monthlyIncome": number,
  "incomeStability": "very_stable|somewhat_stable|variable|highly_variable",
  "householdExpenses": number,
  "businessExpenses": number,
  "existingDebts": number,
  "riskExposure": ["weather", "health", "market", "competition", "seasonal"],
  "purpose": "working_capital|business_expansion|crop_cultivation|..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "profile": {...},
    "analysis": {
      "incomePattern": {...},
      "riskAssessment": {...},
      "repaymentCapacity": {...},
      "recommendations": {...},
      "warningFlags": [...],
      "confidenceScore": 85
    }
  }
}
```

### POST `/api/get-recommendations`
Get scheme and loan recommendations

**Request Body:**
```json
{
  "profileData": {...},
  "analysis": {...}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": {
      "schemeRecommendations": [...],
      "loanEvaluation": {...},
      "comparison": {...}
    },
    "explanation": {...},
    "schemes": [...]
  }
}
```

## 🤝 Contributing

We welcome contributions! Areas where you can help:
- Adding more regional schemes
- Improving AI prompts for better analysis
- Translation to regional languages
- UI/UX improvements
- Documentation

## 📝 License

MIT License - feel free to use this for social good!

## 🙏 Acknowledgments

- Built for hackathon with focus on social impact
- Inspired by real challenges faced by farmers and micro-entrepreneurs
- Gemini API by Google for AI capabilities
- React and Node.js ecosystems

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: [your-email@example.com]
- Join our community discussions

---

**Remember:** "Not all financial support is good financial support."

Built with ❤️ to protect people who can't afford bad advice.
