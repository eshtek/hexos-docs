import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadSection, sortNewestFirst, parseBlogIndex, parseReleaseNotesIndex } from '../lib/sources.mjs';
import { rss, atom, jsonFeed } from '../lib/feeds.mjs';
import { SECTIONS } from '../config.mjs';
import { renderHtml, renderMarkdown } from '../lib/render.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const fixtures = path.join(here, 'fixtures');

test('blog index: title and date come from the index line', () => {
  const [first] = parseBlogIndex('- [A Title - September 23, 2026](/blog/2026-09-23)\n- not a post\n');
  assert.deepEqual(first, { title: 'A Title', date: '2026-09-23', path: '/blog/2026-09-23', summary: '' });
});

test('release-notes index: date and summary come from the index line', () => {
  const [first] = parseReleaseNotesIndex('- [**2026-08-21**](/release-notes/command-deck/2026-08-21-2) - Second note\n');
  assert.deepEqual(first, { title: '', date: '2026-08-21', path: '/release-notes/command-deck/2026-08-21-2', summary: 'Second note' });
});

test('blog: only published and indexed pages, markdown beats html', () => {
  const warnings = [];
  const items = sortNewestFirst(loadSection(fixtures, 'blog', (w) => warnings.push(w)));
  assert.deepEqual(items.map((i) => i.url), [
    'https://docs.hexos.com/blog/2026-09-23',
    'https://docs.hexos.com/blog/2026-7-15',
  ]);
  assert.match(items[1].content, /Body from markdown/);
  assert.doesNotMatch(items[1].content, /Body from html/);
  assert.equal(warnings.length, 2);
  assert.match(warnings.join('\n'), /7-16-2026 is indexed but not published/);
  assert.match(warnings.join('\n'), /2026-06-01 is in the index but has no page file/);
});

test('blog: dates, summary, tags and rendering', () => {
  const [post] = loadSection(fixtures, 'blog');
  assert.equal(post.published, '2026-09-23T18:21:56.577Z', 'index date with dateCreated time of day');
  assert.equal(post.updated, '2026-10-01T10:00:00.000Z', 'front matter date');
  assert.equal(post.summary, 'First paragraph with a relative link and an absolute one.');
  assert.deepEqual(post.tags, ['blog', 'beta', 'vms']);
  assert.doesNotMatch(post.content, /<h1/);
  assert.match(post.content, /href="https:\/\/docs\.hexos\.com\/getting-started"/);
  assert.match(post.content, /href="https:\/\/example\.com"/);
  assert.match(post.content, /<img src="https:\/\/docs\.hexos\.com\/blog\/7-30-24\/1\.png" alt="1\.png" class="align-center">/);
  assert.match(post.content, /<blockquote class="is-danger">/);
  assert.match(post.content, /<source src="https:\/\/docs\.hexos\.com\/videos\/demo\.mp4"/);
  assert.doesNotMatch(post.content, /=750x/);
});

test('live publish state overrides git front matter in both directions', () => {
  const warnings = [];
  const live = new Map([
    ['/blog/2026-09-23', false],
    ['/blog/2026-7-15', true],
    ['/blog/7-16-2026', true],
  ]);
  const items = sortNewestFirst(loadSection(fixtures, 'blog', (w) => warnings.push(w), live));
  assert.deepEqual(items.map((i) => i.url), [
    'https://docs.hexos.com/blog/7-16-2026',
    'https://docs.hexos.com/blog/2026-7-15',
  ]);
  assert.match(warnings.join('\n'), /2026-09-23 front matter says published: true but Wiki.js says false/);
  assert.match(warnings.join('\n'), /7-16-2026 front matter says published: false but Wiki.js says true/);
});

test('release notes: summary from index, pubDate from index not slug', () => {
  const items = sortNewestFirst(loadSection(fixtures, 'release-notes'));
  assert.equal(items[0].summary, 'Rename your server, and more');
  assert.equal(items[1].published, '2026-08-21T15:00:00.000Z');
  assert.equal(items[1].updated, '2026-08-22T09:00:00.000Z');
  assert.equal(items[0].title, 'October 16, 2026 - Rename your server, and more');
});

test('feed documents carry the item fields and escape content', () => {
  const items = sortNewestFirst(loadSection(fixtures, 'blog'));
  const x = rss(SECTIONS.blog, items, 'blog');
  assert.match(x, /<guid isPermaLink="true">https:\/\/docs\.hexos\.com\/blog\/2026-09-23<\/guid>/);
  assert.match(x, /<pubDate>Wed, 23 Sep 2026 18:21:56 GMT<\/pubDate>/);
  assert.match(x, /<lastBuildDate>Thu, 01 Oct 2026 10:00:00 GMT<\/lastBuildDate>/, 'newest updated, not the clock');
  assert.match(x, /<content:encoded><!\[CDATA\[/);
  const a = atom(SECTIONS.blog, items, 'blog');
  assert.match(a, /<updated>2026-10-01T10:00:00.000Z<\/updated>/);
  assert.match(a, /<content type="html">&lt;p&gt;/);
  const j = JSON.parse(jsonFeed(SECTIONS.blog, items, 'blog'));
  assert.equal(j.items[0].date_published, '2026-09-23T18:21:56.577Z');
  assert.equal(j.feed_url, 'https://feeds.hexos.com/blog.json');
});

test('build is deterministic and validates', () => {
  const out1 = fs.mkdtempSync(path.join(os.tmpdir(), 'feeds-'));
  const out2 = fs.mkdtempSync(path.join(os.tmpdir(), 'feeds-'));
  const root = path.join(here, '..');
  execFileSync('node', [path.join(root, 'build.mjs'), '--content', fixtures, '--out', out1, '--offline']);
  execFileSync('node', [path.join(root, 'build.mjs'), '--content', fixtures, '--out', out2, '--offline']);
  for (const f of fs.readdirSync(out1)) {
    assert.equal(fs.readFileSync(path.join(out1, f), 'utf8'), fs.readFileSync(path.join(out2, f), 'utf8'), f);
  }
  assert.equal(fs.readdirSync(out1).length, 10);
  execFileSync('node', [path.join(root, 'validate.mjs'), out1]);
  const all = JSON.parse(fs.readFileSync(path.join(out1, 'all.json'), 'utf8'));
  assert.deepEqual(all.items.map((i) => i.url.split('/').slice(3).join('/')), [
    'release-notes/command-deck/2026-10-16',
    'blog/2026-09-23',
    'release-notes/command-deck/2026-08-21-2',
    'blog/2026-7-15',
  ]);
});

test('validator rejects a feed with a root-relative link or broken XML', () => {
  const root = path.join(here, '..');
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'feeds-'));
  execFileSync('node', [path.join(root, 'build.mjs'), '--content', fixtures, '--out', out, '--offline']);
  const file = path.join(out, 'blog.xml');
  const good = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, good.replace('https://docs.hexos.com/getting-started', '/getting-started'));
  assert.throws(() => execFileSync('node', [path.join(root, 'validate.mjs'), out], { stdio: 'pipe' }), /root-relative/);
  fs.writeFileSync(file, good.replace('</channel>', ''));
  assert.throws(() => execFileSync('node', [path.join(root, 'validate.mjs'), out], { stdio: 'pipe' }), /well-formed/);
});

test('inline styles are stripped from item content', () => {
  assert.equal(renderHtml('<img src="/a.png" style="width:100%; margin:1rem auto;" alt="a">'), '<img src="https://docs.hexos.com/a.png" alt="a">');
  assert.doesNotMatch(renderMarkdown("<p style='color:red'>hi</p>"), /style=/);
});
