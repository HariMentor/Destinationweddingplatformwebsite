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

export async function getDestinationById(id: number): Promise<Destination | undefined> {
    try {
        const res = await apiClient.get("/destination/destinations", { params: { id } });
        return res.data as Destination;
    } catch (e) {
        console.error(`getDestinationById failed for id=${id}:`, e);
        throw e;
    }
}
