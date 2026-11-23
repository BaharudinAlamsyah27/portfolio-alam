import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

/**
 * Panel admin Keystatic hanya aktif saat `npm run dev` (mode local).
 * Saat `astro build` / production, website tetap 100% statis & tanpa panel admin.
 */
function keystaticDevOnly() {
  const integration = keystatic();
  return {
    ...integration,
    hooks: {
      ...integration.hooks,
      'astro:config:setup': (params) => {
        if (params.command !== 'dev') return;
        return integration.hooks['astro:config:setup']?.(params);
      },
    },
  };
}

export default defineConfig({
  site: 'https://baharudin-alamsyah.vercel.app',
  integrations: [
    // Preact = komponen island website. React hanya untuk UI admin Keystatic.
    preact({ include: ['**/components/islands/**', '**/lib/**'] }),
    react({ include: ['**/keystatic/**', '**/keystatic.config.*'] }),
    mdx(),
    keystaticDevOnly(),
  ],
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
