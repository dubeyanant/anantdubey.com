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
		stack: ["Speech-to-text", "MCP tools", "Brokerage APIs", "Text-to-speech", "TypeScript"],
		summary: "A voice AI agent for broking apps. It won Ideathon 2026, judged by a 12-member jury. You can try a rebuild of it live, and its MCP server is open source.",
		sections: [
			{
				heading: "The idea",
				body: [
					"Trading apps make you tap through a lot of screens. I wanted one spoken sentence to do the same job. You say what you want, and the app does it and tells you when it's done.",
					"I had people in mind for whom today's apps are hard work: investors in smaller cities who would rather not use an English-only app, older investors fighting small fonts and crowded menus, and people with disabilities.",
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
			{
				heading: "The public rebuild",
				body: [
					"The Ideathon version was internal, so I rebuilt the idea from scratch in the open. Your browser turns speech into text. An agent on this site reads it and calls tools on an MCP server, which runs a paper trading account with simulated prices. The reply is read back aloud.",
					"Every order is previewed and read back first, and nothing is placed until you say yes. The server only accepts an order that came from a preview, so the model can't place a trade you never heard.",
					"It also reads the news. Ask about a stock and it summarises this week's real headlines, keeping what was reported apart from the hype. Paste a tip from a WhatsApp or Telegram group and it points out the signs of a pump-and-dump: guaranteed returns, short-term targets, urgency, paid groups.",
					"It works in Hindi as well as English, by voice or by typing.",
					"The MCP server is open source. It also works with Claude Desktop or any other MCP client.",
				],
			},
		],
		links: [{ label: "MCP server on GitHub", href: "https://github.com/dubeyanant/paper-broker-mcp" }],
		note: "The original agent was internal, so its code stays private. The demo above is the rebuild, and it shares no code with the original.",
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
					"Since SEBI's July 2025 accessibility circular, text in a broking app also has to meet WCAG 2.1 AA colour contrast.",
				],
			},
			{
				heading: "What I built",
				body: [
					"An inspector that runs inside the app itself, built as a Flutter package. In a test build, a small toolbar floats over the real screens.",
					"Tap a widget to see its distance to each screen edge, or tap two to see the gap between them. It measures in logical pixels, the same unit a Figma frame uses, so the numbers compare straight to the design. Text shows its size, weight, font and colours.",
					"Tap any text and it checks the contrast against WCAG 2.1 AA. It reads the background from the pixels the app actually drew, so the check holds over gradients, images and cards.",
					"For bug reports it shows the app version, device and screen size, and takes a screenshot with the measurements drawn on it. In a debug build it also shows the file and line that created the widget. Normal builds don't include it at all.",
				],
			},
			{
				heading: "The result",
				body: ["The same testing now takes four days. The package has 155 automated tests."],
			},
		],
		note: "It's an internal tool, so I can't show screenshots or code.",
	},
	{
		slug: "chitt",
		title: "Chitt",
		ink: "plum",
		denomination: "Beta",
		year: "2026",
		role: "Designed and built solo · In closed testing on Google Play",
		stack: ["Flutter", "Riverpod", "Drift/SQLite", "English · हिन्दी · मराठी"],
		summary: "A private journal for the moments that hit you during the day: a few words, a voice note or a photo, stamped with the time and the weather, and kept on your phone.",
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
					"I built Chitt for myself first. The things I wanted to keep came to me in the middle of the day, not at a desk in the evening, and a journal that waited for the evening never got them.",
					"Most people who try journaling quit for the same reason: a blank page asks for a session, and nobody has a session to give at 2:54 pm.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"You write when something hits you: several times a day, in a few words, and then you get on with your life. People write in bursts, not sessions, and the habit survives on rhythm, not scores. So there are no streaks and no scores.",
					"चित्त (chitta) is Sanskrit for consciousness, the field where impressions land. A chit is a small slip of paper you scribble on and keep. An app that takes that name has to earn it, so everything you write stays on your phone until you choose to carry it out.",
				],
			},
			{
				heading: "What it does",
				body: [
					"One composer: type a few words, record a voice note, or add a photo. A chit can be a moment, an idea or a snippet. Each one is stamped with the time, the weather and whether you were moving.",
					"Today shows your day as a thread, with the past week dimmed behind it. Past shows the month. Find works across weather, motion, people, topics, places and type, with @person and #topic tags and a map that works offline.",
					"An app lock, backup and restore, and a chit shared as a picture. In English, Hindi and Marathi.",
				],
			},
			{
				heading: "The details",
				body: [
					"The prompt changes with the hour and the weather. It might ask what the light looks like, or where the day has got to.",
					"It doesn't ask for any permission until after your first save. You see what the app is for before it asks you for anything, and when it asks for your location, it says why: only to store the weather with each chit.",
					"The time on a chit is read when you save and never moves. The seal means now; a record is ink.",
					"Voice notes are kept as recordings and never transcribed. The recording is the record.",
					"It's dark, because journaling happens at night more often than not, and it's meant to feel like paper: warm near-black, paper-coloured ink, one red accent called the seal, and structure from thin rules instead of cards and shadows.",
					"Hindi and English sit on one shared baseline, so a line that mixes both doesn't jump. I wrote the Hindi and Marathi text myself.",
					"A delete button is never the bright one, and a link asks before it opens.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Flutter with Riverpod and a local SQLite database. The layers are strict: screens never reach the database directly, and the clock is injected so time can be tested.",
					"Only four kinds of request ever leave the phone: crash reports, anonymous usage counts, one config check, and the weather lookup. What you write never does. The analytics code only accepts counts and flags, and a test fails if anyone passes it text.",
					"Over 1,400 unit tests, and house rules enforced as tests, such as no private data in analytics and no hard-coded strings. Every design and engineering decision is written down: about 200 of them so far. Measured on one phone with 2,000 chits, it opens in under a second.",
					"AI coding tools helped along the way.",
				],
			},
			{
				heading: "Where it is now",
				body: ["Version 1.4 is in closed testing on Google Play, on Android. You can join the beta from its page."],
			},
		],
		note: "The screenshots use sample entries, never real ones.",
	},
	{
		slug: "coach",
		title: "Coach",
		ink: "emerald",
		denomination: "Beta",
		year: "2026",
		role: "Designed and built solo · Native Android",
		stack: ["Kotlin", "Jetpack Compose", "Supabase", "Health Connect", "Claude Haiku"],
		summary: "An Android app that logs your workouts, runs and Indian food, reads your recovery from your watch, and has an AI coach that only talks about numbers it can prove.",
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
					"I built Coach for my own training first: push, pull and legs in the gym, the occasional run, and a watch on my wrist. My workout log logged well but never coached. Food trackers don't know what a katori of dal is. And recovery data sits in a watch app that never talks to the training log.",
					"Coach puts all of it in one place and reads it together, so it can say what to do next.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"Hooked on progress, not on the app. Training is weekly, not daily, and rest days are training too.",
					"Every number in a coach message is a fact the app computed or you typed. The coach gives options, not orders, and when data is missing it leaves it out and says so.",
					"Off means off. The AI coach stays off until you turn it on.",
				],
			},
			{
				heading: "What it does",
				body: [
					"Workout logging with RPE, supersets, routines and a rest timer, across 885 exercises. You can bring your history over from Hevy.",
					"GPS runs with splits that are read out as you go, and cards to share them.",
					"Food logging made for Indian food: about 150 dishes, katori sizes, and the spellings people actually type. Jain diets are understood.",
					"Recovery from your watch through Health Connect: sleep, heart-rate variability and resting heart rate, combined into one score.",
					"An AI coach you can talk to. It plans your next session, logs food from a sentence or a photo, and builds programmes.",
				],
			},
			{
				heading: "The details",
				body: [
					"The coach screen is a coach's call sheet, not a chat app. The coach has no chat bubble, its charts sit right in the conversation, and a small ticker shows what it's reading while it thinks.",
					"Focus mode is made for the gym floor: one exercise, one big rest timer and one button.",
					"Portions are counted the way people eat: in katoris, rotis and plates. A big katori is 360 ml and a small one 155.",
					"Motion never gets in the way. There are no page transitions, and when you turn on \"remove animations\", there are none at all.",
					"Every line in the app is a plain sentence with one idea in it.",
					"I removed a feature that didn't hold up. A daily \"today's call\" was wrong more often than right on real use, so it went.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Native Kotlin with Jetpack Compose. It works offline first and syncs to Supabase, with row-level security on every table.",
					"The coach runs on Claude Haiku. The tool loop runs on the phone: the coach has 24 tools over your own data and at most six model calls per answer, and a small server function only checks who's asking before passing the call on.",
					"The model never types a number. It writes placeholders that the app fills in from your data, and a reply with a typed number fails the check. I compared models on my own 50-case test set: Sonnet scored a little higher, at about fifteen times the cost, so Haiku runs everything.",
					"Some questions never reach the model's judgement. Under-18s, pregnancy and medication, signs of an eating disorder and red-flag symptoms are caught by the app and answered with fixed, careful text, including the Tele-MANAS helpline where it fits.",
					"Over 1,000 unit tests, and every push builds a signed release. AI coding tools helped along the way.",
				],
			},
			{
				heading: "Where it is now",
				body: ["Coach is in testing, with closed testing on Google Play next. It's for training, not medical advice."],
			},
		],
		note: "The screenshots come from the Play Store listing.",
	},
	{
		slug: "my-people",
		title: "My People",
		ink: "ink",
		denomination: "Live",
		year: "2025",
		role: "Designed, built and published solo",
		stack: ["Flutter", "Riverpod", "SQLite", "Gemini · OpenAI · Claude"],
		summary: "A private journal for the people in your life: the small things about friends, family and colleagues that make a relationship feel seen. It's on Google Play.",
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
					"I built My People for myself first, because I kept forgetting the small things about people: a gift idea, what someone doesn't eat, what we talked about last time. Contact apps hold a number and a birthday. The rest lived only in my head.",
				],
			},
			{
				heading: "What I believe",
				body: [
					"Your notes about people are some of the most sensitive data you own. Every decision in the app follows from that.",
					"Local first: no account, no sync service, and no server that holds your data. No lock-in: everything exports to a single file you own. And nothing hidden: the app lists, in full, everything that leaves the device.",
				],
			},
			{
				heading: "What it does",
				body: [
					"A profile for each person with notes as a timeline, events, birthdays, interests, dietary needs and how you know them.",
					"Persona chat: talk to an AI that answers the way that person might, built only from what you've written about them.",
					"An app lock, backup and restore with optional encryption, and sharing a single profile.",
				],
			},
			{
				heading: "The details",
				body: [
					"The app changes with the time of day. It has four themes, for morning, afternoon, evening and night, and follows the clock unless you pick one.",
					"The main button is a radial menu with a charge ring and haptics that build as you hold it.",
					"A birthday's year is optional. You often know the day, not the age.",
					"You can keep anyone out of AI chat with one switch on their profile. Their notes are then never sent to a model.",
					"The profile form is hard to lose work in, and the update screen always offers a backup before anything else, because the data lives only on your phone.",
				],
			},
			{
				heading: "How it's built",
				body: [
					"Flutter, Riverpod and a local SQLite database. AI chat sits behind one interface with adapters for Gemini, OpenAI and Claude, and runs on your own key. Running a shared key for everyone wasn't sustainable, and this way you choose who sees your notes. The key is kept in the Android Keystore and never goes into backups or logs.",
					"The persona prompt is built only from your notes, never photos or social handles, and tells the model not to invent details. A guard checks for prompt injection, with a hidden marker that shows if the prompt ever leaks.",
					"Login was added early on and taken out once the app went local-first. About 115 unit tests. AI coding tools helped with the latest rebuild.",
				],
			},
		],
		note: "The people and notes in the screenshots are invented.",
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
	{ title: "Paisa", kind: "Web app", status: "Working build", ink: "saffron", blurb: "Personal finance insights, built with Next.js and Supabase." },
	{ title: "animated_pill", kind: "Flutter package", status: "Published", ink: "ultra", blurb: "An animated pill widget for Flutter apps, published on pub.dev.", href: "https://pub.dev/packages/animated_pill" },
	{ title: "SEBI Securities Market Hackathon", kind: "Hackathon", status: "2025", ink: "ultra", blurb: "A Next.js MVP for India's bond market, with fractional bonds, incentives and a game that teaches how bonds work. I was the only front-end architect." },
	{ title: "Roarathon 3.0", kind: "Hackathon", status: "Runner-up, 2025", ink: "saffron", blurb: "An MVP built in 30 hours that automates IOM processes with n8n workflows, AI agents and Next.js. Runner-up out of 90+ participants." },
];

export const experience = [
	{ years: "2026 –", role: "Assistant Manager", org: "Sharekhan, Mumbai", detail: "I lead AI integration in the mobile team, including a Claude Code setup that checks changes against our module standard and writes the unit tests. I built the UI inspection tool and the Razorpay Collect and Intent fund-transfer flows." },
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
