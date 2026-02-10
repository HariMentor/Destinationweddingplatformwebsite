import type { Metadata } from "next";
import { DestinationDetailClient } from "./DestinationDetailClient";
import { getDestinationById } from "@/lib/server-api";
import { apiSeoToMetadata } from "@/lib/metadata/apiSeoToMetadata";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destinationId = (await params).id;
  const data = await getDestinationById(destinationId);
  return apiSeoToMetadata(data?.seo);
}

export default async function DestinationDetailPage({ params }: Props) {
  const destinationId = (await params).id;
  return <DestinationDetailClient destinationId={destinationId} />;
}
