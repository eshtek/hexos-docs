# hexos-docs `feeds` branch

Generator for [feeds.hexos.com](https://feeds.hexos.com): RSS 2.0, Atom and JSON Feed
versions of the HexOS blog and the Command Deck release notes, built from the `wiki`
branch of this repository and published to GitHub Pages.

This branch is an orphan. It shares no history with `wiki` and Wiki.js never reads it.
The workflow that runs it, `.github/workflows/feeds.yml`, is the only non-content file
on `wiki`; it checks out `wiki` as content and this branch as tooling.

## What goes in a feed

An item is included only when both signals are present:

1. The page is linked from its index: `blog.md` for the blog, the auto-generated
   year sections of `release-notes/command-deck.md` for release notes.
2. Wiki.js reports the page as published. The build asks the live wiki's guest GraphQL
   endpoint for every page's publish state, because the `published` line in git goes
   stale when a page is published from the Wiki.js UI after it was committed (four
   release notes were in that state on 2026-10-19). A build that cannot reach the wiki
   fails and leaves the previous deploy in place. `--offline` falls back to git for
   local runs.

Drafts, stray `.html` duplicates (the `.md` wins) and images are therefore excluded.
Each feed carries the newest 30 items.

| Field | Source |
|---|---|
| id / guid | The page URL on docs.hexos.com |
| Published date | The date written in the index line (with the time of day from `dateCreated` when it is the same day). Never front matter `date`, which moves on every edit |
| Updated | Front matter `date` |
| Title | Front matter `title` |
| Summary | `description`, else the index summary (release notes), else the first paragraph |
| Content | The page rendered to HTML, leading H1 removed, root-relative links and media rewritten to `https://docs.hexos.com/...` |
| Categories | The section (`blog`, `release-notes`) plus the page's tags |

Wiki.js syntax handled: `{.is-info}` style callouts and `{.align-center}` attributes
(kept as classes), `=750x` image sizes (dropped).

## Outputs

`blog`, `release-notes` and `all` (both merged), each as `.xml` (RSS), `.atom` and
`.json`, plus an `index.html` subscribe page that carries the HexOS logo, a copy button per feed link and the three newest items in each feed.

## Run locally

```sh
npm ci
npm test
node build.mjs --content ../hexos-docs --out dist   # a checkout of the wiki branch; add --offline to skip the wiki lookup
node validate.mjs dist
```

Running the build twice on the same content produces identical output: the feed
timestamps come from the newest item, not from the clock.
