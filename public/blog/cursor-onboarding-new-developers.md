---
title: "From Zero to Pro with Cursor: An Onboarding Guide for New Developers"
date: 2026-09-30
tags: [cursor, ai, developer-tools, onboarding]
excerpt: A terminology-first path from installing Cursor to running multi-agent workflows, written for developers in their first year.
---

I remember my first week with an AI coding tool.
I opened the chat, typed "fix my code", got a confident answer, pasted it in, and broke the build.
Nobody had explained what the tool was actually doing, what it could see, or where it ended and I began.

This guide is the onboarding I wish someone had given me.
It is written for developers in their first year or two, and it explains every term before using it.
By the end you will know how to set Cursor up properly, how to drive its four modes, how to teach it your codebase with rules and skills, and how to run multiple agents in parallel without losing control of your own git history.

## Part 1: The words nobody explains

Before any buttons, six terms.
Every confusion I have seen from new Cursor users traces back to one of these.

**IDE** (integrated development environment).
The editor you write code in.
Cursor is a fork of VS Code, which means it is VS Code with AI features built into its core rather than bolted on as a plugin.
Your extensions, keybindings, and settings carry over.

**LLM** (large language model).
The actual intelligence.
Cursor itself is not smart; it is a shell that sends your code and instructions to a model (made by Anthropic, OpenAI, Google, and others) and streams back the answer.
Choosing a model in Cursor is choosing which brain your editor rents by the request.

**Token**.
The unit models read and write.
Roughly four characters of English, or three quarters of a word.
Models bill and limit you in tokens, not words or lines.

**Context** and **context window**.
The context is everything the model can see when it answers you: your prompt, the files Cursor decided to include, your rules, previous messages.
The context window is the maximum size of that bundle, measured in tokens.
The model cannot remember anything that is not inside the window.
When people say "the AI forgot what I told it", the real story is usually that the information fell out of the context window.

**Agent**.
A mode where the model does not just answer once.
It plans, calls tools (read a file, edit a file, run a terminal command, open a browser), reads the results, and keeps going until the task is done or it gets stuck.
You supervise instead of transcribing.

**Hallucination**.
When a model states something false with full confidence: a function that does not exist, a flag that was never added.
This is not a bug that will be patched away; it is a property of how these models work.
Your job as the human is verification, and the later parts of this guide are mostly about making verification cheap.

<figure>
<svg viewBox="0 0 640 210" role="img" aria-label="The agent loop: you give a task, the Cursor agent sends context to the model, the model calls tools, results flow back, and you review the diffs">
  <defs>
    <marker id="a1-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--accent)"/>
    </marker>
    <marker id="a1-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--muted)"/>
    </marker>
  </defs>
  <rect class="diagram-box" x="16" y="75" width="120" height="56" rx="8"/>
  <text class="diagram-text" x="76" y="100" text-anchor="middle">You</text>
  <text class="diagram-text-small" x="76" y="117" text-anchor="middle">intent + review</text>
  <rect class="diagram-box-accent" x="260" y="75" width="120" height="56" rx="8"/>
  <text class="diagram-text" x="320" y="100" text-anchor="middle">Cursor agent</text>
  <text class="diagram-text-small" x="320" y="117" text-anchor="middle">plans + acts</text>
  <rect class="diagram-box" x="504" y="16" width="120" height="52" rx="8"/>
  <text class="diagram-text" x="564" y="38" text-anchor="middle">Model</text>
  <text class="diagram-text-small" x="564" y="54" text-anchor="middle">reasons</text>
  <rect class="diagram-box" x="504" y="140" width="120" height="52" rx="8"/>
  <text class="diagram-text" x="564" y="162" text-anchor="middle">Tools</text>
  <text class="diagram-text-small" x="564" y="178" text-anchor="middle">files, shell, web</text>
  <line class="diagram-line-accent diagram-flow" x1="136" y1="96" x2="254" y2="96" marker-end="url(#a1-arrow)"/>
  <text class="diagram-text-small" x="198" y="88" text-anchor="middle">task</text>
  <line class="diagram-line" x1="254" y1="120" x2="142" y2="120" marker-end="url(#a1-arrow-muted)"/>
  <text class="diagram-text-small" x="198" y="138" text-anchor="middle">diffs + summary</text>
  <line class="diagram-line-accent diagram-flow" x1="380" y1="88" x2="500" y2="48" marker-end="url(#a1-arrow)"/>
  <text class="diagram-text-small" x="446" y="56" text-anchor="middle">context + prompt</text>
  <line class="diagram-line-accent diagram-flow" x1="564" y1="68" x2="564" y2="134" marker-end="url(#a1-arrow)"/>
  <text class="diagram-text-small" x="572" y="106">tool calls</text>
  <line class="diagram-line" x1="504" y1="162" x2="384" y2="118" marker-end="url(#a1-arrow-muted)"/>
  <text class="diagram-text-small" x="440" y="152" text-anchor="middle">results</text>
</svg>
<figcaption>Everything in Cursor is this loop. You supply intent and judgement; the agent and model supply speed.</figcaption>
</figure>

## Part 2: Setup done right

Thirty minutes here saves you weeks of confusion later.

1. **Download Cursor** from cursor.com and install it.
2. **Import from VS Code** when it offers.
   Your extensions and keybindings come across, and the editor feels familiar on day one.
3. **Sign in** and check your plan.
   The free tier is enough for this guide's early parts; agent-heavy workflows will push you toward a paid plan.
4. **Pick a default model** in Settings, then Models.
   If you are unsure, start with a mid-tier model (fast, cheap, capable) and escalate to a frontier model only when a task defeats the mid-tier one.
   My companion post compares the current models on price, speed, and strengths.
5. **Decide on privacy mode.**
   In Settings, Privacy, you can prevent your code from being stored by model providers.
   If you work for a company, ask your security team what the policy is before your first prompt, not after.
6. **Let indexing finish.**
   Cursor builds a searchable map of your codebase in the background.
   Until it completes, answers about "where does X live" will be noticeably worse.

One setup step people skip: open a real project, not an empty folder.
Cursor's value scales with how much real code it can see.

## Part 3: The four ways to get help

New users treat Cursor as a chat box and miss three quarters of it.
There are four modes, and choosing the right one is the first real skill.

<figure>
<svg viewBox="0 0 640 250" role="img" aria-label="The four modes of Cursor arranged by increasing autonomy: Tab, Cmd+K, Chat, Agent">
  <rect class="diagram-box" x="16" y="16" width="130" height="44" rx="8"/>
  <text class="diagram-text" x="81" y="43" text-anchor="middle">Tab</text>
  <text class="diagram-text-small" x="162" y="43">autocomplete: it types the next chunk, you accept</text>
  <text class="diagram-text-mono" x="624" y="43" text-anchor="end">you type</text>
  <rect class="diagram-box" x="16" y="74" width="130" height="44" rx="8"/>
  <text class="diagram-text" x="81" y="101" text-anchor="middle">Cmd+K</text>
  <text class="diagram-text-small" x="162" y="101">inline edit: select code, describe the change</text>
  <text class="diagram-text-mono" x="624" y="101" text-anchor="end">you select</text>
  <rect class="diagram-box" x="16" y="132" width="130" height="44" rx="8"/>
  <text class="diagram-text" x="81" y="159" text-anchor="middle">Chat</text>
  <text class="diagram-text-small" x="162" y="159">ask questions about the code, nothing gets edited</text>
  <text class="diagram-text-mono" x="624" y="159" text-anchor="end">you ask</text>
  <rect class="diagram-box-accent" x="16" y="190" width="130" height="44" rx="8"/>
  <text class="diagram-text" x="81" y="217" text-anchor="middle">Agent</text>
  <text class="diagram-text-small" x="162" y="217">multi-step: plans, edits files, runs commands</text>
  <text class="diagram-text-mono" x="624" y="217" text-anchor="end">it works</text>
</svg>
<figcaption>Autonomy increases as you go down the list. Start high on the list; earn your way to Agent.</figcaption>
</figure>

**Tab** predicts what you are about to type.
It is the safest mode and the one you will use hundreds of times a day.
Accept with Tab, reject by just continuing to type.

**Cmd+K** (Ctrl+K on Windows/Linux) rewrites a selection.
Select a function, press Cmd+K, type "add error handling and log the failure", review the diff, accept or reject.
This is the workhorse for surgical changes.

**Chat** answers questions without touching your files.
Use it for "where is authentication handled", "explain what this regex does", "why might this test be flaky".
Chat is read-only thinking out loud.

**Agent** is for tasks, not questions.
"Add pagination to the users endpoint and update the tests" is an agent task.
It will read files, edit several of them, run your test suite, read the failures, and iterate.

The mistake pattern I see most: using Agent for everything from day one, accepting whatever it produces, and slowly filling the codebase with code nobody has read.
The modes below Agent are not training wheels; they are precision instruments.

## Part 4: Driving Agent mode properly

Agent mode rewards the same skill that makes a good tech lead: writing a clear brief.

A weak brief: "improve the login page".
A strong brief: "In `src/pages/Login.jsx`, the submit button stays enabled while the request is in flight, so double-clicking fires two requests. Disable it during submission, show a spinner, and add a test in `__tests__/Login.test.jsx` that asserts the button is disabled after one click. Do not change the styling."

Notice what the strong brief includes: the exact files, the observable symptom, the expected behavior, and the boundary (do not change styling).
You are not writing an essay; you are writing a ticket for a very fast, very literal junior colleague.

Three habits that make Agent mode safe:

1. **Start from a clean git state.**
   Commit or stash before an agent run.
   Then the agent's work is exactly the diff, and `git diff` is your review surface.
2. **Read every diff before accepting.**
   Cursor shows you each change.
   If you cannot explain a hunk, ask Chat to explain it before you accept it.
3. **Use checkpoints.**
   Cursor snapshots the conversation as the agent works.
   If the agent wanders off course, restore the checkpoint instead of arguing with it.

## Part 5: Rules, or teaching Cursor your codebase once

Here is a sentence you should never have to type twice: "we use tabs, not spaces".
Or "never use `console.log`, use our logger".
Or "all API errors must come from `errorStore.js`".

**Rules** are standing instructions that Cursor attaches to the model's context automatically.
They live in `.cursor/rules/` in your repository, one file per topic, written in plain Markdown with a small header that says when the rule applies.

<figure>
<svg viewBox="0 0 640 280" role="img" aria-label="What gets assembled into the model's context: your prompt, open files, rules, skills, and tool results all feed the context window">
  <defs>
    <marker id="a3-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--accent)"/>
    </marker>
  </defs>
  <rect class="diagram-box" x="16" y="16" width="170" height="36" rx="8"/>
  <text class="diagram-text" x="101" y="39" text-anchor="middle">Your prompt</text>
  <rect class="diagram-box" x="16" y="68" width="170" height="36" rx="8"/>
  <text class="diagram-text" x="101" y="91" text-anchor="middle">Open files + selection</text>
  <rect class="diagram-box" x="16" y="120" width="170" height="36" rx="8"/>
  <text class="diagram-text" x="101" y="143" text-anchor="middle">.cursor/rules</text>
  <rect class="diagram-box" x="16" y="172" width="170" height="36" rx="8"/>
  <text class="diagram-text" x="101" y="195" text-anchor="middle">Skills</text>
  <rect class="diagram-box" x="16" y="224" width="170" height="36" rx="8"/>
  <text class="diagram-text" x="101" y="247" text-anchor="middle">Tool results (MCP, docs)</text>
  <rect class="diagram-box-accent" x="360" y="60" width="260" height="160" rx="8"/>
  <text class="diagram-text" x="490" y="128" text-anchor="middle">The context window</text>
  <text class="diagram-text-small" x="490" y="148" text-anchor="middle">everything the model can see</text>
  <text class="diagram-text-small" x="490" y="164" text-anchor="middle">for this one request</text>
  <line class="diagram-line-accent diagram-flow" x1="186" y1="34" x2="354" y2="80" marker-end="url(#a3-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="186" y1="86" x2="354" y2="106" marker-end="url(#a3-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="186" y1="138" x2="354" y2="138" marker-end="url(#a3-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="186" y1="190" x2="354" y2="170" marker-end="url(#a3-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="186" y1="242" x2="354" y2="196" marker-end="url(#a3-arrow)"/>
</svg>
<figcaption>Rules ride along with every request, so the model stops making the same mistake twice.</figcaption>
</figure>

A rule file looks like this:

```markdown
---
description: Logging conventions for this service
alwaysApply: true
---

- Never use console.log. Use the shared logger.
- Every log line starts with logName=camelCaseEventName.
- Never log passwords, tokens, or email addresses.
```

Two kinds of rules matter in practice:

- **Always-on rules** (`alwaysApply: true`) for conventions that hold everywhere in the repo: style, logging, error handling.
- **Scoped rules** (with `globs` like `**/*.test.js`) that only attach when you are editing matching files: test conventions, migration conventions.

Rules are the highest-leverage feature for a team.
One senior engineer's afternoon of writing rules permanently raises the floor of every agent session on that repo.
If you take one thing from this guide back to your team, take this.

## Part 6: Skills, the on-demand playbooks

Rules are always (or conditionally) attached.
**Skills** are the opposite: detailed playbooks that sit on disk and get loaded only when the agent decides the task needs them.

A skill is a folder with a `SKILL.md` that describes a procedure: how to create a migration in this repo, how to run the component test suite, how to cut a release.
The agent sees a one-line description of each available skill, and when your task matches, it reads the full playbook and follows it.

The mental model: rules are laws, skills are recipes.
You do not want the release procedure in every request's context; you want it fetched the one day you actually cut a release.

## Part 7: Multi-agent, or working in parallel with yourself

Once single-agent work feels comfortable, Cursor lets you run several agents at once.
Each agent gets its own **git worktree**: a separate working directory backed by the same repository, so two agents never edit the same checkout at the same time.

<figure>
<svg viewBox="0 0 640 230" role="img" aria-label="Multi-agent workflow: the main branch forks into isolated worktrees, one per agent, and their work is reviewed and merged back">
  <defs>
    <marker id="a4-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--accent)"/>
    </marker>
    <marker id="a4-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--muted)"/>
    </marker>
  </defs>
  <rect class="diagram-box" x="16" y="90" width="110" height="50" rx="8"/>
  <text class="diagram-text" x="71" y="112" text-anchor="middle">main</text>
  <text class="diagram-text-small" x="71" y="128" text-anchor="middle">branch</text>
  <rect class="diagram-box" x="270" y="20" width="170" height="44" rx="8"/>
  <text class="diagram-text" x="355" y="38" text-anchor="middle">Agent 1: fix auth bug</text>
  <text class="diagram-text-small" x="355" y="54" text-anchor="middle">worktree A</text>
  <rect class="diagram-box" x="270" y="93" width="170" height="44" rx="8"/>
  <text class="diagram-text" x="355" y="111" text-anchor="middle">Agent 2: add tests</text>
  <text class="diagram-text-small" x="355" y="127" text-anchor="middle">worktree B</text>
  <rect class="diagram-box" x="270" y="166" width="170" height="44" rx="8"/>
  <text class="diagram-text" x="355" y="184" text-anchor="middle">Agent 3: spike a cache</text>
  <text class="diagram-text-small" x="355" y="200" text-anchor="middle">worktree C</text>
  <rect class="diagram-box-accent" x="500" y="90" width="124" height="50" rx="8"/>
  <text class="diagram-text" x="562" y="112" text-anchor="middle">review +</text>
  <text class="diagram-text" x="562" y="128" text-anchor="middle">merge</text>
  <line class="diagram-line" x1="126" y1="106" x2="264" y2="44" marker-end="url(#a4-arrow-muted)"/>
  <line class="diagram-line" x1="126" y1="115" x2="264" y2="115" marker-end="url(#a4-arrow-muted)"/>
  <line class="diagram-line" x1="126" y1="124" x2="264" y2="186" marker-end="url(#a4-arrow-muted)"/>
  <line class="diagram-line-accent diagram-flow" x1="440" y1="44" x2="496" y2="102" marker-end="url(#a4-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="440" y1="115" x2="496" y2="115" marker-end="url(#a4-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="440" y1="186" x2="496" y2="128" marker-end="url(#a4-arrow)"/>
</svg>
<figcaption>Isolation is the point. Three agents, three worktrees, zero collisions, one human reviewing at the end.</figcaption>
</figure>

When is this worth it?

- **Independent tasks**: a bug fix, a test backfill, and a dependency bump do not interfere.
- **Competing approaches**: ask two agents to solve the same problem differently, keep the better diff, discard the other.
- **Exploration while building**: one agent spikes an idea in a worktree while you keep working in your main checkout.

When is it not worth it: tasks that touch the same files, or work you do not yet know how to review.
Parallel agents multiply output, and they multiply unreviewed output just as fast.

## Part 8: The built-in browser, or closing the loop

The most common way agent work goes wrong: the agent says "done", the code compiles, and the page is visibly broken.
The agent had no way to see the result.

Cursor's built-in browser fixes this.
The agent can open your running app, click through it, read console errors, and take screenshots, then iterate on what it observed.
This turns "the agent wrote code" into "the agent verified the behavior you asked for".

The habit to build: for any UI task, end your brief with "start the dev server, open it in the browser, and verify the change works before you finish".
You have just converted the agent from a typist into a tester.

## Part 9: MCP, briefly

**MCP** (Model Context Protocol) is a standard way to give the agent new tools: your issue tracker, your database, your documentation search, your browser automation.
You configure MCP servers once in settings, and their tools appear alongside the built-in ones.

My advice for your first months: learn the built-in tools deeply before adding MCP servers.
Every tool you add is more capability and more things that can misfire.
Add an MCP server when you feel a specific, repeated pain ("the agent keeps asking me to paste ticket details"), not because the list of available servers looks exciting.

## Part 10: A pro workflow, end to end

Here is what a mature agent session looks like for a real ticket.

<figure>
<svg viewBox="0 0 640 120" role="img" aria-label="The pro loop: plan, implement, verify in the browser, review the diff, then ship">
  <defs>
    <marker id="a5-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill: var(--accent)"/>
    </marker>
  </defs>
  <rect class="diagram-box-accent" x="0" y="40" width="112" height="40" rx="8"/>
  <text class="diagram-text" x="56" y="65" text-anchor="middle">Plan</text>
  <rect class="diagram-box" x="132" y="40" width="112" height="40" rx="8"/>
  <text class="diagram-text" x="188" y="65" text-anchor="middle">Implement</text>
  <rect class="diagram-box" x="264" y="40" width="112" height="40" rx="8"/>
  <text class="diagram-text" x="320" y="65" text-anchor="middle">Verify</text>
  <rect class="diagram-box" x="396" y="40" width="112" height="40" rx="8"/>
  <text class="diagram-text" x="452" y="65" text-anchor="middle">Review</text>
  <rect class="diagram-box" x="528" y="40" width="112" height="40" rx="8"/>
  <text class="diagram-text" x="584" y="65" text-anchor="middle">Ship</text>
  <line class="diagram-line-accent diagram-flow" x1="112" y1="60" x2="126" y2="60" marker-end="url(#a5-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="244" y1="60" x2="258" y2="60" marker-end="url(#a5-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="376" y1="60" x2="390" y2="60" marker-end="url(#a5-arrow)"/>
  <line class="diagram-line-accent diagram-flow" x1="508" y1="60" x2="522" y2="60" marker-end="url(#a5-arrow)"/>
</svg>
<figcaption>Notice that two of the five steps, Plan and Review, are pure human work. That ratio is about right.</figcaption>
</figure>

1. **Plan (you).**
   Read the ticket, find the relevant code yourself, and write the brief: symptom, expected behavior, files, boundaries, how to verify.
2. **Implement (agent).**
   Hand over the brief.
   Watch the plan it announces and interrupt early if the approach is wrong; redirecting at step one is cheap, at step nine it is not.
3. **Verify (agent + browser).**
   Tests run, dev server starts, browser confirms the behavior.
4. **Review (you).**
   Read the full diff.
   Ask Chat about anything you cannot explain.
   This step is where junior developers become senior ones; skipping it is how you stay a passenger.
5. **Ship (you).**
   Commit with a message you wrote, open the PR, own the outcome.
   If the code breaks production, "the AI wrote it" will not be accepted as an explanation, so never accept code you would not defend in a review.

## The pitfalls that actually bite

- **Accepting without reading.**
  The diff you accept is code you wrote, as far as your team is concerned.
- **Giant vague prompts.**
  "Refactor the app" produces giant vague diffs.
  Small, bounded tasks review well and revert cleanly.
- **Fighting context rot.**
  In a very long conversation, early instructions fall out of the context window and the model quietly stops following them.
  When a session feels like it is degrading, start a fresh one with a crisp summary.
- **No rules file.**
  Correcting the same mistake in every session is a tax you pay for skipping Part 5.
- **Trusting confidence.**
  The model sounds equally sure when right and when hallucinating.
  Calibrate with tests and the browser, not with tone.

## Your first-month checklist

- [ ] Installed, imported VS Code settings, picked a mid-tier default model
- [ ] Confirmed the privacy policy for any work code
- [ ] Used Tab and Cmd+K until they feel boring
- [ ] Completed one Agent task with a written brief and a full diff review
- [ ] Wrote three rules for your repo (style, logging, testing)
- [ ] Verified one UI change with the built-in browser
- [ ] Tried two parallel agents on independent tasks
- [ ] Read the models comparison and re-picked your default model on purpose

The tool will keep changing; the loop will not.
Intent in, judgement out, and never ship a diff you could not defend.
Welcome aboard.
