'use client';

import styles from './StatementBanner.module.css';

export default function StatementBanner() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.container}>
        <div className={styles.dividerLine} />
        <h2 className={styles.statementText}>
          CHOCOLATE, LIKE NOWHERE ELSE ON EARTH.
        </h2>
        <div className={styles.dividerLine} />
      </div>
    </section>
  );
}

