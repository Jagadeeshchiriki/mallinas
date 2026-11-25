'use client';

import Image from 'next/image';
import logoImage from '../../images/home/logo_white.png';
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
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className={styles.contactText}>
                  Karravari Savaram, Undrajavaram Mandal, Tanuku, East Godavari, Andhra Pradesh
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <a href="tel:9502540033" className={styles.contactLink}>
                  +91 95025 40033
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
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
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.youtubeIcon}>
                    <path fillRule="evenodd" d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.2l5-3.2-5-3.2v6.4Z" />
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

        {/* Copyright */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Mallina&apos;s Chocolates. All rights reserved. Soil to Sweetness • Single Origin Farm to Bar.</p>
        </div>
      </div>
    </footer>
  );
}
