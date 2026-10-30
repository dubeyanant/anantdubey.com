import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
	return { rules: [{ userAgent: "*", allow: "/", disallow: ["/coach/admin", "/coach/admin.html"] }], sitemap: `${site.url}/sitemap.xml` };
}
