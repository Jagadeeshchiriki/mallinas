'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './FarmEscapeSection.module.css';
import stayImage from '../../../images/Rectangle_2.png';
import diningImage from '../../../images/Rectangle_3.png';
import hearthImage from '../../../images/home/Darkchocolate_70.jpeg';
import trailsImage from '../../../images/about/CANOPY.jpg';
import experienceImage from '../../../images/santuary.jpg';

const ESCAPES = [
  {
    id: 'stay',
    title: 'THE STAY',
    subtitle: 'A minimalist, sun-drenched sanctuary nestled in the heart of our cocoa estate.',
    tagline: 'Private Villa',
    image: stayImage,
  },
  {
    id: 'dining',
    title: 'FARM DINING',
    subtitle: 'Estate-baked sourdough, tropical fruit preserves, and fresh cocoa infusions.',
    tagline: 'Farm to Table',
    image: diningImage,
  },
  {
    id: 'grill',
    title: 'THE HEARTH',
    subtitle: 'Evenings by the wood fire with artisanal cocoa rubs and local spices.',
    tagline: 'Open Fire BBQ',
    image: hearthImage,
  },
  {
    id: 'trails',
    title: 'CANOPY TRAILS',
    subtitle: 'Guided botanical walks through flowering cocoa trees and bird sanctuaries.',
    tagline: 'Nature Trails',
    image: trailsImage,
  },
  {
    id: 'experience',
    title: 'THE EXPERIENCE',
    subtitle: 'Turn everyday moments into something special',
    tagline: 'Moments to Savour',
    image: experienceImage,
  },
];

export default function FarmEscapeSection() {
  const outerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = outer.offsetHeight - window.innerHeight;
      const prog = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      const idx = Math.min(
        Math.floor(prog * ESCAPES.length),
        ESCAPES.length - 1
      );
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={outerRef}
      className={styles.outerWrapper}
      style={{ height: `${ESCAPES.length * 100}vh` }}
    >
      <div className={styles.stickyContainer}>

        {/* ── LEFT: Heading + description only (never changes) ── */}
        <div className={styles.leftPanel}>
          <div className={styles.leftInner}>
            <h2 className={styles.heading}>
              A FARM<br />ESCAPE
            </h2>
            <p className={styles.desc}>
              Five curated experiences from our Godavari cocoa estate — where nature,
              slow craft, and genuine warmth come together in one living sanctuary.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Accordion — active=large, others=thin strips ── */}
        <div className={styles.rightPanel}>
          {ESCAPES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={item.id}
                className={`${styles.card} ${isActive ? styles.cardActive : styles.cardStrip}`}
              >
                {/* Full image — always rendered, just cropped in strip mode */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 860px) 85vw, 65vw"
                  className={styles.cardImage}
                  priority={idx === 0}
                />

                {/* Overlay — lighter on active, heavier on strips */}
                <div className={`${styles.cardOverlay} ${isActive ? styles.overlayActive : styles.overlayStrip}`} />

                {/* Active card: full content block at bottom */}
                {isActive && (
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.subtitle}</p>
                  </div>
                )}

                {/* Strip (inactive): rotated title */}
                {!isActive && (
                  <div className={styles.stripLabel}>
                    <span className={styles.stripTitle}>{item.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
