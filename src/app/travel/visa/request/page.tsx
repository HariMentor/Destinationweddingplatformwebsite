import type { Metadata } from 'next';
import { VisaRequestClient } from './VisaRequestClient';

export const metadata: Metadata = {
  title: 'Visa Request Form - Travel Services | Wedzway',
  description: 'Request visa assistance for your destination wedding. Submit your visa application and get expert support for processing.',
  keywords: ['visa request', 'visa application', 'destination wedding visa', 'travel visa'],
  openGraph: {
    title: 'Visa Request Form | Wedzway',
    description: 'Request visa assistance for your destination wedding.',
    type: 'website',
  },
};

export default function VisaRequestPage() {
  return <VisaRequestClient />;
}
