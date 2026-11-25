'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './FarmingSection.module.css';

export default function FarmingSection() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      frame.style.clipPath = 'none';
      return undefined;
    }

    let ticking = false;

    const updateScroll = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const scrollHeight = section.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      // Progress 0 when section enters sticky pinning, 1 when fully scrolled
      const rawProgress = Math.min(1, Math.max(0, -rect.top / scrollHeight));

      // Smooth easing for luxury, fluid cinematic expansion
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      // Responsive inset: reduced top gap so video sits higher and closer to preceding section
      const isMobile = window.innerWidth <= 768;
      const maxInsetTop = isMobile ? 3 : 5;
      const maxInsetBottom = isMobile ? 6 : 10;
      const maxInsetX = isMobile ? 6 : 15;
      const maxRadius = isMobile ? 18 : 28;

      const insetTop = (1 - eased) * maxInsetTop;
      const insetBottom = (1 - eased) * maxInsetBottom;
      const insetX = (1 - eased) * maxInsetX;
      const radius = (1 - eased) * maxRadius;

      const clipValue = `inset(${insetTop}vh ${insetX}vw ${insetBottom}vh round ${radius}px)`;
      frame.style.clipPath = clipValue;
      frame.style.webkitClipPath = clipValue;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section ref={sectionRef} className={styles.farmingSection} aria-label="Cocoa Craftsmanship">
      <div className={styles.stickyContainer}>
        <div ref={frameRef} className={styles.videoFrame}>
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/chocolatemaking2.mp4" type="video/mp4" />
            <source src="/videos/chocolatemaking2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Cinematic dark gradient overlay for text readability */}
          <div className={styles.overlay} />

          {/* Centered headline and subtext */}
          <div className={styles.content}>
            <h2 className={styles.title}>The Hands Behind Every Bar</h2>
            <p className={styles.subtext}>
              We are farmers, fermenters, chocolate makers, chocolatiers and storytellers, exploring the endless possibilities of cacao
            </p>
          </div>

          {/* Audio toggle button */}
          <button
            type="button"
            className={styles.soundBtn}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
