import { type ChatMessage, runAgentTurn } from "paper-broker-mcp/agent";

// The voice demo on /work/voice-trading-agent talks to this route.
// With ANTHROPIC_API_KEY or GEMINI_API_KEY set (see .env.example), a model drives the MCP tools.
// Without a key, or once a visitor uses up their share, the package's offline parser drives the same tools.

const MAX_MESSAGES = 24;
const MAX_CHARS = 400;
const MAX_STATE_BYTES = 24_000;

// Per server instance, which is enough to keep one visitor from running up the bill.
const PER_VISITOR_PER_HOUR = Number(process.env.AGENT_HOURLY_LIMIT ?? 30);
const PER_DAY = Number(process.env.AGENT_DAILY_LIMIT ?? 500);
const visits = new Map<string, number[]>();
let day = { key: "", count: 0 };

function withinLimits(visitor: string) {
	const now = Date.now();
	const today = new Date(now).toISOString().slice(0, 10);
	if (day.key !== today) day = { key: today, count: 0 };
	const recent = (visits.get(visitor) ?? []).filter((t) => now - t < 3_600_000);
	if (recent.length >= PER_VISITOR_PER_HOUR || day.count >= PER_DAY) return false;
	recent.push(now);
	visits.set(visitor, recent);
	day.count++;
	if (visits.size > 5_000) visits.clear();
	return true;
}

function readMessages(raw: unknown): ChatMessage[] | null {
	if (!Array.isArray(raw) || raw.length === 0) return null;
	const messages = raw.slice(-MAX_MESSAGES).map((m) => ({
		role: m?.role === "assistant" ? ("assistant" as const) : ("user" as const),
		content: String(m?.content ?? "").slice(0, MAX_CHARS),
	}));
	return messages.at(-1)?.role === "user" && messages.at(-1)?.content.trim() ? messages : null;
}

export async function POST(request: Request) {
	let body: { messages?: unknown; state?: unknown; language?: unknown };
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Send JSON." }, { status: 400 });
	}

	const messages = readMessages(body.messages);
	if (!messages) return Response.json({ error: "The last message must be from you." }, { status: 400 });
	if (JSON.stringify(body.state ?? null).length > MAX_STATE_BYTES) {
		return Response.json({ error: "That account is too large. Reset it and try again." }, { status: 413 });
	}

	const hasKey = Boolean(process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY);
	const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
	const limited = hasKey && !withinLimits(visitor);

	try {
		const turn = await runAgentTurn({
			messages,
			state: body.state ?? null,
			provider: limited ? "rules" : undefined,
			// Hindi when the visitor picks it; otherwise the package still switches to Hindi for Devanagari input.
			language: body.language === "hi" ? "hi" : undefined,
		});
		// A failed model call is answered by the offline parser; log why (Vercel logs), and tell the client it fell back.
		if (turn.error) console.error("agent model call failed:", turn.error);
		return Response.json({
			fallback: Boolean(turn.error),
			reply: turn.reply,
			events: turn.events,
			state: turn.state,
			messages: turn.messages,
			provider: turn.provider,
			model: turn.model,
			limited,
		});
	} catch {
		// Malformed or tampered state: the client resets its account and retries.
		return Response.json({ error: "That account couldn't be read. Reset it and try again." }, { status: 400 });
	}
}
