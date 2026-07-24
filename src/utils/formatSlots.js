export function formatSlots(slotResponse, doctorName, date) {
    const slots = slotResponse.availableSlots ?? [];

    if (slots.length === 0) {
        return `No appointment slots are available for ${doctorName} on ${date}.`;
    }

    return `📅 Available Appointment Slots

🩺 Doctor
${doctorName}

📅 Date
${date}

🕒 Available Slots

${slots.map(slot => `• ${slot}`).join("\n")}`;
}