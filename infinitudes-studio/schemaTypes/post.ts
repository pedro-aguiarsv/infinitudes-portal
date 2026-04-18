import {defineField, defineType} from 'sanity'
import {CATEGORIES} from './categories'

export const postType = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // =============================================================
    // Campo Category · vincula o post a uma das seções do portal.
    // As opções são puxadas do arquivo compartilhado CATEGORIES
    // para manter Studio e Astro em sincronia.
    // =============================================================
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: CATEGORIES.map((c) => ({title: c.title, value: c.value})),
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Escolha uma categoria'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Destaque',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descrição curta para acessibilidade e SEO.',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo (dek)',
      type: 'text',
      rows: 3,
      description: 'Subtítulo editorial que aparece abaixo do título (1–2 frases).',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt', type: 'string'}),
            defineField({name: 'caption', title: 'Legenda', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'mainImage'},
    prepare({title, subtitle, media}) {
      const cat = CATEGORIES.find((c) => c.value === subtitle)
      return {
        title,
        subtitle: cat ? cat.title : subtitle,
        media,
      }
    },
  },
})
