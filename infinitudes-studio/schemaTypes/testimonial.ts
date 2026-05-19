import {defineField, defineType} from 'sanity'

// =============================================================
// testimonial · Depoimentos sobre o livro
// -------------------------------------------------------------
// Aparecem em /livro (3 colunas) e podem aparecer em outros locais
// futuramente. Mantemos como tipo separado (e não array dentro de
// bookInfo) para reutilização.
// =============================================================
export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Depoimentos',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Depoimento',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(360),
    }),
    defineField({
      name: 'author',
      title: 'Autor(a)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / contexto',
      type: 'string',
      description: 'Ex.: "Crítica · Folha de S.Paulo".',
    }),
    defineField({
      name: 'showOnBookPage',
      title: 'Exibir na página do livro',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {title: 'author', subtitle: 'role'},
  },
  orderings: [
    {
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
