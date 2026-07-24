"use client";
import Image from "next/image";
import { useState } from "react";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = inverse
    ? "/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg"
    : "/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg";

  if (failed) {
    return <span className="brand-logo__missing" role="img" aria-label="Ullanlinnan Sähkö Oy – virallinen V04 Header Compact -logo puuttuu julkaisuympäristöstä"><strong>LOGO ASSET MISSING</strong><span>V04 Header Compact</span></span>;
  }

  return <Image className="brand-logo" src={src} alt="Ullanlinnan Sähkö Oy" width={230} height={42} preload onError={() => setFailed(true)} />;
}
