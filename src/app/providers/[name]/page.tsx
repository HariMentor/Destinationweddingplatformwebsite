import ProviderProfileClient from './ProviderProfileClient';

export default async function ProviderProfilePage({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;
  return <ProviderProfileClient providerId={name} />;
}
