import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk, JetBrains_Mono, Tiro_Devanagari_Hindi } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const bigShoulders = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin"], weight: ["700", "900"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500"] });
const tiroDeva = Tiro_Devanagari_Hindi({ variable: "--font-tiro-deva", subsets: ["devanagari"], weight: "400" });

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: `${site.name}: Flutter & AI engineer`, template: `%s · ${site.name}` },
	description: site.description,
	authors: [{ name: site.name, url: site.url }],
	openGraph: { type: "website", siteName: site.name, url: site.url, title: `${site.name}: Flutter & AI engineer`, description: site.description },
	twitter: { card: "summary_large_image", creator: "@_aanant" },
	alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#c8211b" };

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${bigShoulders.variable} ${hanken.variable} ${jetbrains.variable} ${tiroDeva.variable}`}>
			<body className="min-h-dvh bg-paper text-ink">
				<a
					href="#main"
					className="sr-only z-50 bg-ink px-4 py-3 font-bold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
				>
					Skip to content
				</a>
				{children}
			</body>
		</html>
	);
}
