---
title: Translating HexOS
description: Help translate HexOS into your language through the community translation program
published: true
date: 2026-08-05T00:00:00.000Z
tags: community, translations, i18n
editor: markdown
dateCreated: 2026-08-05T00:00:00.000Z
---

# Translating HexOS

HexOS is translated by the people who use it. If you're fluent in a language other than English, you can help make HexOS accessible to users around the world — no translation experience or technical skills required.

Want to see who's working on your language, coordinate with other translators, or just say hello? Join the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).

## The platform

Translations happen at [translate.hexos.com](https://translate.hexos.com), powered by [Weblate](https://weblate.org) — the same open-source translation platform used by projects like Fedora and LibreOffice. Everything runs in your browser: you see the English text, you type your translation, Weblate saves as you go.

The HexOS interface is about 2,800 strings — button labels, error messages, setup wizards, everything. They live in a single component called **Deck**, with feature-area labels (account, server, storage, apps, tasks, errors) so you can focus on one area at a time.

## Getting started

1. **Sign in at [translate.hexos.com](https://translate.hexos.com)** — it uses your HexOS account, the same login as HexOS itself. No separate registration.
2. **Pick your language** — join one that's already started, or add yours from the Deck component page. If yours isn't in the list, ask in Discord and we'll add it.
3. **Translate** — open the Deck component in your language and work through the strings. Filter by "Untranslated strings" to see what's left, or by label to stay in one feature area.

There are no deadlines and no minimum commitment. Translate ten strings or a thousand — every approved string helps.

## How translations ship

Every translation goes through review before it reaches users:

1. You translate a string — it's saved as **Translated** (waiting for review)
2. A reviewer for your language approves it — it becomes **Approved**
3. On the next HexOS release, the build pulls all approved translations from Weblate and bundles them in

A language ships once it reaches **60% approved coverage**. Until then it doesn't appear in HexOS's language picker — users only ever see complete, shipped languages, never a half-translated interface.

Because nothing ships without review, you can't break anything — jump in.

## Becoming a reviewer

Reviewers approve translations for their language and effectively own its quality. We promote active translators to reviewer — once you've been translating a language for a bit, expect to hear from us. There's nothing to apply for.

## Translation guidelines

- **Placeholders** like `{name}` or `{count}` must stay exactly as-is. You can move them to fit your grammar, but don't translate the text inside the braces.
- **Brand terms** — HexOS, Command Deck, TrueNAS, ZFS — are never translated. They're marked in the built-in glossary, which appears alongside strings that contain them.
- **Critical strings** — anything labeled `critical-ui` is a destructive confirmation or security dialog. Translate these with extra care: a mistranslated "Delete all data" button is a real risk.
- **Tone** — friendly and concise. HexOS speaks to people who may be new to NAS; clear beats clever.
- **Unsure about a string?** Leave a comment on it in Weblate. The team monitors comments, and other translators can weigh in.

## New strings over time

As HexOS gains features, new strings flow into Weblate automatically with each release. They'll appear as untranslated in your language, and Weblate can notify you by email when there's new material. Keeping a shipped language up to date is just as valuable as the initial push.

## Questions?

Ask in the [HexOS Discord Community](https://discord.gg/fCW2htvYdz).
