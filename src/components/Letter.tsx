import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { hasHindi } from "@/components/AfterHours";
import { type Entry, formatDate, kindLabel, render } from "@/lib/content";

type Neighbour = { href: string; title: string };

/** A single piece of writing, read on inland-letter paper. Verses keep their line breaks and sit centred. */
export async function Letter({
	entry,
	back,
	prev,
	next,
}: {
	entry: Entry;
	back: { href: string; label: string };
	prev?: Neighbour;
	next?: Neighbour;
}) {
	const verse = entry.kind === "verses";
	const html = verse ? null : await render(entry.body);
	const hindiTitle = hasHindi(entry.title);
	const hindiBody = hasHindi(entry.body);
	// Tech writing reads on inland-letter blue; personal pieces sit on plain paper, quietly.
	const quiet = entry.kind !== "writing";
	const ground = quiet ? "bg-paper-shade text-ink" : "bg-inland text-inland-ink";
	const rule = quiet ? "border-rule" : "border-inland-ink";

	return (
		<main id="main" className={ground}>
			<div className="mx-auto max-w-4xl px-5 pt-10 pb-24 sm:px-10 sm:pt-14">
				<Link href={back.href} className="inline-flex items-center gap-2 py-2 text-sm font-bold">
					<ArrowLeft className="size-4" aria-hidden="true" />
					{back.label}
				</Link>
				<article
					className={`mt-6 overflow-hidden border-2 ${rule} bg-paper text-ink [animation:print-in_700ms_var(--ease-out-expo)_both] ${
						verse ? "px-6 py-14 text-center sm:px-16 sm:py-20" : "px-5 py-10 sm:px-12 sm:py-14"
					}`}
				>
					{entry.headerImg && (
						// biome-ignore lint/performance/noImgElement: static header art from the old blog, already sized
						<img
							src={`/after-hours/${entry.headerImg}`}
							alt=""
							className="-mx-5 -mt-10 mb-10 aspect-[16/9] w-[calc(100%+2.5rem)] max-w-none border-b-2 border-rule object-cover sm:-mx-12 sm:-mt-14 sm:w-[calc(100%+6rem)]"
						/>
					)}
					{entry.part && <p className="catalogue text-post">{entry.part}</p>}
					<h1
						lang={hindiTitle ? "hi" : undefined}
						className={`${quiet ? "text-[clamp(2rem,4.5vw,3rem)]" : "text-[clamp(2.4rem,6vw,4.2rem)]"} leading-[0.95] ${entry.part ? "mt-2" : ""} ${
							hindiTitle ? "font-deva" : "font-display font-black uppercase"
						}`}
					>
						{entry.title}
					</h1>
					{entry.subTitle && <p className="mt-4 text-lg text-ink-soft italic">{entry.subTitle}</p>}
					<p className="mt-5 catalogue text-ink-mute">
						{kindLabel[entry.kind]} · {formatDate(entry.date)}
						{!verse && ` · ${entry.minutes} min read`}
						{entry.wip && " · Still writing"}
					</p>
					{html ? (
						// biome-ignore lint/security/noDangerouslySetInnerHtml: markdown rendered at build time from Anant's own files
						<div className="prose-letter mt-8" dangerouslySetInnerHTML={{ __html: html }} />
					) : (
						<p
							lang={hindiBody ? "hi" : undefined}
							className={`verse mx-auto mt-12 max-w-[34ch] text-ink-soft ${hindiBody ? "font-deva text-[1.3rem]" : "text-[1.15rem]"}`}
						>
							{entry.body.trim()}
						</p>
					)}
					{entry.canonical && (
						<p className="mt-12 border-t border-rule pt-5 text-sm text-ink-mute">
							First published on{" "}
							<a href={entry.canonical} className="text-ultra">
								tech.anantdubey.com
							</a>
							.
						</p>
					)}
				</article>

				{(prev || next) && (
					<nav aria-label="More to read" className="mt-10 grid gap-4 sm:grid-cols-2">
						{prev ? <NeighbourLink n={prev} label="Newer" dir="prev" rule={rule} /> : <span />}
						{next && <NeighbourLink n={next} label="Older" dir="next" rule={rule} />}
					</nav>
				)}
			</div>
		</main>
	);
}

function NeighbourLink({ n, label, dir, rule }: { n: Neighbour; label: string; dir: "prev" | "next"; rule: string }) {
	const hindi = hasHindi(n.title);
	const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
	return (
		<Link
			href={n.href}
			className={`group flex items-center gap-4 border-2 ${rule} px-5 py-4 no-underline transition-colors hover:bg-ink hover:text-paper ${
				dir === "next" ? "flex-row-reverse text-right" : ""
			}`}
		>
			<Icon
				className={`size-5 shrink-0 transition-transform duration-500 ease-out-expo ${dir === "prev" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
				aria-hidden="true"
			/>
			<span className="flex-1">
				<span className="block catalogue">{label}</span>
				<span lang={hindi ? "hi" : undefined} className={`font-bold ${hindi ? "font-deva" : ""}`}>
					{n.title}
				</span>
			</span>
		</Link>
	);
}
