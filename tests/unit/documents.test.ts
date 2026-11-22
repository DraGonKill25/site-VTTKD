import { describe, expect, it } from "vitest";
import {
  publicDocumentPath,
  validateDocumentCandidate,
  type DocumentCandidate,
} from "../../src/domain/documents";

const candidate: DocumentCandidate = {
  id: "document-test",
  resultId: "result-test",
  fileName: "preuve-publique.pdf",
  mimeType: "application/pdf",
  sizeBytes: 250_000,
  visibility: "public",
  containsPersonalData: false,
};

describe("public result documents", () => {
  it("accepts a small public PDF without personal data", () => {
    expect(validateDocumentCandidate(candidate)).toEqual([]);
    expect(publicDocumentPath(candidate)).toBe(
      "/documents/results/result-test/document-test.pdf",
    );
  });

  it("rejects private, sensitive, oversized and unsupported files", () => {
    expect(
      validateDocumentCandidate({
        ...candidate,
        fileName: "private.docx",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        sizeBytes: 11_000_000,
        visibility: "private",
        containsPersonalData: true,
      }),
    ).toEqual(
      expect.arrayContaining([
        "mimeType",
        "sizeBytes",
        "visibility",
        "personalData",
      ]),
    );
  });

  it("checks that the extension matches the detected MIME type", () => {
    expect(
      validateDocumentCandidate({
        ...candidate,
        fileName: "image.png",
      }),
    ).toContain("extension");
  });

  it("detects duplicate identifiers and duplicate files per result", () => {
    const existing = [
      {
        id: candidate.id,
        resultId: candidate.resultId,
        fileName: candidate.fileName,
        sizeBytes: candidate.sizeBytes,
      },
    ];

    expect(validateDocumentCandidate(candidate, existing)).toContain(
      "duplicate",
    );
  });
});
