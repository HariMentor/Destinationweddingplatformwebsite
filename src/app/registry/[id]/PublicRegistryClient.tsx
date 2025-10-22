'use client';

import { PublicGiftRegistryPage } from '@/components/PublicGiftRegistryPage';

export function PublicRegistryClient({ registryId }: { registryId: string }) {
  return <PublicGiftRegistryPage registryId={registryId} />;
}
