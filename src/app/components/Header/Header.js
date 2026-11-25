'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import logoImage from '../../images/home/logo.png';
import whiteLogoImage from '../../images/home/logo_white.png';
import styles from './Header.module.css';

const navLinks = [
  { href: '/about', label: 'OUR STORY', subtitle: 'Soil to sweetness & 25 yrs of organic farming' },
  { href: '/shop', label: 'SHOP', subtitle: 'Single-origin bars, pralines & gift boxes' },
  { href: '/farm-to-bar', label: 'FARM TO BAR', subtitle: 'Farm sanctuary & hands-on masterclasses' },
  { href: '/contact', label: 'CONTACT', subtitle: 'Godavari farm estate & bespoke gifting' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = pathname === '/' || pathname === '/home';
  const hasTransparentHeader = isHomePage && !scrolled;
  const headerLogo = hasTransparentHeader ? whiteLogoImage : logoImage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
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
    <header
      className={`${styles.headerWrapper} ${hasTransparentHeader ? styles.headerDarkHero : ''} ${isHomePage && scrolled ? styles.headerScrolled : ''}`}
    >
      {/* Main Navbar */}
      <div className={styles.headerNav}>
        <div className={styles.headerContainer}>
          {/* Official Brand Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Mallinas Chocolates Home">
            <Image
              src={headerLogo}
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
            <Link
              href="/shop"
              className={styles.headerActionBtn}
              aria-label="Search products"
              title="Search products"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className={styles.headerActionBtn}
              aria-label="Login or account support"
              title="Login"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
              </svg>
            </Link>

            <Link
              href="/shop"
              className={styles.headerActionBtn}
              aria-label="View shopping cart"
              title="Shopping cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="20" r="1" />
                <circle cx="19" cy="20" r="1" />
                <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.55h7.95a2 2 0 0 0 1.95-1.56L21 7H6" />
              </svg>
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
              src={logoImage}
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

      <button
        type="button"
        className={`${styles.scrollTopBtn} ${scrolled ? styles.scrollTopBtnVisible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="20" x2="12" y2="4" />
          <polyline points="6 10 12 4 18 10" />
        </svg>
      </button>
    </header>
  );
}
