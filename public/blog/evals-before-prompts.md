---
title: Evals Before Prompts - The Agent Quality Refresher
date: 2026-09-15
tags: [ai, agents, evals, testing]
excerpt: You would not ship a service without tests. Do not ship an agent without evals. A practical refresher on task suites, graders, and regression gates.
---

Prompts are code. You would not merge untested code on a Friday, yet teams routinely ship prompt and tool-description changes with nothing but a vibes check. This refresher is the testing discipline applied to agents.

## What an eval actually is

An eval is three things:

1. **A task suite** - a fixed set of realistic inputs with known-good outcomes. Not synthetic trivia; real tasks pulled from logs, support tickets, or your own usage.
2. **A grader** - something that scores the output. Exact match where possible, a rubric-graded model call where not, a test suite where you are lucky enough to have one.
3. **A gate** - a threshold in CI that blocks the change when scores regress.

If any of the three is missing, you have a demo, not an eval.

## Grade the trajectory, not just the answer

For agents, the final answer is half the story. The trajectory - which tools it called, in what order, with what arguments - tells you whether the system is robust or lucky. Two failure modes look identical in the output: the agent that solved the task, and the agent that failed, guessed, and happened to guess right. Trajectory evals separate them.

Useful trajectory checks are cheap: did it call the retrieval tool before answering? Did it ever read the file it edited? Did it stay within the step budget?

## Regression sets are assets

Every production incident involving the agent should end with a new entry in the regression suite. Over a few months this becomes the most valuable dataset you own: a living description of every way the system has ever embarrassed you. Model upgrades, prompt tweaks, tool schema changes - all of them get run against it.

## Start smaller than you think

Fifty well-chosen tasks beat five thousand noisy ones. Seed the suite with the twenty tasks your users do most, the ten that generate the most complaints, and the twenty weirdest inputs you have seen in logs. Run it on every change. That is the whole system; everything else is refinement.
