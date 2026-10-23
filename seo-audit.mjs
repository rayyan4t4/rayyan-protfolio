// Lightweight SEO audit for rayyankhan.online — no dependencies.
// Usage: node seo-audit.mjs [siteDir]
// Checks the static HTML pages in siteDir (default: script's directory).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://rayyankhan.online';
const root = process.argv[2] || dirname(fileURLToPath(import.meta.url));

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

function htmlFiles(dir, prefix = '') {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p, prefix + name + '/'));
    else if (name.endsWith('.html')) out.push(prefix + name);
  }
  return out.sort();
}

const files = htmlFiles(root);
const pathOf = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));
const pages = new Map(files.map((f) => [pathOf(f), f]));
const titles = new Map();

for (const [path, file] of pages) {
  const html = readFileSync(join(root, file), 'utf8');
  const tag = `[${path}]`;

  if (!/<html[^>]*\blang="[a-z-]+"/i.test(html)) fail(`${tag} missing lang attribute`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) fail(`${tag} missing <title>`);
  else {
    if (titles.has(title)) fail(`${tag} duplicate title also used by ${titles.get(title)}`);
    titles.set(title, path);
    if (title.length > 65) warn(`${tag} title is ${title.length} chars (>65, may truncate)`);
  }
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(`${tag} missing meta description`);
  else if (desc.length > 165) warn(`${tag} description is ${desc.length} chars (>165)`);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonical) fail(`${tag} missing canonical`);
  else if (canonical !== BASE + path) fail(`${tag} canonical "${canonical}" != expected "${BASE + path}"`);
  if (/noindex/i.test(html)) fail(`${tag} contains noindex`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${tag} has ${h1} <h1> elements (expected 1)`);
  for (const img of html.match(/<img[^>]*>/g) || []) {
    if (!/\balt="/.test(img)) fail(`${tag} image without alt: ${img.slice(0, 90)}...`);
  }
  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
    try { JSON.parse(block.replace(/<script[^>]*>|<\/script>/g, '')); }
    catch { fail(`${tag} JSON-LD does not parse`); }
  }
  // crawlable internal links must resolve to real pages
  for (const href of html.match(/href="(\/[^"#]*)"/g) || []) {
    const target = href.slice(6, -1);
    if (target.startsWith('/assets/') || target.startsWith('/covers/')) continue;
    if (!pages.has(target)) fail(`${tag} internal link to nonexistent page: ${target}`);
  }
}

// sitemap must list exactly the page set, with canonical URLs
const sitemapPath = join(root, 'sitemap.xml');
if (!existsSync(sitemapPath)) fail('sitemap.xml missing');
else {
  const sm = readFileSync(sitemapPath, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (!loc.startsWith(BASE)) fail(`sitemap entry not on canonical domain: ${loc}`);
    else if (!pages.has(loc.slice(BASE.length) || '/')) fail(`sitemap entry has no page: ${loc}`);
  }
  for (const path of pages.keys()) {
    if (!locs.includes(BASE + path)) fail(`page missing from sitemap: ${path}`);
  }
}

// robots.txt: must exist, allow crawling, and point at the sitemap
const robotsPath = join(root, 'robots.txt');
if (!existsSync(robotsPath)) warn('robots.txt not in this directory (checked live separately)');
else {
  const rb = readFileSync(robotsPath, 'utf8');
  if (!rb.includes(`Sitemap: ${BASE}/sitemap.xml`)) fail('robots.txt missing sitemap line');
  if (/Disallow:\s*\/\s*$/m.test(rb)) fail('robots.txt disallows the whole site');
}

console.log(`SEO audit — ${pages.size} pages under ${root}`);
for (const w of warnings) console.log(`  WARN  ${w}`);
for (const f of failures) console.log(`  FAIL  ${f}`);
console.log(failures.length === 0
  ? `PASS — 0 failures, ${warnings.length} warnings`
  : `FAILED — ${failures.length} failures, ${warnings.length} warnings`);
process.exit(failures.length === 0 ? 0 : 1);
