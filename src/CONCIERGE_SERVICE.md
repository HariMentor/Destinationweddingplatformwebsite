# Wedzway Concierge Service

## Overview
The Concierge Service is Wedzway's premium membership offering that provides personalized wedding planning support for destination weddings. It addresses key concerns around trust, safety, and travel assurance when planning weddings in new or foreign locations.

## Access
- **Route**: `/concierge`
- **Navigation**: 
  - Top navigation bar → "Concierge" (with crown icon)
  - "Plan Wedding" dropdown → "Concierge Service" (highlighted item)

## Regional Pricing
Pricing varies based on customer location:
- **India**: INR (₹) - For customers planning weddings in India or from India
- **International/Europe**: EUR (€) - For customers from Europe and other international locations

The page includes a region selector that dynamically updates all pricing throughout the page.

## Three Membership Tiers

### Tier 1: Starter
**Pricing**:
- **India**: ₹50,000 (Fully Adjustable)
- **International**: €1,500 (Fully Adjustable)

**Target Audience**: Budget-conscious couples (₹25-50L weddings), DIY-comfortable

**What's Included**:
- Single wedding coverage
- Remote venue negotiation
- Virtual support (24-48hr response)
- Basic vendor recommendations
- Contract review checklist

**Not Included**:
- No membership perks
- No Wedzway coins
- No multi-wedding coverage
- No site visits

---

### Tier 2: Pro Member ⭐ Most Popular
**Pricing**:
- **India**: ₹1,00,000 (₹50k Adjustable)
- **International**: €3,000 (€1.5k Adjustable)

**Target Audience**: ₹50L-1Cr weddings, families with multiple weddings planned

**What's Included**:

**Coverage**:
- 3 wedding bookings (your wedding + 2 family/friend weddings within 3 years)
- Site visits with you (final 3 venues)
- In-person negotiations
- 2-day on-ground coordination
- 24/7 instant support

**Wedzway Premium Membership** (3 years):
- Transferable to 2 family/friends
- 2nd wedding: 50% off charges
- 3rd wedding: 35% off charges

**Wedzway Coins**:
- Earn 100 coins per ₹1L spent
- Example: ₹60L wedding = 6,000 coins = ₹60,000 credit
- Redeem for: Honeymoon, anniversary trips, baby showers, event planning

**Premium Venue Perks**:
- Room upgrade priority (when available)
- Complimentary venue tasting for 2 (₹15-25k value)
- Late checkout (2pm vs 11am)
- Welcome amenity (champagne + flowers in room)
- Early venue access for pre-wedding shoot (4 hours complimentary)

**Savings Dashboard**: "Look How Much You Saved!" - Celebratory tone with bold savings numbers

---

### Tier 3: Elite Member 👑 VIP
**Pricing**:
- **India**: ₹1,50,000 (₹50k Adjustable)
- **International**: €5,000 (€2.5k Adjustable)

**Target Audience**: ₹1Cr+ weddings, NRI families, destination weddings, multiple family weddings

**What's Included**:

**Coverage**:
- 3 wedding bookings (your wedding + 2 family/friend weddings within 3 years)
- Site visits with you (3 venues per wedding)
- In-person negotiations
- 2-day on-ground coordination per wedding
- Visa/flight coordination (for destination weddings)
- 24/7 instant support

**Wedzway Platinum Membership** (3 years):
- Transferable to 2 family/friends
- 2nd wedding: 50% off charges
- 3rd wedding: 25% off charges

**Wedzway Coins (Enhanced)**:
- Earn 150 coins per ₹1L spent (50% bonus vs. Pro)
- Example: ₹1Cr wedding = 15,000 coins = ₹1,50,000 credit
- Redeem for: Honeymoon, anniversary trips, baby showers, vow renewals, milestone events

**VIP Venue Perks**:
- Room upgrade (priority over Pro members)
- Complimentary venue tasting for 4 (₹30-40k value)
- Late checkout (4pm vs 11am)
- Premium welcome amenity (champagne, flowers, personalized gift)
- **Exclusive venue access** (book sold-out dates through partnerships)
- Pre-wedding shoot day (8 hours venue access, ₹50k value)
- Priority vendor booking (decorators, photographers during peak season)
- **Concierge hotline** (emergency vendor replacement within 2 hours)

**Savings Dashboard**: "Exclusive Access Report" - Focus on exclusivity, scarcity metrics, and network value

---

## Core Services Included

All tiers benefit from Wedzway's comprehensive concierge services:

1. **Trust & Safety Assurance** - Navigate foreign locations with verified vendors
2. **Travel Assurance** - Complete visa, flight, and private flight coordination
3. **Planner Matchmaking** - Connect with the perfect wedding planner
4. **Venue Negotiation** - Leverage partnerships for best rates and access
5. **Smart Contracts** - Legally sound cross-border contracts
6. **Guest Travel Management** - Coordinate accommodation and transportation
7. **Cross-Border Tax** - Navigate international tax implications
8. **Fashion Stylist** - Personal styling services
9. **Pre-Wedding & Proposal** - Plan pre-wedding shoots and proposals

## Savings Dashboard (Tier-Specific)

### Mid-Tier Clients (₹50L-1Cr) - Pro Members
**Dashboard Messaging**: "Look How Much You Saved!"
- Big, bold savings numbers (e.g., "You saved ₹8,50,000!")
- Percentage savings (e.g., "18% below market rate")
- Comparison charts (venue, planner, vendor savings)
- Shareable with family
- **Tone**: Celebratory, explicit, proud

### Luxury Clients (₹1-3Cr)
**Dashboard Messaging**: "Investment Optimization Report"
- Value-driven language (not "savings")
- Market benchmarking (e.g., "12% below market benchmark")
- ROI analysis (cost per guest, cost per hour)
- Quality metrics (ratings, satisfaction scores)
- **Tone**: Sophisticated, analytical, understated

### Ultra-Luxury Clients (₹3Cr+) - Elite Members
**Dashboard Messaging**: "Exclusive Access Report"
- Emphasis on access over price
- Scarcity metrics (sold-out dates, waitlist vendors)
- Network value (exclusive partnerships)
- Prestige indicators (top 2% of weddings)
- **Tone**: Exclusive, access-focused, prestige-driven

## Design Elements

- **Colors**: Orange (#DF6951) and Yellow (#F1A501) gradients
- **Fonts**: Volkhov serif for headings
- **Icons**: Crown for Elite, Star for Pro
- **Layout**: Modern travel page design aesthetic
- **Components Used**:
  - Pricing comparison cards
  - Tabbed savings dashboards
  - Feature comparison grids
  - Service cards with icons
  - Gradient CTAs

## Technical Implementation

**Files**:
- `/components/ConciergePage.tsx` - Main component
- `/app/concierge/page.tsx` - Next.js page
- `/app/concierge/ConciergePageClient.tsx` - Client component
- Updated navigation in `/components/TravelNav.tsx`
- Updated routing in `/App.tsx`

**Features**:
- Fully responsive design
- **Regional pricing selector** (India/International)
- **Dynamic currency display** (INR ₹ / EUR €)
- Interactive tier comparison
- Tabbed savings dashboard (3 different views)
- Premium perks showcase
- Service overview grid
- Gradient CTA sections

## Pricing Structure Details

### Regional Pricing Model

| Tier | India (INR) | International (EUR) | Adjustability |
|------|-------------|---------------------|---------------|
| **Starter** | ₹50,000 | €1,500 | Fully Adjustable |
| **Pro Member** | ₹1,00,000 | €3,000 | ₹50k / €1.5k Adjustable |
| **Elite Member** | ₹1,50,000 | €5,000 | ₹50k / €2.5k Adjustable |

### Why Regional Pricing?

1. **Market Alignment**: Pricing reflects local market conditions and wedding budgets in different regions
2. **Fair Value**: Ensures the service is accessible to couples globally at fair market rates
3. **Currency Convenience**: Customers see pricing in their local currency for easier decision-making
4. **Competitive Positioning**: Aligned with regional wedding planning service rates

### Exchange Rate Approximation
- The EUR pricing is approximately set considering typical destination wedding budgets in European markets
- Pricing is independent of exchange rate fluctuations and fixed per region
- Both pricing tiers offer the same comprehensive services regardless of currency

## Future Enhancements

Potential additions:
- Concierge booking/request form
- Payment integration for tier selection
- Membership dashboard (for existing members)
- Success stories/testimonials
- Comparison calculator
- Live chat integration with concierge team
- Member portal with coins tracking
- Additional currency support (USD, GBP, AED, SGD)
- Location-based auto-detection for region selection
