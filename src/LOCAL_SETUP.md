# Wedzway Local Development Setup

## Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager

## Installation Steps

1. **Clone the repository** (if not already done)

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Enter the access code**
   When prompted, enter the password: `wedzway2025`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Blank Page Issue
If you see a blank page:
1. Check the browser console for errors (F12 > Console tab)
2. Make sure all dependencies are installed: `npm install`
3. Clear the Next.js cache: `rm -rf .next` then `npm run dev`
4. Check that port 3000 is not in use by another application

### Module Not Found Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

### TypeScript Errors
- Run `npm run build` to see all TypeScript errors
- Most errors can be ignored during development

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page (/)
│   └── [pages]/           # Other routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── [features]/       # Feature components
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS
├── lib/                  # Utilities
└── public/              # Static assets
```

## Access Code

Default access code: **wedzway2025**

The access code is stored in `/components/AccessGate.tsx` and can be changed by modifying the `ACCESS_CODE` constant.

## Environment

This project uses:
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- Shadcn UI components

## Support

For issues or questions, contact: hello@wedzway.co
