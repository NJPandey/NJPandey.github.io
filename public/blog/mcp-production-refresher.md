---
title: MCP in Production - A Refresher on What Actually Matters
date: 2026-09-22
tags: [ai, mcp, platform]
excerpt: Tools, resources, and prompts; auth done properly; and the operational details that separate a demo MCP server from a production one.
---

The Model Context Protocol went from "interesting spec" to default integration surface in about a year. If you maintain services, there is a decent chance an agent will be calling them through MCP soon. Here is the refresher on what matters when you are on the serving side.

## The three primitives

- **Tools** are functions the model can call. They do things: create an issue, run a query, deploy a build. Design them like API endpoints, because that is what they are.
- **Resources** are read-only context: documents, records, schemas. Think GET requests with content negotiation.
- **Prompts** are reusable instruction templates. Useful, but the least important of the three in production.

Most teams over-invest in prompts and under-invest in tool design. A small set of well-scoped tools beats a large set of overlapping ones, because every tool description consumes context the model could spend on your actual problem.

## Auth is not optional

The spec settled on OAuth 2.1 for remote servers. The failure mode to avoid is the "god token": one long-lived credential that every agent session shares. Per-user tokens with audience restriction and short expiry are the baseline. If your tool mutates state, log who authorized it, not just which agent called it.

## Operational details that bite

- **Error payloads**: return structured errors with machine-readable codes. "Something went wrong" forces the model to guess; `{"code": "rate_limited", "retryAfter": 30}` lets it recover.
- **Pagination**: agents will happily fetch page after page. Enforce hard limits server-side.
- **Idempotency**: agents retry. Mutation tools need idempotency keys or you will eventually create two of everything.
- **Descriptions are contracts**: the model routes on your tool descriptions. Vague descriptions cause wrong-tool calls that look like model errors but are actually API design errors.

## Versioning

Tool schemas are a public contract. Additive changes only; never rename a parameter without a deprecation window. Agents pin to what worked yesterday, and silent breaking changes surface as confusing agent behavior far from the cause.
