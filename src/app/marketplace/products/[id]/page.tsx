import type { Metadata } from 'next';
import { ProductDetailClient } from './ProductDetailClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you'd fetch product data here
  const productId = params.id;
  
  return {
    title: `Wedding Product Details | Wedzway Marketplace`,
    description: `View detailed information about this wedding product. Check specifications, pricing, reviews, and availability.`,
    keywords: ['wedding product', 'wedding shopping', 'bridal shopping', 'wedding marketplace'],
    openGraph: {
      title: `Product Details | Wedzway Marketplace`,
      description: 'View detailed product information and pricing.',
      type: 'product',
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient productId={params.id} />;
}
