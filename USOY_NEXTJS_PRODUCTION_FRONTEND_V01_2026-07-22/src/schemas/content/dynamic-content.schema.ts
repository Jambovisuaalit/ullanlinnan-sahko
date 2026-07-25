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

const optionalDateTimeSchema = z.iso.datetime().nullable().optional();
const nullableUuidSchema = z.uuid().nullable().optional();

export const publicationSchema = z.object({
  status: publicationStatusSchema.default("draft"),
  unresolvedFields: z.array(z.string().trim().min(1)).default([]),
  publishAt: optionalDateTimeSchema,
  unpublishAt: optionalDateTimeSchema,
  approvedAt: optionalDateTimeSchema,
  approvedBy: nullableUuidSchema,
  publishedAt: optionalDateTimeSchema,
  publishedBy: nullableUuidSchema,
});

export const mediaReferenceSchema = z.object({
  id: z.uuid(),
  storagePath: z.string().trim().min(1).max(500),
  altText: z.string().max(240),
  decorative: z.boolean(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const openingHourExceptionSchema = z
  .object({
    id: z.uuid().optional(),
    exceptionDate: z.iso.date(),
    isClosed: z.boolean(),
    opensAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable(),
    closesAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable(),
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
  });

export const announcementSchema = z
  .object({
    id: z.uuid().optional(),
    title: z.string().trim().min(2).max(120),
    message: z.string().trim().min(2).max(500),
    level: z.enum(["information", "warning"]).default("information"),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime().nullable().optional(),
    linkLabel: z.string().trim().min(2).max(80).nullable().optional(),
    linkUrl: z.string().trim().url().nullable().optional(),
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
  });

export const mediaAssetSchema = z
  .object({
    id: z.uuid().optional(),
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
  });

export const secondHandItemSchema = z.object({
  id: z.uuid().optional(),
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
});

export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type OpeningHourException = z.infer<typeof openingHourExceptionSchema>;
export type Announcement = z.infer<typeof announcementSchema>;
export type MediaAsset = z.infer<typeof mediaAssetSchema>;
export type SecondHandItem = z.infer<typeof secondHandItemSchema>;
