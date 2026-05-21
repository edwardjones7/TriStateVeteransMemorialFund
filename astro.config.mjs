// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tristateveteransmemorialfund.org',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow remote optimization of legacy Wix assets if referenced during migration.
    domains: ['static.wixstatic.com'],
  },
});
