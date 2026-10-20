import { FEEDS_URL } from '../config.mjs';

const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

export function indexPage(feeds) {
  const rows = feeds.map(({ slug, channel }) => `      <section>
        <h2>${esc(channel.title)}</h2>
        <p>${esc(channel.description)} <a href="${esc(channel.home)}">Read on docs.hexos.com</a>.</p>
        <ul>
          <li><a href="${FEEDS_URL}/${slug}.xml">RSS</a> <code>${FEEDS_URL}/${slug}.xml</code></li>
          <li><a href="${FEEDS_URL}/${slug}.atom">Atom</a> <code>${FEEDS_URL}/${slug}.atom</code></li>
          <li><a href="${FEEDS_URL}/${slug}.json">JSON Feed</a> <code>${FEEDS_URL}/${slug}.json</code></li>
        </ul>
      </section>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HexOS Feeds</title>
  <meta name="description" content="Subscribe to HexOS blog posts and Command Deck release notes by RSS, Atom or JSON Feed.">
${feeds.map(({ slug, channel }) => `  <link rel="alternate" type="application/rss+xml" title="${esc(channel.title)}" href="${FEEDS_URL}/${slug}.xml">`).join('\n')}
  <style>
    :root { color-scheme: light dark; --bg: #ffffff; --fg: #171717; --muted: #6b6b6b; --accent: #7F35B2; --code: #f3f3f3; }
    @media (prefers-color-scheme: dark) { :root { --bg: #171717; --fg: #f3f3f3; --muted: #a3a3a3; --accent: #CC30FF; --code: #262626; } }
    body { margin: 0; padding: 2rem 16px 4rem; background: var(--bg); color: var(--fg); font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    main { max-width: 42rem; margin: 0 auto; }
    h1 { font-size: 1.75rem; margin: 0 0 .25rem; }
    .lead { color: var(--muted); margin-top: 0; }
    section { margin-top: 2rem; }
    h2 { font-size: 1.2rem; margin-bottom: .25rem; }
    ul { list-style: none; padding: 0; margin: .5rem 0 0; }
    li { margin: .25rem 0; display: flex; flex-wrap: wrap; gap: .5rem; align-items: baseline; }
    a { color: var(--accent); }
    code { background: var(--code); padding: .1rem .4rem; border-radius: 4px; font-size: .9em; word-break: break-all; }
    footer { margin-top: 3rem; color: var(--muted); font-size: .9rem; }
  </style>
</head>
<body>
  <main>
    <h1>HexOS Feeds</h1>
    <p class="lead">Subscribe in any feed reader to follow HexOS blog posts and Command Deck release notes.</p>
${rows}
    <footer>Feeds are rebuilt automatically whenever the documentation changes. Content is published at <a href="https://docs.hexos.com">docs.hexos.com</a>.</footer>
  </main>
</body>
</html>
`;
}
