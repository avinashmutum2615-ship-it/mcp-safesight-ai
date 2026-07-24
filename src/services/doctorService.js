import { apiClient } from "../api/apiClient.js";
import { ENDPOINTS } from "../api/endpoints.js";

export async function listDoctors() {
    return await apiClient({
        endpoint: ENDPOINTS.LIST_DOCTORS,
    });
}

export async function searchDoctors(keyword) {
    return await apiClient({
        endpoint: `${ENDPOINTS.SEARCH_DOCTORS}?keyword=${encodeURIComponent(keyword)}`,
    });
}