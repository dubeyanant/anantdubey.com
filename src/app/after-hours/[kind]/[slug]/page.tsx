import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { Letter } from "@/components/Letter";
import { type Kind, list, read } from "@/lib/content";

const kinds: Kind[] = ["logs", "tales", "verses"];

export function generateStaticParams() {
	return kinds.flatMap((kind) => list(kind).map((e) => ({ kind, slug: e.slug })));
}

export async function generateMetadata({ params }: PageProps<"/after-hours/[kind]/[slug]">): Promise<Metadata> {
	const { kind, slug } = await params;
	const e = list(kind as Kind).find((x) => x.slug === slug);
	return e ? { title: e.title, alternates: { canonical: `/after-hours/${kind}/${slug}` } } : {};
}

export default async function AfterHoursPiece({ params }: PageProps<"/after-hours/[kind]/[slug]">) {
	const { kind, slug } = await params;
	if (!kinds.includes(kind as Kind) || !list(kind as Kind).some((x) => x.slug === slug)) notFound();
	return (
		<>
			<PaperHeader />
			<Letter entry={read(kind as Kind, slug)} back={{ href: `/after-hours#${kind}`, label: "After hours" }} />
			<PostBox />
		</>
	);
}
