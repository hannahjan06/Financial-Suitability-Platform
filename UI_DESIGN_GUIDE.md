# UI Design Guide

## Design System

### Color Palette

```
Primary Colors (Warm & Earthy):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Earth     #8B4513  ████ Deep brown, grounding
Terracotta #E07A5F ████ Warm coral, primary actions
Sand      #F4A261  ████ Soft orange, accents
Sage      #81B29A  ████ Muted green, success
Clay      #3D405B  ████ Dark blue-grey, text

Supporting Colors:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ivory     #F8F5F0  ████ Background base
Cream     #FFF8E7  ████ Light background
Forest    #2D6A4F  ████ Dark green, emphasis

Semantic Colors:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Success   #52B788  ████ Suitable recommendations
Warning   #F77F00  ████ Caution flags
Danger    #D62828  ████ Not recommended
Info      #457B9D  ████ Informational
```

### Typography

```
Display Font: Fraunces (Serif)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1: 2-3.5rem, weight 600, italic
H2: 1.5-2.5rem, weight 600
H3: 1.5rem, weight 600

Use for: Main titles, section headers, metric values

Body Font: Work Sans (Sans-serif)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Body: 1rem, weight 400
Small: 0.875-0.9rem, weight 400
Label: 0.95rem, weight 500

Use for: All body text, forms, buttons, descriptions
```

### Spacing System

```
xs:  0.5rem  (8px)   - Tight spacing
sm:  1rem    (16px)  - Default spacing
md:  1.5rem  (24px)  - Section spacing
lg:  2.5rem  (40px)  - Major sections
xl:  4rem    (64px)  - Page sections
```

### Components

#### Buttons
```
Primary Button:
- Gradient background: Earth → Terracotta
- White text, 500 weight
- 1rem padding vertical, 2.5rem horizontal
- 12px border radius
- Shadow: 0 4px 16px rgba(224, 122, 95, 0.3)
- Hover: Lift 2px, stronger shadow

Secondary Button:
- White background
- Sage border (2px)
- Clay text
- Hover: Sage background, white text
```

#### Cards
```
Standard Card:
- White background
- 20px border radius
- Padding: 2.5rem (lg)
- Shadow: 0 4px 24px rgba(61, 64, 91, 0.08)
- Top accent: 4px gradient bar (hidden, shows on hover)
- Hover: Lift 4px, stronger shadow

Metric Card:
- White background
- 16px border radius
- Sage border (2px, 15% opacity)
- Padding: 1.5rem (md)
- Hover: Lift 2px, stronger border
```

#### Form Elements
```
Input/Select:
- White background
- Sage border (2px, 20% opacity)
- 12px border radius
- 0.875rem + 1rem padding
- Focus: Sage border, 4px Sage glow

Checkbox Labels:
- White background
- Sage border (2px, 20% opacity)
- 12px border radius
- 0.75rem + 1.25rem padding
- Hover: Sage border, light sage background
```

#### Badges
```
Success Badge:
- Background: rgba(82, 183, 136, 0.15)
- Text: Forest (#2D6A4F)
- Icon + text, 20px radius

Warning Badge:
- Background: rgba(247, 127, 0, 0.15)
- Text: #C65F00

Danger Badge:
- Background: rgba(214, 40, 40, 0.15)
- Text: #A01E1E
```

### Layout Structure

```
┌─────────────────────────────────────────┐
│           Header (centered)             │
│        Title + Subtitle                 │
└─────────────────────────────────────────┘
│
┌─────────────────────────────────────────┐
│         Disclaimer Banner               │
│    (Terracotta border, light bg)        │
└─────────────────────────────────────────┘
│
┌─────────────────────────────────────────┐
│         Progress Steps                  │
│      ① Profile → ② Analysis → ③ Plan    │
└─────────────────────────────────────────┘
│
┌─────────────────────────────────────────┐
│                                         │
│         Main Content Card               │
│      (Context-specific content)         │
│                                         │
│  - Forms (Screen 1)                     │
│  - Analysis + Recommendations (Screen 2)│
│  - Action Plan (Screen 3)               │
│                                         │
└─────────────────────────────────────────┘
│
┌─────────────────────────────────────────┐
│        Footer (centered)                │
│   "Built to protect people..."          │
└─────────────────────────────────────────┘
```

## Screen Flows

### Screen 1: Financial Profile
```
┌──────────────────────────────────────┐
│  🙍 Your Financial Profile           │
│  Help us understand your situation   │
├──────────────────────────────────────┤
│                                      │
│  📈 Income Type                      │
│  [Dropdown: Seasonal/Daily/etc]      │
│                                      │
│  💰 Monthly Income                   │
│  [Number input: ₹]                   │
│                                      │
│  📊 Income Stability                 │
│  [Dropdown: Very stable/Variable]    │
│                                      │
│  🏠 Household Expenses               │
│  [Number input: ₹]                   │
│                                      │
│  ⚠️ Risk Exposure                     │
│  [✓ Weather] [✓ Health] [✓ Market]  │
│                                      │
│  🎯 Purpose                          │
│  [Dropdown: Working capital/etc]     │
│                                      │
│  [Analyze My Profile →]              │
│                                      │
└──────────────────────────────────────┘
```

### Screen 2: Recommendations
```
┌──────────────────────────────────────┐
│  📊 Your Financial Analysis          │
├──────────────────────────────────────┤
│  [Seasonal] [High Risk] [₹5,000/mo]  │
│  [85% Confidence]                    │
│                                      │
│  ⚠️ Important Considerations:        │
│  • High income volatility            │
│  • Limited emergency buffer          │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  🏆 Government Schemes               │
├──────────────────────────────────────┤
│  PM-KISAN                            │
│  ✅ Recommended                       │
│  Direct income support...            │
│  ₹6,000/year • 30-60 days • Low     │
│                                      │
│  Next Steps:                         │
│  1. Visit PM-KISAN portal            │
│  2. Prepare land records             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  💰 Loan Suitability                 │
├──────────────────────────────────────┤
│  ⚠️ Proceed with Caution             │
│  Due to seasonal income pattern...   │
│  ₹30,000 • Seasonal • 12 months     │
│                                      │
│  Risk Mitigation:                    │
│  • Consider crop insurance           │
│  • Build 3-month buffer              │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  📋 Our Recommendation               │
│  Focus on Government Schemes first   │
│  PM-KISAN provides stable income...  │
│  Timeline: Apply now for schemes...  │
└──────────────────────────────────────┘

[← Back] [View Next Steps →]
```

### Screen 3: Action Plan
```
┌──────────────────────────────────────┐
│  ✅ Your Action Plan                 │
├──────────────────────────────────────┤
│  ① Priority Actions                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  1️⃣ PM-KISAN                         │
│     Visit portal...                  │
│  2️⃣ Gather Documents                 │
│     Prepare documentation...         │
│  3️⃣ Seek Guidance                    │
│     Consult expert...                │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  📄 Documents to Prepare             │
├──────────────────────────────────────┤
│  [📄 Aadhaar]  [📄 PAN]  [📄 Bank]  │
│  [📄 Address]  [📄 Income] [📄 Photo]│
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  📞 Where to Get Help                │
├──────────────────────────────────────┤
│  Nearest Bank Branch                 │
│  Banking Services                    │
│  Visit for loan applications...      │
│                                      │
│  Jan Samarth Portal                  │
│  Government Schemes                  │
│  [Visit Website →]                   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  📍 Application Details              │
├──────────────────────────────────────┤
│  PM-KISAN                            │
│  Documents: Land records, Aadhaar... │
│  Processing: 30-60 days              │
│  [Apply Now →]                       │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  ⚠️ Important Reminders              │
│  • This is informational only        │
│  • Consult experts before decisions  │
│  • Verify current information        │
└──────────────────────────────────────┘

[Start New Analysis]
```

## Animation Guidelines

### Page Transitions
- Fade in + slide up: 0.6s ease-out
- Stagger children: 0.1s delay between elements
- Smooth, not jarring

### Hover States
- Lift cards: 2-4px translateY
- Strengthen shadows
- Subtle scale (1.02x max)
- Duration: 0.3-0.4s

### Loading States
- Spinner: 60px, terracotta border
- Pulse opacity on skeleton screens
- Never block entire UI unnecessarily

### Micro-interactions
- Button ripple effect
- Form field glow on focus
- Checkbox check animation
- Badge slide in from side

## Responsive Breakpoints

```
Mobile:    < 768px
Tablet:    768px - 1024px
Desktop:   > 1024px

Adjustments:
- Mobile: Single column, larger touch targets
- Tablet: 2-column grid, responsive padding
- Desktop: Full 3-column grid, generous spacing
```

## Accessibility

- Minimum contrast ratio: 4.5:1 for text
- Focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Screen reader friendly structure
- Error messages clearly visible

## Brand Voice

**Tone:** Warm, trustworthy, empathetic, never patronizing
**Language:** Simple but respectful, culturally aware
**Approach:** Protective, not permissive (harm reduction focus)

**Good:**
"Based on your situation, this scheme is a safer option than a loan right now."

**Avoid:**
"You're not eligible for this." (Too harsh)
"Everything looks great!" (Too optimistic)
