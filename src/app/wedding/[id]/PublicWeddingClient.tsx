'use client';

import { PublicWeddingPage } from '@/components/PublicWeddingPage';

export function PublicWeddingClient({ weddingId }: { weddingId: string }) {
  return <PublicWeddingPage weddingId={weddingId} />;
}
