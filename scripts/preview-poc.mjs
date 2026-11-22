import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const astroCli = join(root, "node_modules", "astro", "bin", "astro.mjs");
const site = process.env.POC_SITE_URL ?? "https://example.invalid";
const rawBase = process.env.POC_BASE_PATH ?? "/site-VTTKD/";
const base =
  rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

const result = spawnSync(
  process.execPath,
  [astroCli, "preview", ...process.argv.slice(2)],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      POC_BUILD: "true",
      POC_SITE_URL: site,
      POC_BASE_PATH: base,
      PUBLIC_POC_MODE: "true",
      PUBLIC_ALLOW_INDEXING: "false",
    },
  },
);

process.exit(result.status ?? 1);
