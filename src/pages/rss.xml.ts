import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import {
  getAllPosts,
  getAllEpisodes,
  urlFor,
  type PostPreview,
  type EpisodePreview,
} from "../lib/sanity";
import { getYouTubeThumbnail } from "../lib/embeds";

/**
 * Feed RSS do (IN)finitudes.
 *
 * Reúne artigos editoriais (Hub Infinito, Curadoria, Recomenda) e os
 * episódios do Divã Infinito num único feed ordenado por data. É a fonte
 * usada pela automação de e-mail (MailerLite RSS → campanha) para disparar
 * a newsletter sempre que um material novo é publicado.
 *
 * Endpoint gerado em build: https://infinitudes.com.br/rss.xml
 */

type FeedItem = {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  content?: string;
  categories?: string[];
};

function postImage(post: PostPreview): string | null {
  if (post.mainImage) {
    return urlFor(post.mainImage).width(1200).height(630).fit("crop").url();
  }
  return null;
}

function episodeImage(ep: EpisodePreview): string | null {
  if (ep.thumbnail) {
    return urlFor(ep.thumbnail).width(1200).height(630).fit("crop").url();
  }
  if (ep.videoUrl) {
    return getYouTubeThumbnail(ep.videoUrl);
  }
  return null;
}

function buildContent(image: string | null, excerpt: string): string {
  const parts: string[] = [];
  if (image) {
    parts.push(
      `<p><img src="${image}" alt="" style="max-width:100%;height:auto;border-radius:12px;" /></p>`
    );
  }
  if (excerpt) parts.push(`<p>${excerpt}</p>`);
  return parts.join("");
}

export async function GET(context: APIContext) {
  const [posts, episodes] = await Promise.all([
    getAllPosts(),
    getAllEpisodes(),
  ]);

  const postItems: FeedItem[] = posts
    .filter((p) => p.slug && p.category)
    .map((p) => {
      const excerpt = p.excerpt ?? "";
      const image = postImage(p);
      return {
        title: p.title ?? "Sem título",
        link: `/${p.category}/${p.slug}`,
        pubDate: p.publishedAt ? new Date(p.publishedAt) : new Date(),
        description: excerpt,
        content: buildContent(image, excerpt),
        categories: p.category ? [p.category] : undefined,
      };
    });

  const episodeItems: FeedItem[] = episodes
    // Só episódios "de verdade" na newsletter (evita making-off / trilha).
    .filter((e) => e.slug && e.type === "temporada")
    .map((e) => {
      const excerpt = e.description ?? "";
      const image = episodeImage(e);
      return {
        title: e.title ?? "Novo episódio",
        link: `/diva-infinito/${e.slug}`,
        pubDate: e.publishedAt ? new Date(e.publishedAt) : new Date(),
        description: excerpt,
        content: buildContent(image, excerpt),
        categories: ["diva-infinito"],
      };
    });

  const items = [...postItems, ...episodeItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: "(IN)finitudes",
    description:
      "Novos artigos, curadorias e episódios do Divã Infinito — literatura, empatia e vida.",
    site: context.site ?? "https://infinitudes.com.br",
    items,
    customData: `<language>pt-br</language>`,
    stylesheet: false,
  });
}
