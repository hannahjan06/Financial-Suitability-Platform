# Setup Checklist for Financial Suitability Platform

Use this checklist to ensure everything is properly configured.

## ✅ Prerequisites

- [ ] Node.js 18 or higher installed
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
- [ ] npm installed (comes with Node.js)
  ```bash
  npm --version
  ```
- [ ] Git installed (for version control)
- [ ] Code editor (VS Code recommended)
- [ ] Gemini API key obtained from [Google AI Studio](https://makersuite.google.com/app/apikey)

## ✅ Initial Setup

### 1. Backend Setup
- [ ] Navigate to backend directory
  ```bash
  cd backend
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Create .env file
  ```bash
  cp .env.example .env
  ```
- [ ] Add Gemini API key to .env
  ```
  GEMINI_API_KEY=your_actual_api_key_here
  ```
- [ ] Verify .env is in .gitignore (should already be)

### 2. Frontend Setup
- [ ] Navigate to frontend directory
  ```bash
  cd frontend
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Verify Vite config is correct
  ```bash
  cat vite.config.js  # Check proxy settings
  ```

## ✅ Running the Application

### Terminal 1: Backend
- [ ] Navigate to backend directory
  ```bash
  cd backend
  ```
- [ ] Start the server
  ```bash
  npm start
  ```
- [ ] Verify server is running
  - Should see: "🚀 Financial Suitability Platform API running on port 3001"
- [ ] Test health endpoint
  ```bash
  curl http://localhost:3001/health
  ```
  - Should return: `{"status":"ok","message":"Financial Suitability Platform API"}`

### Terminal 2: Frontend
- [ ] Navigate to frontend directory
  ```bash
  cd frontend
  ```
- [ ] Start development server
  ```bash
  npm run dev
  ```
- [ ] Verify frontend is running
  - Should see: "Local: http://localhost:5173/"
- [ ] Open browser to http://localhost:5173

## ✅ Functionality Testing

### Basic Flow Test
- [ ] Page loads without errors
- [ ] Fill out financial profile form
  - [ ] Select income type
  - [ ] Enter monthly income (e.g., 15000)
  - [ ] Select income stability
  - [ ] Enter household expenses
  - [ ] Select risk exposure factors
  - [ ] Select purpose
- [ ] Click "Analyze My Profile"
- [ ] Wait for analysis (may take 10-30 seconds)
- [ ] Verify analysis screen loads
  - [ ] Income pattern displayed
  - [ ] Risk level shown
  - [ ] Repayment capacity calculated
  - [ ] Confidence score visible
- [ ] Review recommendations
  - [ ] Scheme recommendations shown
  - [ ] Loan evaluation displayed
  - [ ] Comparison section visible
- [ ] Click "View Next Steps"
- [ ] Verify action plan screen
  - [ ] Priority actions listed
  - [ ] Documents checklist shown
  - [ ] Support contacts displayed
  - [ ] Application details visible

### API Testing
- [ ] Test analyze-profile endpoint
  ```bash
  curl -X POST http://localhost:3001/api/analyze-profile \
    -H "Content-Type: application/json" \
    -d '{
      "incomeType": "seasonal",
      "monthlyIncome": 15000,
      "incomeStability": "variable",
      "householdExpenses": 8000,
      "businessExpenses": 3000,
      "existingDebts": 2000,
      "riskExposure": ["weather", "market"],
      "purpose": "crop_cultivation"
    }'
  ```
- [ ] Verify response is valid JSON with analysis data

## ✅ Common Issues & Solutions

### Backend won't start
Problem: Error about missing GEMINI_API_KEY
- [ ] Solution: Check .env file exists in backend directory
- [ ] Solution: Verify GEMINI_API_KEY is set correctly
- [ ] Solution: No quotes around the API key value

Problem: Port 3001 already in use
- [ ] Solution: Kill process using port 3001
  ```bash
  # On Mac/Linux
  lsof -ti:3001 | xargs kill -9
  # On Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F
  ```

### Frontend won't connect to backend
Problem: CORS errors in browser console
- [ ] Solution: Verify backend is running on port 3001
- [ ] Solution: Check vite.config.js proxy settings
- [ ] Solution: Clear browser cache

Problem: API requests failing
- [ ] Solution: Check browser console for errors
- [ ] Solution: Verify backend URL in api.js is correct
- [ ] Solution: Test backend endpoint directly with curl

### Gemini API errors
Problem: "Invalid API key" error
- [ ] Solution: Get new API key from Google AI Studio
- [ ] Solution: Ensure no extra spaces in .env file
- [ ] Solution: Restart backend server after changing .env

Problem: Rate limit errors
- [ ] Solution: Wait a few minutes before retrying
- [ ] Solution: Check Gemini API quotas in console
- [ ] Solution: Consider implementing caching

## ✅ Development Tools

### Recommended VS Code Extensions
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] ESLint
- [ ] Prettier
- [ ] Auto Rename Tag
- [ ] GitLens

### Browser DevTools
- [ ] Open browser console (F12)
- [ ] Check Network tab for API calls
- [ ] Monitor Console for errors
- [ ] Use React DevTools (if installed)

## ✅ Code Quality Checks

### Backend
- [ ] No console errors when starting
- [ ] All routes responding correctly
- [ ] Error handling working
- [ ] Environment variables loading

### Frontend
- [ ] No console errors on page load
- [ ] All components rendering
- [ ] Forms validating correctly
- [ ] Animations smooth
- [ ] Responsive on mobile

## ✅ Performance Checks

- [ ] Page loads in < 3 seconds
- [ ] API responses in < 30 seconds
- [ ] Smooth animations (60fps)
- [ ] No memory leaks (check DevTools)
- [ ] Images optimized

## ✅ Security Checks

- [ ] .env file in .gitignore
- [ ] No API keys in frontend code
- [ ] CORS properly configured
- [ ] Input validation working
- [ ] No sensitive data in console logs

## ✅ Documentation

- [ ] README.md reviewed
- [ ] API endpoints documented
- [ ] Environment variables explained
- [ ] Deployment guide available
- [ ] UI design guide reviewed

## ✅ Git & Version Control

- [ ] Repository initialized
  ```bash
  git init
  ```
- [ ] .gitignore configured correctly
- [ ] Initial commit made
  ```bash
  git add .
  git commit -m "Initial commit: Financial Suitability Platform"
  ```
- [ ] Remote repository added (if applicable)
  ```bash
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

## ✅ Optional Enhancements

- [ ] Add more government schemes to database
- [ ] Implement Hindi language support
- [ ] Add more detailed error messages
- [ ] Implement response caching
- [ ] Add analytics tracking
- [ ] Set up error monitoring (Sentry)
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline

## 🎉 Ready for Demo/Hackathon

When all items above are checked, you're ready to:
- [ ] Practice the demo flow
- [ ] Prepare pitch presentation
- [ ] Test on different devices
- [ ] Have backup plan for internet issues
- [ ] Print QR code for easy access
- [ ] Prepare judge Q&A responses

## 📝 Quick Reference Commands

```bash
# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm run dev

# Test API health
curl http://localhost:3001/health

# Build for production
cd frontend && npm run build

# Install new dependency (backend)
cd backend && npm install <package-name>

# Install new dependency (frontend)
cd frontend && npm install <package-name>
```

## 🆘 Getting Help

If you're stuck:
1. Check this checklist again
2. Review error messages carefully
3. Search error messages online
4. Check GitHub issues
5. Review documentation files
6. Ask for help with specific error details

---

**Pro Tips:**
- Keep both terminals visible side by side
- Use browser DevTools Network tab to debug API calls
- Test with realistic data for best results
- Always restart servers after changing .env files
- Keep a backup of your Gemini API key somewhere safe
