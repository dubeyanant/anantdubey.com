import type { Metadata } from "next";
import Link from "next/link";
import { hasHindi, pieceHref } from "@/components/AfterHours";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { Mask } from "@/components/Mask";
import { type Kind, list } from "@/lib/content";

export const metadata: Metadata = {
	title: "After hours",
	description: "Personal writing by Anant Dubey.",
	alternates: { canonical: "/after-hours" },
};

// A contents page, kept quiet on purpose: titles only, and the pieces open when someone chooses one.
const shelves: { kind: Kind; title: string }[] = [
	{ kind: "logs", title: "Logs" },
	{ kind: "tales", title: "Tales" },
	{ kind: "verses", title: "Verses" },
];

export default function AfterHours() {
	return (
		<>
			<PaperHeader />
			<main id="main" className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-10 sm:pt-20">
				<h1 data-reveal="mask" className="font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.9] font-black uppercase">
					<Mask>After hours</Mask>
				</h1>
				<p data-reveal className="mt-4 max-w-[52ch] text-ink-soft">
					Writing I do for myself.
				</p>
				<div className="mt-14 grid gap-12 border-t-2 border-ink pt-8 md:grid-cols-3 md:gap-10">
					{shelves.map((s) => (
						<section key={s.kind} id={s.kind} aria-labelledby={`${s.kind}-h`} data-reveal className="scroll-mt-8">
							<h2 id={`${s.kind}-h`} className="catalogue text-ink-mute">
								{s.title}
							</h2>
							<ol className="mt-4">
								{list(s.kind).map((e) => {
									const hindi = hasHindi(e.title);
									return (
										<li key={e.slug} className="border-t border-rule first:border-t-0">
											<Link href={pieceHref(e)} className="group flex items-baseline justify-between gap-4 py-2.5 no-underline">
												<span lang={hindi ? "hi" : undefined} className={`group-hover:underline ${hindi ? "font-deva" : ""}`}>
													{e.title}
													{e.part && <span className="text-ink-mute"> · {e.part}</span>}
												</span>
												<span className="shrink-0 catalogue text-ink-mute">{e.date.slice(0, 4)}</span>
											</Link>
										</li>
									);
								})}
							</ol>
						</section>
					))}
				</div>
			</main>
			<PostBox />
		</>
	);
}
