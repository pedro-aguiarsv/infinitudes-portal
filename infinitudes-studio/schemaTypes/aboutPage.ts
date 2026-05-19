import {defineField, defineType} from 'sanity'

// =============================================================
// aboutPage · Página /sobre (singleton)
// -------------------------------------------------------------
// Centraliza o texto editorial de apresentação do projeto.
// Os participantes (Eleonora e demais) ficam hardcoded no
// portal (src/pages/sobre.astro) — em estágio mais avançado,
// podem virar um schema dedicado `teamMember`.
// =============================================================
export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Sobre · Página /sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'projectDescription',
      title: 'Texto sobre o projeto',
      type: 'array',
      of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []}],
      description:
        'Parágrafos apresentando o (In)finitudes — sua missão, sua origem, sua proposta editorial. Aparece no topo da página /sobre. Recomendado: 2–4 parágrafos.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Página Sobre'}),
  },
})
