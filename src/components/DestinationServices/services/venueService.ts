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
        }>;
      };
    };
  };
}

export async function getVenues(filters: { country?: string; status?: string } = { status: "published" }): Promise<Venue[]> {

  try {
    const params = { status: "published", ...filters };
    console.log(params, "params")
    const res = await apiClient.get("/destination/venues", { params });

    return res?.data?.data;
  } catch (e) {
    console.error("getVenues failed:", e);
    throw e;
  }
}

export async function getVenueById(id: number): Promise<Venue | undefined> {
  try {
    const res = await apiClient.get(`/destination/venues`, { params: { id, status: "published" } });
    return res.data;
  } catch (e) {
    console.error(`getVenueById failed for id=${id}:`, e);
    throw e;
  }
}
