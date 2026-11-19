'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import cacaoPodImage from '../../../images/about/cacao-grove.jpg';
import estateImage from '../../../images/about/chocolate-estate.png';
import craftImage from '../../../images/about/chocolate-crafting.png';
import giftingImage from '../../../images/about/chocolate-gifting.jpg';
import styles from './OurStorySection.module.css';

const CHAPTERS = [
  {
    number: '01',
    label: 'The Grove',
    title: ['It starts with', 'the tree.'],
    text: 'Before there is chocolate, there is living soil, filtered sunlight, and cacao patiently ripening on the trunk.',
    note: 'grown with care',
    image: cacaoPodImage,
    alt: 'A ripe cacao pod growing directly from a tree',
  },
  {
    number: '02',
    label: 'The Estate',
    title: ['Rooted in', 'one place.'],
    text: 'Our work stays close to its origin in Tanuku, surrounded by the green canopy that shapes every harvest and every idea.',
    note: 'one honest origin',
    image: estateImage,
    alt: 'The Mallinas estate surrounded by a dense tropical canopy',
  },
  {
    number: '03',
    label: 'The Craft',
    title: ['Made slowly,', 'by hand.'],
    text: 'We temper, finish, and decorate in small batches so every bar carries the texture and character of careful human hands.',
    note: 'nothing rushed',
    image: craftImage,
    alt: 'A selection of handcrafted Mallinas chocolate bars',
  },
  {
    number: '04',
    label: 'The Joy',
    title: ['Then it becomes', 'a memory.'],
    text: 'Wrapped for a celebration or opened in a quiet moment, our chocolate is made to turn simple occasions into something lasting.',
    note: 'made to be shared',
    image: giftingImage,
    alt: 'A Mallinas chocolate gift box arranged for a celebration',
  },
];

export default function OurStorySection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let maxScroll = 0;

    const updatePosition = () => {
      frameId = 0;
      if (reduceMotion.matches || maxScroll <= 0) return;

      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      track.scrollLeft = progress * maxScroll;
      const contentLeft = Math.max(48, (window.innerWidth - 1400) / 2);
      const headingTravel = Math.max(0, contentLeft - 88);
      const headingShift = -Math.min(track.scrollLeft, headingTravel);
      section.style.setProperty('--story-heading-shift', `${headingShift}px`);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updatePosition);
    };

    const updateLayout = () => {
      maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      section.style.height = reduceMotion.matches ? 'auto' : `${window.innerHeight + maxScroll}px`;
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(track);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', updateLayout);
    reduceMotion.addEventListener('change', updateLayout);
    updateLayout();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', updateLayout);
      reduceMotion.removeEventListener('change', updateLayout);
      if (frameId) window.cancelAnimationFrame(frameId);
      section.style.height = '';
      section.style.removeProperty('--story-heading-shift');
    };
  }, []);

  return (
    <section id="story" ref={sectionRef} className={styles.storySection} aria-labelledby="story-title">
      <div className={styles.stickyInner}>
        <div className={styles.header}>
          <h2 id="story-title">Our Story</h2>
        </div>

        <div ref={trackRef} className={styles.track}>
          {CHAPTERS.map((chapter) => (
            <article key={chapter.number} className={styles.chapter}>
              <div className={styles.imageWrap}>
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 800px) 88vw, 58vw"
                  className={styles.chapterImage}
                />
              </div>
              <div className={styles.copy}>
                <span className={styles.eyebrow}>{chapter.number} / {chapter.label}</span>
                <h3>
                  {chapter.title[0]}
                  <br />
                  {chapter.title[1]}
                </h3>
                <p>{chapter.text}</p>
                <span className={styles.note}>{chapter.note}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
