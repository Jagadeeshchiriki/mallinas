'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CollectionSection.module.css';

// Statically imported images per project rule
import darkCollectionImg from '../../../../../public/images/home/collection/Mallinas Dark Chocolate Still Life.png';
import milkCollectionImg from '../../../../../public/images/home/collection/milkcollection.png';
import pralinesCollectionImg from '../../../../../public/images/home/collection/prallins1.png';
import giftingCollectionImg from '../../../../../public/images/home/collection/gifting1.png';
import allCollectionImg from '../../../../../public/images/home/collection/allcollection.png';
import premiumCollectionImg from '../../../../../public/images/home/collection/Mallinas Premium Chocolate Collection.png';

const COLLECTIONS = [
  {
    id: 'dark',
    title: 'DARK CHOCOLATES',
    image: darkCollectionImg,
    href: '/shop?category=dark',
  },
  {
    id: 'milk',
    title: 'MILK CHOCOLATES',
    image: milkCollectionImg,
    href: '/shop?category=milk',
  },
  {
    id: 'pralines',
    title: 'PRALINES',
    image: pralinesCollectionImg,
    href: '/shop?category=pralines',
  },
  {
    id: 'hampers',
    title: 'GIFT BOXES',
    image: giftingCollectionImg,
    href: '/shop?category=hampers',
  },
  {
    id: 'no-sugar',
    title: 'NEW ARRIVALS',
    image: allCollectionImg,
    href: '/shop?category=sugar-free',
  },
  {
    id: 'new',
    title: 'PREMIUM COLLECTION',
    image: premiumCollectionImg,
    href: '/shop?category=new',
  },
];

export default function CollectionSection() {
  const [visibleItems, setVisibleItems] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      const allVisible = {};
      COLLECTIONS.forEach((item) => {
        allVisible[item.id] = true;
      });
      setVisibleItems(allVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleItems((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.collectionSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Farm To Bar Collection</h2>
          <p className={styles.sectionSubtitle}>
            Every bar is a journey of origin and craft.
          </p>
        </div>

        {/* 2-Row Grid View with Scroll Reveal */}
        <div className={styles.gridContainer}>
          {COLLECTIONS.map((item, index) => {
            const isVisible = !!visibleItems[item.id];
            const colIndex = index % 3;
            const rowIndex = Math.floor(index / 3);
            const delayMs = colIndex * 120 + rowIndex * 160;

            return (
              <Link
                key={item.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-id={item.id}
                href={item.href}
                className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading={index < 3 ? 'eager' : 'lazy'}
                    sizes="(max-width: 580px) 90vw, (max-width: 900px) 45vw, 360px"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
