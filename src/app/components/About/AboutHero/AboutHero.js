import Image from 'next/image';
import cocoaImage from '../../../images/home/cocoa_cropped.jpg';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section id="about-palmo" className={styles.hero} aria-labelledby="about-hero-title">
      <div className={`${styles.inner} inner`}>
        <div className={styles.copyPanel}>
          <div className={styles.copyContent}>
            <p className={styles.belief}>
              We believe the best chocolate does not need a long list of ingredients. That is
              why every bar starts with one simple idea: keep it real.
            </p>

            <h1 id="about-hero-title" className={styles.title}>
              Pure cacao<br />
              in every bite.
            </h1>
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            src={cocoaImage}
            alt="Aerial view of the lush Mallinas cacao farm canopy"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.emoji} aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="49" />
            <path d="M31 53c2-8 13-9 17-1" />
            <path d="M72 43c4-7 15-6 17 2" />
            <path d="M77 55c10-2 15 4 11 14L80 86c-2 4-8 3-8-2l1-22c0-4 1-6 4-7Z" />
            <path d="M30 70c8 20 31 29 49 16" />
          </svg>
        </div>
      </div>
    </section>
  );
}
