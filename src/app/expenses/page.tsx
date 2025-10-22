import type { Metadata } from 'next';
import { ExpensesPageClient } from './ExpensesPageClient';

export const metadata: Metadata = {
  title: 'Wedding Expense Tracker - Budget Management | Wedzway',
  description: 'Track your destination wedding expenses and stay on budget. Monitor vendor payments, deposits, and overall wedding costs in real-time.',
  keywords: ['wedding budget', 'expense tracker', 'wedding costs', 'budget management', 'wedding planning'],
  openGraph: {
    title: 'Wedding Expense Tracker | Wedzway',
    description: 'Track your destination wedding expenses and stay on budget.',
    type: 'website',
  },
};

export default function ExpensesPage() {
  return <ExpensesPageClient />;
}
