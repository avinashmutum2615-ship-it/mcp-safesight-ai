export function successResponse(message) {
    return {
        content: [
            {
                type: "text",
                text: message,
            },
        ],
    };
}