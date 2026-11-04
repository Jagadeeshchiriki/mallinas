'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './CollectionSection.module.css';

const COLLECTIONS = [
  {
    id: 'dark',
    title: 'DARK CHOCOLATES',
    image: '/images/home/Dark chocolate_Almonds.jpg',
    href: '/shop?category=dark',
  },
  {
    id: 'milk',
    title: 'MILK CHOCOLATES',
    image: '/images/home/Milk chocolate 2.jpg',
    href: '/shop?category=milk',
  },
  {
    id: 'pralines',
    title: 'PRALINES',
    image: '/images/home/Dark Praline.png',
    href: '/shop?category=pralines',
  },
  {
    id: 'hampers',
    title: 'HAMPERS & GIFT BOXES',
    image: '/images/home/Gemini_Generated_Image_sk1o21sk1o21sk1o.png',
    href: '/shop?category=hampers',
  },
  {
    id: 'no-sugar',
    title: 'NO ADDED SUGAR',
    image: '/images/home/Dark_chocolate_80.png',
    href: '/shop?category=sugar-free',
  },
  {
    id: 'new',
    title: 'NEW ARRIVALS',
    image: '/images/home/Darkchocolate_70.jpeg',
    href: '/shop?category=new',
  },
];

export default function CollectionSection() {
  return (
    <section className={styles.collectionSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>FARM TO BAR COLLECTION</h2>
          <p className={styles.sectionSubtitle}>
            Every bar is a journey of origin and craft.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className={styles.grid}>
          {COLLECTIONS.map((item) => (
            <Link key={item.id} href={item.href} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

