"use client";

import { useRouter } from 'next/navigation';
import { EmailTemplatesPage } from '../../components/EmailTemplatesPage';

export function EmailTemplatesPageClient() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return <EmailTemplatesPage onBack={handleBack} />;
}
