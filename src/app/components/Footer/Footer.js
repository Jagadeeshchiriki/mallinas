'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand & Explore Mallina's */}
          <div className={styles.column}>
            <div className={styles.footerLogoWrap}>
              <Image
                src="/images/logo.png"
                alt="Mallinas Chocolates"
                width={140}
                height={52}
                className={styles.footerLogoImg}
              />
            </div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/shop" className={styles.link}>
                  Shop Single-Origin
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  Our Farm Story
                </Link>
              </li>
              <li>
                <Link href="/workshop" className={styles.link}>
                  The Stay & Workshops
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Visit Our Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Information */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>CONTACT INFORMATION</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.contactText}>
                  Karravari Savaram, Undrajavaram Mandal, Tanuku, East Godavari, Andhra Pradesh
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:9502540033" className={styles.contactLink}>
                  +91 95025 40033 / 9382143103
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:mallinaschocolates@gmail.com" className={styles.contactLink}>
                  mallinaschocolates@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Social & Farm Philosophy */}
          <div className={`${styles.column} ${styles.socialCol}`}>
            <h4 className={styles.colTitle}>SOIL TO SWEETNESS</h4>
            <p className={styles.philosophyMini}>
              25 years of organic devotion. Chemical-free Godavari terroir, single-origin cacao, and slow granite conching.
            </p>
            <div className={styles.socialCrest}>
              <div className={styles.socialIconsRow}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                  IG
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                  FB
                </a>
                <a href="https://wa.me/919502540033" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                  WA
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Big Faint Watermark Logo at the bottom */}
        <div className={styles.watermarkWrap}>
          <span className={styles.watermarkText}>Mallinas</span>
        </div>

        {/* Copyright */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Mallina&apos;s Chocolates. All rights reserved. Soil to Sweetness • Single Origin Farm to Bar.</p>
        </div>
      </div>
    </footer>
  );
}
