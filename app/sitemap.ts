import type { MetadataRoute } from "next";
import { PAGE_PATHS, siteUrl } from "@/content/site";

/** Canonical URLs only. No `lastmod`: there is no honest per-page date to give. */
export default function sitemap(): MetadataRoute.Sitemap {
	return PAGE_PATHS.map((path) => ({ url: siteUrl(path) }));
}
