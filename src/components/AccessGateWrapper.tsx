'use client';

import { AccessGate } from './AccessGate';

export function AccessGateWrapper({ children }: { children: React.ReactNode }) {
  return <AccessGate>{children}</AccessGate>;
}
