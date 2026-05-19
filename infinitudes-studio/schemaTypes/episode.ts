import {defineField, defineType} from 'sanity'

// =============================================================
// episode · Episódios do videocast Divã Infinito
// -------------------------------------------------------------
// Tipo separado (em vez de reutilizar `post`) para conseguir
// armazenar a URL do vídeo e a thumb com semântica correta.
// O slug alimenta a rota /diva-infinito/[slug].
// =============================================================
export const episodeType = defineType({
  name: 'episode',
  title: 'Episódios · Divã Infinito',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Tipo de episódio',
      type: 'string',
      description:
        'Define em qual aba o episódio aparece na página /diva-infinito.',
      options: {
        list: [
          {title: 'Temporada (episódio oficial)', value: 'temporada'},
          {title: 'Making-off (bastidores)', value: 'making-off'},
        ],
        layout: 'radio',
      },
      initialValue: 'temporada',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Temporada (apenas para episódios oficiais)',
      type: 'number',
      description:
        'Número da temporada. Hoje todos os episódios aparecem em ordem cronológica — o campo está reservado para uso futuro, quando houver mais de uma temporada.',
      initialValue: 1,
      hidden: ({document}) => document?.type !== 'temporada',
    }),
    defineField({
      name: 'number',
      title: 'Número do episódio',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
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
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'guests',
      title: 'Convidados',
      type: 'string',
      description: 'Linha livre. Ex.: "com Dr. Ricardo Caponero".',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do vídeo',
      type: 'url',
      description:
        'YouTube, Vimeo ou Spotify. Será embedado no player da página.',
    }),
    defineField({
      name: 'duration',
      title: 'Duração',
      type: 'string',
      description: 'Ex.: "42 min".',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (16:9)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showNotes',
      title: 'Show notes (opcional)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Resumo, links e referências citadas no episódio.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'number', media: 'thumbnail'},
    prepare: ({title, subtitle, media}) => ({
      title,
      subtitle: subtitle ? `Episódio ${subtitle}` : '',
      media,
    }),
  },
  orderings: [
    {
      title: 'Episódio (mais recente primeiro)',
      name: 'numberDesc',
      by: [{field: 'number', direction: 'desc'}],
    },
  ],
})
