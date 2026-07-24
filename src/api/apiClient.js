import { env } from "../config/env.js";
import { HTTP_METHOD } from "../config/constants.js";

export async function apiClient({
    endpoint,
    method = HTTP_METHOD.GET,
    body = null,
    headers = {},
}) {
    const url = `${env.backendBaseUrl}${endpoint}`;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Backend request failed.");
    }

    return data;
}