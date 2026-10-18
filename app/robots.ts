import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/** Every crawler may read every page, AI search bots included: being cited is the point. */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: siteUrl("/sitemap.xml"),
	};
}
