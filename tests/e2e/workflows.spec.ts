import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const workflowEvidence = join(
  process.cwd(),
  "docs",
  "PHASE_4",
  "evidence",
  "screenshots",
  "workflows",
);

test.describe("@e2e result workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto("/admin/results/");
  });

  test("create, recap, update, history, stable id and reset", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Canonical stateful workflow runs once.",
    );
    mkdirSync(workflowEvidence, { recursive: true });
    const initialCount = await page.locator("#admin-results-body tr").count();

    await page.getByRole("button", { name: "Créer un résultat" }).click();
    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    await expect(page.locator("#form-errors")).toBeVisible();

    await page.locator("#competition-id").selectOption(
      "demo-competition-horizon",
    );
    await page.locator("#discipline").selectOption("poomsae");
    await page.locator("#participant-type").selectOption("individual");
    await page.locator("#participant-name").fill("Participant E2E fictif");
    await page.locator("#category").fill("Catégorie E2E fictive");
    await page.locator("#rank").fill("2");
    await page.locator("#medal").selectOption("silver");
    await page.locator("#comment").fill("Création E2E fictive");
    await page.locator("#source-ref").fill("Source E2E fictive");
    await page.locator("#result-status").selectOption("published");
    await page.screenshot({
      path: join(workflowEvidence, "result-create-form.png"),
      fullPage: true,
    });

    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    await expect(page.locator("#result-review-view")).toBeVisible();
    await expect(page.locator("#result-recap")).toContainText(
      "Participant E2E fictif",
    );
    expect(
      await page.evaluate(() =>
        JSON.parse(
          localStorage.getItem("vttkd-result-admin-demo-v1") ?? "[]",
        ).some(
          (record: { participantName: string }) =>
            record.participantName === "Participant E2E fictif",
        ),
      ),
    ).toBe(false);
    await page.screenshot({
      path: join(workflowEvidence, "result-create-review.png"),
      fullPage: true,
    });

    await page.getByRole("button", { name: "Modifier les informations" }).click();
    await expect(page.locator("#participant-name")).toHaveValue(
      "Participant E2E fictif",
    );
    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    await page.getByRole("button", { name: "Confirmer et enregistrer" }).click();
    await expect(page.locator("#admin-success")).toContainText(
      "enregistré après confirmation",
    );
    await expect(page.locator("#admin-results-body tr")).toHaveCount(
      initialCount + 1,
    );

    const created = await page.evaluate(() => {
      const records = JSON.parse(
        localStorage.getItem("vttkd-result-admin-demo-v1") ?? "[]",
      ) as Array<{
        id: string;
        participantName: string;
        history: unknown[];
      }>;
      return records.find(
        ({ participantName }) =>
          participantName === "Participant E2E fictif",
      );
    });
    expect(created).toBeTruthy();
    expect(created?.history).toHaveLength(1);

    const row = page
      .locator("#admin-results-body tr")
      .filter({ hasText: "Participant E2E fictif" });
    await row.getByRole("button", { name: "Ouvrir" }).click();
    await expect(page.locator("#result-detail-view")).toBeVisible();
    await page.getByRole("button", { name: "Modifier" }).click();
    await page.locator("#competition-location").fill("Nouveau lieu E2E fictif");
    await page.locator("#comment").fill("Correction E2E fictive");
    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    await expect(page.locator("#change-list")).toContainText(
      "Nouveau lieu E2E fictif",
    );
    await expect(page.locator("#change-list")).toContainText(
      "Correction E2E fictive",
    );
    await page.screenshot({
      path: join(workflowEvidence, "result-update-review.png"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Confirmer et enregistrer" }).click();

    const updatedState = await page.evaluate(() => {
      const records = JSON.parse(
        localStorage.getItem("vttkd-result-admin-demo-v1") ?? "[]",
      ) as Array<{
        id: string;
        participantName: string;
        history: unknown[];
      }>;
      return {
        matches: records.filter(
          ({ participantName }) =>
            participantName === "Participant E2E fictif",
        ),
      };
    });
    expect(updatedState.matches).toHaveLength(1);
    expect(updatedState.matches[0]?.id).toBe(created?.id);
    expect(updatedState.matches[0]?.history).toHaveLength(2);

    await page
      .locator("#admin-results-body tr")
      .filter({ hasText: "Participant E2E fictif" })
      .getByRole("button", { name: "Ouvrir" })
      .click();
    await expect(page.locator("#result-history > li")).toHaveCount(2);
    await expect(page.locator("#result-history")).toContainText(
      "Correction E2E fictive",
    );
    await page.screenshot({
      path: join(workflowEvidence, "result-history.png"),
      fullPage: true,
    });

    await page.getByRole("button", { name: "Modifier" }).click();
    await page.locator("#comment").fill("Modification à annuler");
    await page.getByRole("button", { name: "Vérifier les informations" }).click();
    await page
      .getByRole("button", { name: "Annuler les modifications" })
      .click();
    expect(
      await page.evaluate(() =>
        (
          JSON.parse(
            localStorage.getItem("vttkd-result-admin-demo-v1") ?? "[]",
          ) as Array<{ comment: string }>
        ).some(({ comment }) => comment === "Modification à annuler"),
      ),
    ).toBe(false);

    await page.getByRole("button", { name: "Retour à la liste" }).click();
    await page.getByRole("button", { name: "Réinitialiser la démo" }).click();
    await expect(page.locator("#admin-results-body tr")).toHaveCount(initialCount);
  });
});

test.describe("@e2e schedules, documents and contact", () => {
  test("schedule pages show the approved empty state only", async ({ page }) => {
    await page.goto("/fr/horaires/");
    await expect(page.getByRole("heading", { name: "Horaires à communiquer" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(
      "Exemple archivé — entraînement",
    );
    await page.goto("/en/class-schedule/");
    await expect(
      page.getByRole("heading", { name: "Schedule to be provided" }),
    ).toBeVisible();
  });

  test("document validation accepts public PDF without uploading", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.goto("/admin/documents/");
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        requests.push(`${request.method()} ${request.url()}`);
      }
    });
    await page.locator("#document-id").fill("document-e2e");
    await page.locator("#document-result").selectOption("demo-result-001");
    await page.locator("#document-file").setInputFiles({
      name: "preuve-e2e.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4\n% fictional E2E file\n"),
    });
    await page.getByLabel("Ce document est destiné à être public.").check();
    await page
      .getByLabel(
        "J’ai vérifié l’absence de donnée personnelle, privée ou sensible.",
      )
      .check();
    await page
      .getByRole("button", {
        name: "Vérifier le fichier et les métadonnées",
      })
      .click();
    await expect(page.locator("#document-success")).toBeVisible();
    await expect(page.locator("#document-path")).toContainText(
      "/documents/results/demo-result-001/document-e2e.pdf",
    );
    expect(requests).toEqual([]);
  });

  test("document validation rejects unsafe metadata and file type", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.goto("/admin/documents/");
    await page.locator("#document-id").fill("document-e2e");
    await page.locator("#document-file").setInputFiles({
      name: "preuve-e2e.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("not an approved document"),
    });
    await page
      .getByRole("button", {
        name: "Vérifier le fichier et les métadonnées",
      })
      .click();
    await expect(page.locator("#document-errors")).toContainText(
      "type non autorisé",
    );
    await expect(page.locator("#document-errors")).toContainText(
      "document non public",
    );
    await expect(page.locator("#document-errors")).toContainText(
      "présence de données personnelles",
    );
    await expect(page.locator("#document-errors")).toContainText(
      "résultat manquant",
    );
  });

  test("contact validates locally and sends no request", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium");
    await page.goto("/fr/contact/");
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        requests.push(`${request.method()} ${request.url()}`);
      }
    });
    await page.getByRole("button", { name: "Vérifier le message" }).click();
    await expect(page.locator("#contact-errors")).toBeVisible();
    await page.locator("#contact-name").fill("Visiteur E2E");
    await page.locator("#contact-email").fill("visiteur@example.test");
    await page.locator("#contact-subject").fill("Question E2E fictive");
    await page
      .locator("#contact-message")
      .fill("Message E2E fictif suffisamment long pour être validé.");
    await page.locator('input[name="startedAt"]').evaluate((element) => {
      (element as HTMLInputElement).value = String(Date.now() - 5_000);
    });
    await page.getByRole("button", { name: "Vérifier le message" }).click();
    await expect(page.locator("#contact-success")).toContainText(
      "Aucun message n’a été envoyé",
    );
    expect(requests).toEqual([]);
  });
});
