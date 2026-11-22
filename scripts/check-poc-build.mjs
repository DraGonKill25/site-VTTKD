import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const rawBase = process.env.POC_BASE_PATH ?? "/site-VTTKD/";
const base =
  rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;
const failures = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(dist)) {
  throw new Error("dist/ is missing. Run npm run build:poc first.");
}

if (existsSync(join(dist, "admin"))) {
  failures.push("dist/admin exists");
}

if (existsSync(join(dist, "CNAME"))) {
  failures.push("dist/CNAME must not exist");
}

const files = walk(dist);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const publicPages = htmlFiles.filter((file) => {
  const path = relative(dist, file).replaceAll("\\", "/");
  return path.startsWith("fr/") || path.startsWith("en/");
});

if (htmlFiles.length !== 49) {
  failures.push(`expected 49 HTML pages, found ${htmlFiles.length}`);
}

for (const file of htmlFiles) {
  const path = relative(dist, file).replaceAll("\\", "/");
  const html = readFileSync(file, "utf8");

  if (/href="[^"]*\/admin(?:\/|")/.test(html)) {
    failures.push(`${path}: contains an admin link`);
  }

  if (path.startsWith("fr/") || path.startsWith("en/")) {
    if (!html.includes('content="noindex,nofollow"')) {
      failures.push(`${path}: noindex,nofollow is missing`);
    }
    const expectedBanner = path.startsWith("fr/")
      ? "POC — Version de démonstration non officielle"
      : "POC — Unofficial demonstration version";
    if (!html.includes(expectedBanner)) {
      failures.push(`${path}: POC banner is missing`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (
      value.startsWith("/") &&
      base !== "/" &&
      !value.startsWith(base)
    ) {
      failures.push(`${path}: URL escapes configured base: ${value}`);
    }
  }
}

for (const file of files) {
  const path = relative(dist, file).replaceAll("\\", "/");
  if (/^documents\//.test(path)) {
    failures.push(`${path}: public document unexpectedly included`);
  }
}

if (failures.length) {
  throw new Error(`POC artifact checks failed:\n${failures.join("\n")}`);
}

console.log(
  `${htmlFiles.length} POC pages checked (${publicPages.length} localized); no admin route, document, CNAME or base-path escape found.`,
);
