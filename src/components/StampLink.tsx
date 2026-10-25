"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Postmark } from "./Postmark";

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

/**
 * A stamp you can tear off the sheet.
 * Load: it is printed onto the sheet in turn (`order` staggers it).
 * Hover/focus: it peels up on its hinge.
 * Click: it tears away along the perforations and leaves its outline behind, then the page opens.
 * Opened stamps carry a postmark from then on.
 */
export function StampLink({
	slug,
	href,
	label,
	postmark,
	order = 0,
	className = "",
	children,
}: {
	slug: string;
	href: string;
	label: string;
	postmark?: string[];
	order?: number;
	className?: string;
	children: ReactNode;
}) {
	const router = useRouter();
	const [cancelled, setCancelled] = useState(false);
	const [tearing, setTearing] = useState(false);

	useEffect(() => {
		setCancelled(readCancelled().includes(slug));
	}, [slug]);

	const internal = href.startsWith("/");
	const printDelay = 140 + order * 110;

	return (
		<a
			href={href}
			aria-label={label}
			className={`group relative block outline-offset-8 ${className}`}
			style={{ animation: `print-in 760ms var(--ease-out-expo) ${printDelay}ms both` }}
			onClick={(e) => {
				markCancelled(slug);
				if (!internal || e.metaKey || e.ctrlKey || e.shiftKey) return;
				if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
				e.preventDefault();
				setTearing(true);
				window.setTimeout(() => router.push(href), 560);
			}}
		>
			{/* The gap a torn stamp leaves in the sheet. */}
			<span
				aria-hidden="true"
				className={`pointer-events-none absolute inset-0 border-2 border-dashed border-paper transition-opacity duration-300 ${tearing ? "opacity-70" : "opacity-0"}`}
			/>
			<div
				className="relative h-full origin-top transition-[transform,filter] duration-500 ease-out-expo group-hover:[transform:perspective(900px)_rotateX(8deg)_translateY(-6px)_rotate(-0.7deg)] group-hover:drop-shadow-[0_16px_18px_rgba(22,18,15,0.32)] group-focus-visible:[transform:perspective(900px)_rotateX(8deg)_translateY(-6px)] group-focus-visible:drop-shadow-[0_16px_18px_rgba(22,18,15,0.32)]"
				style={tearing ? { animation: "tear-off 600ms cubic-bezier(0.5, 0, 0.75, 0) forwards" } : undefined}
			>
				{children}
				{/* A stamp issued with a shipped date always shows its postmark; others earn one once opened. */}
				{(postmark || cancelled) && (
					<Postmark
						lines={postmark ?? ["Received", "Mumbai", String(new Date().getFullYear())]}
						animate={Boolean(postmark)}
						delay={postmark ? printDelay + 700 : 0}
						className="pointer-events-none absolute top-[14%] right-[3%] w-[58%] max-w-72"
					/>
				)}
			</div>
		</a>
	);
}
