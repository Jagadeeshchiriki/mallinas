'use client';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Full-bleed Continuous Background Video */}
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/cocoa_2.mp4" type="video/mp4" />
          <source src="/images/home/cocoa_2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Hero Content - Heading Only (Delta Cafés inspired minimalist editorial) */}
      <div className={styles.contentContainer}>
        <h1 className={styles.headline}>
          <span className={styles.headlineLine1}>Rooted in Nature</span>
          <span className={styles.headlineLine2}>Grown with care</span>
        </h1>
      </div>
    </section>
  );
}
