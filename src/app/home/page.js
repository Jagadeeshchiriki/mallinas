import Hero from './Hero';
import CollectionSection from '../components/Home/CollectionSection/CollectionSection';
import JourneySection from '../components/Home/JourneySection/JourneySection';
import FarmEscapeSection from '../components/Home/FarmEscapeSection/FarmEscapeSection';
import VisualDiarySection from '../components/Home/VisualDiarySection/VisualDiarySection';
import StatementBanner from '../components/Home/StatementBanner/StatementBanner';
import styles from './home.module.css';

export const metadata = {
  title: "Mallina's Chocolates | Rooted in Nature, Grown with Care",
  description:
    "Experience Mallina's finest farm-to-bar artisan chocolate, single-origin cacao collections, estate stays, and visual diary from the hills of East Godavari.",
};

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      {/* 1. Hero: THE SOUL OF THE SOIL. THE ART OF THE BAR. */}
      <Hero />

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
    </div>
  );
}
