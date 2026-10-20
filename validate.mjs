// Structural checks on a built dist/: well-formed XML, required elements,
// no root-relative links left, and parseable JSON Feed. Fails the run on any
// problem so a broken build never replaces a good deploy.
import fs from 'node:fs';
import path from 'node:path';
import { XMLValidator, XMLParser } from 'fast-xml-parser';
import { SITE_URL } from './config.mjs';

const dir = process.argv[2] || 'dist';
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };
const parser = new XMLParser({ ignoreAttributes: false });

for (const slug of ['blog', 'release-notes', 'all']) {
  for (const ext of ['xml', 'atom', 'json']) {
    const file = path.join(dir, `${slug}.${ext}`);
    check(fs.existsSync(file), `${file} missing`);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    check(!/\b(src|href)="\/(?!\/)/.test(text), `${file} has a root-relative link`);
    if (ext === 'json') {
      let doc;
      try { doc = JSON.parse(text); } catch (e) { check(false, `${file} is not JSON: ${e.message}`); continue; }
      check(doc.version === 'https://jsonfeed.org/version/1.1', `${file} wrong version`);
      check(Array.isArray(doc.items) && doc.items.length > 0, `${file} has no items`);
      for (const i of doc.items || []) check(i.id && i.url && i.title && i.date_published && i.content_html, `${file} item missing fields: ${i.id}`);
      continue;
    }
    const valid = XMLValidator.validate(text);
    check(valid === true, `${file} is not well-formed XML: ${JSON.stringify(valid)}`);
    if (valid !== true) continue;
    const doc = parser.parse(text);
    if (ext === 'xml') {
      const ch = doc.rss?.channel;
      check(ch?.title && ch?.link && ch?.description, `${file} channel missing title/link/description`);
      const items = [].concat(ch?.item || []);
      check(items.length > 0, `${file} has no items`);
      for (const i of items) check(i.title && i.link && i.guid && i.pubDate && i['content:encoded'], `${file} item missing fields: ${i.link}`);
      for (const i of items) check(String(i.link).startsWith(SITE_URL), `${file} item link off-site: ${i.link}`);
    } else {
      const f = doc.feed;
      check(f?.title && f?.id && f?.updated, `${file} feed missing title/id/updated`);
      const entries = [].concat(f?.entry || []);
      check(entries.length > 0, `${file} has no entries`);
      for (const e of entries) check(e.title && e.id && e.updated && e.content, `${file} entry missing fields: ${e.id}`);
    }
  }
}
check(fs.existsSync(path.join(dir, 'index.html')), 'index.html missing');

if (problems.length) { for (const p of problems) console.error(`invalid: ${p}`); process.exit(1); }
console.log('feeds valid');
