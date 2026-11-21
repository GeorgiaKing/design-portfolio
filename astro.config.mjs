import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://georgia-koenig.de',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap({ filter: (url) => !url.endsWith('/404/') })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/quick-audit': {
          target: 'https://api.wabiy.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/quick-audit/, '/audit/public/quick'),
        },
      },
    },
  },
  devToolbar: { enabled: false },
});
