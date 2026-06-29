// =============================================================
// embeds.ts · Detecta a plataforma de uma URL de vídeo/podcast e
// devolve a URL embedável correspondente.
// -------------------------------------------------------------
// Suporta:
//   · YouTube (watch / youtu.be / shorts)
//   · Spotify (episode / show / playlist)
//   · Vimeo (último recurso, opcional)
// =============================================================

export type EmbedType = "youtube" | "spotify" | "vimeo" | "unknown";

export interface EmbedInfo {
  type: EmbedType;
  embedUrl: string | null;
  // Se for um podcast Spotify, o player é mais baixo (152px).
  isAudioOnly: boolean;
}

export function getEmbedInfo(rawUrl: string | null | undefined): EmbedInfo {
  if (!rawUrl) return { type: "unknown", embedUrl: null, isAudioOnly: false };

  const url = rawUrl.trim();

  // ---- YouTube ----
  // Aceita: youtube.com/watch?v=ID · youtu.be/ID · youtube.com/shorts/ID
  const youTubeMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (youTubeMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youTubeMatch[1]}?rel=0`,
      isAudioOnly: false,
    };
  }

  // ---- Spotify ----
  // Aceita: open.spotify.com/episode/ID, /show/ID, /playlist/ID
  const spotifyMatch = url.match(
    /open\.spotify\.com\/(episode|show|playlist|track)\/([\w]+)/,
  );
  if (spotifyMatch) {
    const [, kind, id] = spotifyMatch;
    return {
      type: "spotify",
      embedUrl: `https://open.spotify.com/embed/${kind}/${id}`,
      isAudioOnly: true,
    };
  }

  // ---- Vimeo ----
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      isAudioOnly: false,
    };
  }

  return { type: "unknown", embedUrl: null, isAudioOnly: false };
}

// Extrai o ID de 11 caracteres de uma URL do YouTube (watch / youtu.be /
// shorts). Devolve null se não for YouTube.
export function getYouTubeId(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;
  const match = rawUrl
    .trim()
    .match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Monta a URL da thumbnail oficial do YouTube a partir de uma URL de vídeo.
// `hqdefault` (480x360) está sempre disponível; `maxresdefault` pode faltar.
export function getYouTubeThumbnail(
  rawUrl: string | null | undefined,
  quality: "hqdefault" | "maxresdefault" | "mqdefault" = "maxresdefault",
): string | null {
  const id = getYouTubeId(rawUrl);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : null;
}
