'use client';

import Image from 'next/image';
import bannerImg from '../../../images/home/cta_1.png';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      {/* Background Image Container */}
      <div className={styles.bgWrapper}>
        <Image
          src={bannerImg}
          alt="Mallinas Cocoa Plantation - A Little More Chocolate. A Lot More Wonder."
          fill
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.accentLine} />
        <h2 className={styles.statementText}>
          <span className={styles.statementLine}>A Little More Chocolate.</span>
          <span className={styles.statementLine}>A Lot More Wonder.</span>
        </h2>
        <div className={styles.accentLine} />
      </div>
    </section>
  );
}
