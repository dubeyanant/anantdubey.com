// Every claim on the site comes from Anant's own records (resume and profile).
// Do not add a number, role, date or skill that he hasn't confirmed.

export const site = {
	name: "Anant Dubey",
	nameDeva: "अनंत दुबे",
	url: "https://www.anantdubey.com",
	email: "anantjdubey@gmail.com",
	location: "Mumbai",
	claim: {
		lead: "Flutter engineer. I ship mobile that moves money for",
		chip: "200K+ daily users",
		tail: ", and I build AI agents that act on a spoken sentence.",
	},
	description:
		"Anant Dubey is a Flutter engineer in Mumbai: one-click F&O trading on a 200K+ DAU broking app, Flutter Web and WASM, CI/CD, and voice AI agents built on MCP.",
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
		caption: "of the app's total trade volume, from one module I architected",
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
		caption: "UI and accessibility testing, cut by an inspection tool I built",
		vignette: "countdown",
	},
	{
		slug: "voice",
		href: "/work/voice-trading-agent",
		ink: "plum",
		issue: "Ideathon · won",
		year: "2026",
		denomination: "Voice→MCP",
		caption: "Speech to tool calls to brokerage actions, read back aloud",
		vignette: "voice",
	},
	{
		slug: "promotion",
		href: "#experience",
		ink: "saffron",
		issue: "Promotion",
		year: "2026",
		denomination: "<2 yrs",
		caption: "Associate Developer to Assistant Manager",
	},
	{
		slug: "my-people",
		href: "/work/my-people",
		ink: "ink",
		issue: "Play Store",
		year: "2024",
		denomination: "My People",
		caption: "A Flutter app with Gemini personas, published",
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
		summary: "I architected and delivered the one-click F&O module that now generates 10% of all trade volume in the Sharekhan app.",
		sections: [
			{
				heading: "The setting",
				body: [
					"Sharekhan's trading app serves 200K+ daily active users, and the mobile team ships feature releases every two months. Market data and order APIs arrive as JSON and as byte-level payloads that have to be parsed correctly on a phone, in real time.",
				],
			},
			{
				heading: "What I owned",
				body: [
					"I architected and delivered the one-click F&O trading module: the flow that takes a trader from instrument to placed order in a single tap, inside a live, regulated broking app.",
					"Around the same period I refactored the legacy codebase onto Riverpod with SOLID principles, which made modules like this one easier to scale and maintain, and I designed the CI/CD pipeline and SDLC practices that several teams now use to ship.",
				],
			},
			{
				heading: "The result",
				body: [
					"The module now generates 10% of the app's total trade volume.",
					"It also changed how I work: trading UX is unforgiving, so I design for the fastest path first and treat parsing, state and testing (unit and integration) as part of the feature, not an afterthought.",
				],
			},
		],
		note: "This was built inside Sharekhan's production app, so internal screens, data and architecture details stay private. I'm happy to walk through the engineering decisions in person.",
	},
	{
		slug: "voice-trading-agent",
		title: "Voice trading agent",
		ink: "plum",
		denomination: "Won",
		year: "2026",
		role: "Builder and pitch, Ideathon 2026",
		stack: ["Speech-to-text", "MCP tools", "Brokerage APIs", "Text-to-speech"],
		summary: "A voice AI agent for broking apps that won Ideathon 2026 in front of a 12-member jury.",
		sections: [
			{
				heading: "The idea",
				body: [
					"Trading apps make you hunt through screens. I wanted to see how far a single spoken sentence could go: say what you want, and the app does it and tells you it's done.",
				],
			},
			{
				heading: "How it works",
				body: [
					"Speech-to-text services turn what the user says into structured input. That input drives MCP tool calls, and each tool hits a brokerage API to carry out the action. The confirmation comes back and text-to-speech reads it aloud.",
					"It ran against a demo brokerage app, not the production one, but the tools called real APIs and returned real confirmations.",
				],
			},
			{
				heading: "What happened next",
				body: [
					"The agent won Ideathon 2026. In the hackathon that followed, I mentored two teams of eight people each and steered both to a successful production deployment.",
				],
			},
		],
		note: "The original was an internal project, so there's no public code or video. Happy to walk through how it was built.",
	},
	{
		slug: "ui-inspection-tool",
		title: "UI inspection tool",
		ink: "emerald",
		denomination: "2MO→4D",
		year: "2026",
		role: "Built for Sharekhan's QA and Design teams",
		stack: ["Flutter", "Internal tooling"],
		summary: "An inspection tool that cut UI and accessibility testing from two months to four days.",
		sections: [
			{
				heading: "The problem",
				body: [
					"On a trading app this size, UI and accessibility testing by QA and Design took about two months.",
				],
			},
			{
				heading: "What I built",
				body: [
					"A UI inspection tool, built for the QA and Design teams that run those checks.",
				],
			},
			{
				heading: "The result",
				body: ["UI and accessibility testing went from two months to four days."],
			},
		],
		note: "An internal tool, so screenshots stay private.",
	},
	{
		slug: "my-people",
		title: "My People",
		ink: "ink",
		denomination: "Live",
		year: "2024",
		role: "Designed, built and published solo",
		stack: ["Flutter", "Figma", "Gemini"],
		summary: "A human diary: an app that helps you remember the people in your life, published on Google Play.",
		links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.infiniteants.mypeople" }],
		sections: [
			{
				heading: "Why",
				body: [
					"My People is a human diary: it helps you remember and organise the important details about the people in your life (notes, preferences, key information for each person) so you never forget what matters.",
				],
			},
			{
				heading: "What I did",
				body: [
					"I designed it in Figma, built it in Flutter, and published it to the Play Store myself. Gemini generates a personalised AI persona for each person you save, to help you recall and reconnect.",
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
	{ title: "Chitt", kind: "Flutter app", status: "In beta", ink: "plum", blurb: "A private journal for the moments that hit you during the day: a few words, a voice note or a photo, stamped with the time and weather.", href: "/chitt" },
	{ title: "Coach", kind: "Android app", status: "In development", ink: "emerald", blurb: "A workout log that acts as a personal trainer, reading your training history, food and recovery. Built AI-directed.", href: "/coach" },
	{ title: "Paisa", kind: "Web dashboard", status: "Working build", ink: "saffron", blurb: "Personal finance insights on Next.js and Supabase." },
	{ title: "animated_pill", kind: "Flutter package", status: "On pub.dev", ink: "ultra", blurb: "An animated pill widget, published for other Flutter developers.", href: "https://pub.dev/packages/animated_pill" },
	{ title: "SEBI Securities Market Hackathon", kind: "Hackathon", status: "2025", ink: "ultra", blurb: "A Next.js MVP to open up India's bond markets: fractional bonds, incentives and a gamified bond-education module. Solo front-end architect." },
	{ title: "Roarathon 3.0", kind: "Hackathon", status: "Runner-up, 2025", ink: "saffron", blurb: "A 30-hour MVP automating IOM processes with n8n workflows, AI agents and Next.js. Runner-up among 90+ participants." },
	{ title: "Revisio", kind: "Web app + extension", status: "Live", ink: "emerald", blurb: "A place where you actually look at what you save for later.", href: "https://revisio.vercel.app" },
	{ title: "Quizly", kind: "Web game", status: "Retired", ink: "plum", blurb: "A real-time multiplayer quiz on Next.js and WebSockets." },
	{ title: "Link List", kind: "Web app", status: "Retired", ink: "ink", blurb: "Shareable lists that update live and delete themselves after seven days. Next.js and Supabase." },
];

export const experience = [
	{ years: "2026 –", role: "Assistant Manager", org: "Sharekhan, Mumbai", detail: "Leading AI integration in the mobile team. Built the UI inspection tool and the Razorpay Collect and Intent fund-transfer flows." },
	{ years: "2024–26", role: "Associate Developer", org: "Sharekhan, Mumbai", detail: "One-click F&O (10% of trade volume), Riverpod refactor, Firebase engagement workflows, Flutter Web/WASM migration, CI/CD." },
	{ years: "2024", role: "Intern Developer", org: "Sharekhan, Navi Mumbai", detail: "Helped migrate the mobile apps from native Android/iOS to Flutter; point of contact for UI/UX fixes." },
	{ years: "2022–24", role: "M.Sc. Computer Science", org: "MIT World Peace University, Pune", detail: "CGPA 8.6." },
] as const;

export const skills = [
	["Mobile", "Flutter, Dart, Riverpod, BLoC, GetX, Firebase, Drift/SQLite, Flutter Web (WASM)"],
	["Web", "Next.js, TypeScript, JavaScript, Supabase, REST APIs"],
	["AI", "AI agents, MCP tool calling, STT/TTS, LLM APIs (Gemini), n8n"],
	["Practice", "CI/CD, testing, Agile, Claude Code, Codex, Figma"],
] as const;
