import ShopHero from '../components/Shop/ShopHero/ShopHero';
import ProductGrid from '../components/Shop/ProductGrid/ProductGrid';
import CollectionSection from '../components/Home/CollectionSection/CollectionSection';
import StatementBanner from '../components/Home/StatementBanner/StatementBanner';
import NewsletterSection from '../components/Home/NewsletterSection/NewsletterSection';

export const metadata = {
  title: "Shop Single Origin Collection | Mallina's Chocolates",
  description:
    "Browse Mallina's single-origin bean-to-bar dark chocolates, milk chocolates, and sugar-free options hand-harvested in the Godavari delta.",
};

export default function ShopPage() {
  return (
    <div className="shop-page-wrapper">
      {/* 1. Shop Hero: SINGLE ORIGIN COLLECTION */}
      <ShopHero />

      {/* 2. Product Grid: OUR PRODUCTS with Quantity & Add to Cart */}
      <ProductGrid />

      {/* 3. Below Products: FARM TO BAR COLLECTION (as requested) */}
      <CollectionSection />

      {/* 4. Statement: CHOCOLATE, LIKE NOWHERE ELSE ON EARTH. */}
      <StatementBanner />

      {/* 5. Newsletter: STAY IN THE LOOP */}
      <NewsletterSection />
    </div>
  );
}
