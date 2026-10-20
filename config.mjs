export const SITE_URL = 'https://docs.hexos.com';
export const FEEDS_URL = 'https://feeds.hexos.com';
export const MAX_ITEMS = 30;

export const SECTIONS = {
  blog: {
    index: 'blog.md',
    title: 'HexOS Blog',
    description: 'News and updates from the HexOS team.',
    home: `${SITE_URL}/blog`,
  },
  'release-notes': {
    index: 'release-notes/command-deck.md',
    title: 'HexOS Command Deck Release Notes',
    description: 'What changed in each HexOS Command Deck release.',
    home: `${SITE_URL}/release-notes/command-deck`,
  },
};

export const ALL = {
  title: 'HexOS Updates',
  description: 'Blog posts and Command Deck release notes from HexOS, newest first.',
  home: SITE_URL,
};
