import Link from "next/link";
import { PaperHeader } from "@/components/Chrome";

export default function NotFound() {
	return (
		<>
			<PaperHeader />
			<main id="main" className="mx-auto max-w-3xl px-5 py-28 sm:px-10">
				<h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.86] font-black uppercase">Returned to sender</h1>
				<p className="mt-6 max-w-[44ch] text-lg text-ink-soft">There's nothing at this address.</p>
				<Link href="/" className="mt-8 inline-block bg-ink px-6 py-4 font-bold text-paper no-underline hover:bg-post">
					Back to the sheet
				</Link>
			</main>
		</>
	);
}
