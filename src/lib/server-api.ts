// src/lib/server-api.ts
import "server-only";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getVenueBySlug(slug: string) {
  const res = await fetch(
    `${API_BASE_URL}/destination/venues?slug=${encodeURIComponent(slug)}&status=published`,
    {
      next: { revalidate: 3600 }, // cache 1 hour
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch venue SEO:", slug);
    return null;
  }

  const data = await res.json();

  console.log(data, "data in getVenueBySlug");
  // normalize response
  if (data?.data?.venue) {
    return {
      seo: { ...data.data.seo },
      ...data.data.venue,
      version: data.data.version,
    };
  }

  return data?.data?.[0] || data?.data || data;
}
