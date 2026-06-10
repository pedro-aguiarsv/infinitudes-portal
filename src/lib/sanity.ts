// =============================================================
// sanity.ts · Ponte entre Astro e Sanity
// -------------------------------------------------------------
// - `client`   → cliente oficial para executar queries GROQ
// - `urlFor()` → helper que gera URLs de imagem otimizadas
// - Queries reutilizáveis e helpers de fetch tipados
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
  useCdn: true,
};

export const client = createClient(config);

// Image URL builder: gera URLs otimizadas com crop/resize on-the-fly.
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

// ----- Posts (editorial) ------------------------------------
export type PostPreview = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage: SanityImage | null;
  category: string | null;
  excerpt: string | null;
  authors?: string | null;
  /** Link externo (usado em /recomenda). Quando preenchido, o botão "Acessar" abre em nova aba. */
  externalUrl?: string | null;
};

export type PostFull = PostPreview & {
  body: unknown[];
  layoutVariant?: "classic" | "cover" | null;
};

// ----- Episódios (Divã Infinito) ----------------------------
export type EpisodeType = "temporada" | "making-off";

export type EpisodePreview = {
  _id: string;
  /** Classifica o episódio entre as abas "Temporadas" e "Making-off". */
  type: EpisodeType;
  /** Reservado para uso futuro (agrupamento por temporada). */
  season?: number | null;
  number: number;
  title: string;
  slug: string;
  description: string;
  guests?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
  thumbnail: SanityImage | null;
  publishedAt: string;
};

export type EpisodeFull = EpisodePreview & {
  showNotes?: unknown[] | null;
};

// ----- Produtos (Loja) --------------------------------------
export type Product = {
  _id: string;
  title: string;
  slug: string;
  byline?: string | null;
  price: string;
  priceCents?: number | null;
  sku?: string | null;
  inStock?: boolean | null;
  shortDescription: string;
  longDescription?: string | null;
  dimensions?: string | null;
  shipsOn?: string | null;
  mainImage: SanityImage | null;
  gallery?: SanityImage[] | null;
  order?: number | null;
};

// ----- Depoimentos ------------------------------------------
export type Testimonial = {
  _id: string;
  quote: string;
  author: string;
  role?: string | null;
  showOnBookPage?: boolean | null;
  order?: number | null;
};

// ----- Categorias (overrides editáveis) ---------------------
export type CategoryOverride = {
  _id: string;
  value: string;
  title: string;
  description?: string | null;
  /** Parágrafo apresentando a seção (usado em páginas dedicadas, ex.: /curadoria). */
  longDescription?: string | null;
  /** Texto discreto exibido no rodapé da página da categoria (ex.: isenção de responsabilidade). */
  disclaimer?: string | null;
  heroImage?: SanityImage | null;
  order?: number | null;
  showInNav?: boolean | null;
};

// ----- Galeria ----------------------------------------------
export type GalleryPhoto = {
  _id: string;
  image: SanityImage;
  subjectName: string;
  role?: string | null;
  caption?: string | null;
  relatedPostSlug?: string | null;
  order?: number | null;
};

// ----- Página · Sobre ---------------------------------------
export type AboutPage = {
  /** Parágrafos apresentando o projeto (Portable Text). */
  projectDescription?: unknown[] | null;
};

// ----- Página · Livro ---------------------------------------
export type BookInfo = {
  title: string;
  subtitle?: string | null;
  author?: string | null;
  cover: SanityImage | null;
  /** URL pública do PDF da amostra, resolvido pela GROQ (`samplePdf.asset->url`). */
  samplePdfUrl?: string | null;
  /** Preço promocional em destaque (ex.: "R$ 42,00"). */
  price: string;
  /** Preço original (de tabela) exibido riscado antes do promocional (ex.: "R$ 69,00"). */
  originalPrice?: string | null;
  launchEdition?: string | null;
  synopsis?: unknown[] | null;
  /** Pares label/value mostrados ao expandir "Detalhes técnicos" (páginas, formato, ISBN, etc.). */
  technicalDetails?: Array<{
    label?: string | null;
    value?: string | null;
  }> | null;
  ctaText?: string | null;
  ctaProductSlug?: string | null;
};

// ----- Configurações do site -------------------------------
export type SponsorLogo = {
  label: string;
  logo: SanityImage | null;
};

export type SiteSettings = {
  siteTitle?: string | null;
  siteDescription?: string | null;
  contactEmail?: string | null;
  social?: {
    instagram?: string | null;
    linkedin?: string | null;
    spotify?: string | null;
    youtube?: string | null;
  } | null;
  sponsors?: SponsorLogo[] | null;
  realization?: SponsorLogo[] | null;
  copyright?: string | null;
};

// =============================================================
// Queries GROQ
// =============================================================

// ----- Posts editoriais -------------------------------------
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt,
    authors,
    externalUrl
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt,
    body,
    layoutVariant,
    authors,
    externalUrl
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && defined(slug.current) && category == $category] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    category,
    excerpt,
    authors,
    externalUrl
  }
`;

export const allSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// ----- Episódios --------------------------------------------
// `coalesce(type, "temporada")` garante que episódios antigos sem o
// campo continuam aparecendo na aba Temporadas por padrão.
export const episodesQuery = groq`
  *[_type == "episode" && defined(slug.current)] | order(number desc) {
    _id,
    "type": coalesce(type, "temporada"),
    season,
    number,
    title,
    "slug": slug.current,
    description,
    guests,
    videoUrl,
    duration,
    thumbnail,
    publishedAt
  }
`;

export const episodeBySlugQuery = groq`
  *[_type == "episode" && slug.current == $slug][0] {
    _id,
    "type": coalesce(type, "temporada"),
    season,
    number,
    title,
    "slug": slug.current,
    description,
    guests,
    videoUrl,
    duration,
    thumbnail,
    publishedAt,
    showNotes
  }
`;

// ----- Produtos ---------------------------------------------
export const productsQuery = groq`
  *[_type == "product" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    byline,
    price,
    priceCents,
    sku,
    inStock,
    shortDescription,
    longDescription,
    dimensions,
    shipsOn,
    mainImage,
    gallery,
    order
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    byline,
    price,
    priceCents,
    sku,
    inStock,
    shortDescription,
    longDescription,
    dimensions,
    shipsOn,
    mainImage,
    gallery,
    order
  }
`;

// ----- Depoimentos ------------------------------------------
export const testimonialsForBookQuery = groq`
  *[_type == "testimonial" && showOnBookPage == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    showOnBookPage,
    order
  }
`;

// ----- Categorias (overrides) -------------------------------
export const categoryOverridesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    value,
    title,
    description,
    longDescription,
    disclaimer,
    heroImage,
    order,
    showInNav
  }
`;

// ----- Galeria ----------------------------------------------
export const galleryPhotosQuery = groq`
  *[_type == "galleryPhoto"] | order(order asc) {
    _id,
    image,
    subjectName,
    role,
    caption,
    relatedPostSlug,
    order
  }
`;

// ----- Singletons -------------------------------------------
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    projectDescription
  }
`;

export const bookInfoQuery = groq`
  *[_type == "bookInfo"][0] {
    title,
    subtitle,
    author,
    cover,
    "samplePdfUrl": samplePdf.asset->url,
    price,
    originalPrice,
    launchEdition,
    synopsis,
    technicalDetails,
    ctaText,
    ctaProductSlug
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    contactEmail,
    social,
    sponsors[]{ label, logo },
    realization[]{ label, logo },
    copyright
  }
`;

// =============================================================
// Helpers de fetch tipados
// =============================================================

// Posts editoriais
export async function getAllPosts(): Promise<PostPreview[]> {
  return safeFetch<PostPreview[]>(postsQuery, undefined, []);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return safeFetch<PostFull | null>(postBySlugQuery, { slug }, null);
}

export async function getAllSlugs(): Promise<string[]> {
  return safeFetch<string[]>(allSlugsQuery, undefined, []);
}

export async function getPostsByCategory(
  category: string,
): Promise<PostPreview[]> {
  return safeFetch<PostPreview[]>(postsByCategoryQuery, { category }, []);
}

// Episódios
export async function getAllEpisodes(): Promise<EpisodePreview[]> {
  return safeFetch<EpisodePreview[]>(episodesQuery, undefined, []);
}

export async function getEpisodeBySlug(slug: string): Promise<EpisodeFull | null> {
  return safeFetch<EpisodeFull | null>(episodeBySlugQuery, { slug }, null);
}

// Produtos
export async function getAllProducts(): Promise<Product[]> {
  return safeFetch<Product[]>(productsQuery, undefined, []);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safeFetch<Product | null>(productBySlugQuery, { slug }, null);
}

// Depoimentos
export async function getTestimonialsForBook(): Promise<Testimonial[]> {
  return safeFetch<Testimonial[]>(testimonialsForBookQuery, undefined, []);
}

// Galeria
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return safeFetch<GalleryPhoto[]>(galleryPhotosQuery, undefined, []);
}

// Categorias (overrides editáveis)
export async function getCategoryOverrides(): Promise<CategoryOverride[]> {
  return safeFetch<CategoryOverride[]>(categoryOverridesQuery, undefined, []);
}

// Singletons
export async function getAboutPage(): Promise<AboutPage | null> {
  return safeFetch<AboutPage | null>(aboutPageQuery, undefined, null);
}

export async function getBookInfo(): Promise<BookInfo | null> {
  return safeFetch<BookInfo | null>(bookInfoQuery, undefined, null);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(siteSettingsQuery, undefined, null);
}

// =============================================================
// safeFetch · executa queries com fallback silencioso
// -------------------------------------------------------------
// O Sanity ainda não tem todos os schemas populados em produção.
// Em build, em vez de quebrar a página com `Cannot read property
// of null`, retornamos um valor default (array vazio ou null) e
// cada componente cuida do "estado vazio apresentável".
// =============================================================
async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> | undefined,
  fallback: T,
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params ?? {});
    return (result ?? fallback) as T;
  } catch (err) {
    // Em dev, deixa o erro visível; em build, segue sem quebrar.
    if (import.meta.env.DEV) {
      console.warn("[sanity] query falhou:", err);
    }
    return fallback;
  }
}
