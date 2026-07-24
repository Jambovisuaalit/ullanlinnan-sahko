import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeFeatureSection({ eyebrow, title, text, href, cta, requirement, ratio, mediaFirst = false, warm = false }: { eyebrow: string; title: string; text: string; href: string; cta: string; requirement: string; ratio: "4/3" | "16/10"; mediaFirst?: boolean; warm?: boolean }) {
  return <section className={`section ${warm ? "section--warm" : ""}`}><div className={`container split-layout ${mediaFirst ? "split-layout--media-first" : ""}`}><div className="feature-copy"><SectionHeader eyebrow={eyebrow} title={title}/><p>{text}</p><ButtonLink href={href} icon="arrow">{cta}</ButtonLink></div><MediaFrame requirement={requirement} ratio={ratio}/></div></section>;
}
