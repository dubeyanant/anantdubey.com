import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaperHeader, PostBox } from "@/components/Chrome";
import { Letter } from "@/components/Letter";
import { list, read } from "@/lib/content";

export function generateStaticParams() {
	return list("writing").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const p = list("writing").find((x) => x.slug === slug);
	if (!p) return {};
	return { title: p.title, description: p.summary, alternates: { canonical: `/writing/${slug}` } };
}

export default async function WritingPost({ params }: PageProps<"/writing/[slug]">) {
	const { slug } = await params;
	const all = list("writing");
	const i = all.findIndex((x) => x.slug === slug);
	if (i < 0) notFound();
	const link = (e?: (typeof all)[number]) => e && { href: `/writing/${e.slug}`, title: e.title };
	return (
		<>
			<PaperHeader />
			<Letter entry={read("writing", slug)} back={{ href: "/writing", label: "All writing" }} prev={link(all[i - 1])} next={link(all[i + 1])} />
			<PostBox />
		</>
	);
}
