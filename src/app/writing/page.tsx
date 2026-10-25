import type { Metadata } from "next";
import Link from "next/link";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { formatDate, list } from "@/lib/content";

export const metadata: Metadata = {
	title: "Writing",
	description: "Technical writing by Anant Dubey on Flutter, Android, Git and building MVPs.",
	alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
	const posts = list("writing");
	return (
		<>
			<PaperHeader />
			<main id="main" className="bg-inland text-inland-ink">
				<div className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-10 sm:pt-20">
					<h1 className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.86] font-black uppercase">Writing</h1>
					<p className="mt-4 max-w-[52ch] text-lg">
						Posts about Flutter, Android, Git and building small products. My personal writing is in{" "}
						<Link href="/after-hours" className="font-bold text-inland-ink">
							after hours
						</Link>
						.
					</p>
					<ol className="mt-12 border-t-2 border-inland-ink">
						{posts.map((p) => (
							<li key={p.slug} className="reveal border-b border-inland-ink/40">
								<Link href={`/writing/${p.slug}`} className="group grid gap-2 py-7 no-underline sm:grid-cols-[10rem_1fr] sm:gap-8">
									<p className="catalogue">{formatDate(p.date)}</p>
									<div>
										<h2 className="text-2xl leading-snug font-bold group-hover:underline">{p.title}</h2>
										{p.summary && <p className="mt-2 max-w-[65ch]">{p.summary}</p>}
										<p className="mt-3 catalogue">
											{p.minutes} min{p.tags.length > 0 && ` · ${p.tags.slice(0, 3).join(" · ")}`}
										</p>
									</div>
								</Link>
							</li>
						))}
					</ol>
				</div>
			</main>
			<PostBox />
		</>
	);
}
