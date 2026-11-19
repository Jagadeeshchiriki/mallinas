'use client';

import Image from 'next/image';
import logoImage from '../../images/home/logo.png';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand */}
          <div className={styles.column}>
            <div className={styles.footerLogoWrap}>
              <Image
                src={logoImage}
                alt="Mallinas Chocolates"
                width={190}
                height={70}
                className={styles.footerLogoImg}
              />
            </div>
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

          {/* Column 3: Social links */}
          <div className={`${styles.column} ${styles.socialCol}`}>
            <div className={styles.socialCrest}>
              <div className={styles.socialIconsRow}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.25" />
                    <circle cx="17.4" cy="6.7" r="1" className={styles.iconFill} />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.facebookIcon}>
                    <path d="M14.2 8.2V6.6c0-.8.5-1 1-1h2.6V1.2L14.2 1C10.3 1 9.4 3.9 9.4 6.3v1.9H7v4.9h2.4V23h4.8v-9.9h3.2l.5-4.9h-3.7Z" />
                  </svg>
                </a>
                <a href="https://wa.me/919502540033" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.whatsappIcon}>
                    <path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.5-1.7A11.8 11.8 0 0 0 20.5 3.5Zm-8.3 18.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A9.7 9.7 0 1 1 12.2 21.7Zm5.3-7.3c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1a7.8 7.8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6L9.3 7c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.3 3.5 1.5 3.7c.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.1-.4-.2-.7-.4Z" />
                  </svg>
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
