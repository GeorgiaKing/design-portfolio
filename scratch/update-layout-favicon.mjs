import fs from 'fs';
import path from 'path';

const layoutPath = path.resolve('src/layouts/Layout.astro');
let content = fs.readFileSync(layoutPath, 'utf8');

const target = `<link rel="canonical" href={canonical}/><link id="site-favicon" rel="icon" type="image/png" sizes="64x64" href="/images/brand/favicon-light.png"/><link rel="apple-touch-icon" sizes="180x180" href="/images/brand/apple-touch-icon.png"/>`;

const replacement = `<link rel="canonical" href={canonical}/>
  <link rel="icon" href="/favicon.ico" sizes="48x48"/>
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png"/>
  <link id="site-favicon" rel="icon" type="image/png" sizes="64x64" href="/images/brand/favicon-light.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
  <link rel="manifest" href="/site.webmanifest"/>
  <meta name="apple-mobile-web-app-title" content="Georgia König"/>
  <meta name="application-name" content="Georgia König"/>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log('Successfully updated favicon links in Layout.astro');
} else {
  console.error('Target not found in Layout.astro');
}
