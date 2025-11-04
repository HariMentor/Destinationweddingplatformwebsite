import type { Metadata } from 'next';
import { emailTemplatesMetadata } from '@/lib/metadata';
import { EmailTemplatesPageClient } from './EmailTemplatesPageClient';

export const metadata: Metadata = emailTemplatesMetadata;

export default function EmailTemplatesPage() {
  return <EmailTemplatesPageClient />;
}
