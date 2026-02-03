// Types for Destination API response and a single Destination

export interface ApiDestinationsResponse {
  totalPages: number | null;
  currentPage: number | null;
  itemsPerPage: number | null;
  totalItems: number;
  destinations: Destination[];
}

export interface Destination {
  weather: any | null;
  _id: string;
  name: string;
  description: string | null;
  country: Country | null;
  createdBy?: string | null;
  status?: string | null;
  interest?: string[];
  updatedAt?: string | null;
  isFeatured?: boolean;
  step?: number | null;
  location?: LocationItem[];
  thingsToDo?: any[];
  destinationBooking?: any[];
  coverPhotosWeb?: MediaFile[];
  coverPhotosMobile?: MediaFile[];
  createdAt?: string | null;
  __v?: number;
}

export interface Country {
  _id: string;
  countryCode: string;
  countryName: string;
  status?: string;
  region?: string;
  destinations?: string[];
  pendingUpdate?: any | null;
  approvers?: string[];
  createdBy?: string;
  editedBy?: string | null;
  __v?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface LocationItem {
  location: LatLng;
  placeId?: string | null;
  displayName?: string | null;
  formattedAddress?: string | null;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MediaFile {
  fileUrl: string;
  fileKey?: string | null;
  _id?: string;
}

export type DestinationId = string;
