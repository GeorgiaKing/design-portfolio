import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generate() {
  console.log('Generating high-res favicons and platform icons...');

  const darkSource = path.resolve('public/Logo_Georgia_Konig_ohne_Schriftzug.png'); // Dark logo for light backgrounds
  const lightSource = path.resolve('public/Logo_GK_ohne_Schriftzug_hell.png'); // White/light logo for dark backgrounds

  // Trim to get clean square bounding boxes
  const darkSquare = await sharp(darkSource).trim().toBuffer();
  const lightSquare = await sharp(lightSource).trim().toBuffer();

  // 1. Generate PNG sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' }, // Recommended by Google Search Central
    { size: 96, name: 'favicon-96x96.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  for (const s of sizes) {
    const outPath = path.resolve(`public/${s.name}`);
    await sharp(darkSquare)
      .resize(s.size, s.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`Generated public/${s.name}`);
  }

  // Also copy/update into public/favicon/ folder for backwards compatibility
  for (const s of sizes) {
    const outPath = path.resolve(`public/favicon/${s.name}`);
    await sharp(darkSquare)
      .resize(s.size, s.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
  }

  // 2. Generate Apple Touch Icon (180x180)
  // Apple recommends a non-transparent background with comfortable icon padding (~10-15%)
  const appleTouchSize = 180;
  const innerSize = Math.floor(appleTouchSize * 0.82); // 148px icon on 180px canvas
  const innerIcon = await sharp(darkSquare)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const appleCanvas = sharp({
    create: {
      width: appleTouchSize,
      height: appleTouchSize,
      channels: 4,
      background: { r: 246, g: 247, b: 245, alpha: 1 }, // Brand background #f6f7f5
    },
  });

  const appleTouchBuffer = await appleCanvas
    .composite([{ input: innerIcon, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve('public/apple-touch-icon.png'), appleTouchBuffer);
  fs.writeFileSync(path.resolve('public/apple-touch-icon-precomposed.png'), appleTouchBuffer);
  fs.writeFileSync(path.resolve('public/favicon/apple-touch-icon.png'), appleTouchBuffer);
  fs.writeFileSync(path.resolve('public/images/brand/apple-touch-icon.png'), appleTouchBuffer);
  console.log('Generated apple-touch-icon.png (root & brand)');

  // 3. Generate Theme-reactive Brand Favicons in public/images/brand/
  // favicon-light.png: Dark logo for light theme tabs (64x64)
  await sharp(darkSquare)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve('public/images/brand/favicon-light.png'));
  console.log('Updated public/images/brand/favicon-light.png (64x64 dark logo)');

  // favicon-dark.png: White/light logo for dark theme tabs (64x64)
  await sharp(lightSquare)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve('public/images/brand/favicon-dark.png'));
  console.log('Updated public/images/brand/favicon-dark.png (64x64 white logo)');

  // 4. Generate multi-resolution ICO file (public/favicon.ico & public/favicon/favicon.ico)
  // Contains 16x16, 32x32, 48x48
  const p16 = await sharp(darkSquare).resize(16, 16).png().toBuffer();
  const p32 = await sharp(darkSquare).resize(32, 32).png().toBuffer();
  const p48 = await sharp(darkSquare).resize(48, 48).png().toBuffer();

  const icoImages = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + icoImages.length * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(icoImages.length, 4);

  const dirEntries = [];
  for (const img of icoImages) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuf = Buffer.concat([header, ...dirEntries, ...icoImages.map(i => i.buffer)]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuf);
  fs.writeFileSync(path.resolve('public/favicon/favicon.ico'), icoBuf);
  console.log('Generated multi-resolution favicon.ico (16, 32, 48)');

  // 5. Update site.webmanifest in public/ and public/favicon/
  const manifestData = {
    name: 'Georgia König – Barrierefreie Software',
    short_name: 'Georgia König',
    description: 'UX-Designerin & Accessibility Engineer aus Schwäbisch Hall',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f7f5',
    theme_color: '#146d52',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  const manifestStr = JSON.stringify(manifestData, null, 2);
  fs.writeFileSync(path.resolve('public/site.webmanifest'), manifestStr, 'utf8');
  fs.writeFileSync(path.resolve('public/favicon/site.webmanifest'), manifestStr, 'utf8');
  console.log('Updated site.webmanifest');
}

generate().catch(console.error);
