import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const evidenceDirectory = join(root, "docs", "PHASE_4", "evidence", "security");
const scannedRoots = [
  ".github",
  "design",
  "docs",
  "src",
  "public",
  "scripts",
  "tests",
  "dist",
];
const rootFiles = [
  ".env.example",
  ".gitignore",
  ".pages.yml",
  "astro.config.mjs",
  "package-lock.json",
  "package.json",
  "playwright.config.ts",
  "playwright.poc.config.ts",
  "tsconfig.json",
  "vitest.config.ts",
];
const textExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);
const secretPatterns = [
  { name: "private-key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "github-token", pattern: /gh[pousr]_[A-Za-z0-9]{20,}/g },
  { name: "aws-access-key", pattern: /AKIA[0-9A-Z]{16}/g },
  { name: "stripe-key", pattern: /sk_(?:live|test)_[A-Za-z0-9]{16,}/g },
];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = [
  ...scannedRoots.flatMap((directory) => walk(join(root, directory))),
  ...rootFiles.map((file) => join(root, file)).filter(existsSync),
].filter((file) => textExtensions.has(extname(file)) || file.endsWith(".env.example"));

const findings = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const { name, pattern } of secretPatterns) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      findings.push({
        type: name,
        file: relative(root, file).replaceAll("\\", "/"),
        offset: match.index,
      });
    }
  }
}

const fixtureDirectories = [
  "athletes",
  "competitions",
  "results",
  "course-schedules",
  "schedule-exceptions",
  "news",
  "events",
];
const nonDemoFixtures = [];
for (const directory of fixtureDirectories) {
  for (const file of walk(join(root, "src", "content", directory)).filter(
    (path) => path.endsWith(".json"),
  )) {
    const data = JSON.parse(readFileSync(file, "utf8"));
    if (data.demo !== true) {
      nonDemoFixtures.push(relative(root, file).replaceAll("\\", "/"));
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  secretFindings: findings,
  nonDemoFixtures,
  adminAuthentication: "absent-by-design-local-prototype",
  productionReady: false,
};
mkdirSync(evidenceDirectory, { recursive: true });
writeFileSync(
  join(evidenceDirectory, "local-security-scan.json"),
  JSON.stringify(report, null, 2),
);

if (findings.length || nonDemoFixtures.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    `${files.length} text files scanned; no secret patterns or unlabelled demo fixtures found.`,
  );
}
