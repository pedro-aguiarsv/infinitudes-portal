// =============================================================
// categories.ts · Fonte única das seções editoriais do portal
// -------------------------------------------------------------
// Espelha exatamente infinitudes-studio/schemaTypes/categories.ts
// O `value` é o mesmo string usado no campo `category` do Sanity.
// O `href` define a rota pública correspondente.
//
// IMPORTANTE: aqui ficam apenas as CATEGORIAS EDITORIAIS de
// posts (textos). A "Loja" não é uma categoria — é uma página
// estática (/loja) construída a partir do schema `product`.
//
// Os valores abaixo podem ser SOBRESCRITOS pelo schema `category`
// do Sanity em runtime de build (apenas título/descrição/ordem).
// Para criar uma categoria nova, é necessário adicionar aqui (e
// no Studio) — porque a validação do post.ts é build-time.
// =============================================================
import { getCategoryOverrides, type CategoryOverride } from "./sanity";

export type CategoryValue =
  | "hub-infinito"
  | "diva-infinito"
  | "curadoria"
  | "sobre"
  | "recomenda";

export interface Category {
  title: string;
  value: CategoryValue;
  href: string;
  description: string;
  /** Parágrafo apresentando a seção (usado em páginas dedicadas, ex.: /curadoria). */
  longDescription?: string;
  /** Texto discreto no rodapé da página da categoria (ex.: isenção de responsabilidade). */
  disclaimer?: string;
  order?: number;
  showInNav?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    title: "Hub Infinito",
    value: "hub-infinito",
    href: "/hub-infinito",
    description: "Conteúdos mais técnicos sobre cuidados paliativos.",
    // Texto editorial enviado pela Eleonora (jun/2026). Os parágrafos
    // são separados por uma linha em branco (\n\n) e o template da
    // página de categoria renderiza cada um em um <p>.
    longDescription:
      "O Hub Infinito é a extensão das infinitas possibilidades de escuta e de fala, promovidas para além do objetivo inicial do projeto, e que busca trazer outras vozes para debater assuntos diversos — do mais técnico ao mais poético.\n\nO Hub Infinito é um espaço de escrita exclusivo de mulheres, abertas ao diálogo e à escuta com toda a sociedade.",
    disclaimer:
      "Os artigos e opiniões publicados nesta página são de responsabilidade exclusiva de suas respectivas autoras e não representam, necessariamente, a visão, os valores ou o posicionamento oficial deste site. A publicação de conteúdos de terceiros visa estimular o debate plural e o livre acesso a diferentes perspectivas, não implicando endosso ou concordância por parte da equipe editorial.",
    order: 20,
  },
  {
    title: "Divã Infinito — Podcast",
    value: "diva-infinito",
    href: "/diva-infinito",
    description: "Conversas em torno dos episódios do podcast.",
    order: 10,
  },
  {
    title: "Curadoria",
    value: "curadoria",
    href: "/curadoria",
    description:
      "Histórias reais por leitores, selecionadas por nossa curadoria",
    order: 40,
  },
  {
    title: "Sobre",
    value: "sobre",
    href: "/sobre",
    description: "História do projeto e autoridade editorial.",
    order: 70,
  },
  {
    title: "Recomendamos",
    value: "recomenda",
    href: "/recomenda",
    description: "Sugestões de eventos, palestras e podcasts.",
    order: 60,
  },
];

// Helper: encontra uma categoria pelo value (usado em páginas de categoria)
export const getCategory = (value: string): Category | undefined =>
  CATEGORIES.find((c) => c.value === value);

// =============================================================
// getCategoriesMerged · combina defaults + overrides do Sanity
// -------------------------------------------------------------
// Use em páginas que renderizam metadados das categorias
// (Header, Footer, página de categoria etc.). Quando o Sanity
// está vazio, devolve apenas os defaults — sem quebra.
// =============================================================
export async function getCategoriesMerged(): Promise<Category[]> {
  const overrides: CategoryOverride[] = await getCategoryOverrides();
  if (overrides.length === 0) return CATEGORIES;

  const byValue = new Map(overrides.map((o) => [o.value, o]));

  return CATEGORIES.map((c) => {
    const o = byValue.get(c.value);
    if (!o) return c;
    return {
      ...c,
      title: o.title ?? c.title,
      description: o.description ?? c.description,
      longDescription: o.longDescription ?? c.longDescription,
      disclaimer: o.disclaimer ?? c.disclaimer,
      order: o.order ?? c.order,
      showInNav: o.showInNav ?? c.showInNav,
    };
  }).sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

// =============================================================
// NAV_ITEMS · ordem e composição do menu principal (versão estática)
// -------------------------------------------------------------
// Inclui categorias do CMS + a página estática do Livro. A página
// /loja existe mas está OCULTA do menu (decisão editorial). A
// página continua acessível por URL direta e pelo link do Livro.
// =============================================================
export interface NavItem {
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Livro (In)finitudes", href: "/livro" },
  { title: "Divã Infinito — Podcast", href: "/diva-infinito" },
  { title: "Hub Infinito", href: "/hub-infinito" },
  { title: "Curadoria", href: "/curadoria" },
  { title: "Recomendamos", href: "/recomenda" },
  { title: "Sobre", href: "/sobre" },
];

// =============================================================
// getNavItems · versão dinâmica combinando overrides do Sanity
// -------------------------------------------------------------
// Mescla categorias editoriais (com overrides do Sanity) com a
// página estática do Livro. A /loja está OCULTA do menu — para
// reativar, basta adicionar { title: "Loja", href: "/loja", order: 50 }
// à lista de candidatos abaixo.
// =============================================================
type NavCandidate = { title: string; href: string; order: number };

export async function getNavItems(): Promise<NavItem[]> {
  const merged = await getCategoriesMerged();

  const candidates: NavCandidate[] = [
    // Livro abre o menu
    { title: "Livro (In)finitudes", href: "/livro", order: 0 },
    // Categorias editoriais com showInNav != false
    ...merged
      .filter((c) => c.showInNav !== false)
      .map((c) => ({
        title: c.title,
        href: c.href,
        order: c.order ?? 100,
      })),
  ];

  return candidates
    .sort((a, b) => a.order - b.order)
    .map(({ title, href }) => ({ title, href }));
}
