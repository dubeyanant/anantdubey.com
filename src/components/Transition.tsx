"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

/** What covers the screen between two pages: a flood of the stamp's ink with the destination's name. */
export type Cover = { href: string; title: string; color: string };

type Phase = "idle" | "in" | "hold" | "out";

const COVER_MS = 520; // the panel wipes up over the page
const EXIT_MS = 760; // and off the top of the next one

const TransitionContext = createContext<{ go: (cover: Cover, delay?: number) => void }>({ go: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

export const prefersReducedMotion = () =>
	typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TransitionProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [cover, setCover] = useState<Cover | null>(null);
	const [phase, setPhase] = useState<Phase>("idle");
	const target = useRef<string | null>(null);
	const phaseRef = useRef<Phase>("idle");
	phaseRef.current = phase;

	const go = useCallback(
		(next: Cover, delay = 0) => {
			if (prefersReducedMotion()) {
				router.push(next.href);
				return;
			}
			router.prefetch(next.href);
			target.current = next.href.split("#")[0];
			window.setTimeout(() => {
				setCover(next);
				setPhase("in");
				window.setTimeout(() => {
					// Content on the arriving page waits for the panel to clear.
					document.documentElement.style.setProperty("--arrive", "420ms");
					setPhase("hold");
					router.push(next.href);
				}, COVER_MS);
			}, delay);
		},
		[router],
	);

	// The new page has rendered under the panel: lift it away.
	useEffect(() => {
		if (phase !== "hold") return;
		if (pathname === target.current) {
			window.scrollTo(0, 0);
			setPhase("out");
			return;
		}
		const failsafe = window.setTimeout(() => setPhase("out"), 3000);
		return () => window.clearTimeout(failsafe);
	}, [pathname, phase]);

	useEffect(() => {
		if (phase !== "out") return;
		const t = window.setTimeout(() => {
			setPhase("idle");
			setCover(null);
			target.current = null;
		}, EXIT_MS);
		return () => window.clearTimeout(t);
	}, [phase]);

	// Sections reveal once as they enter; those entering together stagger.
	useEffect(() => {
		const root = document.documentElement;
		root.classList.add("reveal-live");
		if (!root.classList.contains("reveal-ready")) return;
		const io = new IntersectionObserver(
			(entries) => {
				const entering = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
				const base = phaseRef.current === "idle" ? 0 : 380;
				entering.forEach((e, i) => {
					const el = e.target as HTMLElement;
					el.style.setProperty("--reveal-delay", `${base + i * 90}ms`);
					el.classList.add("is-in");
					io.unobserve(el);
				});
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
		);
		for (const el of document.querySelectorAll("[data-reveal]:not(.is-in)")) io.observe(el);
		return () => io.disconnect();
	}, [pathname]);

	return (
		<TransitionContext.Provider value={{ go }}>
			{children}
			{cover && (
				<div aria-hidden="true" className="page-cover" data-phase={phase} style={{ background: cover.color }}>
					<p className="page-cover-title">
						<span>{cover.title}</span>
					</p>
				</div>
			)}
		</TransitionContext.Provider>
	);
}

/** A link that leaves through the ink-flood transition. */
export function TransitionLink({
	href,
	title,
	color,
	className,
	children,
}: {
	href: string;
	title: string;
	color: string;
	className?: string;
	children: ReactNode;
}) {
	const { go } = usePageTransition();
	const router = useRouter();
	return (
		<a
			href={href}
			className={className}
			onMouseEnter={() => router.prefetch(href)}
			onFocus={() => router.prefetch(href)}
			onClick={(e) => {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
				e.preventDefault();
				go({ href, title, color });
			}}
		>
			{children}
		</a>
	);
}
