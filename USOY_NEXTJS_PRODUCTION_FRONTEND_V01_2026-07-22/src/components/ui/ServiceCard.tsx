import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
export function ServiceCard({ number, title, text, href, icon }: { number: string; title: string; text: string; href: string; icon: IconName }) {
  return <article className="service-card"><div className="service-card__top"><span className="service-card__icon"><Icon name={icon}/></span><span className="service-card__number">{number}</span></div><h3>{title}</h3><p>{text}</p><Link className="arrow-link" href={href}>Tutustu palveluun <Icon name="arrow"/></Link></article>;
}
