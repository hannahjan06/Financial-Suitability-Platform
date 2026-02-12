import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async analyzeFinancialProfile(profileData) {
    const prompt = `You are a financial suitability analyst for underserved communities in India. Analyze this financial profile and provide structured insights.

User Profile:
- Income Type: ${profileData.incomeType}
- Monthly Income: ₹${profileData.monthlyIncome}
- Income Stability: ${profileData.incomeStability}
- Household Expenses: ₹${profileData.householdExpenses}
- Business Expenses: ₹${profileData.businessExpenses}
- Existing Debts: ₹${profileData.existingDebts}
- Risk Exposure: ${(profileData.riskExposure || []).join(', ') || 'None'}
- Purpose: ${profileData.purpose}

Provide a JSON response with this exact structure (no markdown, just JSON):
{
  "incomePattern": {
    "type": "seasonal|irregular|stable",
    "volatility": "high|medium|low",
    "description": "Brief description of income pattern"
  },
  "riskAssessment": {
    "level": "high|medium|low",
    "factors": ["factor1", "factor2"],
    "description": "Risk analysis"
  },
  "repaymentCapacity": {
    "score": 0-100,
    "monthlyCapacity": number,
    "description": "Explanation"
  },
  "recommendations": {
    "suitableForLoan": boolean,
    "suitableForScheme": boolean,
    "priority": "loan|scheme|both|neither",
    "reasoning": "Clear explanation"
  },
  "warningFlags": ["flag1", "flag2"],
  "confidenceScore": 0-100
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format from Gemini');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async generateRecommendations(profileData, analysis, schemes) {
    const prompt = `Based on this financial analysis, recommend suitable schemes and evaluate loan suitability.

Profile Summary:
- Income Type: ${profileData.incomeType}
- Monthly Income: ₹${profileData.monthlyIncome}
- Purpose: ${profileData.purpose}

Analysis Results:
- Income Pattern: ${analysis.incomePattern.type} (${analysis.incomePattern.volatility} volatility)
- Risk Level: ${analysis.riskAssessment.level}
- Repayment Capacity: ₹${analysis.repaymentCapacity.monthlyCapacity}/month

Available Schemes:
${schemes.map(s => `- ${s.name}: ${s.description}`).join('\n')}

Provide recommendations in JSON format (no markdown):
{
  "schemeRecommendations": [
    {
      "schemeId": "scheme_id",
      "suitability": "suitable|caution|not_recommended",
      "reasoning": "Why this matches/doesn't match",
      "eligibilityMatch": 0-100,
      "actionSteps": ["step1", "step2"]
    }
  ],
  "loanEvaluation": {
    "suitability": "suitable|risky|not_recommended",
    "recommendedAmount": number,
    "recommendedTenure": number,
    "repaymentFrequency": "monthly|quarterly|seasonal",
    "reasoning": "Detailed explanation",
    "mitigationSteps": ["step1", "step2"],
    "alternatives": ["alternative1", "alternative2"]
  },
  "comparison": {
    "bestOption": "scheme|loan|both|neither",
    "reasoning": "Comparative analysis",
    "timeline": "Suggested sequence of actions"
  }
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format from Gemini');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async explainInSimpleLanguage(technicalContent, language = 'en') {
    const prompt = `Translate this financial analysis into simple, culturally appropriate language for Indian farmers/micro-entrepreneurs.

Technical Content:
${JSON.stringify(technicalContent, null, 2)}

Provide a simple explanation in ${language === 'hi' ? 'Hindi' : 'English'} that:
- Uses everyday language
- Includes relevant examples
- Shows empathy
- Avoids jargon
- Is actionable

Format as JSON:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point1", "point2", "point3"],
  "nextSteps": ["step1", "step2"],
  "warnings": ["warning1", "warning2"]
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format from Gemini');
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}

export default GeminiService;
