import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';

// Resize the supplied originals for web delivery; do not redraw, recolour or crop the marks.
await mkdir('public/images/brand',{recursive:true});
for(const [theme,source] of [
 ['light','public/Logo_GK_ohne_Schriftzug_hell.png'],
 ['dark','public/Logo_Georgia_Konig_ohne_Schriftzug.png'],
]) {
 await sharp(source).resize({width:320}).webp({quality:95,alphaQuality:100}).toFile(`public/images/brand/logo-${theme}.webp`);
 await sharp(source).resize(64,64,{fit:'contain',background:'#00000000'}).png().toFile(`public/images/brand/favicon-${theme}.png`);
}
await sharp('public/Logo_GK_ohne_Schriftzug_hell.png').resize(180,180,{fit:'contain',background:'#ffffff'}).flatten({background:'#ffffff'}).png().toFile('public/images/brand/apple-touch-icon.png');
console.log('Prepared both original logo variants, theme-aware favicons and touch icon.');
