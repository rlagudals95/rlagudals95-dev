import { writeFileSync } from 'fs';
import RSS from 'rss';

// import { allBlogs } from '../.contentlayer/generated/allBlogs.mjs';
// import { allNotes } from '../.contentlayer/generated/allNotes.mjs';
import { allBlogs, allNotes, allCPs } from '../.contentlayer/generated/index.mjs';

async function generate() {
  const feed = new RSS({
    title: 'rlagudals95',
    site_url: 'https://rlagudals95.dev',
    feed_url: 'https://rlagudals95.dev/feed.xml',
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `https://rlagudals95.dev/blog/${post.slug}`,
      date: post.date,
      description: post.description,
    });
  });

  allNotes.map((note) => {
    feed.item({
      title: note.title,
      url: `https://rlagudals95.dev/${note.url_path}`,
      date: note.date,
    });
  });

  allCPs.map((cp) => {
    feed.item({
      title: cp.title,
      url: `https://rlagudals95.dev/${cp.url_path}`,
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
