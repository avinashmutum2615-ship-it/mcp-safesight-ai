import { apiClient } from "../api/apiClient.js";
import { ENDPOINTS } from "../api/endpoints.js";
import { HTTP_METHOD } from "../config/constants.js";

export async function publicChat(message, threadId) {
    return apiClient({
        endpoint: ENDPOINTS.PUBLIC_CHAT,
        method: HTTP_METHOD.POST,
        body: {
            message,
            threadId,
        },
    });
}