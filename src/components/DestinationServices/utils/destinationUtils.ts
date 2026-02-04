import { Venue } from "../services/venueService";

interface DestinationStats {
    venueCount: number;
    averageCost: string;
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
            averageCost: "N/A",
        };
    }

    // Calculate minimum cost (cheapest package)
    let minCost = Infinity;
    let hasPackages = false;

    destinationVenues.forEach((venue) => {
        const packages = venue.version?.data?.step3?.packages;
        if (packages && packages.length > 0) {
            packages.forEach((pkg) => {
                if (pkg.packagePrice && pkg.packagePrice.amount) {
                    if (pkg.packagePrice.amount < minCost) {
                        minCost = pkg.packagePrice.amount;
                        hasPackages = true;
                    }
                }
            });
        }
    });

    let averageCostString = "N/A";
    if (hasPackages) {
        // Format to currency (e.g., ₹XX,XXX)
        averageCostString = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(minCost);
    }

    return {
        venueCount,
        averageCost: averageCostString,
    };
}
