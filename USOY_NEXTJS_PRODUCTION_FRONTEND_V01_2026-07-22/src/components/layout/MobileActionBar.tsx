import { company, contactLinks } from "@/content/company";
import { Icon } from "@/components/ui/Icon";
export function MobileActionBar() { return <nav className="mobile-action-bar" aria-label="Nopeat yhteydenottotoiminnot"><a href={contactLinks.phone}><Icon name="phone" /><span>Soita</span><span className="sr-only"> numeroon {company.phoneDisplay}</span></a><a href="/yhteystiedot#yhteydenotto"><Icon name="mail" /><span>Ota yhteyttä</span></a></nav>; }
