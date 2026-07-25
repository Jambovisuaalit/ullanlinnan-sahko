import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/libre-baskerville/400.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLdScript } from "@/components/ui/JsonLd";
import { company } from "@/content/company";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema, websiteSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  ...buildMetadata(seoPages.home),
  applicationName: company.name,
  icons: {
    icon: [
      { url: "/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg", type: "image/svg+xml" },
      { url: "/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico" }
    ]
  }
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" }
  ]
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fi"><body><a className="skip-link" href="#main-content">Siirry pääsisältöön</a><Header />{children}<Footer /><MobileActionBar /><JsonLdScript data={localBusinessSchema()} /><JsonLdScript data={websiteSchema()} /></body></html>;
}
