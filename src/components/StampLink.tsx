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
 * A stamp you can tear off. Mint by default, lifts on its hinge on hover/focus, and once
 * opened it carries a dated postmark from then on. Opening plays the strike before navigating.
 */
export function StampLink({
	slug,
	href,
	label,
	postmark,
	className = "",
	children,
}: {
	slug: string;
	href: string;
	label: string;
	postmark?: string[];
	className?: string;
	children: ReactNode;
}) {
	const router = useRouter();
	const [cancelled, setCancelled] = useState(false);
	const [striking, setStriking] = useState(false);

	useEffect(() => {
		setCancelled(readCancelled().includes(slug));
	}, [slug]);

	const internal = href.startsWith("/");

	return (
		<a
			href={href}
			aria-label={label}
			className={`group block outline-offset-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 hover:-rotate-[0.6deg] focus-visible:-translate-y-1.5 ${className}`}
			onClick={(e) => {
				markCancelled(slug);
				if (!internal || e.metaKey || e.ctrlKey || e.shiftKey) return;
				const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
				if (reduce || cancelled) return;
				e.preventDefault();
				setStriking(true);
				window.setTimeout(() => router.push(href), 420);
			}}
		>
			<div className="relative h-full transition-[filter] duration-500 group-hover:drop-shadow-[0_14px_18px_rgba(22,18,15,0.28)] group-focus-visible:drop-shadow-[0_14px_18px_rgba(22,18,15,0.28)]">
				{children}
				{/* A stamp issued with its own postmark (a shipped date) always shows it; others earn one when opened. */}
				{(postmark || cancelled || striking) && (
					<Postmark
						lines={postmark ?? ["Received", "Mumbai", String(new Date().getFullYear())]}
						animate={striking}
						className="pointer-events-none absolute top-[14%] right-[3%] w-[58%] max-w-72"
					/>
				)}
			</div>
		</a>
	);
}
