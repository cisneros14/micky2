/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Simula una función para obtener datos de un post
async function getPost(slug: string) {
  // Aquí harías tu fetch a la base de datos o CMS
  return {
    title: `Blog Post: ${slug}`,
    description: `This is a detailed article about ${slug}.`,
    image: `/blog/${slug}.jpg`, // URL relativa, se resolverá con metadataBase en layout.tsx
    publishedAt: new Date().toISOString(),
    author: "Admin",
    locale: "en_US",
  };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const post = await getPost(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    // Alternates ayuda a Google a entender versiones del sitio (idiomas, canonicals)
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        "es-ES": `/es/blog/${slug}`,
        "en-US": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      // Next.js resolverá esto usando metadataBase definido en layout.tsx
      images: [post.image, ...previousImages],
      locale: post.locale,
      siteName: "Easy Closers",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
