import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type Kind = "writing" | "logs" | "tales" | "verses";

export type Entry = {
	kind: Kind;
	slug: string;
	title: string;
	date: string; // YYYY-MM-DD
	summary?: string;
	tags: string[];
	canonical?: string;
	subTitle?: string;
	headerImg?: string;
	minutes: number;
	body: string; // raw markdown
};

const root = join(process.cwd(), "src", "content");

export function list(kind: Kind): Entry[] {
	return readdirSync(join(root, kind))
		.filter((f) => f.endsWith(".md"))
		.map((f) => read(kind, f.replace(/\.md$/, "")))
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function read(kind: Kind, slug: string): Entry {
	const { data, content } = matter(readFileSync(join(root, kind, `${slug}.md`), "utf8"));
	return {
		kind,
		slug,
		title: String(data.title),
		date: String(data.date),
		summary: data.summary ? String(data.summary) : undefined,
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		canonical: data.canonical ? String(data.canonical) : undefined,
		subTitle: data.subTitle ? String(data.subTitle) : undefined,
		headerImg: data.headerImg ? String(data.headerImg) : undefined,
		minutes: Math.max(1, Math.round(readingTime(content).minutes)),
		body: content,
	};
}

export async function render(markdown: string): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypePrettyCode, { theme: "github-light", keepBackground: true })
		.use(rehypeStringify)
		.process(markdown);
	return String(file);
}

export function formatDate(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});
}

export const kindLabel: Record<Kind, string> = {
	writing: "Writing",
	logs: "Logs",
	tales: "Tales",
	verses: "Verses",
};
