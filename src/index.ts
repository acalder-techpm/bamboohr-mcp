#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { employeeTools } from "./tools/employees.js";
import { timeOffTools } from "./tools/time-off.js";
import { timeTrackingTools } from "./tools/time-tracking.js";
import { atsTools } from "./tools/ats.js";
import { benefitsTools } from "./tools/benefits.js";
import { reportsTools } from "./tools/reports.js";
import { trainingTools } from "./tools/training.js";
import { goalsTools } from "./tools/goals.js";
import { webhooksTools } from "./tools/webhooks.js";
import { filesTools } from "./tools/files.js";
import { accountTools } from "./tools/account.js";

// ─── Validate env vars on startup ────────────────────────────────────────────
if (!process.env.BAMBOOHR_API_KEY) {
  process.stderr.write(
    "ERROR: BAMBOOHR_API_KEY environment variable is required.\n" +
      "Get your API key at: https://yourcompany.bamboohr.com/settings/api.php\n"
  );
  process.exit(1);
}
if (!process.env.BAMBOOHR_SUBDOMAIN) {
  process.stderr.write(
    "ERROR: BAMBOOHR_SUBDOMAIN environment variable is required.\n" +
      "This is the subdomain of your BambooHR URL (e.g. 'acme' from acme.bamboohr.com).\n"
  );
  process.exit(1);
}

// ─── Merge all tools ─────────────────────────────────────────────────────────
type ToolDef = {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (input: unknown) => Promise<unknown>;
};

const allTools: ToolDef[] = [
  ...employeeTools,
  ...timeOffTools,
  ...timeTrackingTools,
  ...atsTools,
  ...benefitsTools,
  ...reportsTools,
  ...trainingTools,
  ...goalsTools,
  ...webhooksTools,
  ...filesTools,
  ...accountTools,
] as ToolDef[];

const toolMap = new Map<string, ToolDef>(allTools.map((t) => [t.name, t]));

// ─── Server setup ─────────────────────────────────────────────────────────────
const server = new Server(
  {
    name: "bamboohr-mcp",
    version: "0.1.0",
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: allTools.map(({ name, description, inputSchema }) => ({
    name,
    description,
    inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const tool = toolMap.get(name);

  if (!tool) {
    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }

  try {
    const result = await tool.execute(args ?? {});
    return {
      content: [
        {
          type: "text",
          text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `BambooHR API error: ${message}` }],
      isError: true,
    };
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write(
    `bamboohr-mcp running | subdomain: ${process.env.BAMBOOHR_SUBDOMAIN} | ${allTools.length} tools loaded\n`
  );
}

main().catch((err) => {
  process.stderr.write(`Fatal error: ${err}\n`);
  process.exit(1);
});
