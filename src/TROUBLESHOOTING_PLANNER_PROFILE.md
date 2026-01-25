# Troubleshooting: Planner Profile Not Showing

## Issue
The Wedding Planner Business Dashboard section is not loading on the `/account` page.

## Quick Checks

### 1. **Verify the isWeddingPlanner flag is set to true**
File: `/components/CustomerAccountPage.tsx` (Line ~111)
```typescript
const isWeddingPlanner = true; // Should be true to see planner features
```

### 2. **Verify you're on the Overview tab**
The planner dashboard only shows when `activeTab === "overview"`

### 3. **Clear Browser Cache & Restart Dev Server**
```bash
# Stop the dev server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart the dev server
npm run dev
```

### 4. **Check Browser Console for Errors**
Press F12 in your browser and look for any React/JavaScript errors

### 5. **Verify Route Structure**
Make sure these files exist:
- `/app/planners/edit/page.tsx` ✓
- `/app/planners/edit/PlannerProfileEditClient.tsx` ✓
- `/components/PlannerProfileEditPage.tsx` ✓
- `/components/CustomerAccountPage.tsx` (updated) ✓

## What Should Appear

When you visit `/account` and the `isWeddingPlanner` is `true`, you should see:

### In Profile Header:
- Badge text: "Wedding Planner" (instead of "Premium Member")
- Two buttons:
  - "Edit Profile" (outline)
  - "Manage Business" (teal background)

### In Overview Tab (Top Section):
A card with teal border containing:
1. **Header**: "Your Wedding Planning Business"
2. **Quick Stats** (3 boxes):
   - Average Rating: 4.9
   - Total Reviews: 124
   - Weddings Planned: 150
3. **Action Buttons** (3 buttons):
   - "Manage Profile" → Links to `/planners/edit`
   - "View Public Profile" → Links to `/planners/1`
   - "Analytics" → Shows toast message

## Direct Navigation Test

Try accessing the planner edit page directly:
1. Go to: `http://localhost:3000/planners/edit`
2. You should see the profile management page with sidebar navigation

If this doesn't work, there may be a routing issue.

## Component Structure Verification

The CustomerAccountPage component flow:
```
CustomerAccountPage
  ├── Check: isWeddingPlanner === true
  ├── Check: activeTab === "overview"
  │
  ├── IF both true:
  │   └── Show Business Dashboard Card
  │       ├── Title: "Your Wedding Planning Business"
  │       ├── Stats Grid (3 columns)
  │       └── Button Row (3 buttons)
  │
  └── Continue with rest of overview content
```

## Common Issues & Fixes

### Issue 1: Page shows but no planner section
**Fix**: Check that `isWeddingPlanner` is set to `true`

### Issue 2: Nothing loads at all
**Fix**: 
- Restart dev server
- Clear `.next` folder
- Check console for errors

### Issue 3: Buttons don't work
**Fix**: Check that `window` object is available (should be, as it's client-side)

### Issue 4: Route `/planners/edit` gives 404
**Fix**: 
- Verify file structure is correct
- Restart dev server
- Check that files are in `app/` directory, not `pages/`

## Testing the Feature

### Manual Test Steps:
1. Navigate to `/account`
2. Verify you're on "Overview" tab (should be default)
3. Look for teal-bordered card at top
4. Check if "Wedding Planner" badge appears
5. Click "Manage Business" button
6. Should navigate to `/planners/edit`
7. Verify edit page loads with sidebar navigation

### Expected Behavior:
- ✅ Teal-bordered business card appears
- ✅ 3 stat boxes show numbers
- ✅ 3 action buttons are clickable
- ✅ Clicking "Manage Profile" goes to `/planners/edit`
- ✅ Clicking "View Public Profile" goes to `/planners/1`
- ✅ Clicking "Analytics" shows toast notification

## Still Not Working?

If you've tried all the above and it's still not showing:

1. **Check the file was saved correctly**:
   - Open `/components/CustomerAccountPage.tsx`
   - Search for "isWeddingPlanner"
   - Verify the business dashboard code is present (around line 594-657)

2. **Verify imports are correct**:
   - Check that `Briefcase` icon is imported from lucide-react
   - Check that `BarChart3` icon is imported
   - Check that `toast` from sonner is imported

3. **Test with console.log**:
   Add this at line ~112 in CustomerAccountPage.tsx:
   ```typescript
   console.log('Is Wedding Planner?', isWeddingPlanner);
   console.log('Active Tab:', activeTab);
   ```
   Then check browser console to see the values.

## Contact Points

If all else fails, provide these details:
- Browser console errors (F12)
- Value of `isWeddingPlanner` from console.log
- Value of `activeTab` from console.log
- Screenshot of `/account` page
- Screenshot of browser console
