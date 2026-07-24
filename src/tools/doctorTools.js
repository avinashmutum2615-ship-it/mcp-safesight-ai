import { z } from "zod";
import { successResponse } from "../utils/successResponse.js";
import { errorResponse } from "../utils/errorResponse.js";
import { formatDoctors } from "../utils/formatDoctors.js";
import {
    listDoctors,
    searchDoctors,
} from "../services/doctorService.js";

export function registerDoctorTools(server) {

    server.registerTool(
        "list_doctors",
        {
            title: "List Doctors",
            description: "Returns all available doctors in the clinic.",
            inputSchema: {},
        },
        async () => {
            try {
                const response = await listDoctors();

                return successResponse(
                    formatDoctors(response.doctors)
                );

            } catch (error) {
                return errorResponse(error);
            }
        }
    );

    server.registerTool(
        "search_doctors",
        {
            title: "Search Doctors",
            description: "Search doctors by name or specialization.",
            inputSchema: {
                keyword: z.string().describe("Doctor name or specialization"),
            },
        },
        async ({ keyword }) => {
            try {
                const response = await searchDoctors(keyword);

                return successResponse(
                    formatDoctors(response.doctors)
                );

            } catch (error) {
                return errorResponse(error);
            }
        }
    );
}