"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { serviceNavigation, siteNavigation } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";

function isActive(pathname: string, href: string) { return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`); }
function NavLink({ href, label, onNavigate }: { href: string; label: string; onNavigate?: () => void }) {
  const pathname = usePathname(); const active = isActive(pathname, href);
  return <Link href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={active ? "is-active" : undefined}><span>{label}</span>{active ? <span className="sr-only">, nykyinen sivu</span> : null}</Link>;
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setDropdownOpen(false); setDrawerOpen(false); }, [pathname]);
  useEffect(() => {
    if (!drawerOpen) return;
    const currentRoot = drawerRef.current;
    if (!currentRoot) return;
    const drawerRoot: HTMLDivElement = currentRoot;
    document.documentElement.classList.add("nav-open"); document.body.classList.add("nav-open"); document.body.dataset.scrollLock = "true";
    (drawerRoot.querySelector("button") as HTMLElement | null)?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setDrawerOpen(false); triggerRef.current?.focus(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(drawerRoot.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.classList.remove("nav-open"); document.body.classList.remove("nav-open"); delete document.body.dataset.scrollLock; };
  }, [drawerOpen]);

  useEffect(() => {
    function onPointer(event: PointerEvent) { if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setDropdownOpen(false); }
    function onKey(event: KeyboardEvent) { if (event.key === "Escape" && dropdownOpen) { setDropdownOpen(false); dropdownTriggerRef.current?.focus(); } }
    document.addEventListener("pointerdown", onPointer); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [dropdownOpen]);

  const serviceActive = serviceNavigation.some((item) => isActive(pathname, item.href));
  return <>
    <nav className="desktop-nav" aria-label="Päänavigaatio">
      <div className="nav-dropdown" ref={dropdownRef}>
        <button ref={dropdownTriggerRef} type="button" className={serviceActive ? "is-active" : undefined} data-active={serviceActive ? "true" : undefined} aria-expanded={dropdownOpen} aria-controls="desktop-service-menu" onClick={() => setDropdownOpen((v) => !v)}><span>Palvelut</span>{serviceActive ? <span className="sr-only">, nykyinen osio</span> : null}<Icon name="chevron" /></button>
        <div id="desktop-service-menu" className="nav-dropdown__panel" hidden={!dropdownOpen}>{serviceNavigation.map((item) => <NavLink key={item.href} {...item} />)}</div>
      </div>
      {siteNavigation.slice(1).map((item) => <NavLink key={item.href} href={item.href} label={item.label} />)}
      <ButtonLink href="/yhteystiedot#yhteydenotto" className="header-cta">Ota yhteyttä</ButtonLink>
    </nav>
    <button ref={triggerRef} type="button" className="menu-trigger" aria-expanded={drawerOpen} aria-controls="mobile-navigation" onClick={() => setDrawerOpen(true)}><span className="sr-only">Avaa valikko</span><Icon name="menu" /></button>
    {drawerOpen ? <div className="mobile-drawer-layer"><button className="mobile-drawer__overlay" type="button" aria-label="Sulje valikko" onClick={() => setDrawerOpen(false)} /><div ref={drawerRef} id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title"><div className="mobile-drawer__head"><h2 id="mobile-menu-title">Valikko</h2><button type="button" className="icon-button" onClick={() => { setDrawerOpen(false); triggerRef.current?.focus(); }}><span className="sr-only">Sulje valikko</span><Icon name="close" /></button></div><nav aria-label="Mobiilinavigaatio"><p className="mobile-nav-label">Palvelut</p>{serviceNavigation.map((item) => <NavLink key={item.href} {...item} onNavigate={() => setDrawerOpen(false)} />)}{siteNavigation.slice(1).map((item) => <NavLink key={item.href} href={item.href} label={item.label} onNavigate={() => setDrawerOpen(false)} />)}</nav><div className="mobile-drawer__actions"><ButtonLink href="/yhteystiedot#yhteydenotto" className="button--full">Ota yhteyttä</ButtonLink></div></div></div> : null}
  </>;
}
