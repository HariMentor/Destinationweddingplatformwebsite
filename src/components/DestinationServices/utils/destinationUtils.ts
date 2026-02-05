import { Venue } from "../services/venueService";

interface DestinationStats {
    venueCount: number;
    startingPrice: { amount: number; currency: string } | null;
}

export function calculateDestinationStats(destinationId: string, venues: Venue[]): DestinationStats {
    // Filter venues for this destination
    const destinationVenues = venues.filter(
        (venue) => venue.destination === destinationId
    );

    const venueCount = destinationVenues.length;

    if (venueCount === 0) {
        return {
            venueCount: 0,
            startingPrice: null,
        };
    }

    // Calculate minimum cost (cheapest package)
    let minCost = Infinity;
    let currency = "INR"; // Default currency
    let hasPackages = false;

    destinationVenues.forEach((venue) => {
        const packages = venue.version?.data?.step3?.packages;
        if (packages && packages.length > 0) {
            packages.forEach((pkg) => {
                if (pkg.packagePrice && pkg.packagePrice.amount) {
                    if (pkg.packagePrice.amount < minCost) {
                        minCost = pkg.packagePrice.amount;
                        currency = pkg.packagePrice.currency || "INR";
                        hasPackages = true;
                    }
                }
            });
        }
    });

    return {
        venueCount,
        startingPrice: hasPackages ? { amount: minCost, currency } : null,
    };
}
