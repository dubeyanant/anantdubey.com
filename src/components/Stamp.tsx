import { ArrowRight } from "lucide-react";
import type { Ink, SheetStamp } from "@/data/site";
import { FnoVignette, VoiceVignette } from "./Vignettes";

export const inkClass: Record<Ink, string> = {
	ultra: "text-ultra",
	emerald: "text-emerald",
	saffron: "text-saffron",
	plum: "text-plum",
	ink: "text-ink",
};

/** Catalogue line printed along the top of every stamp: issue name and year. */
function Catalogue({ issue, year }: { issue: string; year: string }) {
	return (
		<div className="flex items-baseline justify-between gap-3 catalogue">
			<span>{issue}</span>
			<span>{year}</span>
		</div>
	);
}

function Denomination({ value, size }: { value: string; size: "hero" | "single" }) {
	// Long denominations (Voice→MCP, My People) step down so they always fit their stamp.
	const long = value.length > 6;
	const cls =
		size === "hero"
			? "text-[clamp(5.5rem,10vw,9.5rem)] leading-[0.82]"
			: long
				? "text-[clamp(2.2rem,2.7vw,2.7rem)] leading-[0.9]"
				: "text-[clamp(2.6rem,3.6vw,3.6rem)] leading-[0.86]";
	return (
		<p className={`font-display font-black tracking-tight uppercase ${cls}`}>
			<Arrowed value={value} />
		</p>
	);
}

/** A trend reads as a trend: "2MO→4D" prints with a drawn arrow between the before and after. */
export function Arrowed({ value }: { value: string }) {
	const [before, after] = value.split("→");
	if (!after) return <>{value}</>;
	return (
		<span className="inline-flex items-center gap-[0.08em]">
			{before}
			<ArrowRight aria-label="to" className="size-[0.62em]" strokeWidth={3} />
			{after}
		</span>
	);
}

/** One stamp's face. The perforated paper is drawn by the `perforated` utility; `hole` is the ground it sits on. */
export function StampFace({ stamp, size = "single", hole }: { stamp: SheetStamp; size?: "hero" | "single"; hole?: string }) {
	const hero = size === "hero";
	return (
		<article
			className={`perforated h-full ${inkClass[stamp.ink]} ${hero ? "p-4" : "p-3"}`}
			style={hole ? ({ "--hole": hole } as React.CSSProperties) : undefined}
		>
			<div className={`flex h-full flex-col justify-between gap-3 border-current ${hero ? "border-[3px] p-4" : "border-2 p-3"}`}>
				<Catalogue issue={stamp.issue} year={stamp.year} />
				{stamp.vignette === "fno" && (
					<div className="min-h-0 flex-1">
						<FnoVignette />
					</div>
				)}
				{stamp.vignette === "voice" && <VoiceVignette />}
				<div className={hero ? "flex items-end justify-between gap-6" : ""}>
					<Denomination value={stamp.denomination} size={size} />
					<p className={`font-bold ${hero ? "max-w-[22ch] text-right text-sm leading-snug" : "mt-2 text-[13px] leading-snug"}`}>
						{stamp.caption}
					</p>
				</div>
			</div>
		</article>
	);
}
