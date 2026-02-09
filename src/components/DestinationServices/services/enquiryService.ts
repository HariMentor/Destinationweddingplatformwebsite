import apiClient from "./httpClient";

export interface InitiateEnquiryPayload {
    venueId?: string; // Optional - not needed for "sorted" type
    dateRange?: { // Optional - can use eventDate instead
        start: string;
        end: string;
    };
    eventDate?: string; // New - single date for sorted enquiries
    peopleCount: number;
    package?: string; // Optional - not needed for sorted enquiries
    isFlexible?: boolean; // Optional
    message: string;
    name: string;
    phone: string;
    eventType: string;
    budget?: number; // Optional
}

export interface SubmitEnquiryPayload extends InitiateEnquiryPayload {
    otp: string;
    enquiryType: "concierge" | "venue" | "sorted";
    email?: string; // Optional
}

export const initiateEnquiry = async (data: InitiateEnquiryPayload) => {
    const response = await apiClient.post("/destination/venues/initiate", data);
    return response.data;
};

export const submitEnquiry = async (data: SubmitEnquiryPayload) => {
    const response = await apiClient.post("/destination/venues/verify-otp", data);
    return response.data;
};
