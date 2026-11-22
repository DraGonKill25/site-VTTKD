export const MAX_PUBLIC_DOCUMENT_BYTES = 10_000_000;
export const ALLOWED_PUBLIC_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export type PublicDocumentMime =
  (typeof ALLOWED_PUBLIC_DOCUMENT_TYPES)[number];

export interface DocumentCandidate {
  id: string;
  resultId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  visibility: "public" | "private";
  containsPersonalData: boolean;
}

export interface ExistingDocument {
  id: string;
  resultId: string;
  fileName: string;
  sizeBytes: number;
}

const extensionByMime: Record<PublicDocumentMime, string[]> = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export function validateDocumentCandidate(
  candidate: DocumentCandidate,
  existing: ExistingDocument[] = [],
): string[] {
  const errors: string[] = [];
  const normalizedName = candidate.fileName.trim().toLowerCase();
  const mime = candidate.mimeType as PublicDocumentMime;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.id)) errors.push("id");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.resultId)) {
    errors.push("resultId");
  }
  if (
    !normalizedName ||
    normalizedName.includes("/") ||
    normalizedName.includes("\\")
  ) {
    errors.push("fileName");
  }
  if (!ALLOWED_PUBLIC_DOCUMENT_TYPES.includes(mime)) {
    errors.push("mimeType");
  } else if (
    !extensionByMime[mime].some((extension) =>
      normalizedName.endsWith(extension),
    )
  ) {
    errors.push("extension");
  }
  if (
    !Number.isInteger(candidate.sizeBytes) ||
    candidate.sizeBytes <= 0 ||
    candidate.sizeBytes > MAX_PUBLIC_DOCUMENT_BYTES
  ) {
    errors.push("sizeBytes");
  }
  if (candidate.visibility !== "public") errors.push("visibility");
  if (candidate.containsPersonalData) errors.push("personalData");
  if (
    existing.some(
      (document) =>
        document.id === candidate.id ||
        (document.resultId === candidate.resultId &&
          document.fileName.toLowerCase() === normalizedName &&
          document.sizeBytes === candidate.sizeBytes),
    )
  ) {
    errors.push("duplicate");
  }

  return [...new Set(errors)];
}

export function publicDocumentPath(candidate: DocumentCandidate): string {
  const extension = candidate.fileName
    .toLowerCase()
    .match(/\.(pdf|jpe?g|png)$/)?.[0];

  if (!extension) throw new Error("Unsupported document extension");
  return `/documents/results/${candidate.resultId}/${candidate.id}${extension}`;
}
