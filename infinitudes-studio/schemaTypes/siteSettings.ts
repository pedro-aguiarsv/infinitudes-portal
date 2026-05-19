import {defineField, defineType} from 'sanity'

// =============================================================
// siteSettings · Configurações globais do portal (singleton)
// -------------------------------------------------------------
// Documento único usado para alimentar Header, Footer e SEO.
// O Studio só permite UM documento deste tipo (config no
// structure.ts). Evita ter de fazer deploy para mudar dados
// transversais (e-mail, redes sociais, patrocinadores etc.).
// =============================================================
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Título do site',
      type: 'string',
      initialValue: '(In)finitudes — Divã Infinito',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descrição (meta description / OG)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-mail de contato',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'social',
      title: 'Redes sociais',
      type: 'object',
      fields: [
        defineField({name: 'instagram', title: 'Instagram (URL)', type: 'url'}),
        defineField({name: 'linkedin', title: 'LinkedIn (URL)', type: 'url'}),
        defineField({name: 'spotify', title: 'Spotify (URL)', type: 'url'}),
        defineField({name: 'youtube', title: 'YouTube (URL)', type: 'url'}),
      ],
    }),
    defineField({
      name: 'sponsors',
      title: 'Logos · Patrocínio',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Nome', type: 'string'}),
            defineField({
              name: 'logo',
              title: 'Logo (PNG/SVG fundo escuro)',
              type: 'image',
              fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'label', media: 'logo'}},
        },
      ],
    }),
    defineField({
      name: 'realization',
      title: 'Logos · Realização',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Nome', type: 'string'}),
            defineField({
              name: 'logo',
              title: 'Logo (PNG/SVG fundo escuro)',
              type: 'image',
              fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'label', media: 'logo'}},
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Texto de copyright',
      type: 'string',
      description:
        'Aparece no rodapé. Ex.: "© 2026 · Todos os direitos reservados".',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Configurações do site'}),
  },
})
