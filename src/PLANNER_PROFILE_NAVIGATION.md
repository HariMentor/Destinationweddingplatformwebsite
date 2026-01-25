# Wedding Planner Profile Navigation Guide

## Overview
The wedding planner profile management system has been integrated into the Wedzway platform with multiple access points for easy navigation.

## Access Points

### 1. **From Account Page** (Primary Access)
- **URL**: `/account`
- **Location**: Top of the Overview tab
- **Features**:
  - Badge displays "Wedding Planner" status
  - "Manage Business" button in profile header (teal color #02542D)
  - Business dashboard card with quick stats:
    - Average Rating: 4.9
    - Total Reviews: 124
    - Weddings Planned: 150
  - Action buttons:
    - **Manage Profile**: Opens edit page
    - **View Public Profile**: Opens public planner profile
    - **Analytics**: Placeholder for future analytics

### 2. **Direct URL Access**
- **Edit Page**: `/planners/edit`
- **Public Profile**: `/planners/1` (or any planner ID)

### 3. **From Public Profile**
- Planners can view their public profile at `/planners/[id]`
- Click "Manage Business" from account page to edit

## Page Structure

### Public Profile (`/planners/[id]`)
**Location**: `/components/PlannerProfilePage.tsx`
**Route**: `/app/planners/[id]/page.tsx`

Features:
- Hero banner with image carousel
- Basic information & highlights
- Services offered
- Packages (Basic, Premium, Luxury)
- Real weddings portfolio
- **Wedding Inspirations** (mood boards)
- Gallery
- Reviews
- Quick stats sidebar
- Contact form

### Edit Profile (`/planners/edit`)
**Location**: `/components/PlannerProfileEditPage.tsx`
**Route**: `/app/planners/edit/page.tsx`

Features - Full CRUD Operations:
- ✅ Basic Information
- ✅ Gallery Management
- ✅ Highlights
- ✅ Services (Create, Read, Update, Delete)
- ✅ Packages (Create, Read, Update, Delete)
- ✅ Real Weddings (Create, Read, Update, Delete)
- ✅ Inspirations (Create, Read, Update, Delete)
- ✅ Destinations & Languages

## User Type Detection

Currently uses a mock variable in `CustomerAccountPage.tsx`:
```typescript
const isWeddingPlanner = true; // Mock - replace with actual auth check
```

**TODO**: Replace with actual authentication/user role check from your auth system.

## Navigation Flow

```
Account Page (/account)
    ↓
[If user is Wedding Planner]
    ↓
Shows "Wedding Planner" badge
Shows "Manage Business" button
Shows Business Dashboard Card
    ↓
Click "Manage Profile" button
    ↓
Edit Profile Page (/planners/edit)
    ↓
    ├── Save Changes → Returns to account
    ├── Preview → Opens public profile (/planners/1)
    └── Back → Returns to account
```

## Visual Indicators

### Brand Colors Used:
- **Primary Teal**: `#02542D` (Planner business features)
- **Primary Orange**: `#DF6951` (General Wedzway features)

### Account Page Indicators:
1. **Badge Color**: Orange (#DF6951)
2. **Manage Business Button**: Teal (#02542D)
3. **Business Dashboard**: Teal border and accents

## Features by Section

### Edit Page Sections:
1. **Basic Information**: Profile/cover images, business details
2. **Gallery**: Add/remove portfolio images
3. **Highlights**: Key business strengths
4. **Services**: Categorized service offerings
5. **Packages**: Pricing tiers with features
6. **Real Weddings**: Past project showcase
7. **Inspirations**: Mood boards for couples
8. **Destinations & Languages**: Service areas

### Public Profile Features:
- Image lightbox for gallery
- Tabbed services view
- Expandable descriptions
- Mobile-responsive design
- Enquiry form integration
- Social sharing options

## Mobile Responsiveness

Both pages are fully responsive:
- Sidebar navigation (desktop) → Top navigation (mobile)
- Flexible grid layouts
- Touch-friendly buttons
- Optimized image sizes
- Collapsible sections

## Future Enhancements

- [ ] Real authentication integration
- [ ] Analytics dashboard
- [ ] Booking management
- [ ] Client communication system
- [ ] Payment processing
- [ ] Calendar integration
- [ ] Team member management
- [ ] Performance metrics
