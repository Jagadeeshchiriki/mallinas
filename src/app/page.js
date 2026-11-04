// import HomeHero from './components/Home/HomeHero/HomeHero';
import HomeHero2 from './components/Home/HomeHero2/HomeHero2';
import CollectionSection from './components/Home/CollectionSection/CollectionSection';
import JourneySection from './components/Home/JourneySection/JourneySection';
import FarmEscapeSection from './components/Home/FarmEscapeSection/FarmEscapeSection';
import VisualDiarySection from './components/Home/VisualDiarySection/VisualDiarySection';
import StatementBanner from './components/Home/StatementBanner/StatementBanner';
import NewsletterSection from './components/Home/NewsletterSection/NewsletterSection';

export const metadata = {
  title: "Mallina's Chocolates | The Soul of the Soil. The Art of the Bar.",
  description:
    "Experience Mallina's finest farm-to-bar artisan chocolate, single-origin cacao collections, estate stays, and visual diary from the hills of East Godavari.",
};

export default function HomePage() {
  return (
    <div className="home-page-container">
      {/* 1. Hero: THE SOUL OF THE SOIL. THE ART OF THE BAR. */}
      {/* <HomeHero /> */}
      <HomeHero2 />

      {/* 2. Collection: FARM TO BAR COLLECTION (6 Categories) */}
      <CollectionSection />

      {/* 3. Story: THE MALLINAS JOURNEY */}
      <JourneySection />

      {/* 4. Sanctuary: A FARM ESCAPE ("THE STAY" Interactive Slices) */}
      <FarmEscapeSection />

      {/* 5. Gallery: THE VISUAL DIARY (Moments from the soil, craft, and stay) */}
      <VisualDiarySection />

      {/* 6. Statement: CHOCOLATE, LIKE NOWHERE ELSE ON EARTH. */}
      <StatementBanner />

      {/* 7. Newsletter: STAY IN THE LOOP */}
      <NewsletterSection />
    </div>
  );
}
