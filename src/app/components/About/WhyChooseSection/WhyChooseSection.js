'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import cacaoImage from '../../../images/home/holiet-cocoa-1529746_1920.jpg';
import chocolateImage from '../../../images/home/Dark Praline.png';
import styles from './WhyChooseSection.module.css';

const REASONS = [
  'Single-estate cacao grown with care in the Godavari region.',
  'No unnecessary fillers, palm oil, or artificial complexity.',
  'Stone-ground slowly for a smooth texture and honest flavor.',
  'Crafted in small batches with quality at the center of every bar.',
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const visualsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updateScrollParallax = () => {
      frameId = 0;
      if (reduceMotion.matches) return;

      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (Math.min(1, Math.max(0, progress)) - 0.5) * 80;
      section.style.setProperty('--scroll-back', `${offset * -0.55}px`);
      section.style.setProperty('--scroll-front', `${offset}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollParallax);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handlePointerMove = (event) => {
    const visuals = visualsRef.current;
    if (!visuals) return;

    const rect = visuals.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
    visuals.style.setProperty('--front-x', `${x}px`);
    visuals.style.setProperty('--front-y', `${y}px`);
    visuals.style.setProperty('--back-x', `${x * -0.35}px`);
    visuals.style.setProperty('--back-y', `${y * -0.35}px`);
  };

  const resetPointer = () => {
    const visuals = visualsRef.current;
    if (!visuals) return;
    visuals.style.setProperty('--front-x', '0px');
    visuals.style.setProperty('--front-y', '0px');
    visuals.style.setProperty('--back-x', '0px');
    visuals.style.setProperty('--back-y', '0px');
  };

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="why-choose-title"
    >
      <div
        className={`${styles.inner} w-full paddx mt-[10vw] max-md:mt-[16vw] pb-[8vw] max-md:pb-[16vw] flex flex-row max-md:flex-col gap-[4vw] max-md:gap-[8vw] items-center`}
      >
        <div
          ref={visualsRef}
          className={`${styles.visuals} relative w-1/2 max-md:w-full h-[38vw] max-md:mt-[4vw] max-md:h-[58vw] max-md:flex max-md:flex-row-reverse max-md:items-center max-md:justify-center`}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className={styles.primaryFrame}>
            <div className={styles.imageClip}>
            <Image
              src={cacaoImage}
              alt="A ripe cacao pod growing on the tree"
              fill
              sizes="(max-width: 800px) 58vw, 34vw"
              className={styles.image}
            />
            </div>
          </div>
          <div className={styles.secondaryFrame}>
            <div className={styles.imageClip}>
            <Image
              src={chocolateImage}
              alt="Finished Mallinas dark chocolate pralines"
              fill
              sizes="(max-width: 800px) 36vw, 20vw"
              className={styles.image}
            />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h2 id="why-choose-title">
            What makes
            <br />
            us different?
          </h2>

          <ul className={styles.reasonList}>
            {REASONS.map((reason) => (
              <li key={reason}>
                <span aria-hidden="true" />
                <p>{reason}</p>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
