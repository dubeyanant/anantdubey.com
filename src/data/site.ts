// Every claim on the site comes from Anant's own records (resume and profile).
// Do not add a number, role, date or skill that he hasn't confirmed.

export const site = {
	name: "Anant Dubey",
	nameDeva: "अनंत दुबे",
	url: "https://www.anantdubey.com",
	email: "anantjdubey@gmail.com",
	location: "Mumbai",
	claim: {
		lead: "Flutter engineer in Mumbai. I work on a trading app with",
		chip: "200K+ daily users",
		tail: " and build AI agents that act on voice commands.",
	},
	description:
		"Anant Dubey is a Flutter engineer in Mumbai. He built one-click F&O trading for a broking app with 200K+ daily users and builds voice AI agents with MCP.",
	social: {
		github: "https://github.com/dubeyanant",
		linkedin: "https://www.linkedin.com/in/anantdubey/",
		x: "https://x.com/_aanant",
		playStore: "https://play.google.com/store/apps/dev?id=5300715465790168807",
	},
} as const;

export type Ink = "ultra" | "emerald" | "saffron" | "plum" | "ink";

/** A stamp on the home sheet. `denomination` is the proof; `vignette` is the live miniature. */
export type SheetStamp = {
	slug: string;
	href: string;
	ink: Ink;
	issue: string; // the small catalogue line, top left
	year: string;
	denomination: string;
	caption: string;
	vignette?: "fno" | "voice" | "countdown";
	postmark?: string[];
};

export const sheet: SheetStamp[] = [
	{
		slug: "fno",
		href: "/work/one-click-fno",
		ink: "ultra",
		issue: "भारत · One-tap F&O",
		year: "2024–26",
		denomination: "10%",
		caption: "of trade volume runs through my F&O module",
		vignette: "fno",
		postmark: ["Shipped", "Mumbai", "2025"],
	},
	{
		slug: "inspection",
		href: "/work/ui-inspection-tool",
		ink: "emerald",
		issue: "QA tooling",
		year: "2026",
		denomination: "2MO→4D",
		caption: "My inspection tool cut UI and accessibility testing from two months to four days",
		vignette: "countdown",
	},
	{
		slug: "voice",
		href: "/work/voice-trading-agent",
		ink: "plum",
		issue: "Ideathon winner",
		year: "2026",
		denomination: "Voice→MCP",
		caption: "A voice agent that runs brokerage actions through MCP tools",
		vignette: "voice",
	},
	{
		slug: "promotion",
		href: "#experience",
		ink: "saffron",
		issue: "Promotion",
		year: "2026",
		denomination: "<2 yrs",
		caption: "Promoted from Associate Developer to Assistant Manager",
	},
	{
		slug: "my-people",
		href: "/work/my-people",
		ink: "ink",
		issue: "Play Store",
		year: "2024",
		denomination: "My People",
		caption: "My Flutter app on Google Play, with Gemini personas",
	},
];

export type CaseStudy = {
	slug: string;
	title: string;
	ink: Ink;
	denomination: string;
	year: string;
	role: string;
	stack: string[];
	summary: string;
	links?: { label: string; href: string }[];
	sections: { heading: string; body: string[] }[];
	note?: string;
};

export const caseStudies: CaseStudy[] = [
	{
		slug: "one-click-fno",
		title: "One-click F&O trading",
		ink: "ultra",
		denomination: "10%",
		year: "2024–26",
		role: "Architect and developer, Sharekhan mobile team",
		stack: ["Flutter", "Dart", "Riverpod", "REST + byte-level APIs"],
		summary: "I architected and built the one-click F&O module in the Sharekhan app. It now handles 10% of the app's trade volume.",
		sections: [
			{
				heading: "The setting",
				body: [
					"Sharekhan's trading app has 200K+ daily active users. The mobile team ships a release every two months. Market data and order APIs send JSON and byte-level payloads, and the app parses both in real time.",
				],
			},
			{
				heading: "What I owned",
				body: [
					"I architected and built the one-click F&O module. A trader picks an instrument and places the order with one tap.",
					"In the same period I moved the legacy code to Riverpod and SOLID principles, which made new modules easier to build. I also designed the CI/CD pipeline and release process that several teams use today.",
				],
			},
			{
				heading: "The result",
				body: [
					"The module now handles 10% of the app's total trade volume.",
					"Trading screens leave no room for a slow path. I design the fastest path first and write the unit and integration tests with the feature.",
				],
			},
		],
		note: "I built this inside Sharekhan's production app, so I can't share screens, data or architecture here. I'm happy to talk through the engineering decisions.",
	},
	{
		slug: "voice-trading-agent",
		title: "Voice trading agent",
		ink: "plum",
		denomination: "Won",
		year: "2026",
		role: "Builder and pitch, Ideathon 2026",
		stack: ["Speech-to-text", "MCP tools", "Brokerage APIs", "Text-to-speech"],
		summary: "A voice AI agent for broking apps. It won Ideathon 2026, judged by a 12-member jury.",
		sections: [
			{
				heading: "The idea",
				body: [
					"Trading apps make you tap through a lot of screens. I wanted one spoken sentence to do the same job. You say what you want, and the app does it and tells you when it's done.",
				],
			},
			{
				heading: "How it works",
				body: [
					"Speech-to-text turns the user's words into structured input. That input triggers MCP tool calls. Each tool calls a brokerage API, and text-to-speech reads the confirmation back.",
					"It ran on a demo brokerage app. The tools still called real APIs and got real confirmations back.",
				],
			},
			{
				heading: "What happened next",
				body: [
					"The agent won Ideathon 2026. In the hackathon after it, I mentored two teams of eight, and both shipped to production.",
				],
			},
		],
		note: "It was an internal project, so there's no public code or video. I can walk you through how I built it.",
	},
	{
		slug: "ui-inspection-tool",
		title: "UI inspection tool",
		ink: "emerald",
		denomination: "2MO→4D",
		year: "2026",
		role: "Built for Sharekhan's QA and Design teams",
		stack: ["Flutter", "Internal tooling"],
		summary: "A tool I built that cut UI and accessibility testing from two months to four days.",
		sections: [
			{
				heading: "The problem",
				body: [
					"UI and accessibility testing for the trading app took the QA and Design teams about two months.",
				],
			},
			{
				heading: "What I built",
				body: [
					"I built a UI inspection tool that those teams use to run the checks.",
				],
			},
			{
				heading: "The result",
				body: ["The same testing now takes four days."],
			},
		],
		note: "It's an internal tool, so I can't show screenshots.",
	},
	{
		slug: "my-people",
		title: "My People",
		ink: "ink",
		denomination: "Live",
		year: "2024",
		role: "Designed, built and published solo",
		stack: ["Flutter", "Figma", "Gemini"],
		summary: "An app that helps you remember the people in your life. It's live on Google Play.",
		links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.infiniteants.mypeople" }],
		sections: [
			{
				heading: "Why",
				body: [
					"My People is a diary about the people you know. You save notes, preferences and important details for each person so you don't forget them.",
				],
			},
			{
				heading: "What I did",
				body: [
					"I designed it in Figma, built it in Flutter and published it on the Play Store myself. Gemini creates an AI persona for each person you save, which helps you remember them.",
				],
			},
		],
	},
];

export type AlbumEntry = {
	title: string;
	kind: string;
	status: string;
	blurb: string;
	ink: Ink;
	href?: string;
};

export const album: AlbumEntry[] = [
	{ title: "Chitt", kind: "Flutter app", status: "In beta", ink: "plum", blurb: "A private journal for moments during your day. Save a few words, a voice note or a photo, and Chitt adds the time and weather.", href: "/chitt" },
	{ title: "Coach", kind: "Android app", status: "In development", ink: "emerald", blurb: "A workout log that works like a personal trainer. It reads your training history, food and recovery. Built mostly with AI coding tools.", href: "/coach" },
	{ title: "Paisa", kind: "Web app", status: "Working build", ink: "saffron", blurb: "Personal finance insights, built with Next.js and Supabase." },
	{ title: "animated_pill", kind: "Flutter package", status: "Published", ink: "ultra", blurb: "An animated pill widget for Flutter apps, published on pub.dev.", href: "https://pub.dev/packages/animated_pill" },
	{ title: "SEBI Securities Market Hackathon", kind: "Hackathon", status: "2025", ink: "ultra", blurb: "A Next.js MVP for India's bond market, with fractional bonds, incentives and a game that teaches how bonds work. I was the only front-end architect." },
	{ title: "Roarathon 3.0", kind: "Hackathon", status: "Runner-up, 2025", ink: "saffron", blurb: "An MVP built in 30 hours that automates IOM processes with n8n workflows, AI agents and Next.js. Runner-up out of 90+ participants." },
];

export const experience = [
	{ years: "2026 –", role: "Assistant Manager", org: "Sharekhan, Mumbai", detail: "I lead AI integration in the mobile team. I built the UI inspection tool and the Razorpay Collect and Intent fund-transfer flows." },
	{ years: "2024–26", role: "Associate Developer", org: "Sharekhan, Mumbai", detail: "Built one-click F&O, which handles 10% of trade volume. Moved the code to Riverpod, set up Firebase engagement workflows, migrated the app to Flutter Web and WASM, and built the CI/CD pipeline." },
	{ years: "2024", role: "Intern Developer", org: "Sharekhan, Navi Mumbai", detail: "Helped move the mobile apps from native Android and iOS to Flutter. Handled the UI and UX fixes." },
	{ years: "2022–24", role: "M.Sc. Computer Science", org: "MIT World Peace University, Pune", detail: "CGPA 8.6." },
] as const;

export const skills = [
	["Mobile", "Flutter, Dart, Riverpod, BLoC, GetX, Firebase, Drift/SQLite, Flutter Web (WASM)"],
	["Web", "Next.js, TypeScript, JavaScript, Supabase, REST APIs"],
	["AI", "AI agents, MCP tool calling, STT/TTS, LLM APIs (Gemini), n8n"],
	["Practice", "CI/CD, testing, Agile, Claude Code, Codex, Figma"],
] as const;
