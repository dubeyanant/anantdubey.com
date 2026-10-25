"use client";

import { Mic, RotateCcw, Send, Square, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* The rebuild of the Ideathon idea, live: speech in the browser, the agent and its MCP tools on /api/agent,
   a paper account that lives in this visitor's browser, and the reply read back aloud. */

type Message = { role: "user" | "assistant"; content: string };
type AgentEvent =
	| { type: "tool_call"; name: string; args: Record<string, unknown> }
	| { type: "tool_result"; name: string; result: unknown; isError: boolean };
type Account = {
	cash: number;
	positions: Record<string, { qty: number; avgPrice: number }>;
	orders: { id: string; symbol: string; side: string; qty: number; status: string }[];
	pendingPreviewId?: string | null;
};
type Turn = { events: AgentEvent[]; provider: string; model?: string; limited?: boolean; fallback?: boolean };

const STORE = "voice-demo-v1";
type Lang = "en" | "hi";
// A made-up company in the sample tip, so the demo never spreads a rumour about a real one.
const TRY: Record<Lang, { label: string; say: string }[]> = {
	en: [
		{ label: "Buy 10 Reliance", say: "Buy 10 Reliance" },
		{ label: "Price of Infosys", say: "Price of Infosys" },
		{ label: "News on Tata Motors", say: "News on Tata Motors" },
		{
			label: "Check a forwarded tip",
			say: "Check this tip: ABC Infra is a multibagger, target 500 in 2 days, 100% sure. Join our VIP Telegram group before it's too late.",
		},
		{ label: "Show my portfolio", say: "Show my portfolio" },
	],
	hi: [
		{ label: "10 रिलायंस खरीदो", say: "10 रिलायंस खरीदो" },
		{ label: "इंफोसिस का भाव", say: "इंफोसिस का भाव बताओ" },
		{ label: "टाटा मोटर्स की खबर", say: "टाटा मोटर्स की खबर" },
		{
			label: "यह टिप जाँचो",
			say: "यह टिप जाँचो: ABC इंफ्रा मल्टीबैगर है, 2 दिन में 500 का टारगेट, 100% पक्का। जल्दी हमारे VIP टेलीग्राम ग्रुप से जुड़ो।",
		},
		{ label: "मेरा पोर्टफोलियो", say: "मेरा पोर्टफोलियो दिखाओ" },
	],
};
const CONFIRM: Record<Lang, string[]> = { en: ["Yes", "No"], hi: ["हाँ", "नहीं"] };
const DEVANAGARI = /[\u0900-\u097F]/;
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// The browser's own speech recognition: Chrome, Edge and Safari have it, Firefox doesn't.
type Recognition = {
	lang: string;
	interimResults: boolean;
	continuous: boolean;
	start(): void;
	stop(): void;
	onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
	onerror: ((e: { error: string }) => void) | null;
	onend: (() => void) | null;
};
function makeRecognition(): Recognition | null {
	const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
	const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
	return Ctor ? new Ctor() : null;
}

function speak(text: string, lang: Lang) {
	if (!("speechSynthesis" in window)) return;
	window.speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text);
	const hindi = lang === "hi" || DEVANAGARI.test(text);
	u.lang = hindi ? "hi-IN" : "en-IN";
	const voices = window.speechSynthesis.getVoices();
	const voice = hindi
		? voices.find((v) => v.lang === "hi-IN")
		: (voices.find((v) => v.lang === "en-IN") ?? voices.find((v) => v.lang.startsWith("en")));
	if (voice) u.voice = voice;
	u.rate = 1.04;
	window.speechSynthesis.speak(u);
}

/** One line per tool result, in words a visitor can scan. */
function describe(result: unknown): string {
	const r = (result ?? {}) as Record<string, any>;
	if (r.error) return r.error.message ?? "error";
	if (r.unavailable) return "news is unavailable right now";
	if (Array.isArray(r.items)) {
		const flagged = r.items.filter((i: any) => i.flags?.length).length;
		return `${r.items.length} headline${r.items.length === 1 ? "" : "s"}${flagged ? `, ${flagged} with hype language` : ""}`;
	}
	if (r.risk) return `risk ${r.risk} · ${r.flags?.length ?? 0} warning sign${r.flags?.length === 1 ? "" : "s"}`;
	if (r.summary) return r.summary;
	if (r.quote) return `${r.quote.symbol} ${rupees.format(r.quote.ltp)} (${r.quote.changePct >= 0 ? "+" : ""}${Number(r.quote.changePct).toFixed(2)}%)`;
	if (r.order) return `${r.order.id} ${r.order.side} ${r.order.qty} ${r.order.symbol}: ${String(r.order.status).toLowerCase()}`;
	if (Array.isArray(r.results)) return r.results.map((m: any) => m.symbol).join(", ") || "no match";
	if (Array.isArray(r.positions)) return `${r.positions.length} holding${r.positions.length === 1 ? "" : "s"}`;
	if (Array.isArray(r.orders)) return `${r.orders.length} order${r.orders.length === 1 ? "" : "s"}`;
	if (r.funds) return `available ${rupees.format(r.funds.available ?? r.funds.cash)}`;
	const s = JSON.stringify(result);
	return s.length > 90 ? `${s.slice(0, 90)}…` : s;
}

function args(a: Record<string, unknown>) {
	const s = Object.entries(a)
		.map(([k, v]) => `${k}: ${typeof v === "string" ? `"${v}"` : String(v)}`)
		.join(", ");
	return s.length > 80 ? `${s.slice(0, 80)}…` : s;
}

const PROVIDER: Record<string, string> = { anthropic: "Claude", gemini: "Gemini", rules: "Offline parser" };

export function VoiceDemo() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [account, setAccount] = useState<Account | null>(null);
	const [turn, setTurn] = useState<Turn | null>(null);
	const [draft, setDraft] = useState("");
	const [heard, setHeard] = useState("");
	const [busy, setBusy] = useState(false);
	const [listening, setListening] = useState(false);
	const [canListen, setCanListen] = useState(false);
	const [voice, setVoice] = useState(true);
	const [lang, setLang] = useState<Lang>("en");
	const [problem, setProblem] = useState("");
	const recognition = useRef<Recognition | null>(null);
	const log = useRef<HTMLOListElement>(null);

	useEffect(() => {
		setCanListen(makeRecognition() !== null);
		try {
			const saved = JSON.parse(localStorage.getItem(STORE) ?? "null");
			if (saved?.messages) setMessages(saved.messages);
			if (saved?.account) setAccount(saved.account);
			if (saved?.lang === "hi") setLang("hi");
		} catch {}
		return () => recognition.current?.stop();
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(STORE, JSON.stringify({ messages: messages.slice(-24), account, lang }));
		} catch {}
		log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
	}, [messages, account, lang]);

	const send = useCallback(
		async (text: string) => {
			const said = text.trim();
			if (!said || busy) return;
			const next = [...messages, { role: "user" as const, content: said }];
			setMessages(next);
			setDraft("");
			setHeard("");
			setProblem("");
			setBusy(true);
			try {
				const res = await fetch("/api/agent", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ messages: next, state: account, language: lang }),
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.error ?? "The agent didn't answer.");
				setMessages(data.messages);
				setAccount(data.state);
				setTurn({ events: data.events, provider: data.provider, model: data.model, limited: data.limited, fallback: data.fallback });
				if (voice) speak(data.reply, lang);
			} catch (e) {
				setProblem((e as Error).message || "The agent didn't answer. Try again.");
			} finally {
				setBusy(false);
			}
		},
		[account, busy, messages, voice, lang],
	);

	function listen() {
		if (listening) {
			recognition.current?.stop();
			return;
		}
		const r = makeRecognition();
		if (!r) return;
		window.speechSynthesis?.cancel();
		r.lang = lang === "hi" ? "hi-IN" : "en-IN";
		r.interimResults = true;
		r.continuous = false;
		let final = "";
		r.onresult = (e) => {
			let interim = "";
			for (const result of Array.from(e.results)) {
				if (result.isFinal) final = result[0].transcript;
				else interim += result[0].transcript;
			}
			setHeard(final || interim);
		};
		r.onerror = (e) => {
			if (e.error === "not-allowed") setProblem("The browser blocked the microphone. Allow it, or type instead.");
			else if (e.error !== "no-speech" && e.error !== "aborted") setProblem("I couldn't hear that. Try again, or type it.");
		};
		r.onend = () => {
			setListening(false);
			recognition.current = null;
			if (final) send(final);
		};
		recognition.current = r;
		setListening(true);
		r.start();
	}

	function reset() {
		window.speechSynthesis?.cancel();
		setMessages([]);
		setAccount(null);
		setTurn(null);
		setProblem("");
	}

	const holdings = Object.entries(account?.positions ?? {}).filter(([, p]) => p.qty > 0);
	const open = (account?.orders ?? []).filter((o) => o.status === "OPEN").length;
	const waiting = Boolean(account?.pendingPreviewId);

	return (
		<section aria-labelledby="try-h" data-reveal className="mt-14 border-2 border-ink bg-paper-shade">
			<header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 border-ink px-5 py-4 sm:px-7">
				<h2 id="try-h" className="font-display text-3xl leading-none font-black uppercase sm:text-4xl">
					Try the rebuild
				</h2>
				<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
					<p className="catalogue text-ink-mute">Simulated prices · paper account · no real money</p>
					<div role="group" aria-label="Language" className="flex border-2 border-ink">
						{(["en", "hi"] as const).map((l) => (
							<button
								key={l}
								type="button"
								aria-pressed={lang === l}
								onClick={() => setLang(l)}
								lang={l === "hi" ? "hi" : undefined}
								className={`px-2.5 py-0.5 text-sm font-semibold ${l === "hi" ? "font-deva" : ""} ${lang === l ? "bg-ink text-paper" : "hover:bg-paper"}`}
							>
								{l === "en" ? "English" : "हिंदी"}
							</button>
						))}
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
				{/* The conversation, and the ways in: mic, keyboard, suggestions. */}
				<div className="flex min-h-[26rem] flex-col border-ink lg:border-r-2">
					<ol ref={log} aria-live="polite" className="max-h-[22rem] flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-7">
						{messages.length === 0 && (
							<li className="max-w-[46ch] text-ink-soft">
								{lang === "hi" ? (
									<span lang="hi" className="font-deva">
										भाव पूछिए, ऑर्डर लगाइए, किसी शेयर की खबरें सुनिए या कोई फ़ॉरवर्ड की गई टिप जाँचिए। हर ऑर्डर पहले पढ़कर सुनाया जाता है और आपकी हाँ के बाद ही लगता है।
									</span>
								) : (
									"Ask for a quote, place an order, hear the news on a stock or check a forwarded tip. The agent reads every order back and waits for your yes before it places anything."
								)}
							</li>
						)}
						{messages.map((m, i) => (
							<li key={`${i}-${m.content.slice(0, 12)}`} className={m.role === "user" ? "flex justify-end" : "flex"}>
								<p
									lang={DEVANAGARI.test(m.content) ? "hi" : undefined}
									className={`max-w-[85%] px-3.5 py-2 leading-snug [animation:pop-in_400ms_var(--ease-out-expo)_both] ${DEVANAGARI.test(m.content) ? "font-deva" : ""} ${
										m.role === "user" ? "bg-ink text-paper" : "border-2 border-plum bg-paper text-ink"
									}`}
								>
									{m.content}
								</p>
							</li>
						))}
						{busy && (
							<li className="flex" aria-label="The agent is working">
								<span className="flex h-9 items-center gap-1 border-2 border-plum bg-paper px-3 text-plum">
									{[0, 1, 2].map((d) => (
										<span key={d} className="size-1.5 rounded-full bg-current" style={{ animation: `speak 900ms ease-in-out ${d * 0.15}s infinite` }} />
									))}
								</span>
							</li>
						)}
					</ol>

					<div className="border-t-2 border-ink px-5 py-4 sm:px-7">
						{(heard || listening) && (
							<p className="mb-3 catalogue text-plum" aria-live="polite">
								{heard ? `Heard: ${heard}` : "Listening…"}
							</p>
						)}
						{problem && <p className="mb-3 text-sm font-semibold text-post">{problem}</p>}
						<form
							className="flex items-center gap-3"
							onSubmit={(e) => {
								e.preventDefault();
								send(draft);
							}}
						>
							{canListen && (
								<button
									type="button"
									onClick={listen}
									disabled={busy}
									aria-pressed={listening}
									aria-label={listening ? "Stop listening" : "Speak an instruction"}
									className="relative grid size-14 shrink-0 place-items-center rounded-full bg-plum text-paper transition-transform duration-300 ease-out-expo hover:scale-105 disabled:opacity-50"
								>
									{listening && <span className="absolute inset-0 animate-ping rounded-full bg-plum opacity-40" aria-hidden="true" />}
									{listening ? <Square className="relative size-5" aria-hidden="true" /> : <Mic className="relative size-6" aria-hidden="true" />}
								</button>
							)}
							<label className="sr-only" htmlFor="voice-demo-input">
								Instruction
							</label>
							<input
								id="voice-demo-input"
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								maxLength={300}
								autoComplete="off"
								placeholder={
									lang === "hi"
										? waiting
											? "हाँ या नहीं"
											: "या लिखिए: 10 रिलायंस खरीदो"
										: waiting
											? "Say yes to place it, or no"
											: canListen
												? "Or type: buy 10 Reliance"
												: "Type: buy 10 Reliance"
								}
								className={`h-12 min-w-0 flex-1 border-2 border-ink bg-paper px-3 placeholder:text-ink-mute focus:outline-none focus-visible:border-plum ${lang === "hi" ? "font-deva" : ""}`}
							/>
							<button
								type="submit"
								disabled={busy || !draft.trim()}
								aria-label="Send"
								className="grid size-12 shrink-0 place-items-center bg-ink text-paper disabled:opacity-40"
							>
								<Send className="size-5" aria-hidden="true" />
							</button>
						</form>
						<div className="mt-3 flex flex-wrap items-center gap-2">
							{(waiting ? CONFIRM[lang].map((t) => ({ label: t, say: t })) : TRY[lang]).map((t) => (
								<button
									key={t.label}
									type="button"
									disabled={busy}
									onClick={() => send(t.say)}
									lang={lang === "hi" ? "hi" : undefined}
									className={`border border-ink px-2.5 py-1 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper disabled:opacity-40 ${lang === "hi" ? "font-deva" : ""}`}
								>
									{t.label}
								</button>
							))}
						</div>
						{!canListen && <p className="mt-3 text-sm text-ink-mute">This browser has no speech input. Chrome, Edge or Safari can use the mic.</p>}
					</div>
				</div>

				{/* What the agent did with MCP, and the account it did it to. */}
				<div className="flex flex-col border-t-2 border-ink lg:border-t-0">
					<div className="flex-1 px-5 py-5 sm:px-7">
						<div className="flex items-baseline justify-between gap-4">
							<h3 className="catalogue text-ink-mute">MCP tool calls</h3>
							{turn && (
								<span className="catalogue text-plum" title={turn.model}>
									{PROVIDER[turn.provider] ?? turn.provider}
									{turn.limited && " · demo limit reached"}
									{turn.fallback && " · AI busy, answered offline"}
								</span>
							)}
						</div>
						{turn?.events.length ? (
							<ol className="mt-3 space-y-1.5 font-mono text-[12.5px] leading-snug">
								{turn.events.map((e, i) => (
									<li
										key={`${i}-${e.name}`}
										className="[animation:pop-in_360ms_var(--ease-out-expo)_both]"
										style={{ animationDelay: `${i * 90}ms` }}
									>
										{e.type === "tool_call" ? (
											<span>
												<span className="text-plum">→ {e.name}</span>
												<span className="text-ink-mute">({args(e.args)})</span>
											</span>
										) : (
											<>
												<span className={e.isError ? "text-post" : "text-ink-soft"}>← {describe(e.result)}</span>
												{Array.isArray((e.result as any)?.items) && (
													<ul className="mt-1 mb-2 space-y-1 border-l-2 border-rule pl-3 font-sans text-[13px]">
														{(e.result as any).items.slice(0, 4).map((n: any) => (
															<li key={n.link ?? n.title}>
																<a href={n.link} target="_blank" rel="noopener noreferrer nofollow" className="text-ink no-underline hover:underline">
																	{n.title}
																</a>
																<span className="text-ink-mute">
																	{" "}
																	· {n.source}
																	{n.flags?.length ? " · hype" : ""}
																</span>
															</li>
														))}
													</ul>
												)}
											</>
										)}
									</li>
								))}
							</ol>
						) : (
							<p className="mt-3 text-sm text-ink-mute">Each tool the agent calls shows up here, with what came back.</p>
						)}
					</div>

					<div className="border-t-2 border-ink px-5 py-5 sm:px-7">
						<div className="flex items-baseline justify-between gap-4">
							<h3 className="catalogue text-ink-mute">Paper account</h3>
							<div className="flex items-center gap-1">
								<button
									type="button"
									onClick={() => {
										setVoice((v) => !v);
										window.speechSynthesis?.cancel();
									}}
									aria-pressed={voice}
									aria-label={voice ? "Stop reading replies aloud" : "Read replies aloud"}
									className="grid size-9 place-items-center hover:bg-ink hover:text-paper"
								>
									{voice ? <Volume2 className="size-4" aria-hidden="true" /> : <VolumeX className="size-4" aria-hidden="true" />}
								</button>
								<button
									type="button"
									onClick={reset}
									aria-label="Reset the account"
									className="grid size-9 place-items-center hover:bg-ink hover:text-paper"
								>
									<RotateCcw className="size-4" aria-hidden="true" />
								</button>
							</div>
						</div>
						<p className="mt-1 font-display text-4xl leading-none font-black tabular-nums">{rupees.format(account?.cash ?? 1_000_000)}</p>
						<p className="catalogue text-ink-mute">cash{open > 0 && ` · ${open} open order${open === 1 ? "" : "s"}`}</p>
						{holdings.length > 0 && (
							<ul className="mt-3 divide-y divide-rule border-t border-rule text-sm">
								{holdings.map(([sym, p]) => (
									<li key={sym} className="flex justify-between gap-4 py-1.5 tabular-nums">
										<span className="font-semibold">{sym}</span>
										<span className="text-ink-soft">
											{p.qty} × {rupees.format(p.avgPrice)}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
