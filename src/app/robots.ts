import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Ajusta según tus rutas privadas
    },
    sitemap: 'https://easyclosers.com/sitemap.xml',
  };
}
