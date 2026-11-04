'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './VisualDiarySection.module.css';

const DIARY_ITEMS = [
  {
    id: 1,
    title: 'The Harvest',
    caption: 'Hands cracking open fresh, ripe cacao pods at dawn.',
    image: '/images/home/1770452592485.png',
  },
  {
    id: 2,
    title: 'The Roasting',
    caption: 'Freshly roasted cacao beans steaming in wooden cooling trays.',
    image: '/images/home/1770452670706.png',
  },
  {
    id: 3,
    title: 'The Sanctuary',
    caption: 'Sunlight filtering through morning mist into the estate villa.',
    image: '/images/home/1770452755922.png',
  },
  {
    id: 4,
    title: 'The Finished Bar',
    caption: 'Stone-ground, single-origin chocolate bars resting on linen.',
    image: '/images/home/123.jpg.jpeg',
    isViewAllCard: true,
  },
];

export default function VisualDiarySection() {
  return (
    <section className={styles.diarySection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>THE VISUAL DIARY</h2>
          <p className={styles.sectionSubtitle}>
            Moments from the soil, the craft, and the stay.
          </p>
        </div>

        {/* 2x2 Curated Photo Grid */}
        <div className={styles.grid}>
          {DIARY_ITEMS.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} />
              </div>

              {/* View All Overlay for Card 4 */}
              {item.isViewAllCard ? (
                <Link href="/about" className={styles.viewAllOverlay}>
                  <div className={styles.viewAllBtn}>
                    <span className={styles.viewAllLine}></span>
                    <span className={styles.viewAllText}>View All</span>
                    <span className={styles.viewAllLine}></span>
                  </div>
                </Link>
              ) : (
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardCaption}>{item.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

