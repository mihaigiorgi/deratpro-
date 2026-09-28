import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/** Generează /robots.txt: motoarele de căutare pot indexa tot site-ul. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}