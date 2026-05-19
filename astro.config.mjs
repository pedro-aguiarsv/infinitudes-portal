// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL canônica do site (usada por Open Graph, sitemap, etc.)
  site: 'https://infinitudes.com.br',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Filtra páginas que não devem aparecer em buscadores
      filter: (page) =>
        !page.includes('/preview/') &&
        !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      // Páginas estáticas têm prioridade maior do que rotas dinâmicas
      serialize(item) {
        if (item.url === 'https://infinitudes.com.br/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        if (
          item.url.endsWith('/livro/') ||
          item.url.endsWith('/loja/') ||
          item.url.endsWith('/sobre/')
        ) {
          item.priority = 0.9;
        }
        return item;
      },
    }),
  ],
});
