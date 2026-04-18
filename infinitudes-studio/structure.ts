// =============================================================
// structure.ts · Estrutura do menu lateral do Sanity Studio
// -------------------------------------------------------------
// Cria uma "pasta" para cada categoria do portal, listando
// apenas os posts vinculados àquela seção. Isso transforma o
// Studio em um reflexo exato da arquitetura do site.
// =============================================================
import type {StructureResolver} from 'sanity/structure'
import {CATEGORIES} from './schemaTypes/categories'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('InFinitudes · Conteúdo')
    .items([
      // Uma pasta por categoria, já filtrada por category
      ...CATEGORIES.map((cat) =>
        S.listItem()
          .title(cat.title)
          .child(
            S.documentList()
              .title(cat.title)
              .filter('_type == "post" && category == $category')
              .params({category: cat.value})
              .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
          ),
      ),

      S.divider(),

      // Fallback: lista geral de todos os posts (sem filtro)
      S.listItem()
        .title('Todos os posts')
        .child(
          S.documentTypeList('post')
            .title('Todos os posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
    ])
