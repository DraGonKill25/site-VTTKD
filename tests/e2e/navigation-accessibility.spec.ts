import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { axeRoutes, reflowRoutes } from "../fixtures/phase4-matrix";

const evidenceRoot = join(process.cwd(), "docs", "PHASE_4", "evidence");

function evidenceName(path: string): string {
  return path.replace(/^\/|\/$/g, "").replaceAll("/", "-") || "root";
}

test.describe("@navigation bilingual navigation", () => {
  test("root redirects to French", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/fr\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("static language switch keeps the equivalent route", async ({
    page,
  }) => {
    await page.goto("/fr/resultats/");
    await page.locator(".desktop-actions .language-link").click();
    await expect(page).toHaveURL(/\/en\/results\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("athlete language switch keeps the stable profile", async ({ page }) => {
    await page.goto("/fr/athletes/demo-athlete-a/");
    await page.locator(".desktop-actions .language-link").click();
    await expect(page).toHaveURL(/\/en\/athletes\/demo-athlete-a\/$/);
  });

  test("competition language switch uses the translated slug", async ({
    page,
  }) => {
    await page.goto(
      "/fr/competitions/tournoi-demonstration-horizon/",
    );
    await page.locator(".desktop-actions .language-link").click();
    await expect(page).toHaveURL(
      /\/en\/competitions\/horizon-demonstration-tournament\/$/,
    );
  });

  test("mobile menu exposes state and restores focus with Escape", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/fr/");
    const toggle = page.locator("[data-menu-toggle]");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#site-navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("skip link moves focus to main content", async ({ page }, testInfo) => {
    await page.goto("/en/");
    const skip = page.locator(".skip-link");
    if (testInfo.project.name === "webkit") {
      // WebKit on Windows does not tab to links without the Safari OS setting.
      await skip.focus();
    } else {
      await page.keyboard.press("Tab");
    }
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("canonical, hreflang and language are present", async ({ page }) => {
    await page.goto("/en/contact/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="fr"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  });

  test("unknown route returns 404", async ({ request }) => {
    const response = await request.get("/fr/page-inexistante-phase-4/");
    expect(response.status()).toBe(404);
  });
});

test.describe("@a11y automated accessibility", () => {
  for (const path of axeRoutes) {
    test(`axe ${path}`, async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name !== "chromium",
        "One canonical axe run is sufficient.",
      );
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const directory = join(evidenceRoot, "axe");
      mkdirSync(directory, { recursive: true });
      writeFileSync(
        join(directory, `${evidenceName(path)}.json`),
        JSON.stringify(results, null, 2),
      );
      const blocking = results.violations.filter(
        ({ impact }) => impact === "serious" || impact === "critical",
      );
      expect(
        blocking,
        blocking
          .map(({ id, impact, help }) => `${impact}: ${id} — ${help}`)
          .join("\n"),
      ).toEqual([]);
    });
  }

  test("focus is visible on keyboard navigation", async ({ page }, testInfo) => {
    await page.goto("/fr/");
    if (testInfo.project.name === "webkit") {
      await page.locator(".skip-link").focus();
    } else {
      await page.keyboard.press("Tab");
    }
    const focusStyle = await page.evaluate(() => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement)) return undefined;
      const style = getComputedStyle(active);
      return {
        tag: active.tagName,
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
      };
    });
    expect(focusStyle?.outlineStyle).not.toBe("none");
    expect(focusStyle?.outlineWidth).not.toBe("0px");
  });

  test("contact errors receive focus and expose an alert", async ({ page }) => {
    await page.goto("/en/contact/");
    await page.getByRole("button", { name: "Check message" }).click();
    const alert = page.locator("#contact-errors");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
    await expect(alert).toHaveAttribute("role", "alert");
  });

  for (const path of reflowRoutes) {
    test(`200 percent reflow proxy ${path}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium");
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(path);
      await page.evaluate(() => {
        document.documentElement.style.fontSize = "200%";
      });
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }

  test("reduced motion preference is active in tests", async ({ page }) => {
    await page.goto("/fr/");
    expect(
      await page.evaluate(() =>
        matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);
  });

  test("critical page exposes a meaningful accessibility tree", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.goto("/fr/contact/");
    const session = await page.context().newCDPSession(page);
    const tree = await session.send("Accessibility.getFullAXTree");
    const directory = join(evidenceRoot, "accessibility-tree");
    mkdirSync(directory, { recursive: true });
    writeFileSync(
      join(directory, "contact-fr.json"),
      JSON.stringify(tree, null, 2),
    );
    const roles = tree.nodes
      .map((node) => node.role?.value)
      .filter((role): role is string => Boolean(role));
    expect(roles).toContain("main");
    expect(roles).toContain("textbox");
    expect(roles).toContain("button");
  });
});
