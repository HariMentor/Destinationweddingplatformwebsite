# Test: Planner Section Visibility

## Code Location
File: `/components/CustomerAccountPage.tsx`
Lines: ~594-657

## The Code That Should Render

```tsx
{/* Wedding Planner Business Dashboard */}
{isWeddingPlanner && (
  <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#02542D]/10 to-[#02542D]/5 border-2 border-[#02542D]/20">
    {/* ... content ... */}
  </Card>
)}
```

## Required Conditions
Both must be TRUE:
1. `isWeddingPlanner === true` (line ~111)
2. `activeTab === "overview"` (line ~591)

## Quick Test

Add this temporary code at line ~593 (right before the planner section):

```tsx
{/* TEMPORARY DEBUG */}
{console.log('DEBUG:', { isWeddingPlanner, activeTab })}
<div style={{ padding: '20px', background: 'yellow', margin: '10px' }}>
  <strong>DEBUG INFO:</strong><br />
  Is Wedding Planner: {isWeddingPlanner ? 'YES' : 'NO'}<br />
  Active Tab: {activeTab}<br />
  Should Show Planner Section: {(isWeddingPlanner && activeTab === "overview") ? 'YES' : 'NO'}
</div>
```

This will show you:
- Whether the variables are set correctly
- Whether the conditions are met
- Exactly what's happening with the conditional rendering

## Alternative: Force Render Test

Temporarily remove the conditional to see if the card renders at all:

Change line ~594 from:
```tsx
{isWeddingPlanner && (
```

To:
```tsx
{true && (
```

This will force the planner section to always show, helping you determine if it's a:
- Conditional logic issue (if it shows now)
- OR Rendering/syntax issue (if it still doesn't show)

## After Testing
Remember to:
1. Remove debug code
2. Restore original conditional: `{isWeddingPlanner && (`
3. Restart dev server if you made changes

## What You Should See

When working correctly, on `/account` page, Overview tab, you'll see:

```
┌─────────────────────────────────────────────┐
│ 💼 Your Wedding Planning Business           │
│ Manage your profile, showcase your work...  │
│                                              │
│  ┌─────┐  ┌─────┐  ┌─────┐                 │
│  │ 4.9 │  │ 124 │  │ 150 │                 │
│  └─────┘  └─────┘  └─────┘                 │
│                                              │
│  [Manage Profile] [View Public] [Analytics] │
└─────────────────────────────────────────────┘
```

With teal border color (#02542D).
