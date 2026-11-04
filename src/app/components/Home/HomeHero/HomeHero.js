'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import cocoaImage from '../../../images/home/cocoa-transparent.png';
import darkPralineImage from '../../../images/home/Dark Praline.png';
import milkPralineImage from '../../../images/home/Milk Praline.png';
import styles from './HomeHero.module.css';

const featureLines = [
  'Crafted with the finest cocoa and carefully selected ingredients.',
  'A perfect balance of rich chocolate flavour and irresistible sweetness.',
  'Made with passion, bringing together tradition and modern craftsmanship.',
  'Every bite delivers a moment of pure indulgence.',
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function segment(progress, start, end) {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
}

export default function HomeHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = 0;

    const applyProgress = (progress) => {
      if (reduceMotion.matches) {
        section.style.setProperty('--intro', '0');
        section.style.setProperty('--move', '1');
        section.style.setProperty('--reveal-one', '1');
        section.style.setProperty('--reveal-two', '1');
        featureLines.forEach((_, index) => {
          section.style.setProperty(`--line-${index + 1}`, '1');
        });
        return;
      }

      section.style.setProperty('--intro', String(1 - segment(progress, 0.18, 0.38)));
      section.style.setProperty('--move', String(segment(progress, 0.28, 0.68)));
      section.style.setProperty('--reveal-one', String(segment(progress, 0.5, 0.72)));
      section.style.setProperty('--reveal-two', String(segment(progress, 0.58, 0.8)));

      featureLines.forEach((_, index) => {
        const start = 0.64 + index * 0.055;
        section.style.setProperty(
          `--line-${index + 1}`,
          String(segment(progress, start, start + 0.16)),
        );
      });
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      return clamp(-rect.top / distance);
    };

    const render = (time) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const smoothing = 1 - Math.exp(-elapsed / 120);

      currentProgress += (targetProgress - currentProgress) * smoothing;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      applyProgress(currentProgress);

      if (currentProgress !== targetProgress) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
        previousTime = 0;
      }
    };

    const requestRender = () => {
      targetProgress = readProgress();
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    currentProgress = readProgress();
    targetProgress = currentProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    reduceMotion.addEventListener('change', requestRender);

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      reduceMotion.removeEventListener('change', requestRender);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection} aria-labelledby="hero-title">
      <div className={styles.stickyStage}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.introCopy}>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.titleLeft}>Rooted in Nature</span>
            <span className={styles.titleRight}>Grown with care</span>
          </h1>
        </div>

        <div className={styles.cocoaVisual}>
          <Image
            src={cocoaImage}
            alt="A ripe golden cocoa pod"
            priority
            sizes="(max-width: 768px) 72vw, 34vw"
            className={styles.cocoaImage}
          />
        </div>

        <div className={`${styles.chocolateFrame} ${styles.chocolateFrameTop}`}>
          <Image
            src={darkPralineImage}
            alt="Dark chocolate heart pralines"
            fill
            sizes="(max-width: 768px) 42vw, 24vw"
            className={styles.chocolateImage}
          />
        </div>

        <div className={`${styles.chocolateFrame} ${styles.chocolateFrameBottom}`}>
          <Image
            src={milkPralineImage}
            alt="Milk chocolate heart pralines"
            fill
            sizes="(max-width: 768px) 48vw, 25vw"
            className={styles.chocolateImage}
          />
        </div>

        <div className={styles.featureCopy}>

          <ul className={styles.featureList}>
            {featureLines.map((line, index) => (
              <li
                key={line}
                className={styles.featureLine}
                style={{ '--line-progress': `var(--line-${index + 1})` }}
              >
                <span aria-hidden="true">✦</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
