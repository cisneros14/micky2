import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://easyclosers.com';
  
  // Rutas estáticas clave
  const routes = [
    '',
    '/about',
    '/contact',
    '/process',
  ];

  const locales = ['en', 'es'];

  // TODO: Conectar con CMS real si hay posts de blog
  // Por ahora, solo indexamos las páginas principales
  const dynamicPosts: {slug: string, updatedAt: Date}[] = [];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generar entradas para rutas estáticas
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}
