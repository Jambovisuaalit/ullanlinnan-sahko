import Link from "next/link";
import { company, contactLinks } from "@/content/company";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SiteNavigation } from "@/components/layout/SiteNavigation";
import { Icon } from "@/components/ui/Icon";
export function Header() {
  return <><div className="site-notice"><div className="container site-notice__row"><span><Icon name="clock" /> Myymälä avoinna {company.openingHours.display.toLowerCase()}</span><span><Icon name="pin" /> {company.address.street}, {company.address.postalCode} {company.address.city}</span><a href={contactLinks.phone}><Icon name="phone" /> {company.phoneDisplay}</a></div></div><header className="site-header"><div className="container site-header__row"><Link className="brand-link" href="/" aria-label="Ullanlinnan Sähkö Oy, etusivu"><BrandLogo /></Link><SiteNavigation /></div></header></>;
}
