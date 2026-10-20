import { FEEDS_URL, MAX_ITEMS } from '../config.mjs';

export function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
}

function cdata(s) {
  return `<![CDATA[${String(s).replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`;
}

function rfc822(iso) {
  return new Date(iso).toUTCString();
}

function latestUpdated(items, fallback) {
  return items.reduce((max, i) => (i.updated > max ? i.updated : max), fallback);
}

export function rss(channel, items, slug) {
  const list = items.slice(0, MAX_ITEMS);
  const self = `${FEEDS_URL}/${slug}.xml`;
  const lastBuild = latestUpdated(list, list[0]?.published || new Date(0).toISOString());
  const body = list.map((i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${escapeXml(i.url)}</link>
      <guid isPermaLink="true">${escapeXml(i.id)}</guid>
      <pubDate>${rfc822(i.published)}</pubDate>
${i.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
      <description>${escapeXml(i.summary)}</description>
      <content:encoded>${cdata(i.content)}</content:encoded>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.home)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>
${body}
  </channel>
</rss>
`;
}

export function atom(channel, items, slug) {
  const list = items.slice(0, MAX_ITEMS);
  const self = `${FEEDS_URL}/${slug}.atom`;
  const updated = latestUpdated(list, list[0]?.published || new Date(0).toISOString());
  const body = list.map((i) => `  <entry>
    <title>${escapeXml(i.title)}</title>
    <link rel="alternate" href="${escapeXml(i.url)}"/>
    <id>${escapeXml(i.id)}</id>
    <published>${i.published}</published>
    <updated>${i.updated}</updated>
${i.tags.map((t) => `    <category term="${escapeXml(t)}"/>`).join('\n')}
    <summary>${escapeXml(i.summary)}</summary>
    <content type="html">${escapeXml(i.content)}</content>
  </entry>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(channel.title)}</title>
  <subtitle>${escapeXml(channel.description)}</subtitle>
  <link rel="alternate" href="${escapeXml(channel.home)}"/>
  <link rel="self" href="${escapeXml(self)}"/>
  <id>${escapeXml(self)}</id>
  <updated>${updated}</updated>
  <author><name>HexOS</name></author>
${body}
</feed>
`;
}

export function jsonFeed(channel, items, slug) {
  const list = items.slice(0, MAX_ITEMS);
  return JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: channel.title,
    description: channel.description,
    home_page_url: channel.home,
    feed_url: `${FEEDS_URL}/${slug}.json`,
    language: 'en-US',
    authors: [{ name: 'HexOS' }],
    items: list.map((i) => ({
      id: i.id,
      url: i.url,
      title: i.title,
      summary: i.summary,
      content_html: i.content,
      date_published: i.published,
      date_modified: i.updated,
      tags: i.tags,
    })),
  }, null, 2) + '\n';
}
