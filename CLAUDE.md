# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repository is in pre-implementation stage. It currently contains only `README.md` (the product brief, in Spanish), `LICENSE`, and a reference image. No application code, `package.json`, build tooling, or tests exist yet — any "how to run / build / test" answer must be derived from what is actually committed at the time of the question, not assumed.

The first substantive task will likely be bootstrapping the Next.js app per the brief.

## Product Context

**Lunae Spa** — informational + booking site for a tantric wellness spa. Audience: high-stress adults seeking holistic wellbeing. The product is adult-oriented (tantric massage services, including couples and intimate rituals) but framed as professional wellness, not adult entertainment. Copy and imagery should preserve that "místico y espiritual" tone — respectful, sensorial, calm — not explicit.

The README is the source of truth for service catalog, pricing (COP), durations, and per-service descriptions. When adding service pages or booking flows, treat the README as the content spec and keep the four services in sync: `RITUAL LUNAE`, `ALQUIMIA LUNAE`, `EXTASIS TANTRICO`, `ARMONIA EN PAREJA LUNAE`.

The MVP scope from the brief is **informational site + basic appointment booking**. Don't expand scope beyond that without asking.

## Tech Stack (Planned)

- **Framework:** Next.js (responsive web + mobile — single codebase, no separate native app)
- Default to the App Router and TypeScript when bootstrapping unless the user says otherwise.

## Design System (Locked Decisions)

These come from the brief and should be wired into the design tokens / Tailwind theme on day one rather than re-decided later:

**Colors**
- Sage / mint green `#a8baa3` (calma)
- Brown / coffee `#80614b` (tierra, calidez)
- Off-white `#f4f2e8` (pureza)
- Black `#010101`
- Cream/beige — intentionally undefined; ask before picking a hex

**Typography**
- `Quicksand` for body text. Load via `next/font/google` rather than a `<link>` tag.

**Tone**
- Visual style: místico y espiritual — moon/lunar motifs, soft and sensorial, not clinical and not flashy.

## Language

User-facing copy is **Spanish** (Colombia — note `$170.000` style pricing and "agendamiento" terminology). Code identifiers, commit messages, and PR descriptions stay in English unless the user writes in Spanish first.
