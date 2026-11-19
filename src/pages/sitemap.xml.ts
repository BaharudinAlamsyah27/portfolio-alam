import type { APIRoute } from 'astro';
import { getNotesData, getProductsData, getProjectsData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() ?? 'https://alam-portfolio.vercel.app').replace(/\/$/, '');
  const [projects, notes, products] = await Promise.all([
    getProjectsData(false),
    getNotesData(false),
    getProductsData(false),
  ]);

  const staticPaths = [
    '/',
    '/en/',
    '/projects',
    '/en/projects',
    '/toko',
    '/en/toko',
    '/notes',
    '/en/notes',
    '/now',
    '/en/now',
    '/log',
    '/en/log',
  ];
  const projectPaths = projects.flatMap((p) => [`/projects/${p.id}`, `/en/projects/${p.id}`]);
  const notePaths = notes.flatMap((n) => [`/notes/${n.id}`, `/en/notes/${n.id}`]);
  const productPaths = products.flatMap((p) => [`/toko/${p.id}`, `/en/toko/${p.id}`]);
  const allPaths = [...staticPaths, ...projectPaths, ...notePaths, ...productPaths];

  const urls = allPaths
    .map(
      (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
