export function formatDoctors(doctors) {
    if (!doctors || doctors.length === 0) {
        return "No doctors found.";
    }

    return doctors
        .map(
            (doctor, index) => `
${index + 1}. ${doctor.name}
• Specialization: ${doctor.specialization}
• Qualification: ${doctor.qualification}
• Consultation Fee: ₹${doctor.consultationFee}
• Available: ${doctor.available ? "Yes" : "No"}`
        )
        .join("\n\n");
}