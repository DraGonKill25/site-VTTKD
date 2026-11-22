import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

const root = process.cwd();
const baseUrl = "http://127.0.0.1:4321";
const evidenceDirectory = join(
  root,
  "docs",
  "PHASE_4",
  "evidence",
  "lighthouse",
);
const pages = [
  { name: "home-fr", path: "/fr/" },
  { name: "home-en", path: "/en/" },
  { name: "results-fr", path: "/fr/resultats/" },
  { name: "contact-fr", path: "/fr/contact/" },
];
const remoteDebuggingPort = 9223;

async function waitForServer(url, timeout = 60_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not start within ${timeout}ms`);
}

const preview = spawn(
  process.execPath,
  [
    join(root, "node_modules", "astro", "bin", "astro.mjs"),
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    "4321",
  ],
  { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
);

let browser;
try {
  await waitForServer(`${baseUrl}/fr/`);
  browser = await chromium.launch({
    headless: true,
    args: [`--remote-debugging-port=${remoteDebuggingPort}`],
  });
  mkdirSync(evidenceDirectory, { recursive: true });
  const summary = [];

  for (const page of pages) {
    const result = await lighthouse(`${baseUrl}${page.path}`, {
      port: remoteDebuggingPort,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: [
        "performance",
        "accessibility",
        "best-practices",
        "seo",
      ],
    });
    if (!result) throw new Error(`Lighthouse returned no result for ${page.path}`);

    const reports = Array.isArray(result.report)
      ? result.report
      : [result.report];
    writeFileSync(
      join(evidenceDirectory, `${page.name}.json`),
      reports[0] ?? JSON.stringify(result.lhr),
    );
    writeFileSync(
      join(evidenceDirectory, `${page.name}.html`),
      reports[1] ?? "",
    );

    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, category]) => [
        key,
        category.score,
      ]),
    );
    summary.push({ page: page.path, scores });
  }

  writeFileSync(
    join(evidenceDirectory, "summary.json"),
    JSON.stringify(
      { generatedAt: new Date().toISOString(), environment: "local-preview", summary },
      null,
      2,
    ),
  );

  const failed = summary.filter(
    ({ scores }) =>
      (scores.performance ?? 0) < 0.7 ||
      (scores.accessibility ?? 0) < 0.9 ||
      (scores["best-practices"] ?? 0) < 0.9,
  );
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error("One or more Lighthouse quality thresholds were not met.");
  }
} finally {
  await browser?.close();
  preview.kill();
}
