import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
      ]
    }];
  },
  async redirects() {
    return [
      { source: "/etusivu", destination: "/", permanent: true },
      { source: "/palvelut", destination: "/", permanent: true },
      { source: "/sahkoasennukset", destination: "/sahkoasennukset-ja-vikakorjaukset", permanent: true },
      { source: "/sahkoviat", destination: "/sahkoasennukset-ja-vikakorjaukset", permanent: true },
      { source: "/vikakorjaukset", destination: "/sahkoasennukset-ja-vikakorjaukset", permanent: true },
      { source: "/valaisinasennukset", destination: "/valaistus-ja-valaisinasennukset", permanent: true },
      { source: "/valaisimen-korjaus", destination: "/valaisimien-korjaus", permanent: true },
      { source: "/valaisinkorjaus", destination: "/valaisimien-korjaus", permanent: true },
      { source: "/taloyhtioille", destination: "/taloyhtioille-ja-yrityksille", permanent: true },
      { source: "/yrityksille", destination: "/taloyhtioille-ja-yrityksille", permanent: true },
      { source: "/valaisimet-ja-tarvikkeet", destination: "/myymala#valaisimet-ja-tarvikkeet", permanent: true },
      { source: "/second-hand-valaisimet", destination: "/myymala#second-hand-valaisimet", permanent: true },
      { source: "/yhteydenotto", destination: "/yhteystiedot", permanent: true }
    ];
  }
};

export default nextConfig;
