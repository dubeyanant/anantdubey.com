import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { type Entry, formatDate, kindLabel, render } from "@/lib/content";

/** A single piece of writing, read on inland-letter paper. Verses keep their line breaks. */
export async function Letter({ entry, back }: { entry: Entry; back: { href: string; label: string } }) {
	const html = entry.kind === "verses" ? null : await render(entry.body);
	const hindi = /[ऀ-ॿ]/.test(entry.title);
	return (
		<main id="main" className="bg-inland text-inland-ink">
			<div className="mx-auto max-w-4xl px-5 pt-10 pb-24 sm:px-10 sm:pt-14">
				<Link href={back.href} className="inline-flex items-center gap-2 py-2 text-sm font-bold text-inland-ink">
					<ArrowLeft className="size-4" aria-hidden="true" />
					{back.label}
				</Link>
				<article className="mt-6 border-2 border-inland-ink bg-paper px-5 py-10 text-ink sm:px-12 sm:py-14">
					<h1
						lang={hindi ? "hi" : undefined}
						className={`text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] ${
							hindi ? "font-deva" : "font-display font-black uppercase"
						}`}
					>
						{entry.title}
					</h1>
					{entry.subTitle && <p className="mt-4 text-lg text-ink-soft italic">{entry.subTitle}</p>}
					<p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-ink-mute uppercase tabular-nums">
						{kindLabel[entry.kind]} · {formatDate(entry.date)}
						{entry.kind !== "verses" && ` · ${entry.minutes} min read`}
					</p>
					{entry.headerImg && (
						// biome-ignore lint/performance/noImgElement: static header art from the old blog, already sized
						<img src={`/after-hours/${entry.headerImg}`} alt="" className="mt-8 w-full border border-rule" />
					)}
					{html ? (
						// biome-ignore lint/security/noDangerouslySetInnerHtml: markdown rendered at build time from Anant's own files
						<div className="prose-letter mt-8" dangerouslySetInnerHTML={{ __html: html }} />
					) : (
						<p lang={/[ऀ-ॿ]/.test(entry.body) ? "hi" : undefined} className={`verse mt-8 text-ink-soft ${/[ऀ-ॿ]/.test(entry.body) ? "font-deva" : ""}`}>
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
			</div>
		</main>
	);
}
