// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL canônica do site (usada por Open Graph, sitemap, etc.)
  site: 'https://infinitudes.netlify.app',
  vite: {
    plugins: [tailwindcss()]
  }
});