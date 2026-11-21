import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, dirname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
async function walk(dir) {
 const files = await readdir(dir, { withFileTypes: true });
 return (await Promise.all(files.map(f=>f.isDirectory()?walk(join(dir,f.name)):[join(dir,f.name)]))).flat();
}
const files = await walk(root);
const pages = new Map(await Promise.all(files.filter(f=>f.endsWith('.html')).map(async f=>[f,await readFile(f,'utf8')])));
const titles = new Set();
let links=0,schemas=0;
for(const [file,html] of pages) {
 const relative = file.slice(root.length);
 const expectedLang=file.includes(sep+'en'+sep)?'en':'de';
 assert.ok(html.includes('lang="'+expectedLang+'"'),`${relative}: correct document language`);
 if(!file.endsWith('404.html')) { assert.match(html,/hreflang="de"/,`${relative}: German alternate`);assert.match(html,/hreflang="en"/,`${relative}: English alternate`); }
 for(const tag of html.matchAll(/<link\b[^>]*hreflang="(?:de|en)"[^>]*>/g)) {
  const target=tag[0].match(/href="([^"]+)"/)?.[1];
  assert.ok(target,`${relative}: language alternate URL`);
  assert.ok(pages.has(join(root,new URL(target).pathname,'index.html')),`${relative}: language alternate exists`);
 }
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${relative}: exactly one h1`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
 assert.ok(title && !titles.has(title),`${relative}: unique title`); titles.add(title);
 assert.match(html,/<meta name="description" content="[^"]{30,}"/,`${relative}: description`);
 assert.match(html,/<link rel="canonical" href="https:\/\/georgia-koenig.de\//,`${relative}: canonical`);
 assert.ok(!/<script[^>]*src="https?:\/\//i.test(html),`${relative}: no third-party scripts`);
 for(const tag of html.matchAll(/<link\b[^>]*>/g))if(tag[0].includes('stylesheet'))assert.ok(!/href="https?:\/\//.test(tag[0]),`${relative}: no third-party styles`);
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
  const data = JSON.parse(m[1]); assert.equal(data['@context'],'https://schema.org'); schemas++;
 }
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`${relative}: unique IDs`);
 for(const m of html.matchAll(/<(?:a|img|script|link)\b[^>]*(?:href|src)="([^\"]+)"/g)) {
  const href=m[1];
  if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
  const [path,fragment] = href.split('#');
  const base=path?resolve(path.startsWith('/')?root:dirname(file),'.'+(path.startsWith('/')?path:'/'+path)):file;
  let target=base;
  try { const st=await stat(target); if(st.isDirectory())target=join(target,'index.html'); await stat(target); }
  catch { throw new Error(`${relative}: missing target ${href}`); }
  if(fragment&&pages.has(target))assert.ok(new RegExp(`\\sid="${fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"`).test(pages.get(target)),`${relative}: missing fragment ${href}`);
  links++;
 }
 for(const image of html.matchAll(/<img\b[^>]*>/g))assert.match(image[0],/\balt="/,`${relative}: every image has an alt attribute`);
}
for(const path of ['robots.txt','llms.txt','sitemap-index.xml','sitemap-0.xml','_headers','_redirects','images/social-card.png','images/georgia-koenig.jpg'])assert.ok(files.includes(join(root,path)),`Output includes ${path}`);
for(const home of ['index.html','en/index.html']) {
 const html=pages.get(join(root,home));
 assert.equal((html.match(/<img\b[^>]*alt="[^"]*Georgia K[öo]nig[^\"]*"/g)||[]).length,1,`${home}: exactly one portrait on home page`);
}
for(const stylesheet of ['src/styles/redesign.css','src/styles/readability.css','src/styles/brand.css','src/styles/services.css']) {
 const css=await readFile(stylesheet,'utf8');
 for(const size of css.matchAll(/font(?:-size)?:\s*(\d+(?:\.\d+)?)px/g))assert.ok(Number(size[1])>=14,`${stylesheet}: no text size below 14px`);
}
const sitemap=await readFile(join(root,'sitemap-0.xml'),'utf8');
assert.ok(!sitemap.includes('404'), '404 excluded from sitemap');
const redirects=await readFile(join(root,'_redirects'),'utf8');
for(const m of redirects.matchAll(/^\S+\s+(\/\S*)\s+301/gm))assert.ok(pages.has(join(root,m[1],'index.html')),`Redirect target exists: ${m[1]}`);
console.log(`PASS: ${pages.size} pages, ${links} local links/assets, ${schemas} JSON-LD documents. Titles, headings, language, metadata, fragments, images, migration redirects and discovery files verified.`);
