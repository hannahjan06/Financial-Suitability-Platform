#!/bin/bash

# Financial Suitability Platform - Quick Setup Script

echo "🎯 Financial Suitability Platform Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend
npm install
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your GEMINI_API_KEY"
fi
cd ..
echo ""

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend
npm install
cd ..
echo ""

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add your Gemini API key to backend/.env"
echo "   Get one at: https://makersuite.google.com/app/apikey"
echo ""
echo "2. Start the backend server (Terminal 1):"
echo "   cd backend && npm start"
echo ""
echo "3. Start the frontend server (Terminal 2):"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "🚀 Happy coding!"
