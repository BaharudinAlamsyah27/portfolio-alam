import type { APIRoute } from 'astro';
import { getProjectsData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() ?? 'https://alam-portfolio.vercel.app').replace(/\/$/, '');
  const projects = await getProjectsData(false);

  const staticPaths = ['/', '/en/', '/now', '/en/now', '/log', '/en/log'];
  const projectPaths = projects.flatMap((p) => [`/projects/${p.id}`, `/en/projects/${p.id}`]);
  const allPaths = [...staticPaths, ...projectPaths];

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
