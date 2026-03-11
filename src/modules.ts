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

export type ToolDef = {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
  annotations?: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
  };
  execute: (input: unknown) => Promise<unknown>;
};

interface ModuleDef {
  key: string;
  envVar: string;
  cliArg: string;
  tools: ToolDef[];
}

const MODULES: ModuleDef[] = [
  {
    key: "employees",
    envVar: "USE_EMPLOYEES",
    cliArg: "use-employees",
    tools: employeeTools as ToolDef[],
  },
  {
    key: "time-off",
    envVar: "USE_TIME_OFF",
    cliArg: "use-time-off",
    tools: timeOffTools as ToolDef[],
  },
  {
    key: "time-tracking",
    envVar: "USE_TIME_TRACKING",
    cliArg: "use-time-tracking",
    tools: timeTrackingTools as ToolDef[],
  },
  {
    key: "ats",
    envVar: "USE_ATS",
    cliArg: "use-ats",
    tools: atsTools as ToolDef[],
  },
  {
    key: "benefits",
    envVar: "USE_BENEFITS",
    cliArg: "use-benefits",
    tools: benefitsTools as ToolDef[],
  },
  {
    key: "reports",
    envVar: "USE_REPORTS",
    cliArg: "use-reports",
    tools: reportsTools as ToolDef[],
  },
  {
    key: "training",
    envVar: "USE_TRAINING",
    cliArg: "use-training",
    tools: trainingTools as ToolDef[],
  },
  {
    key: "goals",
    envVar: "USE_GOALS",
    cliArg: "use-goals",
    tools: goalsTools as ToolDef[],
  },
  {
    key: "webhooks",
    envVar: "USE_WEBHOOKS",
    cliArg: "use-webhooks",
    tools: webhooksTools as ToolDef[],
  },
  {
    key: "files",
    envVar: "USE_FILES",
    cliArg: "use-files",
    tools: filesTools as ToolDef[],
  },
  {
    key: "account",
    envVar: "USE_ACCOUNT",
    cliArg: "use-account",
    tools: accountTools as ToolDef[],
  },
];

function parseCLIArgs(): Map<string, string> {
  const args = new Map<string, string>();
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([a-z-]+)(?:=(.+))?$/);
    if (match) {
      args.set(match[1], match[2] ?? "true");
    }
  }
  return args;
}

function resolveFlag(
  envVar: string,
  cliArg: string,
  cliArgs: Map<string, string>,
  defaultValue: boolean,
): boolean {
  const cliVal = cliArgs.get(cliArg);
  if (cliVal !== undefined) return cliVal.toLowerCase() !== "false";
  const envVal = process.env[envVar];
  if (envVal !== undefined) return envVal.toLowerCase() !== "false";
  return defaultValue;
}

export function getEnabledTools(): {
  tools: ToolDef[];
  enabled: string[];
  disabled: string[];
  readonlyMode: boolean;
} {
  const cliArgs = parseCLIArgs();

  const enabled: string[] = [];
  const disabled: string[] = [];
  let tools: ToolDef[] = [];

  for (const mod of MODULES) {
    if (resolveFlag(mod.envVar, mod.cliArg, cliArgs, true)) {
      enabled.push(mod.key);
      tools.push(...mod.tools);
    } else {
      disabled.push(mod.key);
    }
  }

  const readonlyMode = resolveFlag("READONLY_MODE", "readonly", cliArgs, false);

  if (readonlyMode) {
    tools = tools.filter((t) => t.annotations?.readOnlyHint === true);
  }

  return { tools, enabled, disabled, readonlyMode };
}
