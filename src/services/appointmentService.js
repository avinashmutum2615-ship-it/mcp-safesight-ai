import { apiClient } from "../api/apiClient.js";
import { ENDPOINTS } from "../api/endpoints.js";
import { HTTP_METHOD } from "../config/constants.js";

export async function getAvailableSlots(doctorId, date) {
    return await apiClient({
        endpoint: `${ENDPOINTS.GET_AVAILABLE_SLOTS}?doctorId=${doctorId}&date=${date}`,
    });
}

export async function bookAppointment(data) {


    return await apiClient({
        endpoint: ENDPOINTS.BOOK_APPOINTMENT,
        method: HTTP_METHOD.POST,
        body: data,
    });
}

export async function rescheduleAppointment(data) {

    return await apiClient({

        endpoint: ENDPOINTS.RESCHEDULE_APPOINTMENT,

        method: "PATCH",

        body: data,

    });

}

export async function cancelAppointment(data) {

    return await apiClient({

        endpoint: ENDPOINTS.CANCEL_APPOINTMENT,

        method: "PATCH",

        body: data,

    });

}