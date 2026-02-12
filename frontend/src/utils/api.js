const API_BASE_URL = '/api';

export const api = {
  async analyzeProfile(profileData) {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/analyze-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
    } catch (err) {
      throw new Error('Cannot reach backend. Start it with: cd backend && npm start');
    }
    
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error || (response.status === 502 || response.status === 503
        ? 'Backend may be offline or not configured. Check that the backend is running and GEMINI_API_KEY is set in backend/.env'
        : 'Failed to analyze profile');
      throw new Error(message);
    }
    
    return data;
  },

  async getRecommendations(profileData, analysis) {
    const response = await fetch(`${API_BASE_URL}/get-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileData, analysis }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }
    
    return response.json();
  },

  async getSchemes() {
    const response = await fetch(`${API_BASE_URL}/schemes`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch schemes');
    }
    
    return response.json();
  }
};
