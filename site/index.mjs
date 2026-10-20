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

const FORMATS = [
  { ext: 'xml', label: 'RSS', note: 'Works in every reader' },
  { ext: 'atom', label: 'Atom', note: 'Standard XML alternative' },
  { ext: 'json', label: 'JSON Feed', note: 'For apps and scripts' },
];

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

const RSS_ICON = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2" fill="currentColor"/><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`;

function feedCard({ slug, channel, latest }, featured) {
  const formats = FORMATS.map(({ ext, label, note }) => {
    const url = `${FEEDS_URL}/${slug}.${ext}`;
    return `          <li class="format">
            <div class="format-name"><a href="${url}">${label}</a><span>${note}</span></div>
            <div class="url-field"><code>${url}</code><button type="button" class="copy" data-copy="${url}" aria-label="Copy ${esc(channel.title)} ${label} link" hidden>Copy</button></div>
          </li>`;
  }).join('\n');
  const recent = latest.length ? `
        <div class="recent">
          <h3>Latest</h3>
          <ol>
${latest.map((i) => `            <li><a href="${esc(i.url)}">${esc(listTitle(i.title))}</a><span class="meta">${slug === 'all' ? `<span class="tag">${SECTION_LABEL[i.section] || esc(i.section)}</span>` : ''}<time datetime="${i.published}">${shortDate(i.published)}</time></span></li>`).join('\n')}
          </ol>
        </div>` : '';
  return `      <section class="card${featured ? ' featured' : ''}" id="${slug}">
        <div class="card-head">
          <span class="badge">${RSS_ICON}</span>
          <div>
            ${featured ? '<p class="eyebrow">Recommended</p>' : ''}
            <h2>${esc(channel.title)}</h2>
            <p class="desc">${esc(channel.description)} <a href="${esc(channel.home)}">Read on docs.hexos.com</a></p>
          </div>
        </div>
        <ul class="formats">
${formats}
        </ul>${recent}
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
  <link rel="icon" href="${FAVICON}">
${feeds.map(({ slug, channel }) => `  <link rel="alternate" type="application/rss+xml" title="${esc(channel.title)}" href="${FEEDS_URL}/${slug}.xml">`).join('\n')}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Sora:wght@700;800&display=swap">
  <style>
    :root {
      color-scheme: light dark;
      --primary: #7F35B2; --accent: #CC30FF; --ink: #110719;
      --surface: #f5f5f5; --card: #ffffff; --fg: #262626; --muted: #737373;
      --border: #e5e5e5; --field: #fafafa; --link: #7F35B2; --tag: #f3e8fa;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --surface: #121212; --card: #1c1c1c; --fg: #ffffff; --muted: #a3a3a3;
        --border: #333333; --field: #141414; --link: #d78bff; --tag: #2e1a3d;
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--surface); color: var(--fg); font: 16px/1.55 Figtree, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
    a { color: var(--link); text-decoration-thickness: 1px; text-underline-offset: 2px; }
    .wrap { max-width: 64rem; margin: 0 auto; padding: 0 16px; }

    .hero { position: relative; overflow: hidden; background: var(--ink); color: #fff; padding: 2.5rem 0 7rem; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(60rem 30rem at 85% -10%, rgba(204, 48, 255, .45), transparent 60%), radial-gradient(40rem 24rem at 0% 110%, rgba(127, 53, 178, .55), transparent 65%); }
    .hero .wrap { position: relative; }
    .brand { display: inline-flex; color: #fff; }
    .brand svg { height: 40px; width: auto; display: block; }
    .hero h1 { font-family: Sora, Figtree, sans-serif; font-weight: 800; font-size: clamp(2.25rem, 6vw, 3.5rem); line-height: 1.05; letter-spacing: -.02em; margin: 3.5rem 0 1rem; }
    .hero h1 span { background: linear-gradient(91deg, #e6b3ff 0%, #CC30FF 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .hero .lead { font-size: 1.15rem; max-width: 36rem; margin: 0; color: rgba(255, 255, 255, .78); }

    main.wrap { margin-top: -4.5rem; position: relative; padding-bottom: 3rem; }
    .grid { display: grid; gap: 1.25rem; }
    @media (min-width: 760px) { .grid { grid-template-columns: 1fr 1fr; } }

    .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 8px 24px rgba(17, 7, 25, .06); min-width: 0; }
    .card.featured { margin-bottom: 1.25rem; border-color: transparent; background: linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, var(--accent), var(--primary)) border-box; border: 2px solid transparent; }
    @media (min-width: 760px) {
      .card.featured { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); column-gap: 2rem; }
      .card.featured .card-head { grid-column: 1 / -1; }
    }
    .card-head { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.25rem; }
    .badge { flex: none; width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; color: #fff; background: linear-gradient(315deg, var(--primary), var(--accent)); }
    .icon { width: 22px; height: 22px; }
    .eyebrow { margin: 0 0 .15rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--link); }
    h2 { font-family: Sora, Figtree, sans-serif; font-size: 1.3rem; line-height: 1.25; margin: 0 0 .3rem; letter-spacing: -.01em; }
    .desc { margin: 0; color: var(--muted); }

    .formats { list-style: none; margin: 0; padding: 0; display: grid; gap: .6rem; }
    .format { display: grid; gap: .35rem; }
    .format-name { display: flex; align-items: baseline; gap: .5rem; }
    .format-name a { font-weight: 700; text-decoration: none; }
    .format-name a:hover { text-decoration: underline; }
    .format-name span { color: var(--muted); font-size: .85rem; }
    .url-field { display: flex; align-items: center; gap: .5rem; background: var(--field); border: 1px solid var(--border); border-radius: 10px; padding: .35rem .35rem .35rem .75rem; min-width: 0; }
    .url-field code { flex: 1; min-width: 0; font: .85rem/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .copy { flex: none; font: 600 .8rem/1 Figtree, system-ui, sans-serif; color: #fff; background: linear-gradient(315deg, var(--primary), var(--accent)); border: 0; border-radius: 7px; padding: .5rem .8rem; cursor: pointer; }
    .copy:hover { filter: brightness(1.08); }
    .copy:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .copy.done { background: #059669; }

    .recent { margin-top: 1.25rem; padding-top: 1.1rem; border-top: 1px solid var(--border); }
    .featured .recent { margin-top: 0; padding-top: 0; border-top: 0; }
    @media (max-width: 759px) { .featured .recent { margin-top: 1.25rem; padding-top: 1.1rem; border-top: 1px solid var(--border); } }
    .recent h3 { margin: 0 0 .6rem; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
    .recent ol { list-style: none; margin: 0; padding: 0; display: grid; gap: .7rem; }
    .recent li { display: grid; gap: .15rem; }
    .recent li a { color: var(--fg); font-weight: 600; text-decoration: none; }
    .recent li a:hover { color: var(--link); text-decoration: underline; }
    .meta { display: flex; gap: .5rem; align-items: center; color: var(--muted); font-size: .85rem; }
    .tag { font-size: .72rem; font-weight: 700; color: var(--link); background: var(--tag); border-radius: 999px; padding: .1rem .5rem; }

    .help { margin-top: 2.5rem; display: grid; gap: 1.25rem; }
    @media (min-width: 760px) { .help { grid-template-columns: repeat(3, 1fr); } }
    .help h3 { font-family: Sora, Figtree, sans-serif; font-size: 1rem; margin: 0 0 .3rem; }
    .help p { margin: 0; color: var(--muted); font-size: .95rem; }

    footer { border-top: 1px solid var(--border); padding: 1.5rem 0 2.5rem; color: var(--muted); font-size: .9rem; }
    footer .wrap { display: flex; flex-wrap: wrap; gap: .75rem 1.5rem; align-items: center; justify-content: space-between; }
    footer .mark { display: inline-flex; align-items: center; gap: .6rem; }
    footer .mark svg { height: 24px; width: auto; }
    footer nav { display: flex; gap: 1.25rem; }
  </style>
</head>
<body>
  <header class="hero">
    <div class="wrap">
      <a class="brand" href="https://hexos.com" aria-label="HexOS"><svg viewBox="0 0 234 64" role="img" aria-hidden="true">${MARK_DEFS}${MARK}${WORDMARK}</svg></a>
      <h1>Stay in the loop with <span>HexOS</span></h1>
      <p class="lead">Follow new blog posts and Command Deck release notes in any feed reader. Pick a feed, copy its link, and paste it into your reader.</p>
    </div>
  </header>
  <main class="wrap">
${featured ? feedCard(featured, true) : ''}
    <div class="grid">
${rest.map((f) => feedCard(f, false)).join('\n')}
    </div>
    <section class="help" aria-label="About feeds">
      <div><h3>New to feeds?</h3><p>A feed reader such as Feedly, NetNewsWire, Inoreader or Thunderbird checks these links for you and shows each new post as it lands.</p></div>
      <div><h3>Which format?</h3><p>Choose RSS unless your reader asks for something else. Atom and JSON Feed carry the same posts.</p></div>
      <div><h3>Always current</h3><p>Feeds rebuild whenever the documentation changes and carry the 30 newest posts, with full content.</p></div>
    </section>
  </main>
  <footer>
    <div class="wrap">
      <span class="mark"><svg viewBox="0 0 56 64" aria-hidden="true">${MARK}</svg>HexOS</span>
      <nav><a href="https://hexos.com">hexos.com</a><a href="https://docs.hexos.com">docs.hexos.com</a></nav>
    </div>
  </footer>
  <script>
    for (const b of document.querySelectorAll('.copy')) {
      b.hidden = false;
      b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(b.dataset.copy); } catch { return; }
        b.textContent = 'Copied'; b.classList.add('done');
        setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1600);
      });
    }
  </script>
</body>
</html>
`;
}
