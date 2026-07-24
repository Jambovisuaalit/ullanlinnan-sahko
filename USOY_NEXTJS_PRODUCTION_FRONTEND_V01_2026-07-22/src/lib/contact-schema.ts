import { z } from "zod";
export const contactTopics = ["electrical", "lamp-repair", "product-enquiry", "business", "other"] as const;
export const contactSchema = z.object({
  topic: z.enum(contactTopics, { error: "Valitse yhteydenoton aihe." }),
  name: z.string().trim().min(2, "Kirjoita nimi.").max(100, "Nimi on liian pitkä."),
  email: z.string().trim().email("Kirjoita toimiva sähköpostiosoite.").max(200),
  phone: z.string().trim().max(40).optional(),
  address: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Kuvaile tarvetta vähintään 10 merkillä.").max(4000, "Viesti on liian pitkä."),
  consent: z.boolean().refine((value) => value, { message: "Hyväksy tietojen käsittely yhteydenottoa varten." }),
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number().int().positive()
});
export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFields = z.output<typeof contactSchema>;
export const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const;
export const maxFileSize = 5 * 1024 * 1024;
export const maxFileCount = 3;
export function validateFiles(files: readonly File[]) {
  if (files.length > maxFileCount) return `Liitä enintään ${maxFileCount} tiedostoa.`;
  for (const file of files) {
    if (!allowedFileTypes.includes(file.type as (typeof allowedFileTypes)[number])) return "Sallittuja tiedostoja ovat JPG, PNG, WebP ja PDF.";
    if (file.size > maxFileSize) return "Yksittäinen tiedosto saa olla enintään 5 Mt.";
  }
  return null;
}
