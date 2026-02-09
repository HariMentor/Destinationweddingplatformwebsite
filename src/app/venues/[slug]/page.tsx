import type { Metadata } from "next";
import { VenueDetailClient } from "./VenueDetailClient";
import { apiSeoToMetadata } from "@/lib/metadata/apiSeoToMetadata";
import { getVenueBySlug } from "@/lib/server-api";
import StructuredData from "@/components/StructuredData";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getVenueBySlug(slug);

  return apiSeoToMetadata(data?.seo);
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getVenueBySlug(slug);
  {
    data?.seo?.structuredData && (
      <StructuredData data={data.seo.structuredData} />
    );
  }

  return <VenueDetailClient venueId={slug} />;
}
