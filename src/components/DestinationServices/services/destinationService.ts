import apiClient from "./httpClient";

import { ApiDestinationsResponse, Destination } from "../types/destination";

export async function getDestinations(): Promise<ApiDestinationsResponse> {
    try {
        const res = await apiClient.get("/destination", { params: { status: true } });
        return res.data as ApiDestinationsResponse;
    } catch (e) {   
        console.error("getDestinations failed:", e);
        throw e;
    }
}

export async function getDestinationById(destinationId: string): Promise<Destination | undefined> {
    try {
        const res = await apiClient.get("/destination", { params: { destinationId } });
        return res.data.destinations[0] as Destination;
    } catch (e) {
        console.error(`getDestinationById failed for id=${destinationId}:`, e);
        throw e;
    }
}
