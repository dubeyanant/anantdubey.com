"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Postmark } from "./Postmark";
import { prefersReducedMotion, usePageTransition } from "./Transition";

const KEY = "cancelled-stamps";

function readCancelled(): string[] {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? "[]");
	} catch {
		return [];
	}
}

function markCancelled(slug: string) {
	try {
		const all = new Set(readCancelled());
		all.add(slug);
		localStorage.setItem(KEY, JSON.stringify([...all]));
	} catch {
		// storage unavailable (private mode): the stamp just won't stay cancelled
	}
}

type Tear = { w: number; h: number; left: string; right: string; edge: string; pivot: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * The line a tear takes through a w×h stamp, passing through the point that was pressed.
 * Real tears never run straight: the fibre grain bends them (a slow, correlated drift),
 * and fibres pull out unevenly along the edge (small alternating teeth).
 */
function planTear(w: number, h: number, px: number, py: number): Tear {
	const top = clamp(px + rand(-0.07, 0.07) * w, 0.12 * w, 0.88 * w);
	const bottom = clamp(px + rand(-0.1, 0.1) * w, 0.12 * w, 0.88 * w);
	const steps = Math.max(16, Math.round(h / 8));
	const pts: [number, number][] = [];
	let drift = 0;
	for (let i = 0; i <= steps; i++) {
		const y = (h * i) / steps;
		const base = y <= py ? top + (px - top) * (y / Math.max(py, 1)) : px + (bottom - px) * ((y - py) / Math.max(h - py, 1));
		drift = drift * 0.65 + rand(-3.2, 3.2);
		const teeth = (i % 2 ? 1 : -1) * rand(0.5, 2.4);
		const x = i === 0 || i === steps ? base : base + drift + teeth;
		pts.push([clamp(x, 3, w - 3), y]);
	}
	const line = pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(", ");
	return {
		w,
		h,
		left: `polygon(0px 0px, ${line}, 0px ${h}px)`,
		right: `polygon(${w}px 0px, ${line}, ${w}px ${h}px)`,
		edge: `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`,
		pivot: pts[pts.length - 1][0],
	};
}

/**
 * A stamp you can tear off the sheet.
 * Load: it is printed onto the sheet in turn (`order` staggers it).
 * Hover/focus: it peels up on its hinge.
 * Click: it tears where you pressed, the halves twist apart and drop, and its ink floods into the next page.
 * Opened stamps carry a postmark from then on.
 */
export function StampLink({
	slug,
	href,
	label,
	cover,
	postmark,
	order = 0,
	className = "",
	children,
}: {
	slug: string;
	href: string;
	label: string;
	/** Destination title and ink for the page transition; omit for in-page anchors. */
	cover?: { title: string; color: string };
	postmark?: string[];
	order?: number;
	className?: string;
	children: ReactNode;
}) {
	const { go } = usePageTransition();
	const [cancelled, setCancelled] = useState(false);
	const [tear, setTear] = useState<Tear | null>(null);
	const faceRef = useRef<HTMLDivElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCancelled(readCancelled().includes(slug));
	}, [slug]);

	// Run the tear: the crack races down (accelerating, like a real tear), the halves open into a V, then fall.
	useLayoutEffect(() => {
		if (!tear || !leftRef.current || !rightRef.current) return;
		const fall = { duration: 1000, fill: "forwards" as const };
		const open = "cubic-bezier(0.2, 0.7, 0.3, 1)";
		const gravity = "cubic-bezier(0.5, 0, 0.9, 0.45)";
		leftRef.current.animate(
			[
				{ transform: "perspective(900px)", easing: "linear" },
				{ transform: "perspective(900px)", offset: 0.16, easing: open },
				{ transform: "perspective(900px) translate(-3px, -2px) rotate(-3deg) rotateY(10deg)", offset: 0.34, easing: gravity },
				{ transform: "perspective(900px) translate(-9vw, 85vh) rotate(-24deg) rotateY(40deg)" },
			],
			fall,
		);
		rightRef.current.animate(
			[
				{ transform: "perspective(900px)", easing: "linear" },
				{ transform: "perspective(900px)", offset: 0.16, easing: open },
				{ transform: "perspective(900px) translate(4px, -6px) rotate(4deg) rotateY(-14deg)", offset: 0.34, easing: gravity },
				{ transform: "perspective(900px) translate(11vw, 95vh) rotate(31deg) rotateY(-46deg)" },
			],
			fall,
		);
	}, [tear]);

	const face = (
		<>
			{children}
			{/* A stamp issued with a shipped date always shows its postmark; others earn one once opened. */}
			{(postmark || cancelled) && (
				<Postmark
					lines={postmark ?? ["Received", "Mumbai", String(new Date().getFullYear())]}
					animate={Boolean(postmark) && !tear}
					delay={postmark ? 140 + order * 110 + 700 : 0}
					className="pointer-events-none absolute top-[14%] right-[3%] w-[58%] max-w-72"
				/>
			)}
		</>
	);

	return (
		<Link
			href={href}
			aria-label={label}
			className={`group relative block outline-offset-8 ${tear ? "z-40" : ""} ${className}`}
			style={{ animation: `print-in 760ms var(--ease-out-expo) ${140 + order * 110}ms both` }}
			onClick={(e) => {
				markCancelled(slug);
				if (e.metaKey || e.ctrlKey || e.shiftKey || prefersReducedMotion() || tear) return;
				const box = faceRef.current?.getBoundingClientRect();
				if (!box) return;
				e.preventDefault();
				// Keyboard activation has no pointer: tear through the middle.
				const pointer = e.detail > 0;
				const px = pointer ? e.clientX - box.left : box.width / 2;
				const py = pointer ? e.clientY - box.top : box.height / 2;
				setTear(planTear(box.width, box.height, px, py));
				if (cover) {
					go({ href, ...cover }, 300);
				} else {
					window.setTimeout(() => {
						document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
						setTear(null);
						setCancelled(true);
					}, 650);
				}
			}}
		>
			{/* The gap a torn stamp leaves in the sheet. */}
			<span
				aria-hidden="true"
				className={`pointer-events-none absolute inset-0 border-2 border-dashed border-paper transition-opacity duration-300 ${tear ? "opacity-70" : "opacity-0"}`}
			/>
			<div
				ref={faceRef}
				className={`relative h-full origin-top transition-[transform,filter] duration-500 ease-out-expo ${
					tear
						? ""
						: "group-hover:[transform:perspective(900px)_rotateX(8deg)_translateY(-6px)_rotate(-0.7deg)] group-hover:drop-shadow-[0_16px_18px_rgba(22,18,15,0.32)] group-focus-visible:[transform:perspective(900px)_rotateX(8deg)_translateY(-6px)] group-focus-visible:drop-shadow-[0_16px_18px_rgba(22,18,15,0.32)]"
				}`}
			>
				<div className="relative h-full" style={tear ? { visibility: "hidden" } : undefined}>
					{face}
				</div>
				{tear &&
					(["left", "right"] as const).map((side) => (
						<div
							key={side}
							ref={side === "left" ? leftRef : rightRef}
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 z-10 will-change-transform"
							style={{ transformOrigin: `${tear.pivot}px ${tear.h}px` }}
						>
							<div className="relative h-full" style={{ clipPath: side === "left" ? tear.left : tear.right }}>
								{face}
							</div>
							{/* The torn edge: a pale line where the fibres pulled out, with loose tufts along it. It is revealed top to bottom as the crack runs. */}
							<svg
								className="absolute inset-0 size-full overflow-visible [animation:tear-run_170ms_cubic-bezier(0.6,0,1,1)_both]"
								viewBox={`0 0 ${tear.w} ${tear.h}`}
								aria-hidden="true"
							>
								<path d={tear.edge} fill="none" stroke="var(--color-paper)" strokeWidth="2.4" strokeLinejoin="round" />
								<path
									d={tear.edge}
									fill="none"
									stroke="var(--color-paper)"
									strokeWidth="4.5"
									strokeLinecap="round"
									strokeDasharray={side === "left" ? "0.5 3.5 1 6" : "1 5 0.5 3"}
									opacity="0.8"
								/>
							</svg>
						</div>
					))}
			</div>
		</Link>
	);
}
