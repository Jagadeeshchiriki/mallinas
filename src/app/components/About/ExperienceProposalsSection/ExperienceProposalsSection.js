'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import groveImage from '../../../images/about/cacao-grove.jpg';
import estateImage from '../../../images/about/chocolate-crafting.png';
import craftImage from '../../../images/about/chocolate-estate.png';
import styles from './ExperienceProposalsSection.module.css';

const EXPERIENCES = [
  {
    number: '01.',
    title: 'Walk the Cacao Grove',
    experience:
      'Step beneath the estate canopy, meet cacao at the tree, and learn how soil, shade, and patient farming shape every harvest.',
    includes:
      'A guided farm walk, a close look at ripe cacao pods, seasonal farm stories, and a tasting of estate chocolate.',
    image: groveImage,
    alt: 'A ripe cacao pod growing in the Mallinas grove',
  },
  {
    number: '02.',
    title: 'Craft Your Own Chocolate',
    experience:
      'Follow cacao from roasted bean to finished bar as you temper, mould, and finish a chocolate creation of your own.',
    includes:
      'Hands-on guidance, ingredients and tools, a tasting flight, and your personally crafted chocolate to take home.',
    image: craftImage,
    alt: 'Handcrafted Mallinas chocolate bars arranged on a work table',
  },
  {
    number: '03.',
    title: 'The Estate Tasting Table',
    experience:
      'Slow down for a guided tasting that reveals the aromas, textures, and changing character of cacao across each recipe.',
    includes:
      'A curated selection of bars and pralines, palate pairings, tasting notes, and conversation with the Mallinas team.',
    image: estateImage,
    alt: 'The green Mallinas estate surrounded by a tropical canopy',
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ExperienceProposalsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return undefined;

    const cards = Array.from(cardsContainer.querySelectorAll('[data-experience-card]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stackedLayout = window.matchMedia('(min-width: 481px)');
    let frameId = 0;

    const resetCards = () => {
      cards.forEach((card) => {
        card.style.removeProperty('--card-y');
        card.style.removeProperty('--card-scale');
        card.style.removeProperty('--card-rotate');
        card.style.removeProperty('--card-rotate-x');
        card.style.removeProperty('--card-x');
        card.style.removeProperty('--card-shade');
        card.style.removeProperty('--card-opacity');
        card.style.removeProperty('--image-y');
        card.style.removeProperty('z-index');
      });
    };

    const update = () => {
      frameId = 0;

      if (reduceMotion.matches || !stackedLayout.matches) {
        resetCards();
        return;
      }

      const cardsRect = cardsContainer.getBoundingClientRect();
      const scrollDistance = Math.max((cards.length - 1) * window.innerHeight, 1);
      const progress = clamp(-cardsRect.top / scrollDistance);
      const timelinePosition = progress * (cards.length - 1);
      const stack = cardsContainer.querySelector(`.${styles.cardStack}`);
      const cardHeight = stack?.offsetHeight || window.innerHeight * 0.7;
      const entryDistance = (window.innerHeight + cardHeight) / 2 + cardHeight * 0.02;

      cards.forEach((card, index) => {
        const incomingProgress = index === 0 ? 1 : clamp(timelinePosition - (index - 1));
        const outgoingProgress = index < cards.length - 1 ? clamp(timelinePosition - index) : 0;
        const isNearStack = index === 0 || timelinePosition >= index - 1;

        card.style.setProperty('--card-y', `${(1 - incomingProgress) * entryDistance}px`);
        card.style.setProperty('--card-scale', String(1 - outgoingProgress * 0.15));
        card.style.setProperty('--card-rotate', `${outgoingProgress * -3.8}deg`);
        card.style.setProperty('--card-rotate-x', `${outgoingProgress * 8}deg`);
        card.style.setProperty('--card-x', `${outgoingProgress * -0.8}%`);
        card.style.setProperty('--card-shade', String(outgoingProgress * 0.26));
        card.style.setProperty('--card-opacity', isNearStack ? '1' : '0');
        card.style.setProperty('--image-y', `${-10 + incomingProgress * 10}%`);
        card.style.zIndex = String(index + (incomingProgress > 0 ? cards.length : 0));
      });
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener('change', requestUpdate);
    stackedLayout.addEventListener('change', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener('change', requestUpdate);
      stackedLayout.removeEventListener('change', requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
      resetCards();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="experience-proposals-title">
      <div className={styles.headingWrap}>
        <h2 id="experience-proposals-title" className={styles.title}>
          Discover<br />our<br />experiences
        </h2>
      </div>

      <div
        ref={cardsRef}
        className={styles.cards}
        style={{ '--experience-card-count': EXPERIENCES.length }}
      >
        <div className={styles.cardStage}>
          <div className={styles.cardStack}>
            {EXPERIENCES.map((experience) => (
              <article key={experience.number} className={styles.card} data-experience-card>
                <div className={styles.media}>
                  <Image
                    src={experience.image}
                    alt={experience.alt}
                    fill
                    sizes="(max-width: 1024px) 88vw, 34vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.number}>{experience.number}</p>

                  <div className={styles.titleRow}>
                    <h3>{experience.title}</h3>
                  </div>

                  <div className={styles.detailsRow}>
                    <div>
                      <p className={styles.label}>The experience</p>
                      <p className={styles.text}>{experience.experience}</p>
                    </div>
                    <div>
                      <p className={styles.label}>What&apos;s included</p>
                      <p className={styles.text}>{experience.includes}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
