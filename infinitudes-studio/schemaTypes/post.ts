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
    // =============================================================
    // authors · texto livre da linha de bylines (ex.: "Por Eleonora
    // Cruz Santos" ou "Por A, B e C"). Mais flexível que referência
    // a um schema de autores neste estágio.
    // =============================================================
    defineField({
      name: 'authors',
      title: 'Bylines (autores)',
      type: 'string',
      description:
        'Linha de assinatura do post. Ex.: "Por Eleonora Cruz Santos".',
    }),
    // =============================================================
    // layoutVariant · escolhe o template da página de post detalhe.
    //   · classic → page-10: cabeçalho centralizado, coluna única
    //   · cover   → page-04: hero bordô full-width + 2 colunas + Leia Mais
    // =============================================================
    defineField({
      name: 'layoutVariant',
      title: 'Layout do post',
      type: 'string',
      options: {
        list: [
          {title: 'Clássico (centralizado, coluna única)', value: 'classic'},
          {title: 'Capa (banner bordô + 2 colunas + Leia Mais)', value: 'cover'},
        ],
        layout: 'radio',
      },
      initialValue: 'classic',
      description:
        'Use "Capa" para destaques editoriais especiais. Padrão: "Clássico".',
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
