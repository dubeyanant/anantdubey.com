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

export type Kind = "writing" | "letters" | "logs" | "tales" | "verses";

export type Entry = {
	kind: Kind;
	slug: string;
	title: string;
	part?: string; // "Part 1" for serialised tales
	wip: boolean;
	date: string; // YYYY-MM-DD
	summary?: string;
	tags: string[];
	canonical?: string;
	subTitle?: string;
	headerImg?: string;
	minutes: number;
	excerpt: string; // first lines, plain text
	body: string; // raw markdown
};

// YAML turns an unquoted 2025-11-01 into a Date; quoted ones stay strings. Normalise both.
function isoDate(value: unknown): string {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return String(value).slice(0, 10);
}

function excerptOf(markdown: string, kind: Kind): string {
	const lines = markdown
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l && !l.startsWith("#") && !l.startsWith("!["));
	if (kind === "verses") return lines.slice(0, 3).join("\n");
	const text = lines.join(" ").replace(/[*_`>]|\[([^\]]*)\]\([^)]*\)/g, "$1");
	return text.length > 170 ? `${text.slice(0, 170).replace(/\s+\S*$/, "")}…` : text;
}

const root = join(process.cwd(), "src", "content");

export function list(kind: Kind): Entry[] {
	return readdirSync(join(root, kind))
		.filter((f) => f.endsWith(".md"))
		.map((f) => read(kind, f.replace(/\.md$/, "")))
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function read(kind: Kind, slug: string): Entry {
	const { data, content } = matter(readFileSync(join(root, kind, `${slug}.md`), "utf8"));
	// Old titles read "Night Stroll ⚉ Part 1": keep the name and the part apart.
	const [title, part] = String(data.title).split("⚉").map((t) => t.trim());
	return {
		kind,
		slug,
		title,
		part: part || undefined,
		wip: data.process === "WIP",
		date: isoDate(data.date),
		summary: data.summary ? String(data.summary) : undefined,
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		canonical: data.canonical ? String(data.canonical) : undefined,
		subTitle: data.subTitle ? String(data.subTitle) : undefined,
		headerImg: data.headerImg ? String(data.headerImg) : undefined,
		minutes: Math.max(1, Math.round(readingTime(content).minutes)),
		excerpt: excerptOf(content, kind),
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
	letters: "Letters",
	logs: "Logs",
	tales: "Tales",
	verses: "Verses",
};
