import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { env } from "./config/env.js";
import { registerTools } from "./tools/index.js";

const server = new McpServer({
    name: env.serverName,
    version: env.serverVersion,
});

registerTools(server);

const transport = new StdioServerTransport();

await server.connect(transport);