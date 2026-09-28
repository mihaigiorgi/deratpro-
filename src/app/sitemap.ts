import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/** Generează /sitemap.xml — un landing page are o singură pagină. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}