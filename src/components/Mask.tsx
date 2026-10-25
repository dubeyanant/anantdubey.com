import type { ReactNode } from "react";

/** One line of a heading that rises out of its own mask when the heading enters (`data-reveal="mask"`). */
export function Mask({ children }: { children: ReactNode }) {
	return (
		<span className="mask-line">
			<span>{children}</span>
		</span>
	);
}
