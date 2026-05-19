import {defineField, defineType} from 'sanity'

// =============================================================
// galleryPhoto · Fotos dos entrevistados (página /galeria)
// -------------------------------------------------------------
// Cada documento é uma foto autônoma — o portal monta o grid
// masonry no lado Astro.
// =============================================================
export const galleryPhotoType = defineType({
  name: 'galleryPhoto',
  title: 'Galeria · Fotos',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
    }),
    defineField({
      name: 'subjectName',
      title: 'Nome do entrevistado',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / contexto',
      type: 'string',
      description: 'Ex.: "Cuidadora · São Paulo".',
    }),
    defineField({
      name: 'caption',
      title: 'Legenda longa (opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'relatedPostSlug',
      title: 'Slug do post relacionado (opcional)',
      type: 'string',
      description:
        'Se houver um post ou episódio onde essa pessoa foi entrevistada, coloque o slug aqui.',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {title: 'subjectName', subtitle: 'role', media: 'image'},
  },
  orderings: [
    {
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
