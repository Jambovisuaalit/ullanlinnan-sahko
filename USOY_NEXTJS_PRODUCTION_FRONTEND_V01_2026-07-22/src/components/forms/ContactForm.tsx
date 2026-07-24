"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFields, type ContactFormInput, validateFiles } from "@/lib/contact-schema";

const labels: Record<ContactFields["topic"], string> = {
  electrical: "Sähköasennus tai sähkövika",
  "lamp-repair": "Valaisimen korjaus",
  "product-enquiry": "Tuote- tai saatavuustiedustelu",
  business: "Taloyhtiö tai yritys",
  other: "Muu asia"
};

export function ContactForm({ defaultTopic }: { defaultTopic?: ContactFields["topic"] }) {
  const startedAt = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [generalError, setGeneralError] = useState("");
  const [fileError, setFileError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ContactFormInput, unknown, ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: defaultTopic, phone: "", address: "", website: "", startedAt, consent: false },
    mode: "onBlur"
  });
  const topic = watch("topic");
  const showAddress = topic === "electrical" || topic === "business";

  async function submit(values: ContactFields, event?: React.BaseSyntheticEvent) {
    if (status === "submitting") return;
    setStatus("submitting"); setGeneralError(""); setFileError("");
    const form = event?.target as HTMLFormElement | undefined;
    const files = form ? Array.from((form.elements.namedItem("attachments") as HTMLInputElement)?.files ?? []) : [];
    const validation = validateFiles(files);
    if (validation) { setFileError(validation); setStatus("error"); requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, String(value)));
    files.forEach((file) => body.append("attachments", file));
    try {
      const response = await fetch("/api/contact", { method: "POST", body });
      if (!response.ok) throw new Error("submission_failed");
      setStatus("success");
      reset({ topic: defaultTopic, phone: "", address: "", website: "", startedAt: Date.now(), consent: false, name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setGeneralError("Lomakkeen lähetys ei onnistunut. Yritä uudelleen tai ota yhteyttä puhelimitse.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(fileError) || Boolean(generalError);
  return <form className="contact-form" noValidate onSubmit={handleSubmit(submit, () => requestAnimationFrame(() => summaryRef.current?.focus()))}>
    {hasErrors ? <div ref={summaryRef} className="form-summary form-summary--error" role="alert" tabIndex={-1}><strong>Tarkista lomakkeen tiedot.</strong>{generalError ? <p>{generalError}</p> : null}<ul>{Object.entries(errors).map(([key, value]) => <li key={key}><a href={`#contact-${key}`}>{value?.message}</a></li>)}{fileError ? <li><a href="#contact-attachments">{fileError}</a></li> : null}</ul></div> : null}
    {status === "success" ? <div className="form-summary form-summary--success" role="status"><strong>Yhteydenotto lähetettiin.</strong><p>Kiitos. Palaamme asiaan annettujen tietojen perusteella.</p></div> : null}
    <div className="form-grid">
      <Field label="Aihe" id="contact-topic" error={errors.topic?.message}><select id="contact-topic" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "contact-topic-error" : undefined} {...register("topic")}><option value="">Valitse aihe</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
      <div className="form-grid form-grid--two"><Field label="Nimi" id="contact-name" error={errors.name?.message}><input id="contact-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} {...register("name")} /></Field><Field label="Sähköposti" id="contact-email" error={errors.email?.message}><input id="contact-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} {...register("email")} /></Field></div>
      <div className="form-grid form-grid--two"><Field label="Puhelinnumero (valinnainen)" id="contact-phone"><input id="contact-phone" type="tel" autoComplete="tel" {...register("phone")} /></Field>{showAddress ? <Field label="Kohteen osoite (valinnainen)" id="contact-address"><input id="contact-address" autoComplete="street-address" {...register("address")} /></Field> : null}</div>
      <Field label="Kuvaus" id="contact-message" error={errors.message?.message} help="Kerro kohde, havainto ja toivottu seuraava vaihe. Älä lähetä tarpeettomia henkilötietoja."><textarea id="contact-message" rows={7} aria-invalid={Boolean(errors.message)} aria-describedby={[errors.message ? "contact-message-error" : null, "contact-message-help"].filter(Boolean).join(" ")} {...register("message")} /></Field>
      <Field label="Kuvat tai PDF (valinnainen)" id="contact-attachments" error={fileError} help="Enintään 3 tiedostoa, 5 Mt/tiedosto. JPG, PNG, WebP tai PDF."><input id="contact-attachments" name="attachments" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" aria-describedby={[fileError ? "contact-attachments-error" : null, "contact-attachments-help"].filter(Boolean).join(" ")} /></Field>
      <label className="checkbox-field"><input type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "contact-consent-error" : undefined} {...register("consent")} /><span>Hyväksyn, että antamiani tietoja käsitellään yhteydenottoon vastaamista varten.</span></label>{errors.consent ? <p id="contact-consent-error" className="field-error">{errors.consent.message}</p> : null}
      <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Verkkosivu</label><input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <button className="button button--primary button--submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? <><span className="spinner" aria-hidden="true" /> Lähetetään…</> : "Lähetä yhteydenotto"}</button>
    </div>
  </form>;
}
function Field({ label, id, error, help, children }: { label: string; id: string; error?: string; help?: string; children: React.ReactNode }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{help ? <p id={`${id}-help`} className="field-help">{help}</p> : null}{error ? <p id={`${id}-error`} className="field-error">{error}</p> : null}</div>;
}
