import type { Metadata } from "next";

/* ---------- TYPES ---------- */

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

interface ApiSeo {
  title?: string;
  metaDescription?: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;

  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: OpenGraphType | string;
    locale?: string;
  };

  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
  };

  structuredData?: Record<string, any>;
}

/* ---------- HELPERS ---------- */

function normalizeOgType(type?: string): OpenGraphType {
  const allowed: OpenGraphType[] = [
    "website",
    "article",
    "book",
    "profile",
    "music.song",
    "music.album",
    "music.playlist",
    "music.radio_station",
    "video.movie",
    "video.episode",
    "video.tv_show",
    "video.other",
  ];

  return allowed.includes(type as OpenGraphType)
    ? (type as OpenGraphType)
    : "website";
}

/* ---------- MAPPER ---------- */

export function apiSeoToMetadata(seo?: ApiSeo): Metadata {
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.robots,

    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,

    openGraph: seo.openGraph
      ? {
          title: seo.openGraph.title || seo.title,
          description: seo.openGraph.description || seo.metaDescription,
          images: seo.openGraph.image
            ? [
                {
                  url: seo.openGraph.image,
                  alt: seo.openGraph.imageAlt,
                },
              ]
            : undefined,
          type: normalizeOgType(seo.openGraph.type),
          locale: seo.openGraph.locale,
        }
      : undefined,

    twitter: seo.twitter
      ? {
          card: seo.twitter.card ?? "summary_large_image",
          title: seo.twitter.title || seo.title,
          description: seo.twitter.description || seo.metaDescription,
          images: seo.twitter.image ? [seo.twitter.image] : undefined,
        }
      : undefined,
  };
}
