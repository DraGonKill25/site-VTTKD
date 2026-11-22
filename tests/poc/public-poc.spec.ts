import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const rawBase = process.env.POC_BASE_PATH ?? "/site-VTTKD/";
const basePath =
  rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;
const siteUrl = (process.env.POC_SITE_URL ?? "https://example.invalid").replace(
  /\/+$/,
  "",
);
const pocPath = (path: string) => `${basePath}${path.replace(/^\/+/, "")}`;
const evidenceRoot = join(
  process.cwd(),
  "docs",
  "POC",
  "evidence",
  "screenshots",
);

const responsiveRoutes = [
  { name: "home-fr", path: "fr/" },
  { name: "home-en", path: "en/" },
  { name: "kyorugi-fr", path: "fr/disciplines/combat/" },
  { name: "poomsae-en", path: "en/disciplines/poomsae/" },
  { name: "results-fr", path: "fr/resultats/" },
  { name: "schedules-fr", path: "fr/horaires/" },
  { name: "contact-en", path: "en/contact/" },
] as const;

const viewports = [
  { name: "small-mobile", width: 320, height: 900 },
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

test.describe("public POC", () => {
  test("root redirects inside the repository base path", async ({ page }) => {
    await page.goto(basePath);
    await expect(page).toHaveURL(new RegExp(`${basePath}fr/$`));
  });

  test("French and English navigation stays inside the base path", async ({
    page,
  }) => {
    await page.goto(pocPath("fr/competitions/"));
    await page.locator(".desktop-actions .language-link").click();
    await expect(page).toHaveURL(new RegExp(`${basePath}en/competitions/$`));
    await page.getByRole("link", { name: "Results", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${basePath}en/results/$`));

    const internalLinks = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href") ?? ""),
      );
    expect(
      internalLinks.every((href) => href.startsWith(basePath)),
    ).toBe(true);
  });

  test("POC notice, noindex and canonical are explicit in both languages", async ({
    page,
  }) => {
    await page.goto(pocPath("fr/"));
    await expect(page.locator(".poc-banner")).toContainText(
      "POC — Version de démonstration non officielle",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex,nofollow",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${siteUrl}${pocPath("fr/")}`,
    );

    await page.goto(pocPath("en/"));
    await expect(page.locator(".poc-banner")).toContainText(
      "POC — Unofficial demonstration version",
    );
  });

  test("admin routes and documents are absent from the public server", async ({
    request,
  }) => {
    for (const path of ["admin/", "admin/results/", "admin/documents/"]) {
      const response = await request.get(pocPath(path));
      expect(response.status()).toBe(404);
    }
    const document = await request.get(
      pocPath("documents/results/private.pdf"),
    );
    expect(document.status()).toBe(404);
  });

  test("contact validates locally without transmitting data", async ({
    page,
  }) => {
    const nonGetRequests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        nonGetRequests.push(`${request.method()} ${request.url()}`);
      }
    });

    await page.goto(pocPath("fr/contact/"));
    await page.locator("#contact-name").fill("Visiteur POC fictif");
    await page.locator("#contact-email").fill("visiteur@example.test");
    await page.locator("#contact-subject").fill("Démonstration POC");
    await page
      .locator("#contact-message")
      .fill("Message fictif suffisamment long pour la validation locale.");
    await page.locator('input[name="startedAt"]').evaluate((element) => {
      (element as HTMLInputElement).value = String(Date.now() - 5_000);
    });
    await page.getByRole("button", { name: "Vérifier le message" }).click();
    await expect(page.locator("#contact-success")).toContainText(
      "Aucun message n’a été envoyé",
    );
    expect(nonGetRequests).toEqual([]);
  });

  test("critical public pages have no serious axe violation", async ({
    page,
  }) => {
    for (const path of ["fr/", "en/", "fr/resultats/", "fr/contact/"]) {
      await page.goto(pocPath(path));
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.filter(({ impact }) =>
        ["serious", "critical"].includes(impact ?? ""),
      );
      expect(violations, `${path}: ${JSON.stringify(violations)}`).toEqual([]);
    }
  });

  for (const viewport of viewports) {
    for (const route of responsiveRoutes) {
      test(`${route.name} at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        const failedResources: string[] = [];
        page.on("response", (response) => {
          if (
            response.url().startsWith("http://127.0.0.1:4322") &&
            response.status() >= 400
          ) {
            failedResources.push(`${response.status()} ${response.url()}`);
          }
        });
        await page.goto(pocPath(route.path));
        await expect(page.locator(".poc-banner")).toBeVisible();

        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(dimensions.scroll).toBeLessThanOrEqual(
          dimensions.viewport + 1,
        );
        expect(failedResources).toEqual([]);

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
});
