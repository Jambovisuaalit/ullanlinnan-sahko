import { z } from "zod";

export const publicationStatusSchema = z.enum([
  "draft",
  "in_review",
  "approved",
  "published",
  "archived",
]);

export const forbiddenPublicationMarkers = [
  "VAHVISTETTAVA",
  "TBD",
  "TODO",
  "PLACEHOLDER",
] as const;

const uuidSchema = z.string().uuid();
const dateTimeSchema = z.string().datetime({ offset: true });
const optionalDateTimeSchema = dateTimeSchema.nullable().optional();
const nullableUuidSchema = uuidSchema.nullable().optional();
const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

const internalOrAbsoluteUrlSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine(
    (value) => value.startsWith("/") || URL.canParse(value),
    "Anna sisäinen polku tai täydellinen URL.",
  );

export const publicationSchema = z
  .object({
    status: publicationStatusSchema.default("draft"),
    unresolvedFields: z.array(z.string().trim().min(1)).default([]),
    publishAt: optionalDateTimeSchema,
    unpublishAt: optionalDateTimeSchema,
    approvedAt: optionalDateTimeSchema,
    approvedBy: nullableUuidSchema,
    publishedAt: optionalDateTimeSchema,
    publishedBy: nullableUuidSchema,
  })
  .superRefine((value, context) => {
    if (
      value.publishAt &&
      value.unpublishAt &&
      new Date(value.unpublishAt) <= new Date(value.publishAt)
    ) {
      context.addIssue({
        code: "custom",
        path: ["unpublishAt"],
        message: "Poistumisajan on oltava julkaisuajan jälkeen.",
      });
    }
  });

export const mediaReferenceSchema = z
  .object({
    id: uuidSchema,
    storagePath: z.string().trim().min(1).max(500),
    altText: z.string().max(240),
    decorative: z.boolean(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sortOrder: z.number().int().min(0).default(0),
    isPrimary: z.boolean().default(false),
  })
  .superRefine((value, context) => {
    if (value.decorative && value.altText !== "") {
      context.addIssue({
        code: "custom",
        path: ["altText"],
        message: "Koristekuvan alt-tekstin tulee olla tyhjä.",
      });
    }

    if (!value.decorative && value.altText.trim().length < 2) {
      context.addIssue({
        code: "custom",
        path: ["altText"],
        message: "Informatiivinen kuva tarvitsee alt-tekstin.",
      });
    }
  });

export const openingHourExceptionSchema = z
  .object({
    id: uuidSchema.optional(),
    exceptionDate: z.string().date(),
    isClosed: z.boolean(),
    opensAt: timeSchema.nullable(),
    closesAt: timeSchema.nullable(),
    publicLabel: z.string().trim().min(2).max(160),
    publication: publicationSchema,
  })
  .superRefine((value, context) => {
    if (value.isClosed && (value.opensAt !== null || value.closesAt !== null)) {
      context.addIssue({
        code: "custom",
        path: ["opensAt"],
        message: "Suljetulla päivällä ei saa olla kellonaikoja.",
      });
    }

    if (!value.isClosed && (!value.opensAt || !value.closesAt)) {
      context.addIssue({
        code: "custom",
        path: ["opensAt"],
        message: "Avoimelle päivälle vaaditaan avaus- ja sulkemisaika.",
      });
    }

    if (
      !value.isClosed &&
      value.opensAt &&
      value.closesAt &&
      value.opensAt >= value.closesAt
    ) {
      context.addIssue({
        code: "custom",
        path: ["closesAt"],
        message: "Sulkemisajan on oltava avaamisajan jälkeen.",
      });
    }
  });

export const announcementSchema = z
  .object({
    id: uuidSchema.optional(),
    title: z.string().trim().min(2).max(120),
    message: z.string().trim().min(2).max(500),
    level: z.enum(["information", "warning"]).default("information"),
    startsAt: dateTimeSchema,
    endsAt: dateTimeSchema.nullable().optional(),
    linkLabel: z.string().trim().min(2).max(80).nullable().optional(),
    linkUrl: internalOrAbsoluteUrlSchema.nullable().optional(),
    publication: publicationSchema,
  })
  .superRefine((value, context) => {
    const hasLabel = Boolean(value.linkLabel);
    const hasUrl = Boolean(value.linkUrl);

    if (hasLabel !== hasUrl) {
      context.addIssue({
        code: "custom",
        path: ["linkLabel"],
        message: "Linkin teksti ja URL on annettava yhdessä.",
      });
    }

    if (
      value.endsAt &&
      new Date(value.endsAt) <= new Date(value.startsAt)
    ) {
      context.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "Ilmoituksen päättymisajan on oltava alkamisajan jälkeen.",
      });
    }
  });

export const mediaAssetSchema = z
  .object({
    id: uuidSchema.optional(),
    storagePath: z.string().trim().min(1).max(500),
    originalFilename: z.string().trim().min(1).max(255),
    mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]),
    sizeBytes: z.number().int().positive().max(10 * 1024 * 1024),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    altText: z.string().max(240),
    caption: z.string().trim().max(500).nullable().optional(),
    decorative: z.boolean(),
    focalPoint: z
      .object({
        x: z.number().min(0).max(1),
        y: z.number().min(0).max(1),
      })
      .nullable()
      .optional(),
    rightsConfirmed: z.boolean(),
    publication: publicationSchema,
  })
  .superRefine((value, context) => {
    if (value.decorative && value.altText !== "") {
      context.addIssue({
        code: "custom",
        path: ["altText"],
        message: "Koristekuvan alt-tekstin tulee olla tyhjä.",
      });
    }

    if (!value.decorative && value.altText.trim().length < 2) {
      context.addIssue({
        code: "custom",
        path: ["altText"],
        message: "Informatiivinen kuva tarvitsee alt-tekstin.",
      });
    }

    if (
      ["approved", "published"].includes(value.publication.status) &&
      !value.rightsConfirmed
    ) {
      context.addIssue({
        code: "custom",
        path: ["rightsConfirmed"],
        message: "Kuvan käyttöoikeus on vahvistettava ennen hyväksyntää.",
      });
    }
  });

export const secondHandItemSchema = z
  .object({
    id: uuidSchema.optional(),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(120)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(10).max(2000),
    dimensions: z.string().trim().max(240).nullable().optional(),
    materials: z.array(z.string().trim().min(1).max(80)).default([]),
    conditionNotes: z.string().trim().min(2).max(1000),
    internalState: z.enum(["active", "sold", "archived"]).default("active"),
    availabilityNotice: z
      .string()
      .trim()
      .min(2)
      .max(160)
      .default("Saatavuus varmistettava."),
    seoTitle: z.string().trim().min(20).max(70).nullable().optional(),
    seoDescription: z.string().trim().min(60).max(180).nullable().optional(),
    media: z.array(mediaReferenceSchema).default([]),
    publication: publicationSchema,
  })
  .superRefine((value, context) => {
    if (["approved", "published"].includes(value.publication.status)) {
      const primaryImages = value.media.filter((image) => image.isPrimary);

      if (primaryImages.length !== 1) {
        context.addIssue({
          code: "custom",
          path: ["media"],
          message: "Hyväksyttävällä valaisimella on oltava täsmälleen yksi pääkuva.",
        });
      }

      if (value.media.length === 0) {
        context.addIssue({
          code: "custom",
          path: ["media"],
          message: "Hyväksyttävällä valaisimella on oltava vähintään yksi kuva.",
        });
      }
    }
  });

export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type OpeningHourException = z.infer<typeof openingHourExceptionSchema>;
export type Announcement = z.infer<typeof announcementSchema>;
export type MediaAsset = z.infer<typeof mediaAssetSchema>;
export type SecondHandItem = z.infer<typeof secondHandItemSchema>;
