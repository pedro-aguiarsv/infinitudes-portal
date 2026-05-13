// =============================================================
// products.ts · Catálogo de produtos da Loja (mock data)
// -------------------------------------------------------------
// Enquanto o Sanity não tiver schema para produtos, este arquivo
// alimenta /loja e /loja/[slug] com dados fake apresentáveis.
// Quando integrar com Sanity, basta substituir as funções pelos
// fetchers correspondentes.
// =============================================================

export type Product = {
  slug: string;
  title: string;
  byline?: string; // autor ou descrição curta
  price: string;
  shortDescription: string;
  longDescription: string;
  dimensions?: string;
  shipsOn?: string;
  variants?: string[]; // hex codes para swatches
  // Posição visual no card de listagem
  bg: string; // tailwind bg-*
  // Placeholder pra imagem: cor de fundo, ou path em /public/products/
  imageUrl?: string;
  imageAlt?: string;
};

// Lista canônica · mantém ordem visual da listagem
export const PRODUCTS: Product[] = [
  {
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
  },
  {
    slug: "ensaio-do-campo",
    title: "Diário do Campo",
    byline: "edição limitada",
    price: "R$ 48,00",
    shortDescription:
      "Cinco textos inéditos compilados pela equipe (In)finitudes durante o segundo semestre de 2025.",
    longDescription:
      "Cinco textos inéditos compilados pela equipe (In)finitudes durante o segundo semestre de 2025. Capa em papel kraft com colagem manual e folhas em fontes Cormorant e Inter.",
    dimensions: "16 × 22 cm · 88 páginas",
    shipsOn: "21 de maio de 2026",
    bg: "bg-paper",
  },
  {
    slug: "caderno-finitudes",
    title: "Caderno (In)finitudes",
    byline: "edição 2026",
    price: "R$ 38,00",
    shortDescription:
      "Caderno de capa branca com (IN)FINITUDES gravado em hot stamping. 120 páginas pautadas.",
    longDescription:
      "Caderno de capa branca com (IN)FINITUDES gravado em hot stamping. 120 páginas pautadas em papel pólen 80g. Costura aparente, lombada flexível.",
    dimensions: "14 × 21 cm · 120 páginas",
    shipsOn: "29 de maio de 2026",
    bg: "bg-paper",
  },
  {
    slug: "caneca-finitudes",
    title: "Caneca (In)finitudes",
    byline: "porcelana branca",
    price: "R$ 55,00",
    shortDescription:
      "Caneca em porcelana branca com a inscrição (IN)FINITUDES em traço fino.",
    longDescription:
      "Caneca em porcelana branca com inscrição (IN)FINITUDES em traço fino. Capacidade 300 ml. Pode ir ao microondas e à lavadora de louças.",
    dimensions: "Ø 8 cm · alt. 9,5 cm · 300 ml",
    shipsOn: "29 de maio de 2026",
    bg: "bg-paper-soft",
  },
  {
    slug: "tote-bag-finitudes",
    title: "Tote Bag (In)finitudes",
    byline: "algodão cru",
    price: "R$ 42,00",
    shortDescription:
      "Tote em algodão cru com estampa exclusiva (In)finitudes.",
    longDescription:
      "Tote em algodão cru com estampa exclusiva: ciclista entre páginas. 380 g/m². Costura reforçada.",
    dimensions: "38 × 42 cm · alça 70 cm",
    shipsOn: "29 de maio de 2026",
    bg: "bg-paper-soft",
  },
  {
    slug: "caderno-bordo",
    title: "Caderno Edição Bordô",
    byline: "edição limitada",
    price: "R$ 45,00",
    shortDescription:
      "Caderno de capa em couro sintético bordô com (IN)FINITUDES gravado a fogo.",
    longDescription:
      "Caderno de capa em couro sintético bordô com (IN)FINITUDES gravado a fogo. 160 páginas pautadas, papel pólen 80g. Marcador de fita e bolso interno.",
    dimensions: "14 × 21 cm · 160 páginas",
    shipsOn: "29 de maio de 2026",
    bg: "bg-rouge/10",
  },
  {
    slug: "ensaio-do-campo-2",
    title: "Diário do Campo · vol. II",
    byline: "edição limitada",
    price: "R$ 48,00",
    shortDescription:
      "Sequência do Diário do Campo com cinco novos textos e duas entrevistas inéditas.",
    longDescription:
      "Sequência do Diário do Campo com cinco novos textos e duas entrevistas inéditas. Capa em papel kraft, miolo em pólen.",
    dimensions: "16 × 22 cm · 96 páginas",
    shipsOn: "29 de maio de 2026",
    bg: "bg-paper",
  },
  {
    slug: "caderno-bordo-pocket",
    title: "Caderno Bordô · pocket",
    byline: "edição 2026",
    price: "R$ 32,00",
    shortDescription:
      "Versão pocket do Caderno Bordô. Couro sintético, 80 páginas pautadas.",
    longDescription:
      "Versão pocket do Caderno Bordô. Couro sintético, 80 páginas pautadas em papel pólen. Marcador de fita.",
    dimensions: "9 × 14 cm · 80 páginas",
    shipsOn: "29 de maio de 2026",
    bg: "bg-rouge/10",
  },
  {
    slug: "caneca-finitudes-grande",
    title: "Caneca (In)finitudes · grande",
    byline: "porcelana branca",
    price: "R$ 65,00",
    shortDescription:
      "Versão de 500 ml da caneca (In)finitudes em porcelana branca.",
    longDescription:
      "Versão de 500 ml da caneca (In)finitudes em porcelana branca. Inscrição em traço fino preto. Vai ao microondas e à máquina de lavar louças.",
    dimensions: "Ø 9 cm · alt. 11 cm · 500 ml",
    shipsOn: "29 de maio de 2026",
    bg: "bg-paper-soft",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, max = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, max);
}
