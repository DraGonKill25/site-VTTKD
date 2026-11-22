import { expect, test } from "@playwright/test";

const adminRoutes = ["/admin/", "/admin/results/", "/admin/documents/"];

test.describe("@security local administration boundaries", () => {
  for (const path of adminRoutes) {
    test(`${path} is explicitly an unauthenticated local prototype`, async ({
      page,
      context,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator(".admin-warning")).toContainText(
        "aucune authentification réelle",
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex,nofollow,noarchive",
      );
      expect(await context.cookies()).toEqual([]);
      expect(
        await page.evaluate(() => ({
          session: Object.keys(sessionStorage),
          cookies: document.cookie,
        })),
      ).toEqual({ session: [], cookies: "" });
    });
  }

  test("admin forms have no POST action or external endpoint", async ({
    page,
  }) => {
    for (const path of adminRoutes) {
      await page.goto(path);
      await expect(page.locator('form[method="post"]')).toHaveCount(0);
      const actions = await page.locator("form").evaluateAll((forms) =>
        forms.map((form) => ({
          action: form.getAttribute("action"),
          method: form.getAttribute("method"),
        })),
      );
      expect(actions).toEqual(
        actions.map(() => ({ action: null, method: null })),
      );
    }
  });

  test("result persistence is localStorage only after confirmation", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.addInitScript(() => localStorage.clear());
    await page.goto("/admin/results/");
    expect(
      await page.evaluate(() => ({
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
      })),
    ).toEqual({ local: [], session: [] });

    await page.getByRole("button", { name: "Créer un résultat" }).click();
    await page.locator("#competition-id").selectOption(
      "demo-competition-horizon",
    );
    await page.locator("#participant-name").fill("Sécurité E2E fictive");
    await page.locator("#category").fill("Catégorie fictive");
    await page.locator("#rank").fill("1");
    await page.locator("#medal").selectOption("gold");
    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
    await page.getByRole("button", { name: "Confirmer et enregistrer" }).click();
    expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([
      "vttkd-result-admin-demo-v1",
    ]);
  });

  test("public forms do not transmit data", async ({ page }) => {
    const nonGetRequests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        nonGetRequests.push(`${request.method()} ${request.url()}`);
      }
    });
    await page.goto("/fr/contact/");
    await page.locator("#contact-name").fill("Test sécurité");
    await page.locator("#contact-email").fill("security@example.test");
    await page.locator("#contact-subject").fill("Test local");
    await page
      .locator("#contact-message")
      .fill("Message de sécurité local et fictif.");
    await page.locator('input[name="startedAt"]').evaluate((element) => {
      (element as HTMLInputElement).value = String(Date.now() - 5_000);
    });
    await page.getByRole("button", { name: "Vérifier le message" }).click();
    expect(nonGetRequests).toEqual([]);
  });
});
