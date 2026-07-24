import dotenv from "dotenv";

dotenv.config();

export const env = {
    serverName: process.env.SERVER_NAME,
    serverVersion: process.env.SERVER_VERSION,
    backendBaseUrl: process.env.BACKEND_BASE_URL,
};