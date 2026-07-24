"use client";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
export function Accordion({ items }: { items: readonly { id: string; question: string; answer: string }[] }) {
  const prefix = useId();
  return <div className="accordion">{items.map((item) => <AccordionItem key={item.id} item={item} prefix={prefix} />)}</div>;
}
function AccordionItem({ item, prefix }: { item: { id: string; question: string; answer: string }; prefix: string }) {
  const [open, setOpen] = useState(false); const panelId = `${prefix}-${item.id}`;
  return <div className={`accordion__item ${open ? "is-open" : ""}`}><h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}><span>{item.question}</span><Icon name="chevron" /></button></h3><div id={panelId} className="accordion__panel" hidden={!open}><p>{item.answer}</p></div></div>;
}
