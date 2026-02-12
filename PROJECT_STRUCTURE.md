# Financial Suitability Platform - Project Structure

## Directory Structure

```
financial-suitability-platform/
├── backend/
│   ├── server.js              # Express server with Gemini API integration
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── services/
│       ├── geminiService.js   # Gemini API wrapper
│       ├── schemeService.js   # Government schemes database
│       └── analysisService.js # Financial analysis logic
│
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── App.jsx           # Main React app
│   │   ├── index.jsx         # React entry point
│   │   ├── styles/
│   │   │   └── App.css       # Global styles
│   │   ├── components/
│   │   │   ├── FinancialProfile.jsx    # Screen 1: Profile Builder
│   │   │   ├── Recommendations.jsx     # Screen 2: Recommendations
│   │   │   └── NextSteps.jsx           # Screen 3: Action Steps
│   │   └── utils/
│   │       └── api.js        # API client
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
│
├── README.md                  # Setup and run instructions
└── PROJECT_STRUCTURE.md       # This file
```

## Technology Stack

### Backend
- **Node.js + Express**: RESTful API server
- **Gemini API**: AI-powered financial analysis
- **CORS**: Cross-origin support

### Frontend
- **React 18**: UI framework
- **Vite**: Fast build tool
- **Framer Motion**: Smooth animations
- **Lucide React**: Clean icon set

## Setup Instructions

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Add your Gemini API key to .env
   ```

3. **Run Development Servers**
   ```bash
   # Terminal 1 - Backend (port 3001)
   cd backend
   npm start
   
   # Terminal 2 - Frontend (port 5173)
   cd frontend
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

- `POST /api/analyze-profile` - Analyze user financial profile
- `POST /api/get-recommendations` - Get scheme/loan recommendations
- `GET /api/schemes` - List available schemes
