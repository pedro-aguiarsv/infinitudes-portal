import {defineField, defineType} from 'sanity'
import {CATEGORIES} from './categories'

// =============================================================
// category · Customização editável das categorias do portal
// -------------------------------------------------------------
// IMPORTANTE: o `value` é imutável (é o slug usado nas URLs e na
// validação dos posts). Apenas título, descrição, ordem e a
// imagem de hero são editáveis.
//
// Comportamento: o portal Astro mescla os dados — defaults vêm
// do arquivo hardcoded `categories.ts`, e o Sanity pode
// SOBRESCREVER título/descrição/ordem/heroImage de cada uma sem
// precisar de deploy.
//
// Para CRIAR uma categoria nova, ainda é necessário deploy
// (precisa atualizar `categories.ts` e o post.ts) — esse trade-off
// é proposital para evitar quebrar URLs existentes.
// =============================================================
export const categoryType = defineType({
  name: 'category',
  title: 'Categorias · Customização',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Identificador (imutável)',
      type: 'string',
      description:
        'Slug da categoria. Determina a URL pública (/{value}). NÃO altere após criado — quebra links externos e o SEO.',
      options: {
        list: CATEGORIES.map((c) => ({title: c.title, value: c.value})),
      },
      validation: (Rule) => Rule.required(),
      readOnly: ({document}) => !!document?.value,
    }),
    defineField({
      name: 'title',
      title: 'Título exibido',
      type: 'string',
      description:
        'Como o nome aparece no site. Pode ser editado a qualquer momento.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Subtítulo / descrição curta',
      type: 'text',
      rows: 2,
      description: 'Frase italic abaixo do título nas páginas de listagem.',
    }),
    defineField({
      name: 'longDescription',
      title: 'Texto "O que é?" (descrição longa)',
      type: 'text',
      rows: 5,
      description:
        'Parágrafo apresentando a seção. Aparece em algumas páginas dedicadas (ex.: /curadoria) abaixo do cabeçalho. Se vazio, o site usa um texto padrão.',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer (rodapé da página da categoria)',
      type: 'text',
      rows: 4,
      description:
        'Texto pequeno e discreto que aparece no final da página da categoria, antes do bloco de newsletter. Útil para isenções de responsabilidade, créditos, ou avisos sobre autoria. Se vazio, nada é exibido.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de hero (opcional)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
      description: 'Aparece no topo da página da categoria (uso futuro).',
    }),
    defineField({
      name: 'order',
      title: 'Ordem no menu',
      type: 'number',
      description: 'Quanto menor, mais à esquerda no menu principal.',
      initialValue: 100,
    }),
    defineField({
      name: 'showInNav',
      title: 'Mostrar no menu principal',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'value', media: 'heroImage'},
  },
  orderings: [
    {
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
