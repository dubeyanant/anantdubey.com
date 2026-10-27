---
title: "Building a voice trading agent with MCP"
date: "2026-10-27"
summary: "Why I think the next wave of investors will speak to their broker, and how I built a voice agent that can quote, explain and place (paper) trades, but never act without your yes."
tags: ["AI agents", "MCP", "voice", "fintech", "TypeScript"]
---

A while ago I was teaching my mother how the stock market works: what a share is, why prices move, how money is made and lost. At some point I opened a trading app to show her what it looks like in practice.

She couldn't follow it. Not the ideas, the app. Tabs, charts, abbreviations, an order screen with six fields she had never heard of. Everything she wanted to ask was a simple sentence, and the app had no place to put a sentence.

That was the starting point for the voice agent I pitched at my company's ideathon this year, and later rebuilt from scratch in the open. This post is about the thinking behind it and how it's built: a speech front end, an LLM agent, and an MCP server that turns a broker into a set of tools the agent can call.

You can [try the rebuild live](/work/voice-trading-agent), and the [MCP server is open source](https://github.com/dubeyanant/paper-broker-mcp).

## Three people, one app

My mother isn't the only person a trading app loses. When I sat down to design the agent, I kept three people in mind.

**The beginner.** She has a demat account and no idea what to do with it. Her questions are basic, and she's embarrassed to ask them: *What is a stock? What's a scrip? Why is my holding red today? How do I actually lose money?* A menu can't answer any of these.

**The investor.** He knows what he wants to buy, but he checks before he buys. *How are Infosys's numbers? What's the news on Tata Motors this week? Okay, buy ten.* Today that means three screens and an order form.

**The active trader.** He's fast and specific. He wants to look at the market depth or the option chain, then place a bracket order with a trigger price, a stop-loss and a target, in the middle of market hours, without hunting through menus.

These three need very different things, but they share one problem: the distance between what they want and what the app makes them do. Every extra screen, every English-only label, every unexplained field is a roadblock. Voice removes most of them at once. You say what you want, in your own words and your own language, and the app does the rest.

## The philosophy: remove every roadblock except one

If I had to put the whole project in one line, it would be this:

> Remove every roadblock between a person and what they want to do, except their own yes.

The agent should explain, look up, fill in and read back as much as it can. It should meet people at their level (a beginner gets a plain explanation, a trader gets numbers) and in their language. But there is one step it must never take for you: the decision to put money on the line. That step stays slow on purpose, and it stays yours.

Everything technical below follows from that line.

## How it fits together

```
 mic ──speech-to-text──> agent loop ──tool calls──> MCP server ──> broker
                             │                                       │
 speaker <─text-to-speech── reply <────── tool results (text + JSON) ─┘
```

1. **Speech in.** The browser's built-in speech recognition turns what you say into text. It needs no API key and no extra service.
2. **The agent.** An LLM reads the conversation and decides which tools to call: look up the stock you named, fetch a quote, preview an order.
3. **The MCP server.** Each broker capability is a tool with a name, a description and a typed input. The server runs the tool and returns a short sentence written to be read aloud, plus the same data as JSON.
4. **The broker.** In the rebuild it's a paper-trading account with simulated prices for twenty NSE large caps. In the original it was a demo brokerage app behind real APIs.
5. **Speech out.** The reply is read back with the browser's text-to-speech.

## Why MCP is the important part

An LLM on its own knows a lot about the stock market and nothing about your account. It can't see your cash, it can't look up a live quote, and it certainly can't place an order. Something has to connect the model to the broker's code. In this project, that something is MCP, the Model Context Protocol.

MCP lets a server describe what it can do as a list of tools. The agent discovers the tools, reads their descriptions, and calls them with structured arguments. Here's what the paper broker exposes:

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

Three things made MCP the right choice over wiring functions straight into one model's API:

- **The rules live in the server, not in the prompt.** A prompt is a suggestion; a tool's input schema is a contract. What an order can look like, which orders are allowed, and what happens when one is invalid are all decided by code the model can't talk its way around.
- **The model is swappable.** The same server runs with Gemini, with Claude, or with no model at all (more on that below). The behaviour that matters doesn't change when the model does.
- **The broker is reusable.** The same server that powers the demo on my site also runs over stdio, so Claude Desktop or any MCP client can trade on the paper account. The agent is one client among many.

## The yes that the model can't fake

This is the part I care about most. An agent that can place trades is only acceptable if it can't place one you never heard.

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

Two layers enforce it:

1. **The server.** `place_order` takes nothing but a `preview_id`. The model can't invent an order, and a preview expires after 60 seconds, so an old one can't be replayed.
2. **The agent loop.** `place_order` only goes through for a preview that existed *before* your latest message. If the model previews and tries to place in the same turn, the loop refuses it, whatever the model decided. If you say anything other than yes, the pending preview is dropped.

So the order of events is always the same: the agent reads the order back, you answer, and only then does anything happen.

## The questions a compliance team asks first

A trading agent gets the same questions from any compliance team, and they're the right questions. I designed for them from the start rather than bolting answers on later.

**Can the AI place a trade by itself?** No. See above: the gate is in code, at two levels, and it's covered by tests.

**Does client data end up in the model?** The original design kept nothing in the AI's memory. The rebuild goes further: the server stores nothing between turns. The account state is plain JSON that the client holds and sends back, and the server validates it before trusting it. The model only sees what the tools return for the current turn.

**Can it make numbers up?** It's told to use only numbers that come from the tools, and the tools are the only place a price, a balance or an order value can come from. Every tool reply carries the data as JSON next to the sentence it reads out.

**Is it giving investment advice?** No. News is summarised neutrally, keeping what was reported apart from opinion, and the agent never suggests a trade because of a headline. The tip checker never calls a message a scam as a fact. It lists the warning signs it found and points to the right places to check: SEBI's intermediary search, the company's exchange announcements, and SEBI SCORES for complaints.

**What if the AI is down?** That's the next section.

## An agent that never shows an error

A demo that says "something went wrong" in front of a user is a failed demo. So the agent has a chain of fallbacks:

- It tries a fast model first. If that model is busy, slow or out of quota, it retries once, then moves to the next model in the chain.
- If every model fails, a deterministic rules parser takes over. It understands the common commands ("buy 10 reliance", "price of HDFC bank", "my portfolio", "yes") and drives the *same* MCP tools, so the result looks the same.
- If a model fails halfway through a turn, the turn is replayed from the original state with the parser. The one exception is a failure after an order was already placed: that order stands, and the reply says so.

The parser is also what keeps the live demo on my site working when the free AI quota runs out.

## Speaking the user's language

The beginner I described probably doesn't want to do this in English. The agent replies in simple spoken Hindi when you write in Devanagari or switch the language, and news and tip checks follow. The parser understands Hindi and Hinglish too: Hindi names for all twenty stocks, Hindi number words, and commands like "10 रिलायंस खरीदो", "इंफोसिस का भाव" or "मेरा पोर्टफोलियो".

## Testing an agent

You can't unit-test what a model will say. You can test everything around it. The 146 tests in the repo focus on what must never change:

- `place_order` is refused when the preview was made in the same turn.
- Changing the subject drops the pending preview, and confirming after it expired places nothing.
- No short selling, no buying beyond your cash, and limit prices within 20% of the last price.
- A failing provider falls back to the rules parser, and a quota error mid-turn moves to the next model.
- API errors name the step and the time taken, and never include the key.

## What's built, and what's next

The rebuild doesn't cover all three people yet.

| | Today | Next |
| --- | --- | --- |
| Beginner | Quotes, cash and portfolio by voice, in Hindi or English; a check for forwarded tips | Plain-language answers to the basics: what a stock is, how gains and losses work |
| Investor | Quotes, real headlines without the hype, previewed market and limit orders | Fundamentals |
| Trader | Fast spoken orders with read-back | Market depth, the option chain, bracket orders with trigger, stop-loss and target |

The trader's tools need real market data, and that needs a licensed feed, so prices in the demo stay simulated for now. The architecture doesn't change: each of those is another tool on the server, behind the same preview-and-confirm gate.

## The one-line version

Make the app understand a sentence, in any language, at any level. Let the agent do the looking up, the explaining and the form-filling. Keep the one decision that matters with the person who's spending the money.

[Try the voice agent](/work/voice-trading-agent) · [Read the MCP server's code](https://github.com/dubeyanant/paper-broker-mcp)
