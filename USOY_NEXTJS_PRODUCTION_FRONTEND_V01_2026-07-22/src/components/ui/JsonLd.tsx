import type { JsonLd } from "@/lib/seo/schema";
export function JsonLdScript({ data }: { data: JsonLd }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />; }
