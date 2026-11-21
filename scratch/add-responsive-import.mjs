import fs from 'fs';

const p = 'src/layouts/Layout.astro';
let c = fs.readFileSync(p, 'utf8');
if (!c.includes('responsive-polish.css')) {
  c = c.replace(
    "import '../styles/testimonials.css';",
    "import '../styles/testimonials.css';\r\nimport '../styles/responsive-polish.css';"
  );
  fs.writeFileSync(p, c, 'utf8');
  console.log('Added responsive-polish.css import to Layout.astro');
} else {
  console.log('Already imported in Layout.astro');
}
