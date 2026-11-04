'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis = null;

    const configureScroll = () => {
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
        wheelMultiplier: 0.9,
      });
    };

    configureScroll();
    reducedMotion.addEventListener('change', configureScroll);

    return () => {
      reducedMotion.removeEventListener('change', configureScroll);
      lenis?.destroy();
    };
  }, []);

  return children;
}
