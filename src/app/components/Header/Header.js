'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/about', label: 'OUR STORY', subtitle: 'Soil to sweetness & 25 yrs of organic farming' },
  { href: '/shop', label: 'SHOP', subtitle: 'Single-origin bars, pralines & gift boxes' },
  { href: '/workshop', label: 'WORKSHOPS', subtitle: 'Farm sanctuary & hands-on masterclasses' },
  { href: '/contact', label: 'CONTACT', subtitle: 'Godavari farm estate & bespoke gifting' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className={`${styles.headerWrapper} ${scrolled ? styles.headerScrolled : ''}`}>
      {/* Main Navbar */}
      <div className={styles.headerNav}>
        <div className={styles.headerContainer}>
          {/* Official Brand Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Mallinas Chocolates Home">
            <Image
              src="/images/logo.png"
              alt="Mallinas Chocolates"
              width={145}
              height={53}
              priority
              className={styles.brandLogoImg}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop} aria-label="Main Navigation">
            <div className={styles.navPill}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Header Action CTAs */}
          <div className={styles.navActions}>
            {/* Cart / Shop Link */}
            <Link
              href="/shop"
              className={styles.actionBagBtn}
              aria-label="View shopping cart"
              title="Browse Shop"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2.25 2.25a1.25 1.25 0 0 0 0 2.5h1.6l3.58 8.56-1.14 1.76a2.75 2.75 0 0 0 2.31 4.23h10.15a1.25 1.25 0 1 0 0-2.5H8.6a.25.25 0 0 1-.21-.38l.86-1.34h8.21a3 3 0 0 0 2.67-1.63l2.55-4.98a2.25 2.25 0 0 0-2-3.27H6.63L5.7 3.02a1.25 1.25 0 0 0-1.15-.77h-2.3Z" />
                <circle cx="9" cy="21.25" r="1.5" />
                <circle cx="18.5" cy="21.25" r="1.5" />
              </svg>
            </Link>

            {/* Order Now Button */}
            <Link href="/shop" className={styles.orderBtn}>
              <span className={styles.orderBtnText}>Order Now</span>
              <span className={styles.orderBtnIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${mobileOpen ? styles.mobileBackdropOpen : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            <Image
              src="/images/logo.png"
              alt="Mallinas Chocolates"
              width={130}
              height={48}
              className={styles.brandLogoImg}
            />
          </div>
          <button
            type="button"
            className={styles.mobileCloseBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNavList}>
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
              >
                <div className={styles.mobileNavInfo}>
                  <span className={styles.mobileNavIndex}>0{idx + 1}</span>
                  <div className={styles.mobileNavTextWrap}>
                    <span className={styles.mobileNavLabel}>{link.label}</span>
                    <span className={styles.mobileNavSubtitle}>{link.subtitle}</span>
                  </div>
                </div>
                <span className={styles.mobileNavArrow}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* Highlight Card */}
        <div className={styles.mobilePromoCard}>
          <div className={styles.mobilePromoHeader}>
            <span className={styles.mobilePromoEmoji}>🍫</span>
            <div>
              <div className={styles.mobilePromoTitle}>Soil to Sweetness</div>
              <div className={styles.mobilePromoDesc}>Godavari Delta Farm-to-Bar Cacao</div>
            </div>
          </div>
          <Link href="/shop" className={styles.mobileOrderBtn}>
            Explore Farm Collection →
          </Link>
        </div>

        {/* Mobile Footer / Quick Contact */}
        <div className={styles.mobileFooter}>
          <div className={styles.mobileContactNote}>
            <span>Direct WhatsApp Farm Orders:</span>
            <a href="https://wa.me/919502540033" target="_blank" rel="noopener noreferrer" className={styles.mobilePhoneLink}>
              +91 95025 40033
            </a>
          </div>
          <div className={styles.mobileSocialRow}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialPill}>
              Instagram
            </a>
            <a href="https://wa.me/919502540033" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialPill}>
              WhatsApp
            </a>
            <Link href="/contact" className={styles.mobileSocialPill}>
              Message Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
