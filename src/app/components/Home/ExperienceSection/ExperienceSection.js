'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import giftingImage from '../../../images/home/gifting.png';
import pralinesImage from '../../../images/home/prallins.png';
import styles from './ExperienceSection.module.css';

const collectionImage = '/images/home/collection/Mallinas Chocolate Collection .png';

const HEADING_WORDS = ['A', 'Little', 'Chocolate.', 'A', 'Thousand', 'Moments.'];

const EXPERIENCES = [
  {
    title: 'Discover Your Favourite',
    description:
      'Explore our Chocolate Collections, crafted to celebrate the true character of cacao.',
    image: collectionImage,
    alt: 'An elegant assortment of handcrafted Mallina’s chocolates',
  },
  {
    title: 'Give Something Meaningful',
    description:
      'Thoughtfully crafted chocolate gifts for special people and unforgettable moments.',
    image: giftingImage,
    alt: 'A festive box of chocolates prepared as a meaningful gift',
  },
  {
    title: 'Little Bites of Happiness',
    description:
      'Discover our delicate pralines, where craftsmanship meets indulgence.',
    image: pralinesImage,
    alt: 'A selection of handcrafted heart-shaped chocolate pralines',
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ExperienceSection() {
  const introRef = useRef(null);
  const runwayRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const finalRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [introRef.current, finalRef.current].filter(Boolean);

    if (reducedMotion.matches) {
      targets.forEach((target) => { target.dataset.visible = 'true'; });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.visible = 'true';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const runway = runwayRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!runway) return undefined;

    let frameId = null;

    const updateCards = () => {
      frameId = null;
      const track = trackRef.current;
      if (!track) return;

      if (reducedMotion.matches) {
        track.style.transform = 'none';
        cardsRef.current.forEach((card) => {
          if (!card) return;
          card.dataset.visible = 'true';
        });
        return;
      }

      const rect = runway.getBoundingClientRect();
      const runwayHeight = Math.max(runway.offsetHeight - window.innerHeight, 1);
      const rawProgress = clamp(-rect.top / runwayHeight);
      const progress = clamp((rawProgress - 0.08) / 0.84);
      const firstCard = cardsRef.current[0];
      const lastCard = cardsRef.current[cardsRef.current.length - 1];
      if (!firstCard || !lastCard) return;

      const trackStyles = window.getComputedStyle(track);
      const trackGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
      const tileStep = firstCard.offsetWidth + trackGap;
      const totalSteps = cardsRef.current.length - 1;
      const distanceX = tileStep * totalSteps;
      const distanceY = tileStep * totalSteps;
      track.style.transform = `translate3d(${(-distanceX * progress).toFixed(2)}px, ${(-distanceY * progress).toFixed(2)}px, 0)`;

      cardsRef.current.forEach((card) => {
        if (card) card.dataset.visible = 'true';
      });
    };

    const requestUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateCards);
    };

    updateCards();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="experience-title">
      <div ref={introRef} className={styles.intro}>
        <h2 className={styles.heading} id="experience-title">
          {HEADING_WORDS.map((word, index) => (
            <span className={styles.wordMask} key={`${word}-${index}`}>
              <span style={{ '--word-index': index }}>{word}</span>
            </span>
          ))}
        </h2>
        <p className={styles.subtext}>
          For the moments you celebrate, the people you cherish and the little pleasures
          you keep for yourself. Discover craft chocolate for every occasion.
        </p>
      </div>

      <div ref={runwayRef} className={styles.cardsRunway}>
        <div className={styles.cardGrid}>
          <div ref={trackRef} className={styles.cardTrack}>
            {EXPERIENCES.map((experience, index) => (
              <article
                key={experience.title}
                ref={(node) => { cardsRef.current[index] = node; }}
                className={styles.card}
                style={{ '--card-index': index }}
              >
            <Image
              src={experience.image}
              alt={experience.alt}
              fill
              sizes="(max-width: 820px) 92vw, 31vw"
              className={styles.cardImage}
              placeholder={typeof experience.image === 'string' ? 'empty' : 'blur'}
            />
            <div className={styles.cardShade} />

            <div className={styles.cardCopy}>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
            </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div ref={finalRef} className={styles.finalMessage}>
        <p>
          Every bar holds a little occasion—something to share, something to give,
          or something wonderful to keep for yourself.
        </p>
      </div>
    </section>
  );
}
