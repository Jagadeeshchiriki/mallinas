'use client';

import Image from 'next/image';
import Link from 'next/link';
import plantationImage from '../../../images/home/Generated Image September 24, 2025 - 4_51PM.png';
import styles from './StoryHero.module.css';

export default function StoryHero() {
  return (
    <section className={styles.storyHeroSection}>
      {/* Background with Ambient Vignette */}
      <div className={styles.heroBgWrapper}>
        <Image
          src={plantationImage}
          alt="Misty morning over Mallinas Godavari Cocoa Plantation"
          fill
          priority
          sizes="100vw"
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Hero Narrative */}
      <div className={styles.heroContent}>
        <div className={styles.topBadge}>
          <span className={styles.badgeSpark}>🌱</span>
          <span className={styles.badgeText}>25 Years of Organic Soil • Godavari Delta</span>
        </div>

        <h1 className={styles.heroTitle}>
          THE SOIL TO <span className={styles.titleHighlight}>SWEETNESS</span> STORY
        </h1>

        <p className={styles.heroSubtitle}>
          Hands in the living soil, not a factory floor. We grow, ferment, and stone-conch
          single-origin chocolate right where the river meets the sun.
        </p>

        {/* Metric Badges (Direct homage to Palmo's floating metrics) */}
        <div className={styles.metricsRow}>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>25+ Yrs</span>
            <span className={styles.metricLabel}>Organic Soil Heritage</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>100%</span>
            <span className={styles.metricLabel}>Single Godavari Estate</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>72 Hrs</span>
            <span className={styles.metricLabel}>Granite Stone Conching</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>0%</span>
            <span className={styles.metricLabel}>Palm Oil & Chemicals</span>
          </div>
        </div>

        <div className={styles.scrollPrompt}>
          <span>Explore The 4 Chapters</span>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </div>
    </section>
  );
}

