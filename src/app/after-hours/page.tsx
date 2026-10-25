import type { Metadata } from "next";
import { Postcard, TaleCard, VerseSlip } from "@/components/AfterHours";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { list } from "@/lib/content";

export const metadata: Metadata = {
	title: "After hours",
	description: "Logs, short fiction and poems in Hindi and English by Anant Dubey.",
	alternates: { canonical: "/after-hours" },
};

// Slips on the board lean a little, never the same way twice in a row.
const TILTS = [-1.2, 0.8, -0.4, 1.1, -0.9, 0.5];

export default function AfterHours() {
	const logs = list("logs");
	const tales = list("tales");
	const verses = list("verses");

	return (
		<>
			<PaperHeader />
			<main id="main" className="bg-inland text-inland-ink">
				<div className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-10 sm:pt-20">
					<h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.86] font-black uppercase">After hours</h1>
					<p className="mt-4 max-w-[52ch] text-lg">
						The writing I do for myself. Logs about my days, short fiction, and poems in Hindi and English.
					</p>

					<section id="logs" aria-labelledby="logs-h" className="mt-16 scroll-mt-8 border-t-2 border-inland-ink pt-8">
						<div className="flex flex-wrap items-baseline justify-between gap-4">
							<h2 id="logs-h" className="font-display text-5xl leading-none font-black uppercase">
								Logs
							</h2>
							<p>Notes from my days, with a photo for each.</p>
						</div>
						<ul className="mt-8 grid gap-6 md:grid-cols-2">
							{logs.map((e, i) => (
								<li key={e.slug} className="reveal">
									<Postcard entry={e} number={logs.length - i} />
								</li>
							))}
						</ul>
					</section>

					<section id="tales" aria-labelledby="tales-h" className="mt-20 scroll-mt-8 border-t-2 border-inland-ink pt-8">
						<div className="flex flex-wrap items-baseline justify-between gap-4">
							<h2 id="tales-h" className="font-display text-5xl leading-none font-black uppercase">
								Tales
							</h2>
							<p>Short fiction. More parts are on the way.</p>
						</div>
						<ul className="mt-8 grid gap-6 md:grid-cols-2">
							{tales.map((e) => (
								<li key={e.slug} className="reveal">
									<TaleCard entry={e} />
								</li>
							))}
						</ul>
					</section>

					<section id="verses" aria-labelledby="verses-h" className="mt-20 scroll-mt-8 border-t-2 border-inland-ink pt-8">
						<div className="flex flex-wrap items-baseline justify-between gap-4">
							<h2 id="verses-h" className="font-display text-5xl leading-none font-black uppercase">
								Verses
							</h2>
							<p>
								{verses.length} poems in{" "}
								<span lang="hi" className="font-deva">
									हिन्दी
								</span>{" "}
								and English.
							</p>
						</div>
						<ul className="mt-8 gap-6 sm:columns-2 lg:columns-3">
							{verses.map((e, i) => (
								<li key={e.slug} className="reveal mb-6 break-inside-avoid">
									<VerseSlip entry={e} tilt={TILTS[i % TILTS.length]} />
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<PostBox />
		</>
	);
}
