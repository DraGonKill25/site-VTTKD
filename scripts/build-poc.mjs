import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, extname, join } from "node:path";

const root = process.cwd();
const astroCli = join(root, "node_modules", "astro", "bin", "astro.mjs");
const site = process.env.POC_SITE_URL ?? "https://example.invalid";
const rawBase = process.env.POC_BASE_PATH ?? "/site-VTTKD/";
const base =
  rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

new URL(site);

const result = spawnSync(process.execPath, [astroCli, "build"], {
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
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const dist = join(root, "dist");
const assets = join(dist, "_astro");
rmSync(join(dist, "admin"), { recursive: true, force: true });
rmSync(join(dist, "documents"), { recursive: true, force: true });

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const assetFiles = walk(assets);
const assetByName = new Map(assetFiles.map((file) => [basename(file), file]));
const retainedAssets = new Set();
const pendingAssets = [];

function retainAsset(name) {
  if (!assetByName.has(name) || retainedAssets.has(name)) return;
  retainedAssets.add(name);
  pendingAssets.push(name);
}

for (const htmlFile of walk(dist).filter((file) => extname(file) === ".html")) {
  const html = readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(/(?:src|href)="[^"]*\/_astro\/([^"?#]+)"/g)) {
    retainAsset(match[1]);
  }
}

while (pendingAssets.length) {
  const name = pendingAssets.pop();
  const file = name ? assetByName.get(name) : undefined;
  if (!file || ![".css", ".js", ".mjs"].includes(extname(file))) continue;
  const content = readFileSync(file, "utf8");
  for (const candidate of assetByName.keys()) {
    if (content.includes(candidate)) retainAsset(candidate);
  }
}

for (const [name, file] of assetByName) {
  if (!retainedAssets.has(name)) rmSync(file, { force: true });
}

console.log(
  `POC artifact prepared for ${site}${base}; admin, documents and ${assetFiles.length - retainedAssets.size} orphan asset(s) removed.`,
);
