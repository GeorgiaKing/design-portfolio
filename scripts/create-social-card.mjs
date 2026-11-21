import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
for(const lang of ['de','en']) {
 const svg=`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#101517"/><rect x="30" y="25" width="1140" height="80" rx="18" stroke="#3d4b4c" fill="#182022"/><text x="145" y="76" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="#f3f5f1">georgia könig.</text><text x="1130" y="73" text-anchor="end" font-family="Arial,sans-serif" font-size="15" letter-spacing="2" fill="#b9c6bf">HUMAN. DIGITAL. ACCESSIBLE.</text><g fill="none" stroke="#3d4b4c"><circle cx="950" cy="340" r="160"/><circle cx="950" cy="340" r="210"/></g><text x="65" y="255" font-family="Arial,sans-serif" font-size="100" font-weight="bold" letter-spacing="-6" fill="#f3f5f1">Digital.</text><text x="65" y="365" font-family="Arial,sans-serif" font-size="100" font-weight="bold" letter-spacing="-6" fill="#f3f5f1">${lang==='de'?'Menschlich.':'Human.'}</text><text x="65" y="475" font-family="Arial,sans-serif" font-size="100" font-weight="bold" letter-spacing="-6" fill="#d1e3d8">${lang==='de'?'Für alle.':'For everyone.'}</text><line x1="65" y1="545" x2="1135" y2="545" stroke="#3d4b4c"/><text x="65" y="590" font-family="Arial,sans-serif" font-size="17" fill="#b9c6bf">UX DESIGN · ACCESSIBILITY · DEVELOPMENT</text><text x="1135" y="590" text-anchor="end" font-family="Arial,sans-serif" font-size="19" fill="#d1e3d8">georgia-koenig.de ↗</text></svg>`;
 const smallLogo=await sharp('public/Logo_Georgia_Konig_ohne_Schriftzug.png').resize({width:70}).toBuffer();
 const largeLogo=await sharp('public/Logo_Georgia_Konig_ohne_Schriftzug.png').resize({width:300}).toBuffer();
 await sharp(Buffer.from(svg)).composite([{input:smallLogo,left:58,top:29},{input:largeLogo,left:800,top:185}]).png().toFile(`public/images/social-card${lang==='en'?'-en':''}.png`);
}
await sharp('src/assets/georgia-koenig.jpg').resize(800).jpeg({quality:85}).toFile('public/images/georgia-koenig.jpg');
console.log('Social card and public profile image generated.');
