'use client';

import Image from 'next/image';
import styles from './ShopHero.module.css';

export default function ShopHero() {
  return (
    <section className={styles.shopHeroSection}>
      <div className={styles.heroBgWrapper}>
        <Image
          src="/images/shop-hero.png"
          alt="Single Origin Collection - Mallinas Artisan Chocolates"
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>SINGLE ORIGIN COLLECTION</h1>
        <p className={styles.heroSubtitle}>
          Pure cacao, hand-harvested in the Godavari region.
        </p>
      </div>
    </section>
  );
}

