// =============================================================
// products.ts · Fallback editorial da Loja
// -------------------------------------------------------------
// O catálogo OFICIAL agora vive no Sanity (schema `product`).
// Este arquivo guarda APENAS um fallback mínimo (1 produto: o
// próprio livro) para que /loja, /loja/[slug] e CTAs do site
// continuem funcionando ENQUANTO a cliente não popula a loja.
//
// Quando houver pelo menos 1 produto no Sanity, esse fallback
// deixa de ser usado automaticamente.
// =============================================================
import type { Product as SanityProduct } from "./sanity";

// Tipo "achatado" usado pelos componentes ProductCard / página /loja.
// Inclui campos visuais que o Sanity não cobre (bg do card etc.).
export type FallbackProduct = {
  _id: string;
  slug: string;
  title: string;
  byline?: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  dimensions?: string;
  shipsOn?: string;
  bg: string;
  imageUrl?: string;
  imageAlt?: string;
};

// Fallback editorial mínimo · só o livro
export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    _id: "fallback-livro",
    slug: "livro-finitudes",
    title: "(In)finitudes",
    byline: "por Eleonora Cruz Santos",
    price: "R$ 65,00",
    shortDescription:
      "Vinte e quatro ensaios curtos sobre presença, escuta e a gramática silenciosa dos cuidados paliativos.",
    longDescription:
      "Vinte e quatro ensaios curtos sobre presença, escuta e a gramática silenciosa dos cuidados paliativos. Eleonora Cruz Santos costura entrevistas, leituras e memórias para investigar o que é dito (e o que é calado) ao redor da finitude.",
    dimensions: "14 × 21 cm · 192 páginas",
    shipsOn: "21 de maio de 2026",
    bg: "bg-paper",
    imageUrl: "/book/capa.png",
    imageAlt: "Capa do livro (In)finitudes por Eleonora Cruz Santos",
  },
];

// Mapeia um produto do Sanity para o shape esperado pelos componentes
export function mapSanityProduct(
  p: SanityProduct,
  imageUrl: string | null,
): FallbackProduct {
  return {
    _id: p._id,
    slug: p.slug,
    title: p.title,
    byline: p.byline ?? undefined,
    price: p.price,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription ?? p.shortDescription,
    dimensions: p.dimensions ?? undefined,
    shipsOn: p.shipsOn ?? undefined,
    bg: "bg-paper-soft",
    imageUrl: imageUrl ?? undefined,
    imageAlt: p.mainImage?.alt ?? p.title,
  };
}
