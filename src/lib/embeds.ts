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
