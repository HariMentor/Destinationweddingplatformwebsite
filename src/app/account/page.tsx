import type { Metadata } from 'next';
import { AccountPageClient } from './AccountPageClient';

export const metadata: Metadata = {
  title: 'My Account - Wedding Dashboard | Wedzway',
  description: 'Manage your destination wedding planning dashboard. View bookings, saved vendors, favorites, wishlist, gift registry, and wedding details.',
  keywords: ['wedding account', 'wedding dashboard', 'bookings', 'saved vendors', 'wedding planning'],
  openGraph: {
    title: 'My Account | Wedzway',
    description: 'Manage your destination wedding planning dashboard.',
    type: 'website',
  },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
