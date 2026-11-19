'use client';

import Image from 'next/image';
import styles from './JourneySection.module.css';
import plantationImage from '../../../images/home/mallinasbuilding.webp';

export default function JourneySection() {
  return (
    <section className={styles.journeySection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Text Column */}
          <div className={styles.textCol}>
            <h2 className={styles.title}>THE MALLINAS JOURNEY</h2>

            <div className={styles.paragraphs}>
              <p>
                Rooted in over 25 years of organic farming principles, the Mallinas journey
                began along the fertile banks of the Godavari river in Karravari Savaram, Tanuku.
                We believe that true artisan chocolate begins from the ground up — with living,
                chemical-free soil enriched by organic manure from our own goshala and nurtured
                naturally by earthworms.
              </p>
              <p>
                As farmers, fermenters, and chocolatiers, we control every step without middlemen.
                Our cacao pods are hand-harvested at peak ripeness, wooden-box fermented for 7 days,
                solar dried, and stone-ground in traditional granite melangers for 72 hours down to
                under 20 microns. Pure cocoa butter, zero refined sugars, zero palm oil, and zero
                shortcuts — pure Soil to Sweetness.
              </p>
            </div>

          </div>

          {/* Right Image Column */}
          <div className={styles.imageCol}>
            <div className={styles.imageCard}>
              <Image
                src={plantationImage}
                alt="Misty morning sunrise over the Mallinas cocoa plantation"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.plantationImage}
              />
              <div className={styles.imageShadow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

