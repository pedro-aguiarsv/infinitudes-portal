// =============================================================
// categories.ts · Fonte única das seções editoriais do portal
// -------------------------------------------------------------
// Usado por:
//   · post.ts (opções do campo "category")
//   · structure.ts (pastas do menu lateral do Studio)
//
// IMPORTANTE: aqui ficam apenas as CATEGORIAS EDITORIAIS de
// posts (textos). A "Loja" não aparece nesta lista — ela é uma
// página estática (/loja) com seu próprio schema (`product`).
// =============================================================

export type CategoryValue =
  | 'hub-infinito'
  | 'diva-infinito'
  | 'curadoria'
  | 'sobre'
  | 'recomenda'

export interface Category {
  title: string
  value: CategoryValue
  description: string
}

export const CATEGORIES: Category[] = [
  {
    title: 'Hub Infinito',
    value: 'hub-infinito',
    description: 'Conteúdos mais técnicos sobre cuidados paliativos.',
  },
  {
    title: 'Divã Infinito — Videocast',
    value: 'diva-infinito',
    description: 'Conversas em torno dos episódios do podcast.',
  },
  {
    title: 'Curadoria',
    value: 'curadoria',
    description: 'Histórias enviadas por leitores, selecionadas pela redação.',
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
