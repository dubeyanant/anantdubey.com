import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

const nav = [
	{ href: "/#work", label: "Work" },
	{ href: "/#experience", label: "Experience" },
	{ href: "/writing", label: "Writing" },
	{ href: "/#contact", label: "Contact" },
];

/** The sheet's selvedge: plate data on the left, navigation printed in the margin on the right. */
export function Selvedge({ tone = "sheet" }: { tone?: "sheet" | "paper" }) {
	const onSheet = tone === "sheet";
	return (
		<div
			className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.16em] uppercase tabular-nums sm:text-xs ${
				onSheet ? "text-paper" : "text-ink"
			}`}
		>
			{onSheet ? (
				<span className="hidden sm:inline">Sheet Nº 2026 · Plate 01 · Mumbai</span>
			) : (
				<Link href="/" className="group flex items-center gap-3 no-underline">
					<span className="perforated inline-grid size-9 place-items-center text-post" style={{ "--hole": "var(--color-paper)" } as React.CSSProperties}>
						<span className="font-display text-base font-black tracking-normal">AD</span>
					</span>
					<span className="group-hover:underline">Anant Dubey</span>
				</Link>
			)}
			<nav aria-label="Primary">
				<ul className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8">
					{nav.map((n) => (
						<li key={n.href}>
							<Link href={n.href} className={`py-2 hover:underline ${onSheet ? "text-paper" : "text-ink"}`}>
								{n.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

/** The issue year, fixed when the site is built (every deploy refreshes it). */
async function issueYear() {
	"use cache";
	return new Date().getFullYear();
}

/** The close: a red post box with a slot, one action, and the quieter links. */
export async function PostBox() {
	const year = await issueYear();
	return (
		<footer id="contact" className="bg-post text-paper">
			<div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-10 sm:py-28">
				<div className="mx-auto mb-10 h-4 w-48 rounded-full bg-ink" aria-hidden="true" />
				<h2 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.85] font-black uppercase">Post a letter</h2>
				<p className="mx-auto mt-6 max-w-[40ch] text-lg leading-relaxed">
					Building something in mobile or AI? Write to me; it goes straight to my inbox.
				</p>
				<a
					href={`mailto:${site.email}`}
					className="mt-9 inline-flex items-center gap-3 bg-ink px-7 py-4 text-lg font-bold text-paper no-underline transition-colors hover:bg-paper hover:text-ink"
				>
					<Mail className="size-5" aria-hidden="true" />
					{site.email}
				</a>
				<ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-xs tracking-[0.16em] uppercase">
					{[
						["Résumé (PDF)", "/anant-dubey-resume.pdf"],
						["LinkedIn", site.social.linkedin],
						["GitHub", site.social.github],
						["X", site.social.x],
						["Google Play", site.social.playStore],
					].map(([label, href]) => (
						<li key={label}>
							<a href={href} className="inline-flex items-center gap-1 py-2 text-paper hover:underline">
								{label}
								<ArrowUpRight className="size-3.5" aria-hidden="true" />
							</a>
						</li>
					))}
				</ul>
				<p className="mt-14 font-mono text-[11px] tracking-[0.16em] uppercase">
					Issued by Anant Dubey · Mumbai · {year}
				</p>
			</div>
		</footer>
	);
}

/** Header for inner pages: the same selvedge, on paper. */
export function PaperHeader() {
	return (
		<header className="border-b border-rule">
			<div className="mx-auto max-w-6xl px-5 py-5 sm:px-10">
				<Selvedge tone="paper" />
			</div>
		</header>
	);
}
