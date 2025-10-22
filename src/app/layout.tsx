import type { Metadata } from 'next';
import { Volkhov, Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CurrencyProvider } from '@/components/CurrencyContext';
import '@/styles/globals.css';

const volkhov = Volkhov({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-volkhov',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wedzway - Destination Wedding Platform',
  description: 'Connect with verified wedding planners, venues, photographers, and all wedding service providers globally. Plan your dream destination wedding with Wedzway.',
  keywords: ['destination weddings', 'wedding planners', 'wedding venues', 'wedding services', 'India weddings', 'Udaipur', 'Jaipur', 'Goa', 'Kerala'],
  authors: [{ name: 'Wedzway' }],
  openGraph: {
    title: 'Wedzway - Destination Wedding Platform',
    description: 'Connect with verified wedding planners, venues, photographers, and all wedding service providers globally.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedzway - Destination Wedding Platform',
    description: 'Connect with verified wedding planners, venues, photographers, and all wedding service providers globally.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${volkhov.variable} ${poppins.variable}`}>
      <body>
        <CurrencyProvider>
          {children}
          <Toaster />
        </CurrencyProvider>
      </body>
    </html>
  );
}
