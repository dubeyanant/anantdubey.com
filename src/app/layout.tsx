import type { Metadata, Viewport } from "next";
import { Anek_Devanagari, Anek_Latin, Big_Shoulders } from "next/font/google";
import { TransitionProvider } from "@/components/Transition";
import { site } from "@/data/site";
import "./globals.css";

const bigShoulders = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin"], weight: ["700", "900"] });
// Anek is drawn by Ek Type in Mumbai: one family for English and Hindi, with a width axis for catalogue text.
const anek = Anek_Latin({ variable: "--font-anek", subsets: ["latin"], axes: ["wdth"] });
const anekDeva = Anek_Devanagari({ variable: "--font-anek-deva", subsets: ["devanagari"], axes: ["wdth"] });

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

// Runs before first paint: hide reveal targets only when motion is welcome, and give them back if the app never starts.
const revealBoot = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("reveal-ready");setTimeout(function(){if(!d.classList.contains("reveal-live"))d.classList.remove("reveal-ready")},3000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${bigShoulders.variable} ${anek.variable} ${anekDeva.variable}`} suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed boot snippet, no user input */}
				<script dangerouslySetInnerHTML={{ __html: revealBoot }} />
			</head>
			<body className="min-h-dvh bg-paper text-ink">
				<a
					href="#main"
					className="sr-only z-50 bg-ink px-4 py-3 font-bold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
				>
					Skip to content
				</a>
				<TransitionProvider>{children}</TransitionProvider>
			</body>
		</html>
	);
}
