// =============================================================
// recommend-thumbs.ts · Resolve thumbnails de URLs externas
// -------------------------------------------------------------
// Para itens de /recomendamos que ainda não têm `mainImage`
// cadastrada no Sanity, derivamos a capa da própria URL externa:
//
//   · YouTube  → URL canônica `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`
//   · Spotify  → endpoint público oEmbed (`thumbnail_url` no JSON)
//
// A resolução acontece em BUILD TIME, então cada thumbnail é
// "congelada" no HTML estático — sem custo de runtime no cliente.
// Em caso de falha (CDN fora do ar, URL desconhecida, fetch
// bloqueado), retornamos `null` e o componente mostra o
// placeholder neutro padrão.
// =============================================================

const YT_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

export function getYouTubeThumb(url: string): string | null {
  const match = url.match(YT_REGEX);
  if (!match) return null;
  // `maxresdefault` pode não existir em todos os vídeos; o navegador
  // não tem como fazer fallback automático em <img>, então preferimos
  // `hqdefault` que está sempre disponível para todos os vídeos.
  return `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
}

type SpotifyOEmbed = {
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

async function fetchSpotifyThumb(url: string): Promise<string | null> {
  try {
    const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
    const res = await fetch(oembedUrl, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SpotifyOEmbed;
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

/**
 * Resolve a thumbnail apropriada para um link externo de uma
 * recomendação. Retorna `null` quando não há heurística aplicável
 * ou quando o fetch falha (em build).
 */
export async function resolveExternalThumb(
  url: string | null | undefined,
): Promise<string | null> {
  if (!url) return null;
  const yt = getYouTubeThumb(url);
  if (yt) return yt;
  if (/(?:^|\/)open\.spotify\.com\//.test(url)) {
    return await fetchSpotifyThumb(url);
  }
  return null;
}
