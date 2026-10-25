import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { PostBox, Selvedge } from "@/components/Chrome";
import { Arrowed, StampFace, inkClass } from "@/components/Stamp";
import { StampLink } from "@/components/StampLink";
import { album, caseStudies, experience, sheet, site, skills } from "@/data/site";
import { formatDate, list } from "@/lib/content";

export default function Home() {
	const [fno, ...singles] = sheet;
	const posts = list("writing").slice(0, 4);
	const counts = { logs: list("logs").length, tales: list("tales").length, verses: list("verses").length };

	// Shown beside the name on desktop, and after the coil of stamps on phones so the work leads.
	const ctas = (
		<>
			<a
				href="#contact"
				className="inline-flex items-center gap-2.5 bg-ink px-6 py-4 font-bold text-paper no-underline transition-colors hover:bg-paper hover:text-ink"
			>
				Post a letter
				<ArrowRight className="size-5" aria-hidden="true" />
			</a>
			<a
				href="/anant-dubey-resume.pdf"
				className="inline-flex items-center gap-2.5 border-2 border-paper px-6 py-[14px] font-bold text-paper no-underline transition-colors hover:bg-paper hover:text-post"
			>
				<FileText className="size-5" aria-hidden="true" />
				Résumé PDF
			</a>
		</>
	);

	return (
		<>
			{/* The sheet: the only red screen, the work leads. */}
			<header className="bg-post text-paper">
				<div className="mx-auto max-w-[1440px] px-5 pt-5 pb-10 sm:px-10 sm:pt-7 lg:pb-14">
					<Selvedge />
					<div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-12">
						<div className="flex flex-col">
							<h1 className="font-display text-[clamp(4.4rem,11.5vw,10.5rem)] leading-[0.84] font-black tracking-[-0.01em] uppercase">
								Anant
								<br />
								Dubey
							</h1>
							<p lang="hi" className="mt-3 font-deva text-xl sm:text-3xl">
								{site.nameDeva}
							</p>
							<p className="mt-4 max-w-[30ch] text-[clamp(1.1rem,1.7vw,1.6rem)] leading-[1.35] font-semibold lg:mt-6">
								{site.claim.lead}{" "}
								<span className="bg-paper px-1.5 whitespace-nowrap text-post">{site.claim.chip}</span>
								{site.claim.tail}
							</p>
							<div className="mt-8 hidden flex-wrap gap-3 lg:flex">{ctas}</div>
							<p className="mt-auto hidden pt-10 font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase lg:block">
								Perf. 13½ · Printed in Flutter, Dart &amp; Next.js
								<br />
								Each stamp is a shipped thing. Tear one off to open it.
							</p>
						</div>

						{/* Desktop: a pane of stamps. Phone: a coil you swipe. */}
						<section aria-label="Selected work, as a sheet of stamps" className="min-w-0">
							<ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pt-2 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(13rem,1fr))] lg:gap-6 lg:overflow-visible lg:p-0">
								<li className="w-[85vw] max-w-sm shrink-0 snap-start lg:col-span-2 lg:row-span-2 lg:w-auto lg:max-w-none">
									<StampLink slug={fno.slug} href={fno.href} label={`${fno.denomination} ${fno.caption}`} postmark={fno.postmark} className="h-full">
										<div className="h-[21rem] lg:h-full">
											<StampFace stamp={fno} size="hero" />
										</div>
									</StampLink>
								</li>
								{singles.map((s) => (
									<li key={s.slug} className="w-[70vw] max-w-72 shrink-0 snap-start lg:w-auto lg:max-w-none">
										<StampLink slug={s.slug} href={s.href} label={`${s.denomination}: ${s.caption}`} className="h-full">
											<div className="h-[17rem] lg:h-full">
												<StampFace stamp={s} />
											</div>
										</StampLink>
									</li>
								))}
								<li className="hidden border-2 border-dashed border-paper p-4 font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase lg:flex lg:items-end">
									Next issue:
									<br />
									unprinted.
								</li>
							</ul>
						</section>
						<div className="-mt-3 flex flex-wrap gap-3 lg:hidden">{ctas}</div>
					</div>
				</div>
			</header>

			<main id="main">
				{/* Four told properly. */}
				<section id="work" className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-10 sm:pt-28">
					<h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">The work</h2>
					<p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
						Four things I built, told properly. Everything else is in the album further down.
					</p>
					<ol className="mt-12">
						{caseStudies.map((c) => (
							<li key={c.slug} className="border-t-2 border-ink">
								<Link
									href={`/work/${c.slug}`}
									className="group grid gap-x-10 gap-y-3 py-8 no-underline sm:grid-cols-[1fr_auto] sm:py-10"
								>
									<div>
										<h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-bold group-hover:underline">{c.title}</h3>
										<p className="mt-2 max-w-[60ch] text-ink-soft">{c.summary}</p>
										<p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-ink-mute uppercase">
											{c.year} · {c.stack.join(" · ")}
										</p>
									</div>
									<p
										className={`order-first font-display text-[clamp(3rem,6vw,5rem)] leading-[0.85] font-black uppercase sm:order-none sm:text-right ${inkClass[c.ink]}`}
									>
										<Arrowed value={c.denomination} />
									</p>
								</Link>
							</li>
						))}
					</ol>
				</section>

				{/* The album: everything else, mounted as stamps of mixed formats on a dark stockbook leaf. */}
				<section id="album" className="bg-[#221d19] text-paper">
					<div className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-24">
						<h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">The album</h2>
						<p className="mt-4 max-w-[52ch] text-lg text-paper-shade">Apps, packages and hackathon builds, the liveliest first.</p>
						<ul className="mt-12 grid grid-flow-dense gap-7 sm:grid-cols-2 lg:grid-cols-6">
							{album.map((a, i) => {
								// Formats vary like a real issue: a tall lead, wide commemoratives, square definitives.
								const format = i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 4 ? "lg:col-span-4" : "lg:col-span-2";
								const face = (
									<div className={`flex h-full flex-col gap-3 border-2 border-current p-4 ${inkClass[a.ink]}`}>
										<h3 className={`font-display leading-[0.9] font-black uppercase ${i === 0 ? "text-[2.6rem]" : "text-[2rem]"}`}>{a.title}</h3>
										<p className="text-[15px] leading-relaxed text-ink-soft">{a.blurb}</p>
										<div className="mt-auto flex items-end justify-between gap-3 pt-2">
											<p className="font-mono text-[11px] leading-snug tracking-[0.14em] uppercase">
												{a.kind}
												<br />
												{a.status}
											</p>
											{a.href && (
												<span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold">
													{a.href.startsWith("/") ? "Open" : "Visit"}
													<ArrowUpRight className="size-4" aria-hidden="true" />
												</span>
											)}
										</div>
									</div>
								);
								return (
									<li key={a.title} className={`perforated p-2.5 ${format}`} style={{ "--hole": "#221d19" } as React.CSSProperties}>
										{a.href ? (
											<a href={a.href} className="block h-full no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1">
												{face}
											</a>
										) : (
											face
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* The route: where the stamps were issued. */}
				<section id="experience" className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-28">
					<h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">Experience</h2>
					<p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
						Two and a half years shipping a live trading app, promoted in under two.
					</p>
					<ol className="mt-12">
						{experience.map((e) => (
							<li key={e.role} className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
								<p className="font-mono text-xs tracking-[0.14em] text-ink-mute uppercase tabular-nums">{e.years}</p>
								<div>
									<h3 className="text-xl font-bold">
										{e.role} <span className="font-normal text-ink-mute">· {e.org}</span>
									</h3>
									<p className="mt-1.5 max-w-[65ch] text-ink-soft">{e.detail}</p>
								</div>
							</li>
						))}
					</ol>
					<dl className="mt-12 grid gap-x-10 gap-y-6 border-t-2 border-ink pt-8 sm:grid-cols-2">
						{skills.map(([k, v]) => (
							<div key={k}>
								<dt className="font-mono text-xs tracking-[0.14em] text-post uppercase">{k}</dt>
								<dd className="mt-1.5 text-ink-soft">{v}</dd>
							</div>
						))}
					</dl>
				</section>

				{/* Inland letters: writing, then the quieter after-hours shelf. */}
				<section id="writing" className="bg-inland text-inland-ink">
					<div className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-24">
						<div className="flex flex-wrap items-end justify-between gap-6">
							<h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">Writing</h2>
							<Link href="/writing" className="inline-flex items-center gap-2 py-2 font-bold text-inland-ink">
								All posts
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
						</div>
						<ul className="mt-10 grid gap-5 md:grid-cols-2">
							{posts.map((p) => (
								<li key={p.slug}>
									<Link
										href={`/writing/${p.slug}`}
										className="group flex h-full flex-col gap-3 border-2 border-inland-ink bg-inland-card p-6 no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1"
									>
										<h3 className="text-xl leading-snug font-bold group-hover:underline">{p.title}</h3>
										{p.summary && <p className="line-clamp-2 text-[15px] leading-relaxed">{p.summary}</p>}
										<p className="mt-auto font-mono text-[11px] tracking-[0.14em] uppercase tabular-nums">
											{formatDate(p.date)} · {p.minutes} min
										</p>
									</Link>
								</li>
							))}
						</ul>

						<div className="mt-16 border-t-2 border-inland-ink pt-10">
							<h3 className="font-display text-4xl leading-none font-black uppercase">After hours</h3>
							<p className="mt-3 max-w-[56ch]">Short logs, two tales, and verses in Hindi and English.</p>
							<ul className="mt-8 grid gap-4 sm:grid-cols-3">
								{(
									[
										["logs", "Logs", "Short, casual notes"],
										["tales", "Tales", "Fiction"],
										["verses", "Verses", "हिन्दी & English"],
									] as const
								).map(([kind, label, sub]) => (
									<li key={kind}>
										<Link
											href={`/after-hours#${kind}`}
											className="group flex items-baseline justify-between gap-4 border-2 border-inland-ink px-5 py-4 no-underline transition-colors hover:bg-inland-ink hover:text-inland"
										>
											<span>
												<span className="block text-lg font-bold">{label}</span>
												<span className="text-sm">{sub}</span>
											</span>
											<span className="font-display text-3xl font-black tabular-nums">{counts[kind]}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</main>

			<PostBox />
		</>
	);
}
