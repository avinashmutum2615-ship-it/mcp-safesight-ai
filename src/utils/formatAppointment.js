export function formatAppointment(appointment, action = "updated") {
    if (!appointment) {
        return "Appointment information is unavailable.";
    }

    const doctorName =
        appointment.doctor?.name ?? "N/A";

    const specialization =
        appointment.doctor?.specialization ?? "N/A";

    return `✅ Appointment ${action} successfully

👤 Patient
${appointment.patient?.name}

🩺 Doctor
${doctorName}

🏥 Specialization
${specialization}

📅 Date
${appointment.appointmentDate}

🕒 Time
${appointment.appointmentTime}

📌 Status
${appointment.status}`;
}