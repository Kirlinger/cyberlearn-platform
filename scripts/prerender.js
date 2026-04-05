/**
 * Pre-rendering script for CyberLearn Platform.
 *
 * After `vite build` (client) and `vite build --ssr` (server), this script
 * loads the SSR bundle, renders every known route to static HTML, and writes
 * the result to the `dist/` directory so crawlers receive real content.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const serverDir = path.resolve(__dirname, '../dist/server');

// Load the SSR bundle produced by `vite build --ssr`
const { render } = await import(path.resolve(serverDir, 'entry-server.js'));

// Read the client-built index.html as the template
const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

// Extract lesson IDs from the source data file
const lessonDataPath = path.resolve(__dirname, '../src/data/lessons.js');
const lessonSrc = fs.readFileSync(lessonDataPath, 'utf-8');
const lessonIds = [...lessonSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

// Static routes + dynamic lesson routes
const staticRoutes = ['/', '/roadmaps', '/labs', '/glossary', '/resources', '/career'];
const lessonRoutes = lessonIds.map((id) => `/lesson/${id}`);
const allRoutes = [...staticRoutes, ...lessonRoutes];

let generated = 0;

for (const url of allRoutes) {
  const { html: appHtml, helmet } = render(url);

  // Build helmet head tags string
  const helmetHead = [
    helmet.title?.toString() || '',
    helmet.meta?.toString() || '',
    helmet.link?.toString() || '',
  ]
    .filter(Boolean)
    .join('\n    ');

  // Inject rendered HTML and helmet head into the template
  let page = template
    .replace('<!--ssr-outlet-->', appHtml)
    .replace('<!--helmet-head-->', helmetHead);

  // Remove default tags that Helmet overrides to avoid duplicates for crawlers
  if (helmet.title?.toString()) {
    page = page.replace(/<title>CyberLearn Platform<\/title>\s*/, '');
  }
  const helmetMeta = helmet.meta?.toString() || '';
  if (helmetMeta.includes('name="description"')) {
    page = page.replace(/<meta name="description" content="CyberLearn Platform[^"]*" \/>\s*/, '');
  }
  if (helmetMeta.includes('property="og:title"')) {
    page = page.replace(/<meta property="og:title" content="CyberLearn Platform" \/>\s*/, '');
  }
  if (helmetMeta.includes('property="og:description"')) {
    page = page.replace(/<meta property="og:description" content="Free interactive[^"]*" \/>\s*/, '');
  }

  // Write file:  "/" → dist/index.html, "/roadmaps" → dist/roadmaps/index.html
  const filePath =
    url === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, `${url.slice(1)}/index.html`);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, page);
  generated++;
}

// Copy the root index.html to 404.html for SPA fallback routing
fs.copyFileSync(path.resolve(distDir, 'index.html'), path.resolve(distDir, '404.html'));

console.log(`✓ Pre-rendered ${generated} pages to ${distDir}`);
