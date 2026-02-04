import apiClient from "./httpClient";

export interface InitiateEnquiryPayload {
    venueId: string;
    dateRange: {
        start: string;
        end: string;
    };
    peopleCount: number;
    package: string;
    isFlexible: boolean;
    message: string;
    name: string;
    phone: string;
    eventType: string;
    budget: number;
}

export interface SubmitEnquiryPayload extends InitiateEnquiryPayload {
    otp: string;
    enquiryType: "concierge" | "venue";
    email?: string; // Optional in init example, present in submit form usually
}

export const initiateEnquiry = async (data: InitiateEnquiryPayload) => {
    const response = await apiClient.post("/destination/venues/initiate", data);
    return response.data;
};

export const submitEnquiry = async (data: SubmitEnquiryPayload) => {
    const response = await apiClient.post("/destination/venues/verify-otp", data);
    return response.data;
};
