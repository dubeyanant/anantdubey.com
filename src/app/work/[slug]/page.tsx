import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { Mask } from "@/components/Mask";
import { Arrowed, inkClass } from "@/components/Stamp";
import { TransitionLink } from "@/components/Transition";
import { FnoVignette, VoiceVignette } from "@/components/Vignettes";
import { VoiceDemo } from "@/components/VoiceDemo";
import { caseStudies } from "@/data/site";

export function generateStaticParams() {
	return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const c = caseStudies.find((x) => x.slug === slug);
	return c ? { title: c.title, description: c.summary, alternates: { canonical: `/work/${slug}` } } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
	const { slug } = await params;
	const i = caseStudies.findIndex((x) => x.slug === slug);
	if (i < 0) notFound();
	const c = caseStudies[i];
	const next = caseStudies[(i + 1) % caseStudies.length];

	return (
		<>
			<PaperHeader />
			<main id="main" className="mx-auto max-w-6xl px-5 pt-12 pb-24 sm:px-10 sm:pt-16">
				<Link href="/#work" className="inline-flex items-center gap-2 py-2 text-sm font-bold">
					<ArrowLeft className="size-4" aria-hidden="true" />
					All work
				</Link>

				<div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
					<div>
						<h1 data-reveal="mask" className="font-display text-[clamp(3.2rem,8vw,6rem)] leading-[0.88] font-black uppercase">
							<Mask>{c.title}</Mask>
						</h1>
						<p data-reveal className="mt-6 max-w-[48ch] text-xl leading-relaxed text-ink-soft">{c.summary}</p>
						<p className="mt-4 catalogue text-ink-mute uppercase tabular-nums">{c.year} · {c.role}</p>
					</div>
					{/* The case study's own stamp, at single size. */}
					<div className="w-fit shrink-0 bg-post p-5">
						<div className={`perforated w-52 p-3 [animation:land_900ms_var(--ease-out-expo)_calc(var(--arrive,0ms)+150ms)_both] ${inkClass[c.ink]}`}>
							<div className="flex aspect-[4/5] flex-col justify-between border-2 border-current p-3">
								<span className="catalogue">भारत · {c.year}</span>
								{c.slug === "one-click-fno" && (
									<div className="my-3 min-h-0 flex-1 [&>div]:min-h-0">
										<FnoVignette />
									</div>
								)}
								{c.slug === "voice-trading-agent" && <VoiceVignette />}
								<span className="font-display text-6xl leading-[0.85] font-black uppercase">
									<Arrowed value={c.denomination} />
								</span>
							</div>
						</div>
					</div>
				</div>

				<dl data-reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-y border-rule py-5">
					<div>
						<dt className="catalogue text-ink-mute uppercase">Stack</dt>
						<dd className="mt-1 font-semibold">{c.stack.join(", ")}</dd>
					</div>
					{c.links?.map((l) => (
						<div key={l.href}>
							<dt className="catalogue text-ink-mute uppercase">Link</dt>
							<dd className="mt-1">
								<a href={l.href} className="inline-flex items-center gap-1 font-semibold text-ultra">
									{l.label}
									<ArrowUpRight className="size-4" aria-hidden="true" />
								</a>
							</dd>
						</div>
					))}
				</dl>

				{c.slug === "voice-trading-agent" && <VoiceDemo />}

				<article className="prose-letter mt-4">
					{c.sections.map((s) => (
						<section key={s.heading} data-reveal>
							<h2>{s.heading}</h2>
							{s.body.map((p) => (
								<p key={p.slice(0, 40)}>{p}</p>
							))}
						</section>
					))}
					{c.note && <p className="border-t border-rule pt-5 text-base text-ink-mute italic">{c.note}</p>}
				</article>

				<TransitionLink
					href={`/work/${next.slug}`}
					title={next.title}
					color={`var(--color-${next.ink})`}
					className="group mt-20 flex items-center justify-between gap-6 border-t-2 border-ink pt-8 no-underline"
				>
					<span>
						<span className="block catalogue text-ink-mute uppercase">Next stamp</span>
						<span className="mt-1 block text-2xl font-bold group-hover:underline">{next.title}</span>
					</span>
					<ArrowRight className="size-7 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
				</TransitionLink>
			</main>
			<PostBox />
		</>
	);
}
