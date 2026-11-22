import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = join(process.cwd(), "dist");
const pocMode = process.argv.includes("--poc");
const configuredBase = pocMode
  ? (process.env.POC_BASE_PATH ?? "/site-VTTKD/")
  : "/";
const basePath =
  configuredBase === "/"
    ? "/"
    : `/${configuredBase.replace(/^\/+|\/+$/g, "")}/`;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function targetFor(href) {
  let clean = href.split(/[?#]/, 1)[0];
  if (!clean) return undefined;
  if (basePath !== "/" && clean.startsWith(basePath)) {
    clean = `/${clean.slice(basePath.length)}`;
  }
  if (extname(clean)) return join(root, clean.replace(/^\//, ""));
  return join(root, clean.replace(/^\//, ""), "index.html");
}

if (!existsSync(root)) {
  throw new Error("dist/ is missing. Run npm run build first.");
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const failures = [];
let internalLinks = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = `/${relative(root, file).replaceAll("\\", "/")}`;

  if (html.includes("undefined")) {
    failures.push(`${page}: contains the text "undefined"`);
  }

  const publicLanguage = page.startsWith("/fr/")
    ? "fr"
    : page.startsWith("/en/")
      ? "en"
      : undefined;
  if (publicLanguage) {
    if (!html.includes(`<html lang="${publicLanguage}">`)) {
      failures.push(`${page}: wrong or missing document language`);
    }
    for (const required of [
      'rel="canonical"',
      'hreflang="fr"',
      'hreflang="en"',
      'hreflang="x-default"',
    ]) {
      if (!html.includes(required)) {
        failures.push(`${page}: missing ${required}`);
      }
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue;
    }
    internalLinks += 1;
    if (
      pocMode &&
      basePath !== "/" &&
      href.startsWith("/") &&
      !href.startsWith(basePath)
    ) {
      failures.push(`${page}: internal link escapes base path: ${href}`);
      continue;
    }
    const target = targetFor(href);
    if (target && !existsSync(target)) {
      failures.push(`${page}: broken internal link ${href}`);
    }
  }
}

if (failures.length) {
  throw new Error(`Built-site checks failed:\n${failures.join("\n")}`);
}

console.log(
  `${htmlFiles.length} HTML pages and ${internalLinks} internal links checked.`,
);
