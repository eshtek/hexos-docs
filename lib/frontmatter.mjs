// Wiki.js front matter is a flat block of `key: value` lines. Markdown pages
// wrap it in `---`; HTML pages wrap the same block in an HTML comment.
const MD = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const HTML = /^<!--\r?\n([\s\S]*?)\r?\n-->\r?\n?/;

export function parseFrontMatter(raw) {
  const match = raw.match(MD) || raw.match(HTML);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx < 1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

export function parseTags(value) {
  if (!value) return [];
  return value.split(',').map((t) => t.trim()).filter(Boolean);
}
