// import type { Metadata } from 'next';
// import { vendorsMetadata } from '@/lib/metadata';
// import { VendorsPageClient } from './VendorsPageClient';

// export const metadata: Metadata = vendorsMetadata;

// export default function VendorsPage() {
//   return <VendorsPageClient />;
// }

// app/vendors/page.tsx
import type { Metadata } from "next";
import { vendorsMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { VendorsPageClient } from "./VendorsPageClient";

export const metadata: Metadata = vendorsMetadata;

export default function VendorsPage() {
  return (
    <Suspense
      fallback={
        <div className="size-full">
          <div className="animate-pulse">
            {/* Add a loading skeleton here */}
            <div className="h-16 bg-gray-100" />
            <div className="container mx-auto px-4 py-8">
              <div className="h-96 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      }
    >
      <VendorsPageClient />
    </Suspense>
  );
}
