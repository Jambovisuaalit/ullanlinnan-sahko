import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
export function MediaFrame({ src, alt, requirement, ratio = "4/3", priority = false, tone = "warm" }: { src?: string; alt?: string; requirement: string; ratio?: "4/3" | "16/10" | "4/5"; priority?: boolean; tone?: "warm" | "olive" | "dark" }) {
  return <figure className={`media-frame media-frame--${tone}`} style={{ "--media-ratio": ratio.replace("/", " / ") } as CSSProperties}>{src && alt ? <Image src={src} alt={alt} fill sizes="(min-width: 64rem) 50vw, 100vw" preload={priority} /> : <div className="media-requirement" data-asset-status="missing"><Icon name="image" /><strong>Tuotantokuva tarvitaan</strong><span>{requirement}</span></div>}</figure>;
}
