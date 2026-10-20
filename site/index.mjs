import { FEEDS_URL } from '../config.mjs';

const esc = (s) => String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDate = (iso) => {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

// Release note titles open with their date, which the list already shows.
const listTitle = (t) => t.replace(/^[A-Z][a-z]+ \d{1,2}, \d{4}\s+[-:]\s+/, '');

const SECTION_LABEL = { blog: 'Blog', 'release-notes': 'Release notes' };

// The page already says HexOS; the channel titles keep it for feed readers.
const CARD = {
  all: { label: 'Everything', blurb: 'Blog posts and release notes, newest first.' },
  blog: { label: 'Blog', blurb: 'News and updates from the team.' },
  'release-notes': { label: 'Release notes', blurb: 'Changes in each Command Deck release.' },
};

// Shapes from the HexOS logo (packages/frontend/public/logos in hexos-platform).
const MARK = `<path d="M12.1334 22.9759V41.0241L23.3234 47.4184L11.1776 54.3871L0 48V16L28.0002 0L40.1537 6.94483L12.1334 22.9759Z" fill="url(#hx-mark)"/>
<path d="M27.9998 63.9944L15.8535 57.0537L43.8666 41.0185V22.9703L32.6838 16.5801L44.8296 9.61133L56 15.9944V47.9944L27.9998 63.9944Z" fill="url(#hx-mark)"/>`;
const MARK_DEFS = `<defs><linearGradient id="hx-mark" x1="56" y1="63.9944" x2="-7.4288" y2="8.48931" gradientUnits="userSpaceOnUse"><stop stop-color="#7F35B2"/><stop offset="1" stop-color="#CC30FF"/></linearGradient></defs>`;
const WORDMARK = `<g fill="currentColor">
<path d="M100.06 48H108V16H100V29H84V16L76 16.0002V48H84V35.0002H100.06V48Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M133.708 38C132.06 39.8412 129.665 41 127 41C123.081 41 119.748 38.4956 118.512 35H142.719C142.904 34.0282 143 33.0254 143 32C143 23.1634 135.837 16 127 16C118.163 16 111 23.1634 111 32C111 40.8366 118.163 48 127 48C133.715 48 139.463 43.8637 141.837 38H133.708ZM118.512 29C119.748 25.5044 123.081 23 127 23C130.919 23 134.252 25.5044 135.488 29H118.512Z"/>
<path d="M148.661 48L156.007 37.9299L163.354 48H171.985L172 47.9894V47.9741L160.34 31.9913L172 16.0078V16H163.341L156.007 26.0528L148.673 16H140.008L151.675 31.9914L140 47.9946V47.998L140.003 48H148.661Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M190 48C198.837 48 206 40.8366 206 32C206 23.1634 198.837 16 190 16C181.163 16 174 23.1634 174 32C174 40.8366 181.163 48 190 48ZM190 45C197.18 45 203 39.1797 203 32C203 24.8203 197.18 19 190 19C182.82 19 177 24.8203 177 32C177 39.1797 182.82 45 190 45Z"/>
<path d="M212.9 18.3889C215.206 16.804 218.271 16 221.5 16C224.728 16 227.808 16.8039 230.125 18.4695C232.488 20.1673 234 22.7314 234 26H231C231 23.7686 230.012 22.0827 228.375 20.9055C226.692 19.6961 224.272 19 221.5 19C218.729 19 216.294 19.696 214.6 20.8611C212.94 22.0024 212 23.5702 212 25.5C212 26.6121 212.273 27.3525 212.659 27.884C213.055 28.4294 213.661 28.8782 214.523 29.2441C216.324 30.0079 218.809 30.2491 221.636 30.5062L221.789 30.5201C224.423 30.7592 227.368 31.0266 229.648 31.9941C230.848 32.5032 231.961 33.2419 232.768 34.3528C233.585 35.4775 234 36.8621 234 38.5C234 41.5702 232.44 44.0024 230.1 45.6111C227.794 47.196 224.729 48 221.5 48C218.272 48 215.192 47.1961 212.875 45.5305C210.512 43.8327 209 41.2686 209 38H212C212 40.2314 212.988 41.9173 214.625 43.0945C216.308 44.3039 218.728 45 221.5 45C224.271 45 226.706 44.304 228.4 43.1389C230.06 41.9976 231 40.4298 231 38.5C231 37.3879 230.727 36.6475 230.341 36.116C229.945 35.5706 229.339 35.1218 228.477 34.7559C226.676 33.9921 224.191 33.7509 221.364 33.4938L221.211 33.4799C218.577 33.2407 215.632 32.9734 213.352 32.0059C212.152 31.4968 211.039 30.7581 210.232 29.6472C209.415 28.5225 209 27.1379 209 25.5C209 22.4298 210.56 19.9976 212.9 18.3889Z"/>
</g>`;

const FAVICON = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64">${MARK_DEFS}${MARK}</svg>`)}`;


const icon = (paths) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const ICONS = {
  all: icon('<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>'),
  blog: icon('<path d="M4 20h4L19 9a2.83 2.83 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>'),
  'release-notes': icon('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'),
};
const COPY_ICON = '<svg class="i-copy" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.8"/><path d="M10.5 5.5V4.3A1.8 1.8 0 0 0 8.7 2.5H4.3a1.8 1.8 0 0 0-1.8 1.8v4.4a1.8 1.8 0 0 0 1.8 1.8h1.2"/></svg><svg class="i-done" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>';
const ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

function feedCard({ slug, channel, latest }, featured) {
  const card = CARD[slug] || { label: channel.title, blurb: channel.description };
  const rss = `${FEEDS_URL}/${slug}.xml`;
  const recent = latest.length ? `
        <div class="recent">
          <div class="recent-head"><h3>Latest</h3><a href="${esc(channel.home)}">View all ${ARROW}</a></div>
          <ol>
${latest.map((i) => `            <li><a href="${esc(i.url)}"><span class="item-title">${esc(listTitle(i.title))}</span><span class="meta">${slug === 'all' ? `<span class="section s-${esc(i.section)}">${SECTION_LABEL[i.section] || esc(i.section)}</span>` : ''}<time datetime="${i.published}">${shortDate(i.published)}</time></span></a></li>`).join('\n')}
          </ol>
        </div>` : '';
  return `      <section class="card${featured ? ' featured' : ''}" id="${slug}" aria-labelledby="${slug}-title">
        <div class="card-head">
          <span class="badge">${ICONS[slug] || ICONS.all}</span>
          <div>
            <h2 id="${slug}-title">${esc(card.label)}${featured ? ' <span class="pill">Recommended</span>' : ''}</h2>
            <p class="desc">${esc(card.blurb)}</p>
          </div>
        </div>
        <div class="subscribe">
          <div class="url-field"><code title="${rss}"><span class="scheme">https://</span>${rss.replace('https://', '')}</code><button type="button" class="copy" data-copy="${rss}" aria-label="Copy the ${esc(card.label)} feed link" title="Copy link" hidden>${COPY_ICON}</button></div>
          <p class="options"><span>Also as <a href="${FEEDS_URL}/${slug}.atom">Atom</a> · <a href="${FEEDS_URL}/${slug}.json">JSON Feed</a></span></p>
        </div>${recent}${featured ? `
        <p class="hint"><strong>New to feeds?</strong> Paste a link into any feed reader and it shows each new post as it lands. Every feed carries the 30 newest posts in full.</p>` : ''}
      </section>`;
}

export function indexPage(feeds) {
  const featured = feeds.find((f) => f.slug === 'all');
  const rest = feeds.filter((f) => f !== featured);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HexOS Feeds</title>
  <meta name="description" content="Subscribe to HexOS blog posts and Command Deck release notes by RSS, Atom or JSON Feed.">
  <meta name="theme-color" content="#110719">
  <link rel="icon" href="${FAVICON}">
${feeds.map(({ slug, channel }) => `  <link rel="alternate" type="application/rss+xml" title="${esc(channel.title)}" href="${FEEDS_URL}/${slug}.xml">`).join('\n')}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap">
  <style>
    :root {
      color-scheme: light dark;
      --primary: #7F35B2; --accent: #CC30FF; --ink: #110719;
      --surface: #f6f5f8; --card: #ffffff; --fg: #1d1a21; --muted: #6b6672; --faint: #9a95a1;
      --border: #e7e4eb; --field: #f8f7fa; --link: #7F35B2; --hover: #f7f2fb; --pill: #f3e8fa;
      --blog: #e8701e; --release: #0b8fd0;
      --shadow: 0 1px 2px rgba(17, 7, 25, .04), 0 12px 32px -12px rgba(17, 7, 25, .12);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --surface: #0d0a10; --card: #17141b; --fg: #f5f3f7; --muted: #a9a3b0; --faint: #7d7784;
        --border: #2a2530; --field: #100d13; --link: #d690ff; --hover: #1f1a25; --pill: #2c1a3b;
        --blog: #f59a52; --release: #4cc3f5;
        --shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 12px 32px -12px rgba(0, 0, 0, .6);
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--surface); color: var(--fg); font: 16px/1.55 Figtree, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
    a { color: var(--link); text-decoration: none; }
    a:hover { text-decoration: underline; text-underline-offset: 3px; }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
    .wrap { max-width: 62rem; margin: 0 auto; padding: 0 16px; }

    .hero { position: relative; overflow: hidden; background: var(--ink); color: #fff; padding: 1.25rem 0 6.5rem; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(48rem 26rem at 88% -20%, rgba(204, 48, 255, .42), transparent 62%), radial-gradient(34rem 20rem at -5% 120%, rgba(127, 53, 178, .5), transparent 65%); pointer-events: none; }
    .hero .wrap { position: relative; }
    @media (prefers-color-scheme: dark) { .hero::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 7rem; background: linear-gradient(transparent, var(--surface)); pointer-events: none; } }
    .topbar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .brand { display: inline-flex; color: #fff; border-radius: 6px; }
    .brand svg { height: 32px; width: auto; display: block; }
    .topbar nav { display: flex; gap: 1.5rem; font-size: .925rem; font-weight: 500; }
    .topbar nav a { color: rgba(255, 255, 255, .72); }
    .topbar nav a:hover { color: #fff; text-decoration: none; }
    .hero h1 { font-family: Sora, Figtree, sans-serif; font-weight: 700; font-size: clamp(2.25rem, 5.5vw, 3.25rem); line-height: 1.08; letter-spacing: -.025em; margin: 3.5rem 0 .85rem; }
    .hero h1 span { background: linear-gradient(95deg, #f0c8ff 0%, #CC30FF 70%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .hero .lead { font-size: 1.125rem; max-width: 32rem; margin: 0; color: rgba(255, 255, 255, .7); }

    main.wrap { margin-top: -3.75rem; position: relative; padding-bottom: 4rem; }
    .grid { display: grid; gap: 1rem; margin-top: 1rem; }
    @media (min-width: 760px) {
      .grid { grid-template-columns: 1fr 1fr; row-gap: 0; }
      .grid .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; align-content: start; }
    }

    .card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 1.5rem; box-shadow: var(--shadow); min-width: 0; }
    .card.featured { border: 1.5px solid transparent; background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, var(--accent), var(--primary) 60%, var(--border)) border-box; }
    @media (min-width: 760px) {
      .card.featured { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-areas: 'head recent' 'sub recent' 'hint recent'; grid-template-rows: auto auto 1fr; column-gap: 2.5rem; }
      .card.featured .card-head { grid-area: head; }
      .card.featured .subscribe { grid-area: sub; }
      .card.featured .hint { grid-area: hint; align-self: end; }
      .card.featured .recent { grid-area: recent; margin: 0; padding: 0 0 0 1.25rem; border: 0; border-left: 1px solid var(--border); margin-left: -1.25rem; }
    }
    .card > * { min-width: 0; }
    .card-head { display: flex; gap: .9rem; align-items: flex-start; margin-bottom: 1.1rem; }
    .badge { flex: none; width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; color: #fff; background: linear-gradient(315deg, var(--primary), var(--accent)); box-shadow: 0 4px 12px -4px rgba(204, 48, 255, .55); }
    .icon { width: 20px; height: 20px; }
    h2 { font-family: Sora, Figtree, sans-serif; font-weight: 600; font-size: 1.2rem; line-height: 1.3; margin: 0 0 .15rem; letter-spacing: -.01em; display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; }
    .pill { font: 600 .7rem/1 Figtree, system-ui, sans-serif; letter-spacing: .02em; color: var(--link); background: var(--pill); border-radius: 999px; padding: .3rem .55rem; }
    .desc { margin: 0; color: var(--muted); }

    .url-field { display: flex; align-items: center; gap: .5rem; background: var(--field); border: 1px solid var(--border); border-radius: 12px; padding: .3rem .3rem .3rem .85rem; min-width: 0; transition: border-color .15s; }
    .url-field:hover, .url-field:focus-within { border-color: color-mix(in srgb, var(--accent) 45%, var(--border)); }
    .url-field code { flex: 1; min-width: 0; font: .84rem/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; user-select: all; }
    .scheme { color: var(--faint); }
    @media (max-width: 519px) {
      .card { padding: 1.25rem; }
      .scheme { display: none; }
      .url-field code { font-size: .8rem; white-space: normal; overflow-wrap: anywhere; }
    }
    .copy { flex: none; width: 36px; height: 36px; display: grid; place-items: center; color: #fff; background: linear-gradient(315deg, var(--primary), var(--accent)); border: 0; border-radius: 9px; padding: 0; cursor: pointer; transition: filter .15s, transform .1s; }
    .copy svg { width: 16px; height: 16px; grid-area: 1 / 1; transition: opacity .15s, transform .15s; }
    .copy .i-done, .copy.done .i-copy { opacity: 0; transform: scale(.6); }
    .copy.done .i-done { opacity: 1; transform: none; }
    .copy:hover { filter: brightness(1.1); }
    .copy:active { transform: scale(.97); }
    .copy.done { background: #0f9d6b; }
    .options { margin: .7rem 0 0; display: flex; flex-wrap: wrap; justify-content: space-between; gap: .35rem 1rem; font-size: .85rem; color: var(--faint); }
    .options a { font-weight: 600; }

    .recent { margin-top: 1.4rem; padding-top: 1.2rem; border-top: 1px solid var(--border); }
    .recent-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: .4rem; }
    .recent h3 { margin: 0; font-size: .72rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--faint); }
    .recent-head a { display: inline-flex; align-items: center; gap: .3rem; font-size: .85rem; font-weight: 600; }
    .recent-head svg { width: 14px; height: 14px; transition: transform .15s; }
    .recent-head a:hover svg { transform: translateX(2px); }
    .recent ol { list-style: none; margin: 0 -.65rem; padding: 0; }
    .recent li a { display: grid; gap: .15rem; padding: .55rem .65rem; border-radius: 10px; color: var(--fg); transition: background .15s; }
    .recent li a:hover { background: var(--hover); text-decoration: none; }
    .recent li a:hover .item-title { color: var(--link); }
    .item-title { font-weight: 600; line-height: 1.4; }
    .meta { display: flex; gap: .6rem; align-items: center; color: var(--faint); font-size: .82rem; }
    .section { display: inline-flex; align-items: center; gap: .35rem; color: var(--muted); }
    .section::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    .s-blog::before { background: var(--blog); }
    .s-release-notes::before { background: var(--release); }

    .hint { margin: 1.4rem 0 0; color: var(--muted); font-size: .875rem; }
    .hint strong { color: var(--fg); font-weight: 600; }

    footer { padding: 0 0 2.5rem; color: var(--faint); font-size: .875rem; }
    footer .wrap { display: flex; flex-wrap: wrap; gap: .75rem 1.5rem; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 1.5rem; }
    footer svg { height: 22px; width: auto; display: block; }
    footer nav { display: flex; gap: 1.25rem; }
    footer nav a { color: var(--muted); }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>
</head>
<body>
  <header class="hero">
    <div class="wrap">
      <div class="topbar">
        <a class="brand" href="https://hexos.com"><svg viewBox="0 0 234 64" role="img" aria-label="HexOS">${MARK_DEFS}${MARK}${WORDMARK}</svg></a>
        <nav aria-label="HexOS sites"><a href="https://docs.hexos.com">Docs</a><a href="https://hexos.com">hexos.com</a></nav>
      </div>
      <h1>Stay in the <span>loop</span></h1>
      <p class="lead">New blog posts and release notes, straight to your feed reader.</p>
    </div>
  </header>
  <main class="wrap">
${featured ? feedCard(featured, true) : ''}
    <div class="grid">
${rest.map((f) => feedCard(f, false)).join('\n')}
    </div>
  </main>
  <footer>
    <div class="wrap">
      <svg viewBox="0 0 56 64" role="img" aria-label="HexOS">${MARK}</svg>
      <nav aria-label="Footer"><a href="https://hexos.com">hexos.com</a><a href="https://docs.hexos.com">Docs</a><a href="https://docs.hexos.com/blog">Blog</a><a href="https://docs.hexos.com/release-notes/command-deck">Release notes</a></nav>
    </div>
  </footer>
  <p class="sr-only" role="status" aria-live="polite" id="copy-status"></p>
  <script>
    const status = document.getElementById('copy-status');
    for (const b of document.querySelectorAll('.copy')) {
      b.hidden = false;
      b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(b.dataset.copy); } catch { return; }
        b.classList.add('done'); status.textContent = 'Link copied';
        clearTimeout(b.timer);
        b.timer = setTimeout(() => { b.classList.remove('done'); status.textContent = ''; }, 1600);
      });
    }
  </script>
</body>
</html>
`;
}
