// Government Schemes Database
const schemes = [
  {
    id: 'pm_kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'Direct income support of ₹6,000 per year to farmer families in three installments',
    category: 'subsidy',
    eligibility: {
      incomeTypes: ['seasonal', 'mixed'],
      maxLandholding: 'No limit',
      targetGroup: 'Small and marginal farmers'
    },
    benefits: {
      amount: 6000,
      frequency: 'yearly',
      installments: 3
    },
    effort: 'low',
    documents: ['Land records', 'Aadhaar', 'Bank account'],
    applicationUrl: 'https://pmkisan.gov.in/',
    processingTime: '30-60 days'
  },
  {
    id: 'mudra_shishu',
    name: 'MUDRA Shishu Loan',
    description: 'Collateral-free loans up to ₹50,000 for micro-enterprises',
    category: 'loan',
    eligibility: {
      incomeTypes: ['daily', 'irregular', 'mixed'],
      targetGroup: 'Micro-entrepreneurs, street vendors',
      businessAge: 'Any'
    },
    benefits: {
      amount: 50000,
      interestRate: '8-12%',
      tenure: '12-36 months'
    },
    effort: 'medium',
    documents: ['Business proof', 'Aadhaar', 'Bank statements', 'Residence proof'],
    applicationUrl: 'https://www.mudra.org.in/',
    processingTime: '15-30 days'
  },
  {
    id: 'pm_fasal_bima',
    name: 'PM Fasal Bima Yojana',
    description: 'Crop insurance scheme covering yield losses due to natural calamities',
    category: 'insurance',
    eligibility: {
      incomeTypes: ['seasonal'],
      targetGroup: 'Farmers',
      cropType: 'All notified crops'
    },
    benefits: {
      coverage: 'Up to sum insured',
      premium: '1.5-5% of sum insured',
      subsidized: true
    },
    effort: 'medium',
    documents: ['Land records', 'Sowing certificate', 'Bank account'],
    applicationUrl: 'https://pmfby.gov.in/',
    processingTime: 'Before sowing season'
  },
  {
    id: 'kisan_credit_card',
    name: 'Kisan Credit Card (KCC)',
    description: 'Revolving credit facility for agricultural expenses',
    category: 'loan',
    eligibility: {
      incomeTypes: ['seasonal', 'mixed'],
      targetGroup: 'Farmers with land ownership/tenancy',
      creditHistory: 'Not required'
    },
    benefits: {
      amount: 'Based on land holding and cropping pattern',
      interestRate: '4% (with subsidy)',
      tenure: 'Revolving, annual renewal'
    },
    effort: 'medium',
    documents: ['Land documents', 'Identity proof', 'Address proof'],
    applicationUrl: 'Visit nearest bank branch',
    processingTime: '7-15 days'
  },
  {
    id: 'stand_up_india',
    name: 'Stand-Up India',
    description: 'Loans for SC/ST and women entrepreneurs (₹10 lakh to ₹1 crore)',
    category: 'loan',
    eligibility: {
      incomeTypes: ['daily', 'irregular', 'stable', 'mixed'],
      targetGroup: 'SC/ST/Women entrepreneurs',
      businessType: 'Manufacturing, services, trading'
    },
    benefits: {
      amount: '10 lakh - 1 crore',
      interestRate: 'Base rate + 3%',
      tenure: 'Up to 7 years'
    },
    effort: 'high',
    documents: ['Business plan', 'Identity/category proof', 'Project report', 'Bank statements'],
    applicationUrl: 'https://www.standupmitra.in/',
    processingTime: '30-60 days'
  },
  {
    id: 'pm_svanidhhi',
    name: 'PM SVANidhi (Street Vendor Loan)',
    description: 'Working capital loan for street vendors up to ₹50,000',
    category: 'loan',
    eligibility: {
      incomeTypes: ['daily', 'irregular'],
      targetGroup: 'Street vendors',
      vendorCard: 'Preferred but not mandatory'
    },
    benefits: {
      amount: 50000,
      interestRate: '7% subsidy on timely repayment',
      tenure: '12 months',
      digitalIncentive: '₹100/month for digital transactions'
    },
    effort: 'low',
    documents: ['Identity proof', 'Vendor certificate/recommendation', 'Bank account'],
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in/',
    processingTime: '7-15 days'
  }
];

class SchemeService {
  getSchemes() {
    return schemes;
  }

  getSchemeById(id) {
    return schemes.find(scheme => scheme.id === id);
  }

  filterSchemesByProfile(profileData) {
    const { incomeType, purpose, monthlyIncome } = profileData;
    
    return schemes.filter(scheme => {
      // Match income type
      const incomeMatch = scheme.eligibility.incomeTypes.includes(incomeType);
      
      // Match purpose (loan vs scheme)
      let purposeMatch = true;
      if (purpose === 'working_capital' || purpose === 'business_expansion') {
        purposeMatch = scheme.category === 'loan';
      } else if (purpose === 'crop_cultivation') {
        purposeMatch = scheme.category === 'loan' || scheme.category === 'insurance' || 
                      scheme.id === 'pm_kisan';
      }
      
      return incomeMatch && purposeMatch;
    });
  }

  categorizeSchemes(schemes) {
    return {
      loans: schemes.filter(s => s.category === 'loan'),
      subsidies: schemes.filter(s => s.category === 'subsidy'),
      insurance: schemes.filter(s => s.category === 'insurance')
    };
  }
}

export default SchemeService;
