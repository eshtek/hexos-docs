import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { SECTIONS, ALL } from './config.mjs';
import { loadSection, sortNewestFirst } from './lib/sources.mjs';
import { rss, atom, jsonFeed } from './lib/feeds.mjs';
import { indexPage } from './site/index.mjs';
import { fetchPublishState } from './lib/wiki.mjs';

const { values } = parseArgs({ options: { content: { type: 'string' }, out: { type: 'string', default: 'dist' }, offline: { type: 'boolean', default: false } } });
if (!values.content) { console.error('usage: build.mjs --content <wiki checkout> [--out dist]'); process.exit(2); }

const warnings = [];
const warn = (m) => warnings.push(m);
// Publish state comes from the live wiki; a build that cannot reach it fails
// rather than guessing from git, so the last good deploy stays up.
let publishState = null;
if (!values.offline) {
  try { publishState = await fetchPublishState(); } catch (e) { console.error(`cannot read publish state from Wiki.js: ${e.message}`); process.exit(1); }
} else {
  warn('offline: publish state taken from git front matter, which can be stale');
}
const bySection = {};
for (const section of Object.keys(SECTIONS)) {
  bySection[section] = sortNewestFirst(loadSection(values.content, section, warn, publishState));
}
const all = sortNewestFirst(Object.values(bySection).flat());

fs.rmSync(values.out, { recursive: true, force: true });
fs.mkdirSync(values.out, { recursive: true });
const write = (name, text) => fs.writeFileSync(path.join(values.out, name), text);

const feeds = [];
for (const [slug, items] of [...Object.entries(bySection), ['all', all]]) {
  const channel = slug === 'all' ? ALL : SECTIONS[slug];
  write(`${slug}.xml`, rss(channel, items, slug));
  write(`${slug}.atom`, atom(channel, items, slug));
  write(`${slug}.json`, jsonFeed(channel, items, slug));
  feeds.push({ slug, channel, latest: items.slice(0, 3) });
  console.log(`${slug}: ${items.length} items`);
}
write('index.html', indexPage(feeds));

for (const w of warnings) console.warn(`warning: ${w}`);
if (all.length === 0) { console.error('no items found; refusing to publish an empty site'); process.exit(1); }
