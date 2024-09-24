import EcommerceDetail from '@/components/home/EcommerceDetail';
import PromoBanner from '@/components/home/PromoBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <>
      <EcommerceDetail />
      <PromoBanner />
      <FeaturedProducts />
    </>
  );
}