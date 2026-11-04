'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FarmEscapeSection.module.css';

const ESCAPES = [
  {
    id: 'stay',
    title: 'THE STAY',
    subtitle: 'A minimalist, sun-drenched sanctuary nestled in the heart of our cocoa estate.',
    tagline: 'Private Villa',
    image: '/images/home/Gemini_Generated_Image_jjpy0wjjpy0wjjpy (1).png',
    link: '/workshop',
  },
  {
    id: 'dining',
    title: 'FARM DINING',
    subtitle: 'Estate-baked sourdough, tropical fruit preserves, and fresh cocoa infusions.',
    tagline: 'Farm to Table',
    image: '/images/home/Gemini_Generated_Image_1y0sjp1y0sjp1y0s (1).png',
    link: '/workshop',
  },
  {
    id: 'grill',
    title: 'THE HEARTH',
    subtitle: 'Evenings by the wood fire with artisanal cocoa rubs and local spices.',
    tagline: 'Open Fire BBQ',
    image: '/images/home/Gemini_Generated_Image_a1ktz4a1ktz4a1kt (1).png',
    link: '/workshop',
  },
  {
    id: 'trails',
    title: 'CANOPY TRAILS',
    subtitle: 'Guided botanical walks through flowering cocoa trees and bird sanctuaries.',
    tagline: 'Nature Trails',
    image: '/images/home/Gemini_Generated_Image_etqrivetqrivetqr (1).png',
    link: '/workshop',
  },
  {
    id: 'pool',
    title: 'SANCTUARY WATERS',
    subtitle: 'Natural stone plunge pools surrounded by wild ginger and cocoa foliage.',
    tagline: 'Serene Plunge Pool',
    image: '/images/home/Gemini_Generated_Image_r8nalzr8nalzr8na (1).png',
    link: '/workshop',
  },
];

export default function FarmEscapeSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className={styles.escapeSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Vertical Brand Label */}
          <div className={styles.sideLabelWrapper}>
            <h2 className={styles.sideTitle}>A FARM ESCAPE</h2>
          </div>

          {/* Right Horizontal Accordion Carousel */}
          <div className={styles.accordionWrapper}>
            {ESCAPES.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  className={`${styles.slice} ${isActive ? styles.sliceActive : ''}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.sliceImage}
                  />
                  <div className={styles.sliceOverlay} />

                  {/* Expanded Content View */}
                  {isActive && (
                    <div className={styles.expandedContent}>
                      <span className={styles.tagline}>{item.tagline}</span>
                      <h3 className={styles.sliceTitle}>{item.title}</h3>
                      <p className={styles.sliceDesc}>{item.subtitle}</p>
                      <Link href={item.link} className={styles.exploreLink}>
                        Explore Sanctuary →
                      </Link>
                    </div>
                  )}

                  {/* Collapsed Strip Title */}
                  {!isActive && (
                    <div className={styles.collapsedLabel}>
                      <span>{item.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

