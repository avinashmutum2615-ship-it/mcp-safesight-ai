import { registerPublicChatTool } from "./publicChatTool.js";
import { registerDoctorTools } from "./doctorTools.js";
import {registerAppointmentTools } from "./appointmentTools.js"

export function registerTools(server) {
    registerPublicChatTool(server);
    registerDoctorTools(server);
    registerAppointmentTools(server);
}