import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { viewports, visualRoutes } from "../fixtures/phase4-matrix";

const evidenceRoot = join(
  process.cwd(),
  "docs",
  "PHASE_4",
  "evidence",
  "screenshots",
);

test.describe("@visual visual and responsive matrix", () => {
  for (const viewport of viewports) {
    for (const route of visualRoutes) {
      test(`${route.name} at ${viewport.width}px`, async ({
        page,
      }, testInfo) => {
        test.skip(
          testInfo.project.name !== "chromium",
          "Canonical screenshots use Chromium.",
        );
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(route.path);
        await expect(page.locator("body")).toBeVisible();

        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.scroll,
          `Horizontal overflow on ${route.path} at ${viewport.width}px`,
        ).toBeLessThanOrEqual(dimensions.viewport + 1);

        const directory = join(evidenceRoot, viewport.name);
        mkdirSync(directory, { recursive: true });
        await page.screenshot({
          path: join(directory, `${route.name}.png`),
          fullPage: true,
          animations: "disabled",
        });
      });
    }
  }

  test("results switch from table to cards", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/fr/resultats/");
    await expect(page.locator(".results-table")).toBeHidden();
    await expect(page.locator(".result-cards")).toBeVisible();

    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator(".results-table")).toBeVisible();
    await expect(page.locator(".result-cards")).toBeHidden();
  });

  test("mobile menu replaces desktop navigation", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/fr/");
    await expect(page.locator("[data-menu-toggle]")).toBeVisible();
    await expect(page.locator(".desktop-actions")).toBeHidden();
  });
});
