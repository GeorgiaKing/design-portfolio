import fs from 'fs';
import path from 'path';

// 1. Layout.astro
const layoutPath = path.resolve('src/layouts/Layout.astro');
let layout = fs.readFileSync(layoutPath, 'utf8');

const oldButton = `<button type="button" class="bionic-toggle" aria-label={en?'Reading aid: Bionic Reading (toggle bold first letters)':'Lesehilfe: Bionic Reading (erste Buchstaben fett hervorheben)'} aria-pressed="true" title={en?'Bionic Reading aid: on / off':'Bionic Reading Lesehilfe: An / Aus'}><span class="bionic-toggle-preview" aria-hidden="true"><b>B</b>R</span><span class="sr-only">{en?'Bionic Reading aid':'Bionic Reading Lesehilfe'}</span></button>`;
const newButton = `<button type="button" class="bionic-toggle" aria-label={en?'Reading aid: on / off (visual reading support)':'Lesehilfe: An / Aus (visuelle Leseunterstützung)'} aria-pressed="true" title={en?'Reading aid: on / off':'Lesehilfe: An / Aus'}><span class="bionic-toggle-preview" aria-hidden="true"><b>A</b>a</span><span class="sr-only">{en?'Reading aid: on / off':'Lesehilfe: An / Aus'}</span></button>`;

if (layout.includes(oldButton)) {
  layout = layout.replace(oldButton, newButton);
  console.log('Replaced bionic button in Layout.astro');
} else {
  console.log('Old button not matched directly, checking normalized...');
  layout = layout.replace(/<button type="button" class="bionic-toggle"[^>]*>.*?<\/button>/s, newButton);
  console.log('Replaced with regex in Layout.astro');
}

// Also update updateBionicButton to set dynamic title
const oldUpdate = `const updateBionicButton=()=>{const active=document.documentElement.dataset.bionic!=='false';bionicButton?.setAttribute('aria-pressed',String(active));};`;
const newUpdate = `const updateBionicButton=()=>{const active=document.documentElement.dataset.bionic!=='false';bionicButton?.setAttribute('aria-pressed',String(active));const isEn=document.documentElement.lang==='en';bionicButton?.setAttribute('title',isEn?(active?'Reading aid: on':'Reading aid: off'):(active?'Lesehilfe: An':'Lesehilfe: Aus'));};`;

if (layout.includes(oldUpdate)) {
  layout = layout.replace(oldUpdate, newUpdate);
  console.log('Updated updateBionicButton script');
}

fs.writeFileSync(layoutPath, layout, 'utf8');

// 2. ContactForm.tsx (internal helper renaming for clean code)
const formPath = path.resolve('src/components/ContactForm.tsx');
let form = fs.readFileSync(formPath, 'utf8');
form = form.replace(/renderBionic/g, 'renderReadingAid');
fs.writeFileSync(formPath, form, 'utf8');
console.log('Updated ContactForm.tsx internal renderReadingAid');
