import { NextResponse } from "next/server";
import { contactSchema, validateFiles } from "@/lib/contact-schema";
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = contactSchema.safeParse({
      topic: form.get("topic"), name: form.get("name"), email: form.get("email"), phone: form.get("phone") || undefined,
      address: form.get("address") || undefined, message: form.get("message"), consent: form.get("consent") === "true",
      website: form.get("website") ?? "", startedAt: form.get("startedAt")
    });
    if (!parsed.success) return NextResponse.json({ ok: false, code: "invalid_form" }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });
    if (Date.now() - parsed.data.startedAt < 1500) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
    const files = form.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
    if (validateFiles(files)) return NextResponse.json({ ok: false, code: "invalid_files" }, { status: 400 });
    const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;
    if (!webhook) return NextResponse.json({ ok: false, code: "transport_not_configured" }, { status: 503 });
    const outbound = new FormData();
    for (const [key, value] of Object.entries(parsed.data)) if (key !== "website") outbound.append(key, String(value));
    files.forEach((file) => outbound.append("attachments", file, file.name));
    const response = await fetch(webhook, { method: "POST", body: outbound, cache: "no-store" });
    if (!response.ok) return NextResponse.json({ ok: false, code: "transport_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false, code: "unexpected_error" }, { status: 500 }); }
}
