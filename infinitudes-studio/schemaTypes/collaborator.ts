import {defineField, defineType} from 'sanity'

// =============================================================
// collaborator · Colaboradoras do Hub Infinito
// -------------------------------------------------------------
// Alimenta a faixa "Quem faz o Hub Infinito?" (na página /hub-infinito)
// e a página dedicada /hub-infinito/colaboradoras.
//
// Foto: aceita upload pelo Studio (`photo`) OU um caminho estático
// em /public (`photoUrl`) — mesmo padrão de `coverUrl` usado nos posts.
// Quando ambos existem, o upload do Studio (`photo`) tem prioridade.
// =============================================================
export const collaboratorType = defineType({
  name: 'collaborator',
  title: 'Colaboradoras · Hub Infinito',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto (upload)',
      type: 'image',
      options: {hotspot: true},
      description: 'Retrato. Recomendado vertical/quadrado; será recortado em círculo.',
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
    }),
    defineField({
      name: 'photoUrl',
      title: 'Foto (caminho estático)',
      type: 'string',
      description:
        'Alternativa ao upload: caminho em /public (ex.: "/hub-infinito/colaboradoras/nome.webp"). Usado quando não há upload no campo acima.',
    }),
    defineField({
      name: 'photoAlt',
      title: 'Texto alternativo da foto estática',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Função / área',
      type: 'string',
      description: 'Ex.: "Psicóloga · Cuidados paliativos".',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Cerca de 30–50 palavras.',
      validation: (Rule) => Rule.max(600),
    }),
    defineField({
      name: 'authorName',
      title: 'Nome de assinatura (para linkar artigos)',
      type: 'string',
      description:
        'Como o nome dela aparece na autoria dos posts. Deixe vazio se ela não assina artigos.',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque (coordenação)',
      type: 'boolean',
      description:
        'Se marcado, aparece em destaque no topo do roster, ocupando a largura toda. Use para a coordenação do Hub.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem manual (opcional)',
      type: 'number',
      description: 'Deixe vazio para manter a ordem alfabética pelo nome.',
    }),
    defineField({
      name: 'active',
      title: 'Ativa',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
  orderings: [
    {
      title: 'Nome (A–Z)',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
