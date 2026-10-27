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
		year: "2025",
		denomination: "My People",
		caption: "My Flutter app on Google Play, for remembering the people in your life",
	},
	{
		slug: "beta",
		href: "/work/chitt",
		ink: "emerald",
		issue: "Play Store · Beta",
		year: "2026",
		denomination: "Chitt + Coach",
		caption: "Two more of my apps, in beta on Google Play",
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
	/** Phone screenshots, shown in a row under the stack. Sample or invented data only. */
	shots?: { src: string; alt: string; width: number; height: number }[];
	sections: { heading: string; body: string[] }[];
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
					"In the same period I moved the legacy code to Riverpod and built the CI/CD pipeline that several teams use today.",
				],
			},
			{
				heading: "The result",
				body: [
					"The module now handles 10% of the app's total trade volume.",
				],
			},
		],
	},
	{
		slug: "voice-trading-agent",
		title: "Voice trading agent",
		ink: "plum",
		denomination: "Won",
		year: "2026",
		role: "Builder and pitch, Ideathon 2026",
		stack: ["Speech-to-text", "MCP tools", "Brokerage APIs", "Text-to-speech", "TypeScript"],
		summary: "A voice AI agent for broking apps. It won Ideathon 2026.",
		sections: [
			{
				heading: "The idea",
				body: [
					"Trading apps make you tap through a lot of screens. I wanted one spoken sentence to do the same job.",
					"It was for the people today's apps leave behind: investors who don't read English, older investors, and people with disabilities.",
				],
			},
			{
				heading: "How it works",
				body: [
					"Speech-to-text feeds an agent that calls brokerage APIs through MCP tools, and text-to-speech reads the result back.",
				],
			},
			{
				heading: "What happened next",
				body: [
					"The agent won Ideathon 2026. In the hackathon after it, I mentored two teams of eight, and both shipped to production.",
				],
			},
			{
				heading: "The public rebuild",
				body: [
					"I rebuilt it from scratch in the open, on a paper trading account. Try it above.",
					"Every order is read back, and nothing is placed until you say yes.",
					"It summarises this week's headlines for a stock and flags pump-and-dump signs in a forwarded tip.",
					"It works in Hindi and English.",
					"The MCP server is open source and works with any MCP client.",
				],
			},
		],
		links: [
			{ label: "How it's built", href: "/writing/voice-trading-agent-mcp" },
			{ label: "MCP server on GitHub", href: "https://github.com/dubeyanant/paper-broker-mcp" },
		],
	},
	{
		slug: "ui-inspection-tool",
		title: "UI inspection tool",
		ink: "emerald",
		denomination: "2MO→4D",
		year: "2026",
		role: "Built for Sharekhan's QA and Design teams",
		stack: ["Flutter", "Dart", "WCAG 2.1", "Internal tooling"],
		summary: "An on-device Flutter inspector I built that cut UI and accessibility testing from two months to four days.",
		sections: [
			{
				heading: "The problem",
				body: [
					"UI and accessibility testing for the trading app took the QA and Design teams about two months.",
					"SEBI's July 2025 circular also made WCAG 2.1 AA contrast a requirement.",
				],
			},
			{
				heading: "What I built",
				body: [
					"A Flutter package that runs inside the app. In test builds, a toolbar floats over the real screens.",
					"Tap a widget to see its distance to each edge, or two to see the gap between them, in the same units as Figma. Text shows its size, weight, font and colours.",
					"Tapping text checks its contrast against WCAG 2.1 AA, using the rendered pixels as the background.",
					"It takes annotated screenshots for bug reports, and in debug builds shows the file and line behind each widget.",
				],
			},
			{
				heading: "The result",
				body: ["The same testing now takes four days."],
			},
		],
	},
	{
		slug: "chitt",
		title: "Chitt",
		ink: "plum",
		denomination: "Beta",
		year: "2026",
		role: "Designed and built solo · In closed testing on Google Play",
		stack: ["Flutter", "Riverpod", "Drift/SQLite", "English · हिन्दी · मराठी"],
		summary: "A private journal for the moments that hit you during the day.",
		links: [{ label: "Join the beta", href: "/chitt" }],
		shots: [
			{ src: "/work/chitt/today.webp", alt: "Chitt's today screen: a writing prompt that asks what the light looks like, above the day's earlier chits.", width: 540, height: 1129 },
			{ src: "/work/chitt/voice.webp", alt: "A day's thread in Chitt, with a voice note kept as a recording between written chits.", width: 540, height: 1129 },
			{ src: "/work/chitt/hindi.webp", alt: "The same today screen in Hindi.", width: 540, height: 1129 },
			{ src: "/work/chitt/past.webp", alt: "The past view: a month calendar with 33 chits over 25 days, and yesterday's entries below.", width: 540, height: 1129 },
			{ src: "/work/chitt/philosophy.webp", alt: "The sheet that explains the app: चित्त is your consciousness.", width: 540, height: 1129 },
		],
		sections: [
			{
				heading: "Why I built it",
				body: [
					"I built Chitt for myself. I wanted a journal that takes a few words whenever something hits, at any time of day.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"You write when something hits you, in a few words, and get on with your day. No streaks, no scores.",
					"चित्त is Sanskrit for consciousness. A chit is a slip of paper you scribble on and keep. Everything you write stays on your phone.",
				],
			},
			{
				heading: "What it does",
				body: [
					"Write a few words, record a voice note or add a photo. Each chit is stamped with the time and the weather.",
					"Today shows your day as a thread, with the past week dimmed behind it. Find searches by people, topics, places and weather, on an offline map.",
					"In English, Hindi and Marathi.",
				],
			},
			{
				heading: "The details",
				body: [
					"The prompt changes with the hour and the weather: what does the light look like?",
					"It asks for no permissions until after your first save.",
					"The time on a chit is set when you save and never changes.",
					"Voice notes are never transcribed.",
					"It's dark because most journaling happens at night, and it feels like paper: thin rules instead of cards, and one red accent.",
					"Hindi and English share one baseline. I wrote the Hindi and Marathi copy myself.",
					"A delete button is never the bright one.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Flutter, Riverpod and a local SQLite database.",
					"What you write never leaves the phone. Analytics only accept counts, and a test fails if text gets in.",
					"Over 1,400 unit tests and about 200 written design decisions. With 2,000 chits it opens in under a second.",
					"AI coding tools helped along the way.",
				],
			},
			{
				heading: "Where it is now",
				body: ["Version 1.4 is in closed testing on Google Play."],
			},
		],
	},
	{
		slug: "coach",
		title: "Coach",
		ink: "emerald",
		denomination: "Beta",
		year: "2026",
		role: "Designed and built solo · Native Android",
		stack: ["Kotlin", "Jetpack Compose", "Supabase", "Health Connect", "Claude Haiku"],
		summary: "Workouts, runs and Indian food in one Android app, with an AI coach that reads your recovery.",
		links: [{ label: "About Coach", href: "/coach" }],
		shots: [
			{ src: "/work/coach/today.webp", alt: "Coach's today screen: recovery score, steps and water in one place.", width: 540, height: 960 },
			{ src: "/work/coach/log.webp", alt: "Logging a push workout: sets fill from last time, and the rest timer starts itself.", width: 540, height: 960 },
			{ src: "/work/coach/food.webp", alt: "The food log with katori and roti portions of Indian dishes.", width: 540, height: 960 },
			{ src: "/work/coach/coach.webp", alt: "The AI coach planning the next workout from the user's own history and recovery.", width: 540, height: 960 },
		],
		sections: [
			{
				heading: "Why I built it",
				body: [
					"I built Coach for my own training. My workout log never coached, food trackers didn't know a katori of dal, and my recovery data sat in a watch app that talked to neither.",
					"Coach puts it all in one place and says what to do next.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"Hooked on progress, not on the app. Rest days are training too.",
					"Every number the coach says comes from your data. It gives options, not orders.",
				],
			},
			{
				heading: "What it does",
				body: [
					"Workouts with RPE, supersets, routines and a rest timer, across 885 exercises.",
					"GPS runs with spoken splits.",
					"Food logging made for Indian food: about 150 dishes, in katoris and rotis.",
					"A recovery score from your watch's sleep, HRV and resting heart rate.",
					"An AI coach that plans your next session, logs food from a photo and builds programmes.",
				],
			},
			{
				heading: "The details",
				body: [
					"The coach screen is a call sheet, not a chat: no bubbles, charts inline, and a ticker showing what it's reading.",
					"Focus mode for the gym floor: one exercise, one big rest timer, one button.",
					"No page transitions.",
					"I cut a daily \"today's call\" because it was wrong more often than right.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Native Kotlin and Jetpack Compose, offline first, synced to Supabase.",
					"The coach runs on Claude Haiku, with 24 tools over your data and the tool loop on the phone.",
					"The model never types a number. It writes placeholders the app fills in from your data. On my 50-case test set Sonnet scored slightly higher at fifteen times the cost, so Haiku runs everything.",
					"Pregnancy, under-18s and eating-disorder signals get fixed answers from the app, not the model.",
					"Over 1,000 unit tests. AI coding tools helped along the way.",
				],
			},
			{
				heading: "Where it is now",
				body: ["Closed testing on Google Play is next."],
			},
		],
	},
	{
		slug: "my-people",
		title: "My People",
		ink: "ink",
		denomination: "Live",
		year: "2025",
		role: "Designed, built and published solo",
		stack: ["Flutter", "Riverpod", "SQLite", "Gemini · OpenAI · Claude"],
		summary: "A private journal for the small things about the people in your life.",
		links: [
			{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.infiniteants.mypeople" },
			{ label: "Source on GitHub", href: "https://github.com/dubeyanant/my_people" },
		],
		shots: [
			{ src: "/work/my-people/people.webp", alt: "My People's home screen: a grid of six people with their photos.", width: 540, height: 1200 },
			{ src: "/work/my-people/profile.webp", alt: "A profile at night: birthday, work, relationship, interests and diet, with an upcoming housewarming dinner.", width: 540, height: 1200 },
			{ src: "/work/my-people/notes.webp", alt: "The same person's notes as a timeline, from the first meeting in college to a gift idea for her new flat.", width: 540, height: 1200 },
			{ src: "/work/my-people/privacy.webp", alt: "The What leaves your device screen: chat is off without a key, and everything else stays on the phone.", width: 540, height: 1200 },
			{ src: "/work/my-people/morning.webp", alt: "The same profile in the light morning theme.", width: 540, height: 1200 },
		],
		sections: [
			{
				heading: "Why I built it",
				body: [
					"I kept forgetting the small things about people: a gift idea, what someone doesn't eat, what we talked about last time.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"Your notes about people are some of the most sensitive data you own.",
					"No account and no server. Everything exports to one file you own.",
				],
			},
			{
				heading: "What it does",
				body: [
					"A profile for each person: notes as a timeline, events, birthdays, interests and diet.",
					"Persona chat: an AI that answers the way that person might, from your notes.",
				],
			},
			{
				heading: "The details",
				body: [
					"Four themes follow the time of day.",
					"The main button is a radial menu with a charge ring and haptics that build as you hold it.",
					"A birthday's year is optional.",
					"One switch keeps a person out of AI chat.",
					"The update screen offers a backup first.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Flutter, Riverpod and a local SQLite database. Chat works with Gemini, OpenAI or Claude on your own key.",
					"A guard checks for prompt injection, with a hidden marker that shows if the prompt leaks.",
					"About 115 unit tests. AI coding tools helped with the latest rebuild.",
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
	{ title: "Chitt", kind: "Flutter app", status: "Beta", ink: "plum", blurb: "A private journal for the moments that hit you during the day.", href: "/work/chitt" },
	{ title: "Coach", kind: "Android app", status: "Beta", ink: "emerald", blurb: "Workouts, runs and Indian food, with an AI coach that reads your recovery.", href: "/work/coach" },
	{ title: "My People", kind: "Flutter app", status: "On Google Play", ink: "ink", blurb: "A private journal for the small things about the people in your life.", href: "/work/my-people" },
	{ title: "Paisa", kind: "Web app", status: "Working build", ink: "saffron", blurb: "Personal finance insights, built with Next.js and Supabase." },
	{ title: "animated_pill", kind: "Flutter package", status: "Published", ink: "ultra", blurb: "An animated pill widget for Flutter apps, published on pub.dev.", href: "https://pub.dev/packages/animated_pill" },
	{ title: "SEBI Securities Market Hackathon", kind: "Hackathon", status: "2025", ink: "ultra", blurb: "A Next.js MVP for India's bond market, with fractional bonds, incentives and a game that teaches how bonds work. I was the only front-end architect." },
	{ title: "Roarathon 3.0", kind: "Hackathon", status: "Runner-up, 2025", ink: "saffron", blurb: "An MVP built in 30 hours that automates IOM processes with n8n workflows, AI agents and Next.js. Runner-up out of 90+ participants." },
];

export const experience = [
	{ years: "2026 –", role: "Assistant Manager", org: "Sharekhan, Mumbai", detail: "I lead AI integration in the mobile team, and built the UI inspection tool and the Razorpay fund-transfer flows." },
	{ years: "2024–26", role: "Associate Developer", org: "Sharekhan, Mumbai", detail: "Built one-click F&O, which handles 10% of trade volume. Moved the code to Riverpod, set up Firebase engagement workflows, migrated the app to Flutter Web and WASM, and built the CI/CD pipeline." },
	{ years: "2024", role: "Intern Developer", org: "Sharekhan, Navi Mumbai", detail: "Helped move the mobile apps from native Android and iOS to Flutter. Handled the UI and UX fixes." },
	{ years: "2022–24", role: "M.Sc. Computer Science", org: "MIT World Peace University, Pune", detail: "CGPA 8.6." },
] as const;

export const skills = [
	["Mobile", "Flutter, Dart, Riverpod, BLoC, GetX, Firebase, Drift/SQLite, Flutter Web (WASM)"],
	["Web", "Next.js, TypeScript, JavaScript, Supabase, REST APIs"],
	["AI", "AI agents, MCP tool calling, STT/TTS, LLM APIs (Gemini), n8n"],
	["Practice", "CI/CD, testing, accessibility (WCAG 2.1), Agile, Claude Code, Codex, Figma"],
] as const;
