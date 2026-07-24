import { homeContent } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
export function HomeProcessSection() { return <section className="section section--black"><div className="container"><SectionHeader eyebrow="Toimintatapa" title="Kolme vaihetta yhteydenotosta eteenpäin" align="center"/><div className="process-grid">{homeContent.process.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>; }
