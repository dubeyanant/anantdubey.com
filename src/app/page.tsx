import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PostBox, Selvedge } from "@/components/Chrome";
import { Mask } from "@/components/Mask";
import { Arrowed, StampFace, inkClass } from "@/components/Stamp";
import { StampLink } from "@/components/StampLink";
import { TransitionLink } from "@/components/Transition";
import { album, caseStudies, experience, sheet, site, skills } from "@/data/site";
import { formatDate, list } from "@/lib/content";

const ALBUM_FORMATS = ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"];

/** A stamp that opens a case study floods the screen with that study's ink on the way there. */
function coverFor(href: string) {
	const c = caseStudies.find((x) => `/work/${x.slug}` === href);
	return c && { title: c.title, color: `var(--color-${c.ink})` };
}

export default function Home() {
	const [fno, ...singles] = sheet;
	const posts = list("writing").slice(0, 4);

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
				href={site.social.linkedin}
				className="inline-flex items-center gap-2.5 border-2 border-paper px-6 py-[14px] font-bold text-paper no-underline transition-colors hover:bg-paper hover:text-post"
			>
				LinkedIn
				<ArrowUpRight className="size-5" aria-hidden="true" />
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
								<span className="block [animation:name-in_900ms_var(--ease-out-expo)_both]">Anant</span>
								<span className="block [animation:name-in_900ms_var(--ease-out-expo)_90ms_both]">Dubey</span>
							</h1>
							<p lang="hi" className="mt-3 font-deva text-xl sm:text-3xl">
								{site.nameDeva}
							</p>
							<p className="mt-4 max-w-[30ch] text-[clamp(1.1rem,1.7vw,1.6rem)] leading-[1.35] font-semibold lg:mt-6">
								{site.claim.lead}{" "}
								<span className="inline-block bg-paper px-1.5 whitespace-nowrap text-post [animation:ink-in_700ms_var(--ease-out-expo)_550ms_both]">
									{site.claim.chip}
								</span>
								{site.claim.tail}
							</p>
							<div className="mt-8 hidden flex-wrap gap-3 lg:flex">{ctas}</div>
							<p className="mt-auto hidden pt-10 catalogue lg:block">
								Each stamp is something I shipped.
								<br />
								Click one to tear it off and read about it.
							</p>
						</div>

						{/* Desktop: a pane of stamps. Phone: a coil you swipe. */}
						<section aria-label="Selected work, as a sheet of stamps" className="min-w-0">
							<ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pt-2 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(13rem,1fr))] lg:gap-6 lg:overflow-visible lg:p-0">
								<li className="w-[85vw] max-w-sm shrink-0 snap-start lg:col-span-2 lg:row-span-2 lg:w-auto lg:max-w-none">
									<StampLink slug={fno.slug} href={fno.href} label={`${fno.denomination} ${fno.caption}`} cover={coverFor(fno.href)} postmark={fno.postmark} order={0} className="h-full">
										<div className="h-[21rem] lg:h-full">
											<StampFace stamp={fno} size="hero" />
										</div>
									</StampLink>
								</li>
								{singles.map((s, i) => (
									<li key={s.slug} className="w-[70vw] max-w-72 shrink-0 snap-start lg:w-auto lg:max-w-none">
										<StampLink slug={s.slug} href={s.href} label={`${s.denomination}: ${s.caption}`} cover={coverFor(s.href)} order={i + 1} className="h-full">
											<div className="h-[17rem] lg:h-full">
												<StampFace stamp={s} />
											</div>
										</StampLink>
									</li>
								))}
							</ul>
						</section>
						<div className="-mt-3 flex flex-wrap gap-3 lg:hidden">{ctas}</div>
					</div>
				</div>
			</header>

			<main id="main">
				{/* Four in detail. */}
				<section id="work" className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-10 sm:pt-28">
					<h2 data-reveal="mask" className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">
						<Mask>The work</Mask>
					</h2>
					<p data-reveal className="mt-4 max-w-[52ch] text-lg text-ink-soft">
						Four projects in detail. The rest are in the album below.
					</p>
					<ol className="mt-12">
						{caseStudies.map((c) => (
							<li key={c.slug} data-reveal className="border-t-2 border-ink">
								<TransitionLink
									href={`/work/${c.slug}`}
									title={c.title}
									color={`var(--color-${c.ink})`}
									className="group grid gap-x-10 gap-y-3 py-8 no-underline sm:grid-cols-[1fr_auto] sm:py-10"
								>
									<div>
										<h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-bold group-hover:underline">{c.title}</h3>
										<p className="mt-2 max-w-[60ch] text-ink-soft">{c.summary}</p>
										<p className="mt-4 catalogue text-ink-mute">
											{c.year} · {c.stack.join(" · ")}
										</p>
									</div>
									<p
										className={`order-first font-display text-[clamp(3rem,6vw,5rem)] leading-[0.85] font-black uppercase sm:order-none sm:text-right ${inkClass[c.ink]}`}
									>
										<Arrowed value={c.denomination} />
									</p>
								</TransitionLink>
							</li>
						))}
					</ol>
				</section>

				{/* The album: everything else, mounted as stamps of mixed formats on a dark stockbook leaf. */}
				<section id="album" className="bg-leaf text-paper">
					<div className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-24">
						<h2 data-reveal="mask" className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">
						<Mask>The album</Mask>
					</h2>
						<p data-reveal className="mt-4 max-w-[52ch] text-lg text-paper-shade">My side projects and hackathon builds.</p>
						<ul className="mt-12 grid grid-flow-dense gap-7 sm:grid-cols-2 lg:grid-cols-6">
							{album.map((a, i) => {
								// Formats vary like a real issue: a tall lead, a wide commemorative, two hackathon halves.
								const format = ALBUM_FORMATS[i] ?? "lg:col-span-2";
								const face = (
									<div className={`flex h-full flex-col gap-3 border-2 border-current p-4 ${inkClass[a.ink]}`}>
										<h3 className={`font-display leading-[0.9] font-black uppercase ${i === 0 ? "text-[2.6rem]" : "text-[2rem]"}`}>{a.title}</h3>
										<p className="text-[15px] leading-relaxed text-ink-soft">{a.blurb}</p>
										<div className="mt-auto flex items-end justify-between gap-3 pt-2">
											<p className="catalogue">
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
								const paper = "perforated block h-full p-2.5";
								const hole = { "--hole": "var(--color-leaf)" } as React.CSSProperties;
								return (
									<li key={a.title} data-reveal className={format}>
										{a.href ? (
											<a
												href={a.href}
												style={hole}
												className={`${paper} origin-top no-underline transition-[transform,filter] duration-500 ease-out-expo hover:[transform:perspective(900px)_rotateX(7deg)_translateY(-5px)_rotate(-0.6deg)] hover:drop-shadow-[0_16px_18px_rgba(0,0,0,0.45)]`}
											>
												{face}
											</a>
										) : (
											<div style={hole} className={paper}>
												{face}
											</div>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* The route: where the stamps were issued. */}
				<section id="experience" className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-28">
					<h2 data-reveal="mask" className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">
						<Mask>Experience</Mask>
					</h2>
					<p data-reveal className="mt-4 max-w-[52ch] text-lg text-ink-soft">
						I've worked on Sharekhan's trading app since 2024 and was promoted within two years.
					</p>
					<ol className="mt-12">
						{experience.map((e) => (
							<li key={e.role} data-reveal className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
								<p className="catalogue text-ink-mute">{e.years}</p>
								<div>
									<h3 className="text-xl font-bold">
										{e.role} <span className="font-normal text-ink-mute">· {e.org}</span>
									</h3>
									<p className="mt-1.5 max-w-[65ch] text-ink-soft">{e.detail}</p>
								</div>
							</li>
						))}
					</ol>
					<dl data-reveal className="mt-12 grid gap-x-10 gap-y-6 border-t-2 border-ink pt-8 sm:grid-cols-2">
						{skills.map(([k, v]) => (
							<div key={k}>
								<dt className="catalogue text-post">{k}</dt>
								<dd className="mt-1.5 text-ink-soft">{v}</dd>
							</div>
						))}
					</dl>
				</section>

				{/* Inland letters: writing, then the quieter after-hours shelf. */}
				<section id="writing" className="bg-inland text-inland-ink">
					<div className="mx-auto max-w-6xl px-5 py-20 sm:px-10 sm:py-24">
						<div className="flex flex-wrap items-end justify-between gap-6">
							<h2 data-reveal="mask" className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-black uppercase">
						<Mask>Writing</Mask>
					</h2>
							<Link href="/writing" className="inline-flex items-center gap-2 py-2 font-bold text-inland-ink">
								All posts
								<ArrowRight className="size-4" aria-hidden="true" />
							</Link>
						</div>
						<ul className="mt-10 grid gap-5 md:grid-cols-2">
							{posts.map((p) => (
								<li key={p.slug} data-reveal>
									<Link
										href={`/writing/${p.slug}`}
										className="group flex h-full flex-col gap-3 border-2 border-inland-ink bg-inland-card p-6 no-underline transition-transform duration-500 ease-out-expo hover:-translate-y-1"
									>
										<h3 className="text-xl leading-snug font-bold group-hover:underline">{p.title}</h3>
										{p.summary && <p className="line-clamp-2 text-[15px] leading-relaxed">{p.summary}</p>}
										<p className="mt-auto catalogue">
											{formatDate(p.date)} · {p.minutes} min
										</p>
									</Link>
								</li>
							))}
						</ul>

						<p data-reveal className="mt-14 border-t border-inland-ink/40 pt-6 text-[15px]">
							Not everything I write is about code.{" "}
							<Link href="/after-hours" className="font-bold text-inland-ink">
								After hours
							</Link>
							.
						</p>
					</div>
				</section>
			</main>

			<PostBox />
		</>
	);
}
