"use client";

import { usePackageCompare } from "./PackageCompareContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  X,
  Check,
  Calendar,
  Users,
  Sparkles,
  Trash2,
  MapPin,
  Building2,
} from "lucide-react";
import Link from "next/link";
// import { useCurrency } from "./CurrencyContext";

interface PackageComparePageProps {
  onBack?: () => void;
  onViewVenue?: (venueId: number) => void;
}

export function PackageComparePage({ onBack, onViewVenue }: PackageComparePageProps = {}) {
  const { comparePackages, removeFromCompare, clearCompare } = usePackageCompare();
  // const { formatPrice } = useCurrency();

  if (comparePackages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            {onBack ? (
              <Button onClick={onBack} variant="outline" className="gap-2 mb-4">
                <ArrowLeft className="size-4" />
                Back to Venues
              </Button>
            ) : (
              <Link href="/venues">
                <Button variant="outline" className="gap-2 mb-4">
                  <ArrowLeft className="size-4" />
                  Back to Venues
                </Button>
              </Link>
            )}
            <h1
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Compare Wedding Packages
            </h1>
          </div>

          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2">No Packages to Compare</h2>
              <p className="text-muted-foreground mb-6">
                Start adding wedding packages from venue pages to compare them side by side.
              </p>
              {onBack ? (
                <Button onClick={onBack} className="bg-[#DF6951] hover:bg-[#DF6951]/90">
                  Back to Venues
                </Button>
              ) : (
                <Link href="/venues">
                  <Button className="bg-[#DF6951] hover:bg-[#DF6951]/90">
                    Browse Venues
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          {onBack ? (
            <Button onClick={onBack} variant="outline" className="gap-2 mb-4">
              <ArrowLeft className="size-4" />
              Back to Venues
            </Button>
          ) : (
            <Link href="/venues">
              <Button variant="outline" className="gap-2 mb-4">
                <ArrowLeft className="size-4" />
                Back to Venues
              </Button>
            </Link>
          )}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-4xl md:text-5xl mb-2"
                style={{ fontFamily: "Volkhov, serif" }}
              >
                Compare Wedding Packages
              </h1>
              <p className="text-muted-foreground">
                Comparing {comparePackages.length} package
                {comparePackages.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearCompare}
              className="gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              <Trash2 className="size-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row - Images */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="h-56" />
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="relative overflow-hidden group">
                  <button
                    onClick={() => removeFromCompare(pkg.id)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from compare"
                  >
                    <X className="size-4 text-red-600" />
                  </button>
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.packageName}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant="secondary"
                      className={`${
                        pkg.decorStyle === "Silver"
                          ? "bg-gray-100/95 text-gray-900 border border-gray-300"
                          : pkg.decorStyle === "Gold"
                          ? "bg-amber-100/95 text-amber-900 border border-amber-300"
                          : "bg-purple-100/95 text-purple-900 border border-purple-300"
                      } backdrop-blur-sm`}
                    >
                      {pkg.decorStyle}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Package Name & Venue */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                <Building2 className="size-4 mr-2 text-[#02542D]" />
                Package & Venue
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <h3 className="mb-1">
                    {pkg.packageName} Package
                  </h3>
                  <Link href={`/venues/${pkg.venueId}`}>
                    <p className="text-sm text-muted-foreground hover:text-[#DF6951] transition-colors cursor-pointer flex items-center gap-1">
                      <MapPin className="size-3" />
                      {pkg.venueName}
                    </p>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Price */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                <Sparkles className="size-4 mr-2 text-[#DF6951]" />
                Price
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <p 
                    className="text-2xl"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {/* {formatPrice(pkg.price)} */}
                  </p>
                  <p className="text-sm text-muted-foreground">per event</p>
                </Card>
              ))}
            </div>

            {/* Duration */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                <Calendar className="size-4 mr-2 text-[#02542D]" />
                Duration
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <p className="font-medium">{pkg.duration}</p>
                </Card>
              ))}
            </div>

            {/* Guest Capacity */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                <Users className="size-4 mr-2 text-[#02542D]" />
                Guest Capacity
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <p className="font-medium">{pkg.guestCount}</p>
                </Card>
              ))}
            </div>

            {/* Package Highlights */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                Package Details
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <div className="space-y-2">
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="size-4 text-[#02542D] mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Inclusions */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div className="font-medium flex items-center h-full">
                What's Included
              </div>
              {comparePackages.map((pkg) => (
                <Card key={pkg.id} className="p-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {pkg.inclusions.map((inclusion, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{inclusion}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Venue Type */}
            {comparePackages.some(pkg => pkg.venueType) && (
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
                <div className="font-medium flex items-center h-full">
                  Venue Type
                </div>
                {comparePackages.map((pkg) => (
                  <Card key={pkg.id} className="p-4">
                    <p className="text-sm">{pkg.venueType || '-'}</p>
                  </Card>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `220px repeat(${comparePackages.length}, 1fr)` }}>
              <div />
              {comparePackages.map((pkg) => (
                <div key={pkg.id} className="space-y-2">
                  <Link href={`/venues/${pkg.venueId}`}>
                    <Button className="w-full bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90">
                      View Venue Details
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={() => removeFromCompare(pkg.id)}
                    className="w-full gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    <X className="size-4" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <Sparkles className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-1">
                Need Help Deciding?
              </p>
              <p className="text-sm text-blue-800">
                Our wedding concierge team can help you choose the perfect package for your special day. 
                Contact us for personalized recommendations and exclusive offers.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
