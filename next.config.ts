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
	async rewrites() {
		return [
			// Standalone static pages that app-store listings link to. Keep these URLs stable.
			{ source: "/chitt", destination: "/chitt/index.html" },
			{ source: "/coach", destination: "/coach/index.html" },
			{ source: "/coach/privacy", destination: "/coach/privacy.html" },
			{ source: "/coach/terms", destination: "/coach/terms.html" },
			{ source: "/coach/delete-account", destination: "/coach/delete-account.html" },
		];
	},
};

export default nextConfig;
