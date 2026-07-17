---
name: copies
description: Centralize all user-facing text in app/utils/copies.tsx. Use whenever adding or editing any user-visible copy — headings, paragraphs, labels, buttons/CTAs, placeholders, error/success messages, tooltips, alt text — in components or pages. Never hardcode display strings in JSX.
---

# Copies — centralized user-facing text

Every string a user can read must live in `app/utils/copies.tsx` and be imported from there. Components must never contain hardcoded display text.

## Rules

1. **New copy → `app/utils/copies.tsx`.** Before writing any user-visible string in a component (heading, paragraph, label, button text, placeholder, aria-label, alt text, error/success message, tooltip), define it as an exported constant in `app/utils/copies.tsx` and import it into the component.
2. **Editing existing copy** that is hardcoded in a component: move it to `copies.tsx` as part of the change, then import it — don't edit it in place.
3. **Language:** user-facing copy is Spanish (Colombia) — `$170.000` price format, "agendamiento" terminology. Keep the "místico y espiritual" tone from the README (the content spec for services/pricing).
4. **What does NOT belong here:** code identifiers, log messages, API error payloads not shown to users, and config values. Dynamic values (prices computed at runtime, dates) stay in code — but their surrounding template text belongs in `copies.tsx`.

## Conventions in `copies.tsx`

Follow the existing style:

- Exported `UPPER_SNAKE_CASE` constants, named by section/component, e.g. `HERO_SLOTS`, `HERO_OPTIONS`.
- Group related strings for one section into a single typed object or array rather than many loose constants:

```tsx
export const BOOKING_STEP1 = {
    title: "Elige tu ritual",
    subtitle: "...",
    cta: "Continuar",
};
```

- Type non-trivial shapes explicitly (`Array<{ name: string; label: string }>`).
- JSX fragments are allowed (the file is `.tsx`) when a copy needs inline markup.
- Import with the `@/app/utils/copies` alias.

## Known repo quirks

- `app/components/Hero/HeroSplit.tsx` imports from `@/app/utils/texts`, which does not exist — the constants are in `copies.tsx`. If you touch that file, fix the import to `@/app/utils/copies`.
- `app/lib/content/content.ts` is an older copy location (footer/location/contact). Don't add new copy there; if you're already modifying a string it holds, prefer migrating it to `copies.tsx`.
