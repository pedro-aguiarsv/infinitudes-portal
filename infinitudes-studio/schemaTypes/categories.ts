// =============================================================
// categories.ts · Fonte única das seções do portal InFinitudes
// Usado por:
//   · post.ts (opções do campo "category")
//   · structure.ts (pastas do menu lateral do Studio)
// =============================================================

export type CategoryValue =
  | 'outras-historias'
  | 'hub-infinito'
  | 'diva-infinito'
  | 'curadoria'
  | 'lojinha'
  | 'sobre'
  | 'recomenda'

export interface Category {
  title: string
  value: CategoryValue
  description: string
}

export const CATEGORIES: Category[] = [
  {
    title: 'Outras Histórias',
    value: 'outras-historias',
    description: 'Relatos e ensaios autorais.',
  },
  {
    title: 'Hub Infinito',
    value: 'hub-infinito',
    description: 'Conteúdos mais técnicos sobre cuidados paliativos.',
  },
  {
    title: 'Divã Infinito',
    value: 'diva-infinito',
    description: 'Conversas em torno dos episódios do podcast.',
  },
  {
    title: 'Curadoria',
    value: 'curadoria',
    description: 'Histórias enviadas por leitores, selecionadas pela redação.',
  },
  {
    title: 'Lojinha',
    value: 'lojinha',
    description: 'Espaço comercial · trechos e relatos do Livro.',
  },
  {
    title: 'Sobre',
    value: 'sobre',
    description: 'História do projeto e autoridade editorial.',
  },
  {
    title: 'Recomenda',
    value: 'recomenda',
    description: 'Sugestões de eventos, palestras e podcasts.',
  },
]
