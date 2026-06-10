import {defineField, defineType} from 'sanity'

// =============================================================
// bookInfo · Informações do livro (In)finitudes (singleton)
// -------------------------------------------------------------
// Centraliza tudo o que aparece em /livro: sinopse, destaques,
// trecho destacado e CTA. Documento único.
// =============================================================
export const bookInfoType = defineType({
  name: 'bookInfo',
  title: 'Livro · Página /livro',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do livro',
      type: 'string',
      initialValue: '(In)finitudes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / dek',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'author',
      title: 'Autor(a)',
      type: 'string',
      initialValue: 'Eleonora C. Santos',
    }),
    defineField({
      name: 'cover',
      title: 'Capa do livro',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
    }),
    defineField({
      name: 'samplePdf',
      title: 'PDF da amostra do livro',
      type: 'file',
      description:
        'Arquivo PDF de algumas páginas iniciais do livro. Será exibido em um modal quando o leitor clicar em "Ler uma amostra" na página /livro. Aceita apenas .pdf.',
      options: {accept: 'application/pdf'},
    }),
    defineField({
      name: 'price',
      title: 'Preço promocional',
      description:
        'Valor exibido em destaque (ex.: "R$ 42,00"). Será mostrado como "Por R$ 42,00 + frete".',
      type: 'string',
      initialValue: 'R$ 42,00',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Preço original (riscado)',
      description:
        'Preço de tabela exibido ANTES do promocional, com risco horizontal. Ex.: "R$ 69,00". Aparece como "De R$ 69,00".',
      type: 'string',
      initialValue: 'R$ 69,00',
    }),
    defineField({
      name: 'launchEdition',
      title: 'Edição / status',
      type: 'string',
      description: 'Ex.: "Edição 2026 · Pré-venda".',
    }),
    defineField({
      name: 'synopsis',
      title: 'Sinopse',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Texto principal sobre o livro.',
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Detalhes técnicos (expandível)',
      description:
        'Aparecem ao clicar em "Detalhes técnicos ▾" abaixo do frete na página /livro. Use para páginas, formato, lançamento, ISBN, idioma, acabamento, tradução, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              description: 'Ex.: "ISBN (físico)", "ISBN (e-book)", "Editora", "Idioma".',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'Ex.: "978-65-00000-00-0", "(In)finitudes Edições", "Português".',
              validation: (Rule) => Rule.required().max(80),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do CTA principal',
      type: 'string',
      initialValue: 'Comprar agora',
    }),
    defineField({
      name: 'ctaProductSlug',
      title: 'Slug do produto na loja',
      type: 'string',
      description:
        'Slug do produto correspondente no catálogo (ex.: "livro-finitudes"). Define o link do botão de compra.',
      initialValue: 'livro-finitudes',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'launchEdition', media: 'cover'},
  },
})
