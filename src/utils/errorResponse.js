export function errorResponse(error) {
    return {
        isError: true,
        content: [
            {
                type: "text",
                text:
                    error?.message ||
                    "Something went wrong.",
            },
        ],
    };
}