export function SectionHeader({ eyebrow, title, lead, align = "left" }: { eyebrow?: string; title: string; lead?: string; align?: "left" | "center" }) {
  return <header className={`section-heading section-heading--${align}`}>{eyebrow ? <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p> : null}<h2>{title}</h2>{lead ? <p className="section-lead">{lead}</p> : null}</header>;
}
