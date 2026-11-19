'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import darkChocolateImage from '../../../images/home/Darkchocolate_100.png';
import styles from './FirstSection.module.css';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const segment = (progress, start, end) => {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
};

export default function FirstSection() {
  const sectionRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / distance);
      const travel = reduceMotion.matches ? 1 : segment(progress, 0.18, 0.62);
      const details = reduceMotion.matches ? 1 : segment(progress, 0.48, 0.76);
      const finish = reduceMotion.matches ? 1 : segment(progress, 0.72, 0.96);
      const isMobile = window.innerWidth <= 800;

      section.style.setProperty('--title-opacity', String(1 - details));
      section.style.setProperty('--title-y', `${travel * -15}vh`);
      section.style.setProperty('--product-x', `${isMobile ? 0 : travel * -24}vw`);
      section.style.setProperty('--product-y', `${isMobile ? travel * -17 : 0}vh`);
      section.style.setProperty('--product-rotate', `${travel * (isMobile ? -2 : -3)}deg`);
      section.style.setProperty('--product-scale', String(1 + travel * (isMobile ? -0.12 : 0.08)));
      section.style.setProperty('--image-scale', String(1 + finish * 0.05));
      section.style.setProperty('--details-opacity', String(details));
      section.style.setProperty('--label-top-y', `${(1 - details) * 24}px`);
      section.style.setProperty('--label-bottom-y', `${(1 - details) * -24}px`);
      section.style.setProperty('--story-x', `${isMobile ? 0 : (1 - details) * 70}px`);
      section.style.setProperty('--story-y', `${isMobile ? (1 - details) * 50 : 0}px`);
      section.style.setProperty('--finish-opacity', String(finish));
      section.style.setProperty('--facts-y', `${(1 - finish) * 40}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener('change', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener('change', requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${imageLoaded ? styles.sectionLoaded : ''}`}
      aria-labelledby="first-section-title"
    >
      <div className={styles.stickyStage}>
        <div className={styles.loader} aria-hidden="true">
          <span>Mallinas</span>
          <span className={styles.loaderLine} />
          <span>100% cacao</span>
        </div>

        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.titleWrap}>
          <p className={styles.eyebrow}>Single farm • uncompromised cacao</p>
          <h2 id="first-section-title" className={styles.title}>
            <span>Pure</span>
            <span>Cacao</span>
          </h2>
        </div>

        <div className={styles.productVisual}>
          <div className={styles.productFrame}>
            <Image
              src={darkChocolateImage}
              alt="Mallinas 100% dark chocolate with cacao pods"
              fill
              sizes="(max-width: 700px) 76vw, 36vw"
              className={styles.productImage}
              preload
              placeholder="blur"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <span className={`${styles.orbitLabel} ${styles.orbitLabelTop}`}>Nothing added</span>
          <span className={`${styles.orbitLabel} ${styles.orbitLabelBottom}`}>Everything revealed</span>
        </div>

        <div className={styles.storyCopy}>
          <p className={styles.kicker}>The pure pursuit</p>
          <h3>Chocolate stripped back to its origin.</h3>
          <p className={styles.description}>
            One estate. One ingredient. A deep expression of cacao shaped by the soil it grew in
            and the hands that carefully brought it to the bar.
          </p>
          <Link href="/shop" className={styles.shopLink}>
            Discover the bar
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.facts} aria-label="Product highlights">
          <div>
            <span>01</span>
            <p>Single-estate cacao</p>
          </div>
          <div>
            <span>02</span>
            <p>Slow stone-ground</p>
          </div>
          <div>
            <span>03</span>
            <p>Vegan by nature</p>
          </div>
        </div>
      </div>
    </section>
  );
}
