export function VenueDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      <div className="container mx-auto px-4 md:px-8 py-6 animate-pulse">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-10 bg-muted rounded w-40" />
          <div className="flex gap-2">
            <div className="h-10 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-10" />
            <div className="h-10 bg-muted rounded w-10" />
          </div>
        </div>

        {/* Hero Image Skeleton */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl bg-muted mb-8" />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Tags */}
            <div className="flex gap-3">
              <div className="h-6 bg-muted rounded-full w-32" />
              <div className="h-6 bg-muted rounded-full w-28" />
            </div>

            {/* Title and Rating */}
            <div className="space-y-3">
              <div className="h-10 bg-muted rounded w-3/4" />
              <div className="flex gap-4">
                <div className="h-6 bg-muted rounded w-24" />
                <div className="h-6 bg-muted rounded w-32" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/5" />
            </div>

            {/* Why Couples Love Section */}
            <div className="space-y-4 mt-8">
              <div className="h-6 bg-muted rounded w-48" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="size-12 bg-muted rounded-full" />
                    <div className="h-4 bg-muted rounded w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Areas */}
            <div className="space-y-4 mt-8">
              <div className="h-6 bg-muted rounded w-40" />
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-xl p-6 space-y-3">
                    <div className="h-6 bg-muted rounded w-48" />
                    <div className="flex gap-8">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-16" />
                        <div className="h-6 bg-muted rounded w-20" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-16" />
                        <div className="h-6 bg-muted rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-4 mt-8">
              <div className="h-6 bg-muted rounded w-32" />
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg" />
                ))}
              </div>
            </div>

            {/* Packages Section */}
            <div className="space-y-4 mt-8">
              <div className="h-8 bg-muted rounded w-56" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-xl overflow-hidden">
                    {/* Package Header */}
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="h-6 bg-muted rounded w-48" />
                          <div className="h-4 bg-muted rounded w-64" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-8 bg-muted rounded w-24" />
                          <div className="h-4 bg-muted rounded w-20" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-muted rounded-full w-24" />
                        <div className="h-6 bg-muted rounded-full w-28" />
                      </div>
                    </div>
                    
                    {/* Package Image */}
                    <div className="h-48 bg-muted" />
                    
                    {/* Package Footer */}
                    <div className="p-6 flex gap-3">
                      <div className="h-10 bg-muted rounded flex-1" />
                      <div className="h-10 bg-muted rounded w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="border rounded-xl p-6 space-y-4">
                <div className="h-6 bg-muted rounded w-48" />
                <div className="space-y-3">
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-12 bg-muted rounded w-full" />
                </div>
              </div>

              {/* Pricing Card */}
              <div className="border rounded-xl p-6 space-y-4">
                <div className="h-6 bg-muted rounded w-32" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-32" />
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
