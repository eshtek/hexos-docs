import { SITE_URL } from '../config.mjs';

// Wiki.js answers `pages.list` for guests, including each page's publish
// state. That state is the public truth: the `published` front matter line in
// git drifts when a page is published from the Wiki.js UI after the commit.
export async function fetchPublishState(url = `${SITE_URL}/graphql`) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '{ pages { list(limit: 5000) { path isPublished } } }' }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Wiki.js GraphQL responded ${res.status}`);
  const json = await res.json();
  const list = json?.data?.pages?.list;
  if (!Array.isArray(list) || list.length === 0) throw new Error('Wiki.js GraphQL returned no pages');
  return new Map(list.map((p) => [`/${p.path}`, p.isPublished === true]));
}
