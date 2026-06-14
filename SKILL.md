---
name: tailwind-design-system
description: "Tailwind CSS design-system standardization template — semantic color tokens (CSS vars, light/dark), 3-tier JP/EN font stack, soft/elevated shadows, core animations, breakpoints, class-based dark mode. Use when setting up or standardizing a Tailwind project's theme / design tokens, or deciding what to formalize vs leave free. Tailwindのデザインシステム標準化テンプレート（何を揃え何を揃えないか）。"
---

# tailwind-design-system (Tailwind JP Blueprint)

A Tailwind CSS **design-system standardization template**. It formalizes the minimum that must stay consistent project-wide (tokens) and deliberately leaves design "personality" free. Core idea: be intentional about **what to standardize vs what not to**.

Tailwind の**デザインシステム標準化テンプレート**。プロジェクト全体で一貫させる要素（トークン）だけを最小限に形式化し、デザインの個性は自由に残す。「何を揃え／何を揃えないか」が中心思想。

## When to use / 使いどころ
- **EN:** starting a new Tailwind project, or standardizing an existing one's color/typography/shadow/animation/breakpoint/dark-mode tokens; deciding which design choices belong in `config` vs inline.
- **JP:** Tailwind プロジェクトの新規立ち上げ、または色・タイポ・シャドウ・アニメ・BP・ダークモードのトークン標準化。config に入れるべきもの／その場で書くべきものの判断。

## Bundled assets / 同梱アセット
- `example/tailwind.config.js` — theme blueprint (semantic colors / fonts / shadows / animations / breakpoints; colors reference CSS vars)
- `example/global.css` — CSS variable values (`:root` light / `.dark` dark) + JP text `@layer base` (禁則処理・折り返し)
- `index.html` — interactive reference page (all tokens, live)
- `bin/init.mjs`, `install.sh` — the installer

## What it standardizes / 標準化する領域
- **Color:** role-based semantic names (`brand.primary`, `surface.base/sunken/elevated`, `content.main/muted/inverse`) → CSS vars; retheme by editing `global.css` only.
- **Typography:** `font-sans` (Inter / Hiragino / Noto Sans JP), `font-mono` (JetBrains Mono), `font-display` (slot for the theme font).
- **Shadow:** `shadow-soft` (cards/inputs), `shadow-elevated` (modals/CTA).
- **Animation:** `animate-fade-in`, `animate-slide-up`, `animate-blob`.
- **Breakpoints:** Tailwind defaults (sm 640 … 2xl 1536), mobile-first.
- **Dark mode:** `darkMode: 'class'` — toggle `.dark` on `<html>`.

## What it deliberately does NOT formalize / 形式化しない領域
One-off layout tweaks (arbitrary values), complex gradients (utilities/inline), page-specific decoration, and the design's "personality" (hand-drawn / comic / editorial). Tailwind is the toolbox, not the style.

## How to apply / 適用方法
1. **Scaffold:** `npx tailwind-jp-blueprint` (or `npx github:torifo/tailwind-jp-blueprint`) — interactive overwrite/append/skip. Or copy `example/tailwind.config.js` + `example/global.css`.
2. **Retheme:** edit CSS variables in `global.css` (one line changes everything). Add fonts via `fontFamily`, reusable animations via `animation`/`keyframes`; keep one-off animations inline (`animate-[...]`).

> Full token tables, maintenance guide and the rationale for "don't formalize": see **`README.md`** / 詳細は README.md。
