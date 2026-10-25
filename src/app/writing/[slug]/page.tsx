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
	// Until tech.anantdubey.com redirects here, the original post stays canonical.
	return { title: p.title, description: p.summary, alternates: { canonical: p.canonical ?? `/writing/${slug}` } };
}

export default async function WritingPost({ params }: PageProps<"/writing/[slug]">) {
	const { slug } = await params;
	if (!list("writing").some((x) => x.slug === slug)) notFound();
	return (
		<>
			<PaperHeader />
			<Letter entry={read("writing", slug)} back={{ href: "/writing", label: "All writing" }} />
			<PostBox />
		</>
	);
}
