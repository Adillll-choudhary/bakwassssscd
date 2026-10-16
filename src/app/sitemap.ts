import { MetadataRoute } from 'next';
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coldunestudio.com';

  const routes = [
    '',
    '/case-studies',
    '/case-studies/arjun-fauzdarr',
    '/case-studies/bimbra-4x4',
    '/work/branding',
    '/work/edits',
    '/work/shoots',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
