import apiClient from "./httpClient";

export interface Venue {
  _id: string;
  name: string;
  country: string;
  destination: string;
  status: string;
  slug: string;
  isFeatured: boolean;
  isVerified: boolean;
  version?: {
    data?: {
      step1?: {
        venueType?: string;
        email?: string;
        phone?: string;
        address?: string;
        website?: string;
        overview?: string;
        location?: {
          placeId?: string;
          displayName?: string;
          formattedAddress?: string;
          lat?: number;
          lng?: number;
        };
        coverPhotosWeb?: Array<{ fileUrl: string; fileKey?: string }>;
        coverPhotosMobile?: Array<{ fileUrl: string; fileKey?: string }>;
        interests?: string[];
      };
      step2?: {
        dynamicServicesData?: Record<string, any>;
      };
      step3?: {
        packages?: Array<{
          packageName?: string;
          packagePrice?: {
            amount: number;
            currency: string;
          };
          totalPax?: number;
          numberOfDays?: number;
          roomTypes?: Array<{ type: string; roomCount: number }>;
          venueArea?: string[];
          includedServices?: string[];
          packagePhotos?: Array<{ fileUrl: string }>;
        }>;
      };
      step4?: {
        rulesPolicies?: Record<string, any>;
      };
    };
  };
}

export async function getVenues(filters: { countryId?: string; destinationId?: string; status?: string } = { status: "published" }): Promise<Venue[]> {

  try {
    const params = { status: "published", ...filters };

    const res = await apiClient.get("/destination/venues", { params });

    return res?.data?.data;
  } catch (e) {
    console.error("getVenues failed:", e);
    throw e;
  }
}

export async function getVenueById(venueId: string): Promise<Venue | undefined> {
  try {
    const res = await apiClient.get(`/destination/venues`, { params: { venueId, status: "published" } });

    // The API response structure is { code, message, data: { venue: {...}, version: {...} } }
    if (res.data?.data?.venue) {
      return {
        ...res.data.data.venue,
        version: res.data.data.version
      };
    }

    // Fallback: The API might return the venue directly or inside different structure
    return res.data?.data?.[0] || res.data?.data || res.data;
  } catch (e) {
    console.error(`getVenueById failed for id=${venueId}:`, e);
    throw e;
  }
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  try {
    // Assuming backend supports 'slug' query param. If not, we might need to use getVenues and filter, or ask backend dev.
    // Based on user request, slug usage is expected.
    const res = await apiClient.get(`/destination/venues`, { params: { slug, status: "published" } });

    if (res.data?.data?.venue) {
      return {
        ...res.data.data.venue,
        version: res.data.data.version
      };
    }

    return res.data?.data?.[0] || res.data?.data || res.data;
  } catch (e) {
    console.error(`getVenueBySlug failed for slug=${slug}:`, e);
    throw e;
  }
}
