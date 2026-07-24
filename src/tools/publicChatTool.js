import { z } from "zod";
import { publicChat } from "../services/publicChatService.js";

export function registerPublicChatTool(server) {
    server.registerTool(
        "public_chat",
        {
            title: "Public Chat",
            description:
                "Chat with the SafeSight AI assistant for general clinic questions.",
            inputSchema: {
                message: z.string().describe("User's message"),
                threadId: z
                    .string()
                    .optional()
                    .describe("Conversation thread ID"),
            },
        },
        async ({ message, threadId }) => {
            const response = await publicChat(message, threadId);

            return {
                content: [
                    {
                        type: "text",
                        text: response.response,
                    },
                ],
            };
        }
    );
}