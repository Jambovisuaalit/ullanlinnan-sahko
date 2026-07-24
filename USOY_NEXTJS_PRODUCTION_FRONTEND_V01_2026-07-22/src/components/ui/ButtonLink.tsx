import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export function ButtonLink({ href, children, variant = "primary", icon, external = false, className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "inverse" | "text"; icon?: IconName; external?: boolean; className?: string }) {
  const classes = `button button--${variant} ${className}`.trim();
  const content = <>{children}{icon ? <Icon name={icon} /> : null}</>;
  const usesAnchor = external || /^(?:https?:|mailto:|tel:)/.test(href);
  if (usesAnchor) return <a className={classes} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{content}</a>;
  return <Link className={classes} href={href}>{content}</Link>;
}
