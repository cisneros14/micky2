import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://easyclosers.com';
  
  // Rutas estáticas
  const routes = [
    '',
    '/about',
    '/contact',
  ];

  const locales = ['en', 'es'];

  // Simulación de fetch a una API o Base de Datos
  // En producción, esto sería: const posts = await prisma.post.findMany();
  const dynamicPosts = [
    { slug: 'sell-my-house-fast-miami', updatedAt: new Date() },
    { slug: 'cash-home-buyers-florida', updatedAt: new Date() },
    { slug: 'avoid-foreclosure-guide', updatedAt: new Date() },
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generar entradas para rutas estáticas
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Generar entradas para rutas dinámicas (Blog/Propiedades)
  dynamicPosts.forEach((post) => {
    locales.forEach((locale) => {
        sitemap.push({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'monthly',
            priority: 0.7,
        })
    })
  })

  return sitemap;
}
