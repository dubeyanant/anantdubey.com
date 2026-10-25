import { useId } from "react";

/** A circular date-stamp cancellation with wavy bars, in postmark ink. Decorative unless labelled. */
export function Postmark({ lines, className = "", animate = false }: { lines: string[]; className?: string; animate?: boolean }) {
	const id = useId();
	const [top = "", middle = "", bottom = ""] = lines;
	return (
		<svg
			viewBox="0 0 320 200"
			className={className}
			aria-hidden="true"
			style={{
				color: "var(--color-cancel)",
				transform: "rotate(-14deg)",
				opacity: 0.85,
				animation: animate ? "postmark-strike 520ms var(--ease-out-expo) both" : undefined,
			}}
		>
			<defs>
				<path id={`${id}-arc-top`} d="M 46 100 A 54 54 0 0 1 154 100" />
				<path id={`${id}-arc-bottom`} d="M 40 100 A 60 60 0 0 0 160 100" />
			</defs>
			<circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="4" />
			<circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="1.5" />
			<text fill="currentColor" fontFamily="var(--font-mono)" fontWeight="500" fontSize="15" letterSpacing="3">
				<textPath href={`#${id}-arc-top`} startOffset="50%" textAnchor="middle">
					{top.toUpperCase()}
				</textPath>
			</text>
			<text x="100" y="108" fill="currentColor" fontFamily="var(--font-display)" fontWeight="900" fontSize="30" textAnchor="middle" letterSpacing="1">
				{middle.toUpperCase()}
			</text>
			<text fill="currentColor" fontFamily="var(--font-mono)" fontWeight="500" fontSize="15" letterSpacing="3">
				<textPath href={`#${id}-arc-bottom`} startOffset="50%" textAnchor="middle">
					{bottom.toUpperCase()}
				</textPath>
			</text>
			{[70, 100, 130].map((y) => (
				<path
					key={y}
					d={`M 180 ${y} q 17 -9 35 0 t 35 0 t 35 0 t 35 0`}
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					strokeLinecap="round"
				/>
			))}
		</svg>
	);
}
