// =============================================================
// collaborators.ts · Colaboradoras do Hub Infinito (helpers)
// -------------------------------------------------------------
// - `resolveCollaborators()` traz do Sanity; se ainda não houver
//   nenhuma cadastrada, cai no seed de exemplo (mesma estratégia
//   dos FALLBACK_SPONSORS do Footer) para a página nunca ficar vazia
//   durante a montagem/preview.
// - `collaboratorInitials()` gera as iniciais para o avatar quando
//   não há foto.
// - `extensoFeminino()` escreve o número por extenso no feminino
//   ("dezoito mulheres"), usado no texto da faixa-teaser.
// =============================================================
import { getCollaborators, type Collaborator } from "./sanity";

export type { Collaborator };

/** Rota pública da página dedicada com o roster completo. */
export const COLABORADORAS_HREF = "/hub-infinito/colaboradoras";

export function collaboratorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

const UNIDADES_FEM = [
  "zero", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito",
  "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis",
  "dezessete", "dezoito", "dezenove",
];
const DEZENAS = [
  "", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta",
  "oitenta", "noventa",
];

/** Número por extenso, feminino, para 0–99 (suficiente para o roster). */
export function extensoFeminino(n: number): string {
  if (n < 0 || n > 99) return String(n);
  if (n < 20) return UNIDADES_FEM[n];
  const dezena = Math.floor(n / 10);
  const unidade = n % 10;
  return unidade === 0
    ? DEZENAS[dezena]
    : `${DEZENAS[dezena]} e ${UNIDADES_FEM[unidade]}`;
}

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// -------------------------------------------------------------
// Roster (fallback estático) — colaboradoras do Hub Infinito, em
// ordem alfabética por primeiro nome. As fotos ficam em
// /public/hub-infinito/colaboradoras/<slug>.webp.
//
// Esta lista é a fonte usada enquanto o Sanity ainda não tem as
// colaboradoras cadastradas. Quando houver documentos `collaborator`
// publicados, eles têm prioridade (ver `resolveCollaborators`).
// -------------------------------------------------------------
const P = "/hub-infinito/colaboradoras";

export const FALLBACK_COLLABORATORS: Collaborator[] = [
  {
    _id: "eleonora-santos",
    name: "Eleonora C. Santos",
    slug: "eleonora-santos",
    role: "Idealizadora do Hub Infinito",
    bio: "Economista, consultora de organismos nacionais e internacionais, professora da educação executiva da FGV, colunista do jornal Estado de Minas e produtora cultural. Coordena o Hub Infinito.",
    photo: null,
    photoUrl: `${P}/eleonora-santos.webp`,
    photoAlt: "Eleonora C. Santos",
    authorName: null,
    featured: true,
    order: null,
  },
  {
    _id: "anamaria-pugedo",
    name: "Anamaria Pugedo",
    slug: "anamaria-pugedo",
    role: "Governança · Compliance",
    bio: "Atua há 40 anos em governança como governance officer, gestora, consultora, assessora, instrutora e coautora de publicações. Coordenadora do GT Governança, Compliance e Gerenciamento de Riscos do CRA/MG e sócia-fundadora da APugedo Consultoria e Treinamento.",
    photo: null,
    photoUrl: `${P}/anamaria-pugedo.webp`,
    photoAlt: "Anamaria Pugedo",
    authorName: null,
    order: null,
  },
  {
    _id: "carla-kirilos",
    name: "Carla Kirilos",
    slug: "carla-kirilos",
    role: "Pedagoga · Escritora",
    bio: "Pedagoga, mestre em educação, escritora e palestrante. Professora universitária e consultora. Escreve também para o blog Bendita Existência.",
    photo: null,
    photoUrl: `${P}/carla-kirilos.webp`,
    photoAlt: "Carla Kirilos",
    authorName: null,
    order: null,
  },
  {
    _id: "carolina-nasser",
    name: "Carolina Nasser",
    slug: "carolina-nasser",
    role: "Advogada · Pesquisadora",
    bio: "Advogada e pesquisadora. Doutora e mestre em Direito pela UFMG, com estágio doutoral no exterior. Atualmente trabalha com urbanismo, normas e patrimônio cultural.",
    photo: null,
    photoUrl: `${P}/carolina-nasser.webp`,
    photoAlt: "Carolina Nasser",
    authorName: null,
    order: null,
  },
  {
    _id: "clarissa-bicalho-haddad",
    name: "Clarissa Bicalho Haddad",
    slug: "clarissa-bicalho-haddad",
    role: "Psicóloga · Educação Positiva",
    bio: "Psicóloga, especialista em Educação Positiva e desenvolvimento humano. Atua na formação de profissionais e no aprofundamento técnico da abordagem no Brasil.",
    photo: null,
    photoUrl: `${P}/clarissa-bicalho-haddad.webp`,
    photoAlt: "Clarissa Bicalho Haddad",
    authorName: null,
    order: null,
  },
  {
    _id: "cristiana-savoi",
    name: "Cristiana Guimarães Paes Savoi",
    slug: "cristiana-savoi",
    role: "Médica · Medicina Paliativa",
    bio: "Médica especialista em Clínica Médica e Medicina Paliativa, professora e coordenadora de cursos de pós-graduação e residência em Cuidados Paliativos. Autora do livro Crônico — conversas de médica (2024).",
    photo: null,
    photoUrl: `${P}/cristiana-savoi.webp`,
    photoAlt: "Cristiana Guimarães Paes Savoi",
    authorName: null,
    order: null,
  },
  {
    _id: "daniele-xavier",
    name: "Daniele O. Xavier",
    slug: "daniele-xavier",
    role: "Doutora em Finanças · Contadora",
    bio: "Doutora em Finanças pela UFMG e contadora. Professora de Contabilidade e Gestão. Incentivadora do grupo “Financista$”, composto por mulheres que encabeçam decisões financeiras e encontram no grupo um espaço de discussão sem julgamentos e com estratégia.",
    photo: null,
    photoUrl: `${P}/daniele-xavier.webp`,
    photoAlt: "Daniele O. Xavier",
    authorName: null,
    order: null,
  },
  {
    _id: "dulce-ribeiro",
    name: "Dulce Ribeiro",
    slug: "dulce-ribeiro",
    role: "Vendedora de vinhos",
    bio: "Mãe do Félix, sogra da Chisa, vendedora de vinhos, aprendiz de aquarela e ex-nadadora.",
    photo: null,
    photoUrl: `${P}/dulce-ribeiro.webp`,
    photoAlt: "Dulce Ribeiro",
    authorName: null,
    order: null,
  },
  {
    _id: "fabiana-rase",
    name: "Fabiana Rase",
    slug: "fabiana-rase",
    role: "Advogada · Compliance",
    bio: "Advogada com formação em jornalismo. Implementadora de diagnóstico, capacitação e gestão em NR-01 (riscos psicossociais). Consultora de compliance e conselheira estrategista de conformidade (LGPD/GDPR e IA na gestão de serviços jurídicos), palestrante e mentora.",
    photo: null,
    photoUrl: `${P}/fabiana-rase.webp`,
    photoAlt: "Fabiana Rase",
    authorName: null,
    order: null,
  },
  {
    _id: "fernanda-rase",
    name: "Fernanda Rase",
    slug: "fernanda-rase",
    role: "Psicóloga",
    bio: "Psicóloga com formação em Terapia Reichiana e mestrado em Ciências da Educação. Especialista em Terapia de Aceitação e Compromisso (ACT), com formação em Comunicação Não Violenta, agente local da paz e saúde mental corporativa.",
    photo: null,
    photoUrl: `${P}/fernanda-rase.webp`,
    photoAlt: "Fernanda Rase",
    authorName: null,
    order: null,
  },
  {
    _id: "jessica-kloosterman",
    name: "Jessica Kloosterman",
    slug: "jessica-kloosterman",
    role: "Designer gráfica e de produto",
    bio: "Designer de produto e gráfica. Artista-pesquisadora, mestre em Linguagens Visuais pela UFRJ e doutoranda em Estudos Contemporâneos das Artes pela UFF. Atualmente, faz formação em Esquizoanálise na FLEA.",
    photo: null,
    photoUrl: `${P}/jessica-kloosterman.webp`,
    photoAlt: "Jessica Kloosterman",
    authorName: null,
    order: null,
  },
  {
    _id: "marina-neder-monteiro",
    name: "Marina Neder Monteiro",
    slug: "marina-neder-monteiro",
    role: "Escritora · Artista da colagem",
    bio: "Escritora, artista da colagem e pesquisadora de processos criativos. Formada em Letras (UFMG) e Pedagogia (USP), com pós em Escrita de Não Ficção pelo Instituto Vera Cruz, desenvolve projetos autorais que transitam entre literatura, imagem e memória.",
    photo: null,
    photoUrl: `${P}/marina-neder-monteiro.webp`,
    photoAlt: "Marina Neder Monteiro",
    authorName: null,
    order: null,
  },
  {
    _id: "nicia-raies",
    name: "Nícia Raies Moreira de Souza",
    slug: "nicia-raies",
    role: "Socióloga · Escritora",
    bio: "Cientista social e doutora em Sociologia (UFMG), é pesquisadora da Fundação João Pinheiro, atuando também como professora do curso de Administração Pública. Sua atuação se concentra nos estudos de estratificação social, com ênfase nas dinâmicas do mercado de trabalho, estatísticas públicas, diversidade e gênero.",
    photo: null,
    photoUrl: `${P}/nicia-raies.webp`,
    photoAlt: "Nícia Raies Moreira de Souza",
    authorName: null,
    order: null,
  },
  {
    _id: "tais-mendes",
    name: "Tais Mendes",
    slug: "tais-mendes",
    role: "Relações Públicas",
    bio: "Relações-públicas com mestrado em Negócios Internacionais. Atua em projetos de posicionamento de marcas e parcerias estratégicas.",
    photo: null,
    photoUrl: `${P}/tais-mendes.webp`,
    photoAlt: "Tais Mendes",
    authorName: null,
    order: null,
  },
  {
    _id: "vitoria-dias",
    name: "Vitória Dias",
    slug: "vitoria-dias",
    role: "Historiadora · Mestre em Filosofia",
    bio: "Historiadora e mestre em Filosofia Contemporânea. Pesquisadora e escritora de biografias, consultora em desenvolvimento humano e organizacional, mediadora de conflitos em organizações e mentora para negócios de impacto.",
    photo: null,
    photoUrl: `${P}/vitoria-dias.webp`,
    photoAlt: "Vitória Dias",
    authorName: null,
    order: null,
  },
];

/**
 * Traz as colaboradoras do Sanity; se ainda não houver nenhuma
 * cadastrada, devolve o roster estático (`FALLBACK_COLLABORATORS`).
 */
export async function resolveCollaborators(): Promise<Collaborator[]> {
  const items = await getCollaborators();
  return items.length > 0 ? items : FALLBACK_COLLABORATORS;
}
