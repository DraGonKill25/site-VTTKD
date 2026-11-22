import { defineConfig } from "astro/config";

const pocBuild = process.env.POC_BUILD === "true";
const rawBase = pocBuild ? (process.env.POC_BASE_PATH ?? "/") : "/";
const base = `/${rawBase.replace(/^\/+|\/+$/g, "")}${rawBase === "/" ? "" : "/"}`;
const site = pocBuild
  ? (process.env.POC_SITE_URL ?? "https://example.invalid")
  : undefined;

export default defineConfig({
  output: "static",
  site,
  base,
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
