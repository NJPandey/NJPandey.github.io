---
title: "AI Models in 2026, Explained: What You Pay, What You Get"
date: 2026-09-24
tags: [ai, llm, models, cursor]
excerpt: Tokens, context windows, and reasoning modes explained first, then a September 2026 comparison of the major models on price, speed, and when to use each.
---

Open the model picker in any AI tool today and you get a list of names that tell you nothing.
Fable, Astra, Sonnet, Luna, Flash.
The pricing pages assume you already know what a token is, why output costs more than input, and what a context window does.
Most people pick whatever is default and move on.

This post fixes that in two passes.
First, the terminology, explained properly, because every comparison chart is meaningless without it.
Then a grounded comparison of the major models as of September 2026: real prices from the providers, a cost-per-task chart, and honest guidance on speed and capability.

One promise and one caveat up front.
The promise: no benchmark scores, because benchmarks are increasingly gamed and rarely predict how a model behaves on your codebase.
The caveat: prices in this industry change monthly, so treat every number here as a snapshot with a date stamped on it, and check the provider's page before making a budget decision.

## Part 1: The terminology, finally explained

### Model

A model is a trained neural network that predicts the next chunk of text.
"Trained" means it adjusted billions of internal numbers, called **parameters**, until its predictions matched an enormous pile of text and code.
You never touch the parameters; you rent the finished network by the request.
Bigger parameter counts generally mean more capability and more cost, which is why vendors sell the same family in several sizes.

### Token

Models do not read words or characters.
They read **tokens**: chunks of text from a fixed vocabulary.
For English, one token is roughly four characters, or three quarters of a word.
Code tokenizes less efficiently than prose because of symbols and indentation.

<figure>
<svg viewBox="0 0 640 140" role="img" aria-label="The sentence 'Cursor helps you ship code faster.' split into seven tokens, each with an illustrative numeric id">
  <rect class="diagram-box-accent" x="145" y="44" width="54" height="36" rx="6"/>
  <text class="diagram-text-mono" x="172" y="67" text-anchor="middle">Cursor</text>
  <rect class="diagram-box" x="205" y="44" width="54" height="36" rx="6"/>
  <text class="diagram-text-mono" x="232" y="67" text-anchor="middle"> helps</text>
  <rect class="diagram-box-accent" x="265" y="44" width="38" height="36" rx="6"/>
  <text class="diagram-text-mono" x="284" y="67" text-anchor="middle"> you</text>
  <rect class="diagram-box" x="309" y="44" width="46" height="36" rx="6"/>
  <text class="diagram-text-mono" x="332" y="67" text-anchor="middle"> ship</text>
  <rect class="diagram-box-accent" x="361" y="44" width="46" height="36" rx="6"/>
  <text class="diagram-text-mono" x="384" y="67" text-anchor="middle"> code</text>
  <rect class="diagram-box" x="413" y="44" width="62" height="36" rx="6"/>
  <text class="diagram-text-mono" x="444" y="67" text-anchor="middle"> faster</text>
  <rect class="diagram-box-accent" x="481" y="44" width="14" height="36" rx="6"/>
  <text class="diagram-text-mono" x="488" y="67" text-anchor="middle">.</text>
  <text class="diagram-text-small" x="172" y="100" text-anchor="middle">10244</text>
  <text class="diagram-text-small" x="232" y="100" text-anchor="middle">2382</text>
  <text class="diagram-text-small" x="284" y="100" text-anchor="middle">345</text>
  <text class="diagram-text-small" x="332" y="100" text-anchor="middle">8817</text>
  <text class="diagram-text-small" x="384" y="100" text-anchor="middle">2215</text>
  <text class="diagram-text-small" x="444" y="100" text-anchor="middle">5571</text>
  <text class="diagram-text-small" x="488" y="100" text-anchor="middle">13</text>
</svg>
<figcaption>One sentence becomes seven tokens. The numbers under each token are its id in the model's vocabulary (ids shown are illustrative).</figcaption>
</figure>

Why you care: every price and every limit in this industry is denominated in tokens.
"1M tokens" on a pricing page means one million of these chunks, which is roughly 750,000 words of English, or a few large codebases' worth of reading.

### Input tokens vs output tokens

Every request bills two things separately.
**Input tokens** are what you send: your prompt, your code, the conversation history.
**Output tokens** are what the model generates back.

Output is always several times more expensive than input, and the reason is mechanical.
Input is processed in parallel: the model reads your whole prompt in one pass.
Output is generated one token at a time, serially, and each new token requires a full forward pass through the network.
Serial work is expensive work.
This is why "write me a 2,000-line file" costs far more than "read this 2,000-line file and summarize it".

### Context window

The **context window** is the maximum number of tokens the model can consider in a single request: your input plus its output must fit inside it.
Modern models range from 128K to 1M+ tokens.

<figure>
<svg viewBox="0 0 640 160" role="img" aria-label="A context window bar divided into rules, your code and files, chat history, and room for the reply">
  <line class="diagram-line" x1="20" y1="30" x2="580" y2="30"/>
  <line class="diagram-line" x1="20" y1="25" x2="20" y2="35"/>
  <line class="diagram-line" x1="580" y1="25" x2="580" y2="35"/>
  <text class="diagram-text-small" x="300" y="20" text-anchor="middle">context window: 128K to 1M+ tokens depending on the model</text>
  <rect class="diagram-box" x="20" y="44" width="90" height="44" rx="6"/>
  <text class="diagram-text" x="65" y="70" text-anchor="middle">rules</text>
  <rect class="diagram-box-accent" x="110" y="44" width="240" height="44" rx="6"/>
  <text class="diagram-text" x="230" y="70" text-anchor="middle">your code + files</text>
  <rect class="diagram-box" x="350" y="44" width="140" height="44" rx="6"/>
  <text class="diagram-text" x="420" y="70" text-anchor="middle">chat history</text>
  <rect class="diagram-box" x="490" y="44" width="90" height="44" rx="6"/>
  <text class="diagram-text" x="535" y="70" text-anchor="middle">the reply</text>
  <text class="diagram-text-small" x="300" y="116" text-anchor="middle">everything must fit inside; whatever overflows is silently forgotten</text>
</svg>
<figcaption>A bigger window means the model can hold more of your codebase in its head at once. It does not mean it uses all of it well.</figcaption>
</figure>

Two practical consequences.
First, in a long chat, the oldest messages eventually fall out of the window, which is why a model can "forget" an instruction you gave an hour ago.
Second, bigger windows cost more per request, because you are billed for every input token, every time.

### Latency and throughput

**Latency** is how long you wait before the first token appears (often called TTFT, time to first token).
**Throughput** is how fast tokens stream after that, measured in tokens per second.
A model can have low latency and low throughput (starts instantly, types slowly) or the reverse.
For interactive coding you feel both: latency decides how snappy chat feels, throughput decides how long a big file edit takes.

### Reasoning (thinking) modes

Many 2026 models can spend extra output tokens on an internal scratchpad before answering: working through the problem step by step where you cannot see it.
This is called **reasoning** or **thinking**, and it is usually a dial you can turn up or down.
Higher reasoning effort means better answers on hard problems, higher latency, and a bigger output bill.
On easy problems it is wasted money, which is why the budget models with reasoning turned off remain useful.

### Benchmark

A **benchmark** is a standardized test suite for models: a fixed set of problems, a score.
Useful for vendors' marketing, less useful for you.
Scores saturate, test sets leak into training data, and none of the problems are your codebase.
Treat benchmark tables as a rough capability ordering, never as a prediction.

### Hallucination

A **hallucination** is a confident falsehood: an API that does not exist, a flag that was never added.
All current models do this occasionally, and none of the pricing tiers eliminate it.
Expensive models hallucinate less often and more subtly, which is arguably more dangerous.
Verification (tests, compilers, actually running the app) is not optional at any price.

## Part 2: The September 2026 lineup

Here are the models you are most likely to meet in a tool like Cursor today, with list prices from the providers' official pages.
Prices are per million tokens, input and output separately.

| Model | Input ($ / 1M) | Output ($ / 1M) | Notes |
| --- | --- | --- | --- |
| Claude Fable 5.1 | 10.00 | 50.00 | Anthropic frontier, deepest reasoning |
| GPT-6 Astra | 10.00 | 50.00 | OpenAI frontier |
| Claude Opus 5 | 5.00 | 25.00 | Anthropic frontier, previous flagship tier |
| GPT-5.6 Sol | 4.00 | 20.00 | promo pricing through November 21 |
| Claude Sonnet 5 | 2.00 | 10.00 | Anthropic mid tier, daily workhorse |
| GPT-6 Sol | 2.00 | 10.00 | OpenAI mid tier |
| Grok 4.6 | 2.00 | 6.00 | xAI mid tier, unusually cheap output |
| GPT-5.3-codex | 1.75 | 14.00 | coding-tuned, cheap input, pricey output |
| Claude Haiku 4.5 | 1.00 | 5.00 | Anthropic budget tier |
| Gemini 3.8 Flash | 0.75 | 3.75 | Google; promo through Dec 31, 2026, then 1.50 / 7.50 |
| GPT-6 Luna | 0.10 | 0.50 | OpenAI ultra-budget tier |

Read the Notes column twice.
Two of the cheapest rows are promotions with expiry dates, which is exactly the kind of thing that changes after this post is published.

## Part 3: What a task actually costs

Per-million-token prices are hard to feel, so let us convert them into something concrete.
Take a typical agentic coding task: the model reads about 50K tokens of code, rules, and conversation, and writes about 10K tokens of edits and explanation.

Cost per task = 0.05 x input price + 0.01 x output price.

<figure>
<svg viewBox="0 0 640 380" role="img" aria-label="Bar chart of estimated cost per typical coding task for each model, from Claude Fable 5.1 and GPT-6 Astra at one dollar down to GPT-6 Luna at one cent">
  <text class="diagram-text" x="150" y="37" text-anchor="end">Claude Fable 5.1</text>
  <rect class="diagram-bar" x="160" y="24" width="380" height="18" rx="3"/>
  <text class="diagram-text-mono" x="548" y="37">$1.00</text>
  <text class="diagram-text" x="150" y="69" text-anchor="end">GPT-6 Astra</text>
  <rect class="diagram-bar" x="160" y="56" width="380" height="18" rx="3"/>
  <text class="diagram-text-mono" x="548" y="69">$1.00</text>
  <text class="diagram-text" x="150" y="101" text-anchor="end">Claude Opus 5</text>
  <rect class="diagram-bar" x="160" y="88" width="190" height="18" rx="3"/>
  <text class="diagram-text-mono" x="358" y="101">$0.50</text>
  <text class="diagram-text" x="150" y="133" text-anchor="end">GPT-5.6 Sol</text>
  <rect class="diagram-bar" x="160" y="120" width="152" height="18" rx="3"/>
  <text class="diagram-text-mono" x="320" y="133">$0.40</text>
  <text class="diagram-text" x="150" y="165" text-anchor="end">GPT-5.3-codex</text>
  <rect class="diagram-bar" x="160" y="152" width="87" height="18" rx="3"/>
  <text class="diagram-text-mono" x="255" y="165">$0.23</text>
  <text class="diagram-text" x="150" y="197" text-anchor="end">Claude Sonnet 5</text>
  <rect class="diagram-bar" x="160" y="184" width="76" height="18" rx="3"/>
  <text class="diagram-text-mono" x="244" y="197">$0.20</text>
  <text class="diagram-text" x="150" y="229" text-anchor="end">GPT-6 Sol</text>
  <rect class="diagram-bar" x="160" y="216" width="76" height="18" rx="3"/>
  <text class="diagram-text-mono" x="244" y="229">$0.20</text>
  <text class="diagram-text" x="150" y="261" text-anchor="end">Grok 4.6</text>
  <rect class="diagram-bar" x="160" y="248" width="61" height="18" rx="3"/>
  <text class="diagram-text-mono" x="229" y="261">$0.16</text>
  <text class="diagram-text" x="150" y="293" text-anchor="end">Claude Haiku 4.5</text>
  <rect class="diagram-bar" x="160" y="280" width="38" height="18" rx="3"/>
  <text class="diagram-text-mono" x="206" y="293">$0.10</text>
  <text class="diagram-text" x="150" y="325" text-anchor="end">Gemini 3.8 Flash</text>
  <rect class="diagram-bar" x="160" y="312" width="29" height="18" rx="3"/>
  <text class="diagram-text-mono" x="197" y="325">$0.08</text>
  <text class="diagram-text" x="150" y="357" text-anchor="end">GPT-6 Luna</text>
  <rect class="diagram-bar" x="160" y="344" width="4" height="18" rx="3"/>
  <text class="diagram-text-mono" x="172" y="357">$0.01</text>
</svg>
<figcaption>Estimated cost of one 50K-input / 10K-output task at list prices, September 2026. The spread between the most and least expensive model is 100x.</figcaption>
</figure>

Three things worth noticing.

First, the spread is enormous: the frontier models cost one hundred times more per task than the cheapest option.
Second, the mid tier (Sonnet 5, GPT-6 Sol) sits at a fifth of the frontier price, which is why experienced users default there and escalate only when stuck.
Third, GPT-5.3-codex shows why you must read both price columns: its input is the second cheapest on the list, but its pricey output pushes the task cost above the mid tier.
Agentic work is output-heavy, so output price dominates more often than people expect.

## Part 4: Speed, honestly

I am not going to quote tokens-per-second numbers, because they vary by provider load, region, and reasoning settings, and any precise figure would be stale within weeks.
What survives is the shape, from daily use:

| Tier | Models | What it feels like |
| --- | --- | --- |
| Instant | GPT-6 Luna, Gemini 3.8 Flash, Claude Haiku 4.5 | First token almost immediately, streams fast; fine for autocomplete-style work |
| Conversational | Claude Sonnet 5, GPT-6 Sol, Grok 4.6, GPT-5.3-codex | A beat of thought, then steady output; you do not notice waiting in normal chat |
| Deliberate | Claude Fable 5.1, Claude Opus 5, GPT-6 Astra, GPT-5.6 Sol | Visible thinking time, especially with reasoning turned up; you wait, and on hard problems the wait is the point |

The deliberate tier is not slow because it is badly engineered.
It is slow because it is doing more serial work per answer, and serial work is the expensive kind, as we covered in Part 1.
Speed and depth trade off against each other inside every model family.

## Part 5: Capability, honestly

Same disclaimer: this is a practitioner's ordering from using these models on real backend and frontend work, not a benchmark table.

- **Frontier tier (Fable 5.1, Opus 5, Astra).**
  The models you bring in when the spec is ambiguous, the bug is subtle, or the change spans architecture.
  They hold long chains of reasoning together and notice the constraint you forgot to state.
  Overkill for boilerplate, and priced like it.
- **Strong daily tier (Sonnet 5, GPT-6 Sol, GPT-5.6 Sol, GPT-5.3-codex, Grok 4.6).**
  The correct default for most feature work, tests, refactors, and explanations.
  On a well-scoped task with good rules files, the difference from the frontier tier is smaller than the price difference.
- **Budget tier (Haiku 4.5, Flash, Luna).**
  Mechanical work: renames, format conversions, simple test generation, summarizing logs.
  They follow clear instructions well and improvise badly.
  Give them ambiguity and they will confidently produce the wrong thing quickly and cheaply.

## Part 6: Choosing, as a flowchart

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="Decision flowchart: quick repetitive edits go to the budget tier, everyday features to the mid tier, hard or high-stakes work to the frontier tier">
  <defs>
    <marker id="b4-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--accent)"/>
    </marker>
    <marker id="b4-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--muted)"/>
    </marker>
  </defs>
  <rect class="diagram-box-accent" x="230" y="12" width="180" height="40" rx="8"/>
  <text class="diagram-text" x="320" y="37" text-anchor="middle">What kind of task?</text>
  <rect class="diagram-box" x="20" y="100" width="180" height="44" rx="8"/>
  <text class="diagram-text" x="110" y="127" text-anchor="middle">Quick, repetitive edits</text>
  <rect class="diagram-box" x="230" y="100" width="180" height="44" rx="8"/>
  <text class="diagram-text" x="320" y="127" text-anchor="middle">Everyday features, fixes</text>
  <rect class="diagram-box" x="440" y="100" width="184" height="44" rx="8"/>
  <text class="diagram-text" x="532" y="127" text-anchor="middle">Hard, high-stakes work</text>
  <line class="diagram-line" x1="290" y1="52" x2="116" y2="94" marker-end="url(#b4-arrow-muted)"/>
  <line class="diagram-line" x1="320" y1="52" x2="320" y2="94" marker-end="url(#b4-arrow-muted)"/>
  <line class="diagram-line" x1="350" y1="52" x2="526" y2="94" marker-end="url(#b4-arrow-muted)"/>
  <rect class="diagram-box" x="20" y="190" width="180" height="56" rx="8"/>
  <text class="diagram-text" x="110" y="212" text-anchor="middle">Budget tier</text>
  <text class="diagram-text-mono" x="110" y="230" text-anchor="middle">Luna, Haiku 4.5, Flash</text>
  <rect class="diagram-box-accent" x="230" y="190" width="180" height="56" rx="8"/>
  <text class="diagram-text" x="320" y="212" text-anchor="middle">Mid tier (default here)</text>
  <text class="diagram-text-mono" x="320" y="230" text-anchor="middle">Sonnet 5, GPT-6 Sol</text>
  <rect class="diagram-box" x="440" y="190" width="184" height="56" rx="8"/>
  <text class="diagram-text" x="532" y="212" text-anchor="middle">Frontier tier</text>
  <text class="diagram-text-mono" x="532" y="230" text-anchor="middle">Fable 5.1, Opus 5, Astra</text>
  <line class="diagram-line-accent diagram-flow" x1="110" y1="144" x2="110" y2="184" marker-end="url(#b4-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="320" y1="144" x2="320" y2="184" marker-end="url(#b4-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="532" y1="144" x2="532" y2="184" marker-end="url(#b4-arrow)"/>
</svg>
<figcaption>When in doubt, start mid-tier. If the model fails twice on a well-scoped brief, escalate to frontier rather than arguing with it.</figcaption>
</figure>

The strategy that experienced users converge on is a ratchet, not a loyalty.
Default to the mid tier.
Drop to budget for mechanical work where the brief is airtight.
Escalate to frontier when the mid tier has failed twice on a task you specified well, because at that point the problem is genuinely hard and the extra dollar is cheaper than your hour.

## Part 7: The caveats that keep this honest

- **Prices move.**
  Everything in Part 2 is a September 2026 snapshot from official pricing pages, and two rows are promotions with expiry dates.
  Verify before you budget.
- **My tiers are opinion.**
  A different practitioner on a different stack might swap a model between tiers.
  The cheap way to form your own opinion is to run the same well-scoped task through two models and compare diffs.
- **Benchmarks were excluded on purpose.**
  If you want scores, the vendors publish plenty; just know what you are looking at.
- **No model removes the need to verify.**
  The frontier tier hallucinates less, not never.
  Tests, compilers, and running the app remain the ground truth at every price point.

The model picker stops being a list of mysterious names the moment you understand what is actually being sold: tokens in, tokens out, serial work, and a speed-depth tradeoff.
Pick on purpose, and re-pick every few months, because this market does not sit still.
