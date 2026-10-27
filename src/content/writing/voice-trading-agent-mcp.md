---
title: "Building a voice trading agent with MCP"
date: "2026-10-27"
summary: "A voice agent that can quote, explain and place (paper) trades, but never acts without your yes."
tags: ["AI agents", "MCP", "voice", "fintech", "TypeScript"]
---

A while ago I was teaching my mother how the stock market works. At some point I opened a trading app to show her what it looks like in practice.

She couldn't follow it. Not the ideas, the app. Tabs, charts, abbreviations, an order screen with six fields she had never heard of. Everything she wanted to ask was a simple sentence, and the app had no place to put a sentence.

That became the voice agent I pitched at my company's ideathon this year, and later rebuilt from scratch in the open. You can [try it live](/work/voice-trading-agent), and the [MCP server is open source](https://github.com/dubeyanant/paper-broker-mcp).

## Three people, one app

**The beginner** has a demat account and no idea what to do with it. *What is a stock? What's a scrip? Why is my holding red today?*

**The investor** knows what he wants, but checks first. *How are Infosys's numbers? What's the news on Tata Motors? Okay, buy ten.*

**The active trader** wants the market depth or the option chain, then a bracket order with a trigger price, stop-loss and target, in the middle of market hours.

All three are fighting the same thing: screens, English-only labels and unexplained fields between them and what they want. Voice removes most of that at once.

## Remove every roadblock except one

> Remove every roadblock between a person and what they want to do, except their own yes.

The agent explains, looks up, fills in and reads back. It meets people at their level and in their language. But it never decides to put your money on the line. That step stays slow, and it stays yours.

## How it fits together

```
 mic ──speech-to-text──> agent loop ──tool calls──> MCP server ──> broker
                             │                                       │
 speaker <─text-to-speech── reply <────── tool results (text + JSON) ─┘
```

1. **Speech in.** The browser's built-in speech recognition, no API key.
2. **The agent.** An LLM reads the conversation and decides which tools to call.
3. **The MCP server.** Each broker capability is a typed tool. It returns a sentence to read aloud plus the same data as JSON.
4. **The broker.** A paper-trading account with simulated prices for twenty NSE large caps. The original ran on a demo brokerage app.
5. **Speech out.** The browser's text-to-speech.

## Why MCP

An LLM knows a lot about markets and nothing about your account. MCP is what connects the agent to the broker's code: the server describes what it can do as tools, and the agent calls them with structured arguments.

| Tool | What it does |
| --- | --- |
| `search_instruments` | Turns a spoken name ("state bank", "L and T", "infy") into a symbol |
| `get_quote` | Last price, change, day high and low |
| `get_funds`, `get_positions`, `get_orders` | Cash, holdings with P&L, recent orders |
| `preview_order` | Checks an order and returns a preview that lives for 60 seconds |
| `place_order` | Places a previewed order, and nothing else |
| `cancel_order` | Cancels an open limit order |
| `get_news` | This week's real headlines for a stock, tagged for hype |
| `check_tip` | Flags the warning signs of a pump-and-dump in a forwarded tip |

- **The rules live in the server.** A prompt is a suggestion; a tool's schema is a contract. What an order can look like is decided by code the model can't talk its way around.
- **The model is swappable.** Gemini, Claude, or no model at all. The behaviour that matters stays the same.
- **The broker is reusable.** The same server runs over stdio, so Claude Desktop or any MCP client can trade on the paper account.

## The yes the model can't fake

There is no tool that places an order from raw parameters. An order can only come from a preview:

```
const first = await runAgentTurn({
  messages: [{ role: "user", content: "buy 10 reliance" }],
  state: null,
});
first.reply; // "Buy 10 shares of Reliance at market, about 29,425 rupees. Shall I place it?"

const second = await runAgentTurn({
  messages: [...first.messages, { role: "user", content: "yes" }],
  state: first.state,
});
second.reply; // "Done. Bought 10 shares of Reliance at 2,942 rupees 45 paise."
```

1. **The server.** `place_order` takes nothing but a `preview_id`, and a preview expires after 60 seconds.
2. **The agent loop.** `place_order` only goes through for a preview that existed *before* your latest message. Preview and place in the same turn, and the loop refuses, whatever the model decided. Say anything other than yes, and the preview is dropped.

## What compliance asks first

**Can the AI place a trade by itself?** No. The gate is in code, at two levels, and covered by tests.

**Does client data end up in the model?** The original kept nothing in the AI's memory. In the rebuild the server stores nothing between turns: the account is plain JSON the client holds, validated on every request.

**Can it make numbers up?** Prices, balances and order values only come from tools, and every tool reply carries the data as JSON.

**Is it advice?** No. News is summarised neutrally and never turned into a trade suggestion. The tip checker lists the warning signs it found and points to SEBI's intermediary search, exchange announcements and SCORES.

## An agent that never shows an error

- A fast model first. If it's busy or out of quota, one retry, then the next model.
- If every model fails, a rules parser takes over. It understands the common commands ("buy 10 reliance", "price of HDFC bank", "yes") and drives the *same* MCP tools.
- If a model fails mid-turn, the turn replays from the original state with the parser, unless an order was already placed. Then the order stands and the reply says so.

## Hindi

Write in Devanagari or switch the language, and the agent replies in simple spoken Hindi. The parser understands Hindi and Hinglish too: Hindi names for all twenty stocks, Hindi number words, and commands like "10 रिलायंस खरीदो", "इंफोसिस का भाव" or "मेरा पोर्टफोलियो".

## Testing an agent

The 146 tests cover what must never change:

- `place_order` is refused when the preview was made in the same turn.
- Changing the subject drops the pending preview. Confirming after it expired places nothing.
- No short selling, no buying beyond your cash, limit prices within 20% of the last price.
- A failing provider falls back to the parser, and a quota error mid-turn moves to the next model.
- Errors name the step and the time taken, and never include the key.

## What's next

| | Today | Next |
| --- | --- | --- |
| Beginner | Quotes, cash and portfolio by voice, in Hindi or English; tip checks | Plain-language answers to the basics |
| Investor | Quotes, real headlines, previewed market and limit orders | Fundamentals |
| Trader | Fast spoken orders with read-back | Market depth, the option chain, bracket orders |

The trader's tools need a licensed market feed. Each one is another tool on the same server, behind the same gate.

[Try the voice agent](/work/voice-trading-agent) · [Read the code](https://github.com/dubeyanant/paper-broker-mcp)
