import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/data/site";
import { list } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
	const u = (path: string) => `${site.url}${path}`;
	return [
		{ url: u("/"), priority: 1 },
		{ url: u("/writing"), priority: 0.7 },
		{ url: u("/after-hours"), priority: 0.5 },
		...caseStudies.map((c) => ({ url: u(`/work/${c.slug}`), priority: 0.9 })),
		...list("writing").map((p) => ({ url: u(`/writing/${p.slug}`), lastModified: p.date, priority: 0.6 })),
		...(["logs", "tales", "verses"] as const).flatMap((k) => list(k).map((e) => ({ url: u(`/after-hours/${k}/${e.slug}`), lastModified: e.date, priority: 0.4 }))),
	];
}
