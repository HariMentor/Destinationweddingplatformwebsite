import type { Metadata } from 'next';
import { expensesMetadata } from '@/lib/metadata';
import { ExpensesPageClient } from './ExpensesPageClient';

export const metadata: Metadata = expensesMetadata;

export default function ExpensesPage() {
  return <ExpensesPageClient />;
}
