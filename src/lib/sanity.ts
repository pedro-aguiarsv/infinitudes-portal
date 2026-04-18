// =============================================================
// sanity.ts · Ponte entre Astro e Sanity
// -------------------------------------------------------------
// - `client`   → cliente oficial para executar queries GROQ
// - `urlFor()` → helper que gera URLs de imagem otimizadas
// - Queries reutilizáveis exportadas no final
// =============================================================
import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import groq from "groq";

const config: ClientConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  // useCdn=true em produção: respostas com cache global e muito mais rápidas.
  // Mantemos true mesmo em dev; o Studio já fornece preview em tempo real.
  useCdn: true,
};

export const client = createClient(config);

// Image URL builder: gera URLs otimizadas com crop/resize on-the-fly.
// Uso: urlFor(post.mainImage).width(1200).height(900).fit("crop").url()
const builder = createImageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// =============================================================
// Tipos compartilhados
// =============================================================
export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
};

export type PostPreview = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage: SanityImage | null;
  category: string | null;
  excerpt: string | null;
};

export type PostFull = PostPreview & {
  body: unknown[]; // Portable Text blocks — tipagem mínima para não acoplar o template
};

// =============================================================
// Queries GROQ
// =============================================================

// Lista de posts para a home · ordenados do mais novo ao mais antigo
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt
  }
`;

// Post individual · consulta pelo slug (rota dinâmica)
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt,
    body
  }
`;

// Posts filtrados por categoria · usado nas páginas /outras-historias etc.
export const postsByCategoryQuery = groq`
  *[_type == "post" && defined(slug.current) && category == $category] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt
  }
`;

// Todos os slugs · usado pelo getStaticPaths() das rotas dinâmicas
export const allSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// =============================================================
// Helpers de fetch tipados (sintaxe mais limpa nas páginas)
// =============================================================
export async function getAllPosts(): Promise<PostPreview[]> {
  return client.fetch<PostPreview[]>(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return client.fetch<PostFull | null>(postBySlugQuery, { slug });
}

export async function getAllSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allSlugsQuery);
}

export async function getPostsByCategory(
  category: string,
): Promise<PostPreview[]> {
  return client.fetch<PostPreview[]>(postsByCategoryQuery, { category });
}
