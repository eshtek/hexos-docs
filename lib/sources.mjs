import fs from 'node:fs';
import path from 'node:path';
import { SECTIONS, SITE_URL } from '../config.mjs';
import { parseFrontMatter, parseTags } from './frontmatter.mjs';
import { renderMarkdown, renderHtml, splitTitleAndSummary, stripTags } from './render.mjs';

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// `- [Title - September 23, 2026](/blog/2026-09-23)`
const BLOG_LINE = /^- \[(.+?) - ([A-Za-z]+) (\d{1,2}), (\d{4})\]\((\/blog\/[^)\s]+)\)\s*$/;
// `- [**2026-10-16**](/release-notes/command-deck/2026-10-16) - Summary`
const RN_LINE = /^- \[\*\*(\d{4}-\d{2}-\d{2})\*\*\]\((\/release-notes\/command-deck\/[^)\s]+)\)\s*-\s*(.+?)\s*$/;

export function parseBlogIndex(text) {
  const entries = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(BLOG_LINE);
    if (!m) continue;
    const month = MONTHS.indexOf(m[2].toLowerCase());
    if (month < 0) continue;
    const date = `${m[4]}-${String(month + 1).padStart(2, '0')}-${m[3].padStart(2, '0')}`;
    entries.push({ title: m[1].replace(/\s+/g, ' ').trim(), date, path: m[5], summary: '' });
  }
  return entries;
}

export function parseReleaseNotesIndex(text) {
  const entries = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(RN_LINE);
    if (!m) continue;
    entries.push({ title: '', date: m[1], path: m[2], summary: m[3] });
  }
  return entries;
}

const INDEX_PARSERS = { blog: parseBlogIndex, 'release-notes': parseReleaseNotesIndex };

function readPage(root, pagePath) {
  const base = path.join(root, pagePath.replace(/^\//, ''));
  for (const ext of ['.md', '.html']) {
    const file = base + ext;
    if (fs.existsSync(file)) return { file, ext, raw: fs.readFileSync(file, 'utf8') };
  }
  return null;
}

function isoAtNoon(date) {
  return `${date}T12:00:00.000Z`;
}

// pubDate is the date written in the index, never front matter `date`, which
// moves on every edit. dateCreated supplies the time of day when it falls on
// the same calendar day as the index date.
function publishedAt(indexDate, dateCreated) {
  if (dateCreated && dateCreated.startsWith(indexDate)) return dateCreated;
  return isoAtNoon(indexDate);
}

// `publishState` is the live map from Wiki.js (path -> isPublished). When it is
// absent the git front matter decides, which is only safe offline.
export function loadSection(root, section, warn = () => {}, publishState = null) {
  const spec = SECTIONS[section];
  const indexFile = path.join(root, spec.index);
  if (!fs.existsSync(indexFile)) throw new Error(`index not found: ${spec.index}`);
  const entries = INDEX_PARSERS[section](fs.readFileSync(indexFile, 'utf8'));
  const items = [];
  const seen = new Set();
  for (const entry of entries) {
    if (seen.has(entry.path)) { warn(`${section}: ${entry.path} listed twice in index`); continue; }
    seen.add(entry.path);
    const page = readPage(root, entry.path);
    if (!page) { warn(`${section}: ${entry.path} is in the index but has no page file`); continue; }
    const { meta, body } = parseFrontMatter(page.raw);
    const inGit = meta.published === 'true';
    const live = publishState ? publishState.get(entry.path) === true : inGit;
    if (publishState && live !== inGit) warn(`${section}: ${entry.path} front matter says published: ${meta.published || 'unset'} but Wiki.js says ${live}`);
    if (!live) { warn(`${section}: ${entry.path} is indexed but not published`); continue; }
    const html = page.ext === '.md' ? renderMarkdown(body) : renderHtml(body);
    const { content, summary: firstParagraph } = splitTitleAndSummary(html);
    const title = meta.title || entry.title || entry.path;
    items.push({
      section,
      id: `${SITE_URL}${entry.path}`,
      url: `${SITE_URL}${entry.path}`,
      title,
      summary: meta.description || entry.summary || firstParagraph,
      content,
      published: publishedAt(entry.date, meta.dateCreated),
      updated: meta.date || meta.dateCreated || isoAtNoon(entry.date),
      tags: [section, ...parseTags(meta.tags).filter((t) => t !== section)],
    });
  }
  return items;
}

export function sortNewestFirst(items) {
  return [...items].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : a.url < b.url ? 1 : -1));
}

export { stripTags };
