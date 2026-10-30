import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	async redirects() {
		return [
			// Letters were folded into logs.
			{ source: "/after-hours/letters/:slug", destination: "/after-hours/logs/:slug", permanent: true },
			// Tales that were excerpts are now the full stories; the unfinished log is gone.
			{ source: "/after-hours/tales/night-stroll-part1", destination: "/after-hours/tales/night-stroll", permanent: true },
			{ source: "/after-hours/tales/the-divinity-part1", destination: "/after-hours/tales/the-divinity-and-her-servants", permanent: true },
			{ source: "/after-hours/logs/too-many-neurons", destination: "/after-hours", permanent: false },
		];
	},
	async rewrites() {
		return [
			// Standalone static pages that app-store listings link to. Keep these URLs stable.
			{ source: "/chitt", destination: "/chitt/index.html" },
			{ source: "/coach", destination: "/coach/index.html" },
			{ source: "/coach/privacy", destination: "/coach/privacy.html" },
			{ source: "/coach/terms", destination: "/coach/terms.html" },
			{ source: "/coach/delete-account", destination: "/coach/delete-account.html" },
			// The owner's dashboard, unlinked and kept out of search (noindex, robots).
			{ source: "/coach/admin", destination: "/coach/admin.html" },
			// Coach's Supabase, passed through for the dashboard: some Indian networks can't look up supabase.co.
			{ source: "/coach/supabase/:path*", destination: "https://ymvksencarmukmngwppk.supabase.co/:path*" },
		];
	},
};

export default nextConfig;
