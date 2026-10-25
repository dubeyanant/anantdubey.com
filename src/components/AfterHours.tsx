import Link from "next/link";
import { type Entry, formatDate } from "@/lib/content";

const DEVANAGARI = /[ऀ-ॿ]/;

export const hasHindi = (text: string) => DEVANAGARI.test(text);

export const pieceHref = (e: Entry) => `/after-hours/${e.kind}/${e.slug}`;

/** A log, sent as a picture postcard: the photo on the front, a mini stamp in the corner. */
export function Postcard({ entry, number }: { entry: Entry; number: number }) {
	return (
		<Link
			href={pieceHref(entry)}
			className="group relative flex h-full flex-col border-2 border-inland-ink bg-paper text-ink no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:-rotate-[0.4deg]"
		>
			{entry.headerImg && (
				<div className="aspect-[16/10] overflow-hidden border-b-2 border-inland-ink">
					{/* biome-ignore lint/performance/noImgElement: static header art from the old blog, already sized */}
					<img
						src={`/after-hours/${entry.headerImg}`}
						alt=""
						loading="lazy"
						className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
					/>
				</div>
			)}
			<span
				aria-hidden="true"
				className="perforated absolute top-3 right-3 grid size-14 rotate-3 place-items-center p-1.5 text-post transition-transform duration-500 ease-out-expo group-hover:rotate-0"
				style={{ "--hole": "transparent" } as React.CSSProperties}
			>
				<span className="grid size-full place-items-center border border-current font-display text-xl leading-none font-black">
					{String(number).padStart(2, "0")}
				</span>
			</span>
			<div className="flex flex-1 flex-col gap-2 p-5">
				<h3 className="text-xl leading-snug font-bold group-hover:underline">{entry.title}</h3>
				{entry.subTitle && <p className="text-[15px] leading-relaxed text-ink-soft italic">{entry.subTitle}</p>}
				<p className="mt-auto pt-2 catalogue text-ink-mute">
					{formatDate(entry.date)} · {entry.minutes} min{entry.wip && " · Still writing"}
				</p>
			</div>
		</Link>
	);
}

/** A tale, as the first page of a manuscript. */
export function TaleCard({ entry }: { entry: Entry }) {
	return (
		<Link
			href={pieceHref(entry)}
			className="group flex h-full flex-col gap-4 border-2 border-inland-ink bg-paper p-6 text-ink no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1"
		>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-display text-[2.2rem] leading-[0.9] font-black uppercase group-hover:underline">{entry.title}</h3>
				{entry.part && <span className="shrink-0 catalogue text-post">{entry.part}</span>}
			</div>
			<p className="text-[15px] leading-relaxed text-ink-soft">{entry.excerpt}</p>
			<p className="mt-auto catalogue text-ink-mute">
				{formatDate(entry.date)} · {entry.minutes} min
			</p>
		</Link>
	);
}

/** A verse, as a slip of paper with its first lines. Slips sit slightly askew until you reach for one. */
export function VerseSlip({ entry, tilt = 0 }: { entry: Entry; tilt?: number }) {
	const hindi = hasHindi(entry.excerpt) || hasHindi(entry.title);
	return (
		<Link
			href={pieceHref(entry)}
			lang={hindi ? "hi" : undefined}
			style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
			className="group block rotate-[var(--tilt)] border border-inland-ink/50 bg-paper px-6 pt-6 pb-5 text-ink no-underline shadow-[0_1px_0_rgba(20,50,92,0.25)] transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-0"
		>
			<p className={`verse text-ink-soft ${hindi ? "font-deva text-[1.3rem]" : "text-[1.15rem]"}`}>{entry.excerpt}</p>
			<div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule pt-3">
				<h3 className={`font-bold group-hover:underline ${hindi ? "font-deva text-lg" : ""}`}>{entry.title}</h3>
				<span className="shrink-0 catalogue text-ink-mute">{entry.date.slice(0, 4)}</span>
			</div>
		</Link>
	);
}
