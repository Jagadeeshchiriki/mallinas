'use client';

import styles from './StoryPhilosophy.module.css';

const PILLARS = [
  {
    num: 'I',
    title: 'SOIL-FIRST PHILOSOPHY',
    desc: 'We never treat cacao as a commodity crop. It is nurtured with goshala cow manure, natural leaf compost, and earthworm aeration — yielding beans dense with authentic terroir.',
  },
  {
    num: 'II',
    title: 'TREE-TO-BAR STEWARDSHIP',
    desc: 'From seedling graft to tempered bar, zero middlemen touch our process. Every single pod is harvested, fermented, and conched on our own Godavari delta estate.',
  },
  {
    num: 'III',
    title: 'HEALTH & TRANSPARENCY',
    desc: 'No palm oils, zero chemical alkalization, and zero artificial vanillin. We craft pure couverture chocolates and diabetic-friendly zero-sugar bars sweetened with natural monk fruit & allulose.',
  },
];

export default function StoryPhilosophy() {
  return (
    <section className={styles.philosophySection}>
      <div className={styles.container}>
        {/* Founder's Quote Banner */}
        <div className={styles.quoteCard}>
          <span className={styles.quoteMark}>“</span>
          <blockquote className={styles.quoteText}>
            When you respect the soil, the soil repays you with sweetness like nowhere else on earth.
            We don&apos;t chase industrial volume — we chase the honest soul of single-origin cocoa.
          </blockquote>
          <div className={styles.authorGroup}>
            <cite className={styles.authorName}>Dr. Mallina Krishna Rao</cite>
            <span className={styles.authorTitle}>Founder & Organic Agriculturist • Mallinas Chocolates</span>
          </div>
        </div>

        {/* 3 Pillars of Soil-to-Sweetness */}
        <div className={styles.pillarsGrid}>
          {PILLARS.map((p) => (
            <div key={p.num} className={styles.pillarCard}>
              <span className={styles.pillarNum}>{p.num}</span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

