'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import bannerImg from '../../../images/home/cta_1.png';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const footer = section?.nextElementSibling;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || !footer || reducedMotion.matches) return undefined;

    let frameId = null;

    const updateDepth = () => {
      frameId = null;
      const viewportHeight = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (viewportHeight - footerTop) / viewportHeight));

      section.style.setProperty('--footer-progress', progress.toFixed(3));
      section.style.setProperty('--cta-depth-scale', (1 - progress * 0.16).toFixed(3));
      section.style.setProperty('--cta-depth-shift', `${Math.round(progress * -180)}px`);
      section.style.setProperty('--cta-depth-opacity', (1 - progress * 0.62).toFixed(3));
      section.style.setProperty('--cta-image-shift', `${(progress * -6).toFixed(2)}vh`);
    };

    const requestUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateDepth);
    };

    updateDepth();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.ctaSection}
      data-visible={isVisible ? 'true' : 'false'}
      aria-labelledby="site-cta-title"
    >
      <div className={styles.bgWrapper}>
        <Image
          src={bannerImg}
          alt="Mallinas Cocoa Plantation - A Little More Chocolate. A Lot More Wonder."
          fill
          sizes="100vw"
          className={styles.bgImage}
          placeholder="blur"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.contentContainer}>
        <h2 className={styles.statementText} id="site-cta-title">
          <span className={styles.statementLine}>
            <span>A Little More Chocolate.</span>
          </span>
          <span className={styles.statementLine}>
            <span>A Lot More Wonder.</span>
          </span>
        </h2>
        <Link className={styles.ctaLink} href="/shop">
          <span>Explore the collection</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
