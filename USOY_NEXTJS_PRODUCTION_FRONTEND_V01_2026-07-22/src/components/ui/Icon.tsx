import type { SVGProps } from "react";

export type IconName = "arrow" | "bolt" | "bulb" | "wrench" | "store" | "building" | "home" | "check" | "phone" | "mail" | "pin" | "clock" | "image" | "menu" | "close" | "chevron";

const spritePath = "/brand/icons/USOY_ICON_SPRITE.svg";

export function Icon({ name, title, ...props }: SVGProps<SVGSVGElement> & { name: IconName; title?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} focusable="false" {...props}>{title ? <title>{title}</title> : null}<use href={`${spritePath}#${name}`} /></svg>;
}
