import { z } from "zod";
import { searchDoctors } from "../services/doctorService.js";
import { errorResponse } from "../utils/errorResponse.js";
import { formatAppointment } from "../utils/formatAppointment.js";
import {
    getAvailableSlots,
    bookAppointment,
    rescheduleAppointment,
    cancelAppointment,
} from "../services/appointmentService.js";

export function registerAppointmentTools(server) {

    server.registerTool(
        "get_available_slots",
        {
            title: "Get Available Slots",
            description: "Find available appointment slots for a doctor on a specific date.",
            inputSchema: {
                doctorName: z
                    .string()
                    .describe("Doctor's name"),

                date: z
                    .string()
                    .describe("Appointment date (YYYY-MM-DD)"),
            },
        },
        async ({ doctorName, date }) => {

            try {

                const doctorResponse = await searchDoctors(
                    doctorName
                );

                const doctors = doctorResponse.doctors;

                if (!doctors || doctors.length === 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `No doctor found with the name "${doctorName}".`,
                            },
                        ],
                    };
                }

                if (doctors.length > 1) {

                    const list = doctors
                        .map(
                            (doctor, index) =>
                                `${index + 1}. ${doctor.name} (${doctor.specialization})`
                        )
                        .join("\n");

                    return {
                        content: [
                            {
                                type: "text",
                                text:
                                    `Multiple doctors found:\n\n${list}\n\nPlease specify the doctor's full name.`,
                            },
                        ],
                    };

                }

                const doctor = doctors[0];

                const slotResponse = await getAvailableSlots(
                    doctor.id,
                    date
                );

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(slotResponse, null, 2),
                        },
                    ],
                };

            } catch (error) {

               return errorResponse(error);

            }

        }
    );

    server.registerTool(
        "book_appointment",
        {
            title: "Book Appointment",

            description:
                "Book an appointment for a patient. If the patient does not exist, a new patient record will be created automatically.",

            inputSchema: {

                name: z
                    .string()
                    .describe("Patient's full name"),

                phone: z
                    .string()
                    .describe("Patient's phone number"),

                gender: z
                    .enum(["Male", "Female", "Other"])
                    .describe("Patient's gender"),

                dateOfBirth: z
                    .string()
                    .describe("Patient's date of birth (YYYY-MM-DD)"),

                doctorName: z
                    .string()
                    .describe("Doctor's name"),

                appointmentDate: z
                    .string()
                    .describe("Appointment date (YYYY-MM-DD)"),

                appointmentTime: z
                    .string()
                    .describe("Appointment time (HH:mm)"),

                reason: z
                    .string()
                    .optional()
                    .describe("Reason for the visit"),

                email: z
                    .string()
                    .optional()
                    .describe("Patient's email"),

                address: z
                    .string()
                    .optional()
                    .describe("Patient's address"),

                bloodGroup: z
                    .string()
                    .optional()
                    .describe("Blood group"),

                emergencyContact: z
                    .string()
                    .optional()
                    .describe("Emergency contact number"),
            },
        },

        async ({
            name,
            phone,
            gender,
            dateOfBirth,
            doctorName,
            appointmentDate,
            appointmentTime,
            reason,
            email,
            address,
            bloodGroup,
            emergencyContact,
        }) => {
            try {

                // Search doctor
                const doctorResponse = await searchDoctors(
                    doctorName
                );

                const doctors = doctorResponse.doctors;

                if (!doctors || doctors.length === 0) {
                    throw new Error("Doctor not found.");
                }

                if (doctors.length > 1) {
                    throw new Error(
                        "Multiple doctors found. Please provide a more specific name."
                    );
                }

                const doctor = doctors[0];

                // Book appointment
                const response = await bookAppointment({

                    name,

                    phone,

                    gender,

                    dateOfBirth,

                    email,

                    address,

                    bloodGroup,

                    emergencyContact,

                    doctor: doctor.id,

                    appointmentDate,

                    appointmentTime,

                    reason,

                });

               const appointment = response.data;

                return successResponse(
                    formatAppointment(response.data, "booked")
                );
            } catch (error) {

                return errorResponse(error);

            }

        }

        
    );
    server.registerTool(
    "reschedule_appointment",
    {
        title: "Reschedule Appointment",
        description:
            "Reschedule an existing appointment using the patient's registered name and phone number.",
        inputSchema: {
            name: z.string().describe("Patient's full name"),

            phone: z.string().describe("Registered phone number"),

            appointmentDate: z
                .string()
                .describe("New appointment date (YYYY-MM-DD)"),

            appointmentTime: z
                .string()
                .describe("New appointment time (HH:mm)"),
        },
    },

    async ({
        name,
        phone,
        appointmentDate,
        appointmentTime,
    }) => {

        try {

            const response = await rescheduleAppointment({

                name,

                phone,

                appointmentDate,

                appointmentTime,

            });

            const appointment = response.data;

            return successResponse(
                formatAppointment(response.data, "rescheduled")
            );

        } catch (error) {

            return errorResponse(error);

        }

    }
);
server.registerTool(
    "cancel_appointment",
    {
        title: "Cancel Appointment",

        description:
            "Cancel an appointment using the patient's registered name and phone number.",

        inputSchema: {

            name: z
                .string()
                .describe("Patient's full name"),

            phone: z
                .string()
                .describe("Registered phone number"),

        },
    },

    async ({ name, phone }) => {

        try {

            const response = await cancelAppointment({
                name,
                phone,
            });

            const appointment = response.data;

            return successResponse(
                formatAppointment(response.data, "cancelled")
            );

        } catch (error) {

           return errorResponse(error);
        }

    }
);

}