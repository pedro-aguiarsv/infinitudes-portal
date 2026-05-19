// =============================================================
// structure.ts · Estrutura do menu lateral do Sanity Studio
// -------------------------------------------------------------
// Organiza o Studio para refletir a arquitetura do site:
//   · Pasta por categoria editorial (filtra posts por categoria)
//   · Episódios do Divã Infinito (tipo separado)
//   · Loja (produtos)
//   · Páginas singletons (Sobre, Livro, Configurações)
//   · Auxiliares (Depoimentos, Galeria)
// =============================================================
import type {StructureResolver} from 'sanity/structure'
import {CATEGORIES} from './schemaTypes/categories'

// Documentos singletons (apenas 1 instância por tipo)
const SINGLETONS = ['siteSettings', 'bookInfo', 'aboutPage'] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('InFinitudes · Conteúdo')
    .items([
      // === EDITORIAL ===========================================
      S.listItem()
        .title('Posts por categoria')
        .child(
          S.list()
            .title('Categorias')
            .items(
              CATEGORIES.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .child(
                    S.documentList()
                      .title(cat.title)
                      .filter('_type == "post" && category == $category')
                      .params({category: cat.value})
                      .defaultOrdering([
                        {field: 'publishedAt', direction: 'desc'},
                      ]),
                  ),
              ),
            ),
        ),

      S.listItem()
        .title('Todos os posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Todos os posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.listItem()
        .title('Divã Infinito · Episódios')
        .schemaType('episode')
        .child(
          S.documentTypeList('episode')
            .title('Episódios')
            .defaultOrdering([{field: 'number', direction: 'desc'}]),
        ),

      S.divider(),

      // === LOJA ================================================
      S.listItem()
        .title('Loja · Produtos')
        .schemaType('product')
        .child(
          S.documentTypeList('product')
            .title('Produtos')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.divider(),

      // === PÁGINAS (singletons) ================================
      S.listItem()
        .title('Página · Sobre')
        .child(
          S.editor()
            .id('aboutPage')
            .schemaType('aboutPage')
            .documentId('aboutPage'),
        ),

      S.listItem()
        .title('Página · Livro')
        .child(
          S.editor()
            .id('bookInfo')
            .schemaType('bookInfo')
            .documentId('bookInfo'),
        ),

      S.listItem()
        .title('Configurações do site')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),

      S.divider(),

      // === AUXILIARES ==========================================
      S.listItem()
        .title('Depoimentos')
        .schemaType('testimonial')
        .child(
          S.documentTypeList('testimonial')
            .title('Depoimentos')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Galeria · Fotos')
        .schemaType('galleryPhoto')
        .child(
          S.documentTypeList('galleryPhoto')
            .title('Fotos da Galeria')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Categorias · Customização')
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categorias')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      // Esconde os tipos singletons da listagem padrão para evitar
      // que apareçam duplicados no menu (entrada principal já existe acima).
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            ...SINGLETONS,
            'post',
            'episode',
            'product',
            'testimonial',
            'galleryPhoto',
            'category',
          ].includes(item.getId() ?? ''),
      ),
    ])
