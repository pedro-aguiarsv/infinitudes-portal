import {defineField, defineType} from 'sanity'

// =============================================================
// product · Produtos da Loja (livro físico, cadernos, canecas etc.)
// -------------------------------------------------------------
// Substitui o mock atual de `src/lib/products.ts` no portal Astro.
// O campo `slug` corresponde à URL pública (/loja/[slug]).
// =============================================================
export const productType = defineType({
  name: 'product',
  title: 'Produtos · Loja',
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
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'byline',
      title: 'Linha de assinatura',
      type: 'string',
      description: 'Ex.: "por Eleonora Cruz Santos" ou "edição limitada".',
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'string',
      description: 'Formato livre. Ex.: "R$ 65,00".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceCents',
      title: 'Preço em centavos (para o gateway)',
      type: 'number',
      description:
        'Valor numérico em centavos (ex.: 6500 = R$ 65,00). Usado pelo gateway de pagamento.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU / Código',
      type: 'string',
      description: 'Identificador interno do produto.',
    }),
    defineField({
      name: 'inStock',
      title: 'Em estoque',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição curta',
      type: 'text',
      rows: 3,
      description: 'Aparece no card da listagem (1–2 frases).',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição longa',
      type: 'text',
      rows: 6,
      description: 'Aparece na página individual do produto.',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensões / especificação',
      type: 'string',
      description: 'Ex.: "14 × 21 cm · 192 páginas".',
    }),
    defineField({
      name: 'shipsOn',
      title: 'Envio a partir de',
      type: 'string',
      description: 'Texto livre. Ex.: "21 de maio de 2026".',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem principal',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de imagens (opcional)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordem na listagem',
      type: 'number',
      description: 'Quanto menor, mais cedo aparece na vitrine.',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'price', media: 'mainImage'},
  },
  orderings: [
    {
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
