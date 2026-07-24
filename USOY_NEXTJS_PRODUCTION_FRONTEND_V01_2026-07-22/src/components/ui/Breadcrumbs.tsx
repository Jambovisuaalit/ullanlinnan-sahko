import Link from "next/link";
import { JsonLdScript } from "@/components/ui/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";
export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return <><nav className="breadcrumbs container" aria-label="Murupolku"><ol>{items.map((item, index) => <li key={item.href}>{index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav><JsonLdScript data={breadcrumbSchema(items)} /></>;
}
