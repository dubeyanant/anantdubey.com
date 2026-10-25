import type { Metadata } from "next";
import Link from "next/link";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { type Kind, formatDate, list } from "@/lib/content";

export const metadata: Metadata = {
	title: "After hours",
	description: "Logs, tales and verses (Hindi and English) by Anant Dubey.",
	alternates: { canonical: "/after-hours" },
};

const shelves: { kind: Kind; title: string; line: string }[] = [
	{ kind: "logs", title: "Logs", line: "Short and casual, the way a friend's notebook reads." },
	{ kind: "tales", title: "Tales", line: "Fiction, in parts." },
	{ kind: "verses", title: "Verses", line: "In हिन्दी and English." },
];

export default function AfterHours() {
	return (
		<>
			<PaperHeader />
			<main id="main" className="bg-inland text-inland-ink">
				<div className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-10 sm:pt-20">
					<h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.86] font-black uppercase">After hours</h1>
					<p className="mt-4 max-w-[52ch] text-lg">What I write when nobody's asked for a pull request.</p>
					{shelves.map((s) => {
						const items = list(s.kind);
						return (
							<section key={s.kind} id={s.kind} className="mt-16 scroll-mt-8 border-t-2 border-inland-ink pt-8">
								<div className="flex flex-wrap items-baseline justify-between gap-4">
									<h2 className="font-display text-5xl leading-none font-black uppercase">{s.title}</h2>
									<p lang={s.kind === "verses" ? "hi" : undefined} className={s.kind === "verses" ? "font-deva text-lg" : ""}>
										{s.line}
									</p>
								</div>
								<ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
									{items.map((e) => {
										const hindi = /[ऀ-ॿ]/.test(e.title);
										return (
											<li key={e.slug}>
												<Link
													href={`/after-hours/${s.kind}/${e.slug}`}
													className="group flex h-full flex-col justify-between gap-4 border-2 border-inland-ink bg-inland-card p-5 no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1"
												>
													<span lang={hindi ? "hi" : undefined} className={`text-xl leading-snug font-bold group-hover:underline ${hindi ? "font-deva font-normal" : ""}`}>
														{e.title}
													</span>
													<span className="font-mono text-[11px] tracking-[0.14em] uppercase tabular-nums">
														{formatDate(e.date)}
														{s.kind !== "verses" && ` · ${e.minutes} min`}
													</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</section>
						);
					})}
				</div>
			</main>
			<PostBox />
		</>
	);
}
