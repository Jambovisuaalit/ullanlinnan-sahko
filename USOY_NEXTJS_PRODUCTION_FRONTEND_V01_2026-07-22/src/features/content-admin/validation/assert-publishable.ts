import {
  forbiddenPublicationMarkers,
  type Publication,
} from "@/schemas/content/dynamic-content.schema";

export class ContentPublicationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super("Sisältöä ei voida julkaista.");
    this.name = "ContentPublicationError";
    this.issues = issues;
  }
}

function findForbiddenMarkers(value: unknown): string[] {
  const serialized = JSON.stringify(value ?? null).toUpperCase();

  return forbiddenPublicationMarkers.filter((marker) =>
    serialized.includes(marker),
  );
}

export function assertPublishableContent(
  content: unknown,
  publication: Publication,
): void {
  const issues: string[] = [];

  if (publication.status !== "approved") {
    issues.push("Sisällön tilan on oltava approved ennen julkaisua.");
  }

  if (!publication.approvedAt || !publication.approvedBy) {
    issues.push("Sisällöltä puuttuu hyväksyntäaika tai hyväksyjä.");
  }

  if (publication.unresolvedFields.length > 0) {
    issues.push(
      `Vahvistamattomat kentät: ${publication.unresolvedFields.join(", ")}.`,
    );
  }

  const forbiddenMarkers = findForbiddenMarkers(content);

  if (forbiddenMarkers.length > 0) {
    issues.push(
      `Sisältö sisältää kiellettyjä merkintöjä: ${forbiddenMarkers.join(", ")}.`,
    );
  }

  if (
    publication.publishAt &&
    publication.unpublishAt &&
    new Date(publication.unpublishAt) <= new Date(publication.publishAt)
  ) {
    issues.push("Poistumisajan on oltava julkaisuajan jälkeen.");
  }

  if (issues.length > 0) {
    throw new ContentPublicationError(issues);
  }
}
