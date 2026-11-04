'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './StoryChapters.module.css';

const CHAPTERS = [
  {
    num: '01',
    phase: 'THE HARVEST & SOIL',
    title: 'NURTURED BY EARTHWORMS, NOT CHEMICALS',
    tagline: 'Living soil along the Godavari river delta',
    text1:
      'Great chocolate never begins in a factory — it begins in the living soil. Rooted in over 25 years of organic farming devotion in Karravari Savaram, Tanuku, we cultivate our cacao trees without chemical fertilizers, synthetic pesticides, or weedicides.',
    text2:
      'Our soil is naturally nourished using aged organic manure from our own farm goshala (indigenous cow shelter). Earthworms act as our silent partners, aerating the ground and feeding the shallow feeder roots of each cacao tree with living micro-nutrients.',
    metrics: [
      { val: '25+ Yrs', label: 'Organic Soil Ethos' },
      { val: '0%', label: 'Chemical Weedicides' },
      { val: '100%', label: 'Goshala Cow Manure' },
    ],
    image: '/images/home/1770452592485.png',
    imageAlt: 'Hand cracking open freshly harvested yellow cocoa pod with glistening white beans',
  },
  {
    num: '02',
    phase: 'THE CANOPY & ECOLOGY',
    title: 'PROTECTING THE MIDGE FLY UNDER OPEN SKY',
    tagline: 'A multi-tier biodiverse tropical canopy',
    text1:
      'Unlike fruits that depend on honeybees, delicate cacao blossoms are pollinated exclusively by the microscopic midge fly. These fragile pollinators cannot survive in scorched, pesticide-treated monocultures.',
    text2:
      'We maintain a multi-tier ecological canopy — intercropping cacao with shade trees, betel nut palms, and wild native greenery. The natural fallen leaf beds create the cool, moist rainforest microclimate essential for pollination and tree longevity.',
    metrics: [
      { val: '100%', label: 'Multi-Tier Shade Canopy' },
      { val: 'Natural', label: 'Midge Fly Habitat' },
      { val: 'Zero', label: 'Monoculture Clearing' },
    ],
    image: '/images/home/Gemini_Generated_Image_etqrivetqrivetqr (1).png',
    imageAlt: 'Lush green multi-tier cocoa canopy under morning Godavari sky',
  },
  {
    num: '03',
    phase: 'THE 7-DAY FERMENTATION',
    title: 'WOODEN BOX FERMENTATION & TROPICAL SUN',
    tagline: 'Developing deep fruit & caramel flavor precursors',
    text1:
      'The moment a cacao pod is cracked open, flavor alchemy begins. Within hours of harvest, the pulp-covered beans are transferred into tiered wooden sweat-boxes constructed from local hardwood.',
    text2:
      'For seven full days, natural wild yeasts ferment the sweet white pulp, turning simple sugars into complex flavor precursors — notes of dark cherries, honeyed stone fruit, and earthy warm spices. The beans are then sun-dried slowly on raised solar beds under the Andhra sun.',
    metrics: [
      { val: '7 Days', label: 'Cascading Wooden Boxes' },
      { val: '100%', label: 'Natural Solar Drying' },
      { val: 'Zero', label: 'Artificial Starter Cultures' },
    ],
    image: '/images/home/1770452670706.png',
    imageAlt: 'Freshly roasted cacao beans steaming in artisanal cooling tray',
  },
  {
    num: '04',
    phase: 'THE STONE-CONCHING CRAFT',
    title: 'STONE GROUND FOR 72 HOURS BELOW 20 MICRONS',
    tagline: 'Granite melangers and pure unadulterated cocoa butter',
    text1:
      'Commercial factories blast cocoa with high heat and chemical alkalizing salts to homogenize flavor in minutes. At Mallinas, we honor the ancient rhythm of stone grinding.',
    text2:
      'Using traditional granite stone melangers, we gently conch the single-origin nibs for 72 continuous hours. The friction and granite stone reduce particle size to under 20 microns — creating an impossibly silky melt without palm oil, chemical emulsifiers, or artificial vanillin.',
    metrics: [
      { val: '72 Hrs', label: 'Granite Melanger Conching' },
      { val: '< 20 µm', label: 'Silky Velvet Particle Size' },
      { val: '100%', label: 'Pure Cocoa Butter' },
    ],
    image: '/images/home/123.jpg.jpeg',
    imageAlt: 'Finished Mallinas single-origin chocolate bars wrapped in artisan gold foil',
  },
];

export default function StoryChapters() {
  const [activeTab, setActiveTab] = useState(0);

  const scrollToChapter = (idx) => {
    setActiveTab(idx);
    const element = document.getElementById(`chapter-${idx}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.chaptersSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>THE 4 PHASES OF SOIL TO SWEETNESS</span>
          <h2 className={styles.sectionTitle}>THE SEED TO BAR JOURNEY</h2>
          <p className={styles.sectionSubtitle}>
            Every bite carries the fingerprint of our soil, climate, and unhurried craft.
          </p>
        </div>

        {/* Sticky Chapter Nav Buttons (Palmo reference homage) */}
        <div className={styles.chapterNavSticky}>
          <div className={styles.chapterNavPill}>
            {CHAPTERS.map((chap, idx) => (
              <button
                key={chap.num}
                type="button"
                className={`${styles.navBtn} ${activeTab === idx ? styles.navBtnActive : ''}`}
                onClick={() => scrollToChapter(idx)}
              >
                <span className={styles.navNum}>{chap.num}</span>
                <span className={styles.navText}>{chap.phase.split(' ')[1] || chap.phase}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chapters Stack */}
        <div className={styles.chaptersList}>
          {CHAPTERS.map((chap, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <article
                key={chap.num}
                id={`chapter-${idx}`}
                className={`${styles.chapterCard} ${isEven ? styles.cardReversed : ''}`}
              >
                {/* Text Content */}
                <div className={styles.textContent}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.bigNumber}>{chap.num}</span>
                    <div className={styles.phaseTitles}>
                      <span className={styles.phaseTag}>{chap.phase}</span>
                      <h3 className={styles.chapterTitle}>{chap.title}</h3>
                    </div>
                  </div>

                  <div className={styles.taglineBadge}>{chap.tagline}</div>

                  <div className={styles.bodyParagraphs}>
                    <p>{chap.text1}</p>
                    <p>{chap.text2}</p>
                  </div>

                  {/* Metrics Row */}
                  <div className={styles.metricGrid}>
                    {chap.metrics.map((m, mIdx) => (
                      <div key={mIdx} className={styles.metricBox}>
                        <span className={styles.metricVal}>{m.val}</span>
                        <span className={styles.metricLbl}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Image Card */}
                <div className={styles.imageWrapper}>
                  <div className={styles.imageCard}>
                    <Image
                      src={chap.image}
                      alt={chap.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.chapterImg}
                    />
                    <div className={styles.imageOverlay} />
                    <div className={styles.imageCaption}>
                      <span className={styles.captionNum}>{chap.num} / 04</span>
                      <span className={styles.captionTag}>{chap.phase}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

