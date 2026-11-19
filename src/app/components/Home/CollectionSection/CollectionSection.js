'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CollectionSection.module.css';
import darkChocolatesImage from '../../../images/home/Dark chocolate_Hazelnuts.jpg (2).jpeg';
import milkChocolatesImage from '../../../images/home/Milkchocolate.jpeg';
import pralinesImage from '../../../images/home/Dark Praline.png';
import hampersImage from '../../../images/home/Gemini_Generated_Image_sk1o21sk1o21sk1o.png';
import noSugarImage from '../../../images/home/Dark_chocolate_80.png';
import newArrivalsImage from '../../../images/home/Darkchocolate_70.jpeg';

const COLLECTIONS = [
  {
    id: 'dark',
    title: 'DARK CHOCOLATES',
    image: darkChocolatesImage,
    href: '/shop?category=dark',
  },
  {
    id: 'milk',
    title: 'MILK CHOCOLATES',
    image: milkChocolatesImage,
    href: '/shop?category=milk',
  },
  {
    id: 'pralines',
    title: 'PRALINES',
    image: pralinesImage,
    href: '/shop?category=pralines',
  },
  {
    id: 'hampers',
    title: 'GIFT BOXES',
    image: hampersImage,
    href: '/shop?category=hampers',
  },
  {
    id: 'no-sugar',
    title: 'NO ADDED SUGAR',
    image: noSugarImage,
    href: '/shop?category=sugar-free',
  },
  {
    id: 'new',
    title: 'NEW ARRIVALS',
    image: newArrivalsImage,
    href: '/shop?category=new',
  },
];

export default function CollectionSection() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let maxHorizontalScroll = 0;

    const updatePosition = () => {
      frameId = 0;
      if (reduceMotion.matches || maxHorizontalScroll <= 0) return;

      const scrollDistance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollDistance));
      slider.scrollLeft = progress * maxHorizontalScroll;
    };

    const requestPositionUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updatePosition);
    };

    const updateLayout = () => {
      maxHorizontalScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
      section.style.height = reduceMotion.matches
        ? 'auto'
        : `${window.innerHeight + maxHorizontalScroll}px`;
      requestPositionUpdate();
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(slider);
    window.addEventListener('scroll', requestPositionUpdate, { passive: true });
    window.addEventListener('resize', updateLayout);
    reduceMotion.addEventListener('change', updateLayout);
    updateLayout();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestPositionUpdate);
      window.removeEventListener('resize', updateLayout);
      reduceMotion.removeEventListener('change', updateLayout);
      if (frameId) window.cancelAnimationFrame(frameId);
      section.style.height = '';
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.collectionSection}>
      <div className={styles.stickyContent}>
        <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>FARM TO BAR COLLECTION</h2>
          <p className={styles.sectionSubtitle}>
            Every bar is a journey of origin and craft.
          </p>
        </div>

        <div className={`${styles.productSlider} product-slider`}>
          <div ref={sliderRef} className={`${styles.sliderInner} product-slider__inner`}>
            {COLLECTIONS.map((item, index) => (
              <Link key={item.id} href={item.href} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading={index === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 82vw, (max-width: 1200px) 38vw, 29vw"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

