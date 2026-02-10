import "server-only";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API BASE:", process.env.NEXT_PUBLIC_API_BASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

export async function getVenueBySlug(slug: string) {
  const res = await fetch(
    `${API_BASE_URL}/destination/venues?slug=${encodeURIComponent(slug)}&status=published`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch venue SEO:", slug);
    return null;
  }

  const data = await res.json();

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

export async function getDestinationById(destinationId: string) {
  const res = await fetch(
    `${API_BASE_URL}/destination?destinationId=${destinationId}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch destination:", destinationId);
    return null;
  }

  const data = await res.json();

  return {
    ...data?.destinations?.[0],
    seo: data?.destinations?.[0]?.seo,
  };
}
