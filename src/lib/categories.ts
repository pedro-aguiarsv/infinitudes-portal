// =============================================================
// categories.ts · Fonte única das seções do portal (lado Astro)
// -------------------------------------------------------------
// Espelha exatamente infinitudes-studio/schemaTypes/categories.ts
// O `value` é o mesmo string usado no campo `category` do Sanity.
// O `href` define a rota pública correspondente.
// =============================================================

export type CategoryValue =
  | "outras-historias"
  | "hub-infinito"
  | "diva-infinito"
  | "curadoria"
  | "lojinha"
  | "sobre"
  | "recomenda";

export interface Category {
  title: string;
  value: CategoryValue;
  href: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    title: "Outras Histórias",
    value: "outras-historias",
    href: "/outras-historias",
    description: "Relatos e ensaios autorais.",
  },
  {
    title: "Hub Infinito",
    value: "hub-infinito",
    href: "/hub-infinito",
    description: "Conteúdos mais técnicos sobre cuidados paliativos.",
  },
  {
    title: "Divã Infinito",
    value: "diva-infinito",
    href: "/diva-infinito",
    description: "Conversas em torno dos episódios do podcast.",
  },
  {
    title: "Curadoria",
    value: "curadoria",
    href: "/curadoria",
    description: "Histórias enviadas por leitores, selecionadas pela redação.",
  },
  {
    title: "Lojinha",
    value: "lojinha",
    href: "/lojinha",
    description: "Espaço comercial · trechos e relatos do Livro.",
  },
  {
    title: "Sobre",
    value: "sobre",
    href: "/sobre",
    description: "História do projeto e autoridade editorial.",
  },
  {
    title: "Recomenda",
    value: "recomenda",
    href: "/recomenda",
    description: "Sugestões de eventos, palestras e podcasts.",
  },
];

// Helper: encontra uma categoria pelo value (usado em páginas de categoria)
export const getCategory = (value: string): Category | undefined =>
  CATEGORIES.find((c) => c.value === value);

// =============================================================
// NAV_ITEMS · ordem e composição do menu principal no Header/Footer.
// -------------------------------------------------------------
// Inclui categorias do CMS + páginas estáticas (como "Livro") que
// não são tipos de conteúdo no Sanity. Mantemos a ordem do design.
// =============================================================
export interface NavItem {
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Outras Histórias", href: "/outras-historias" },
  { title: "Livro (In)Finitudes", href: "/livro" },
  { title: "Hub Infinito", href: "/hub-infinito" },
  { title: "Divã Infinito", href: "/diva-infinito" },
  { title: "Curadoria", href: "/curadoria" },
  { title: "Loja", href: "/loja" },
  { title: "Sobre", href: "/sobre" },
  { title: "Recomenda", href: "/recomenda" },
];
