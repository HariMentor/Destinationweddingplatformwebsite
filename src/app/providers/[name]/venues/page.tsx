import ProviderVenuesClient from './ProviderVenuesClient';

export default async function ProviderVenuesPage({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;
  return <ProviderVenuesClient providerId={name} />;
}
