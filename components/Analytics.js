"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
