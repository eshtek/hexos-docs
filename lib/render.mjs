import MarkdownIt from 'markdown-it';
import attrs from 'markdown-it-attrs';
import { SITE_URL } from '../config.mjs';

const md = new MarkdownIt({ html: true, linkify: true, typographer: false }).use(attrs);

// `![alt](/path.png =750x)` is Wiki.js image sizing; readers size images themselves.
const IMAGE_SIZE = /(!\[[^\]]*\]\([^)\s]+)\s+=\d*x\d*(\))/g;

export function renderMarkdown(body) {
  return absolutize(stripStyles(md.render(body.replace(IMAGE_SIZE, '$1$2'))));
}

export function renderHtml(body) {
  return absolutize(stripStyles(body));
}

// Readers drop inline styles, and the W3C validator flags them as unsafe.
export function stripStyles(html) {
  return html.replace(/\s+style=("[^"]*"|'[^']*')/gi, '');
}

// Root-absolute links and media (`/blog/x.png`, `/release-notes/...`) only
// resolve on docs.hexos.com. Protocol-relative `//host` is left alone.
export function absolutize(html) {
  return html.replace(/\b(src|href|poster)="\/(?!\/)/g, `$1="${SITE_URL}/`);
}

// Drops the leading H1 (the item already carries the title) and returns the
// first paragraph's text for use as a summary.
export function splitTitleAndSummary(html) {
  let content = html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '');
  const p = content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  const summary = p ? stripTags(p[1]) : '';
  return { content, summary };
}

export function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
