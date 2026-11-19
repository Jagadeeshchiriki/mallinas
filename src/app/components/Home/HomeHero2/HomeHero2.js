'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import darkChocolateImage from '../../../images/home/Darkchocolate_70.jpeg';
import milkHazelnutImage from '../../../images/home/Milk chocolate_Hazelnuts.jpeg';
import styles from '../HomeHero/HomeHero.module.css';
import modelStyles from './HomeHero2.module.css';

const featureLines = [
  'Crafted with the finest cocoa and carefully selected ingredients.',
  'A perfect balance of rich chocolate flavour and irresistible sweetness.',
  'Made with passion, bringing together tradition and modern craftsmanship.',
  'Every bite delivers a moment of pure indulgence.',
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function segment(progress, start, end) {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
}

function disposeObject3D(object) {
  object?.traverse((child) => {
    child.geometry?.dispose();

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose();
    });
  });
}

function CocoaGlbModel({ progressRef }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let cancelled = false;
    let animationFrame = 0;
    let resizeObserver;
    let renderer;
    let scene;
    let model;
    let disposed = false;

    async function initializeModel() {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import('three'),
        import('three/addons/loaders/GLTFLoader.js'),
      ]);
      if (cancelled) return;

      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.05, 4.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      scene.add(new THREE.HemisphereLight(0xfff4e8, 0x4c2218, 2.2));

      const keyLight = new THREE.DirectionalLight(0xffe4bd, 4.2);
      keyLight.position.set(3, 4, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 2.1);
      fillLight.position.set(-4, 1, 3);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffb76b, 2.5);
      rimLight.position.set(1, 2, -4);
      scene.add(rimLight);

      const gltf = await new GLTFLoader().loadAsync('/models/cocoa3d.glb');

      if (cancelled) {
        disposeObject3D(gltf.scene);
        return;
      }

      model = new THREE.Group();
      const cocoa = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(cocoa);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const longestSide = Math.max(size.x, size.y, size.z) || 1;

      cocoa.position.sub(center);
      model.scale.setScalar(2.42 / longestSide);
      model.add(cocoa);
      model.position.y = 0.06;
      model.rotation.set(-0.1, -0.2, -0.035);
      scene.add(model);

      const resize = () => {
        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const rotateWithScroll = () => {
        const progress = progressRef.current;
        model.rotation.y = -0.2 + progress * Math.PI * 1.55;
        model.rotation.x = -0.1 + Math.sin(progress * Math.PI) * 0.035;
        model.rotation.z = -0.035 + progress * 0.08;
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(rotateWithScroll);
      };

      rotateWithScroll();
    }

    initializeModel().catch((error) => {
      if (!cancelled) {
        console.error('Unable to load the cocoa GLB model.', error);
      }
    });

    return () => {
      cancelled = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();

      if (disposed) return;
      disposed = true;
      disposeObject3D(model);
      renderer?.dispose();
    };
  }, [progressRef]);

  return (
    <div
      ref={containerRef}
      className={modelStyles.cocoaCanvas}
      role="img"
      aria-label="Interactive three-dimensional cocoa pod"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

export default function HomeHero2() {
  const sectionRef = useRef(null);
  const modelProgressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = 0;

    const applyProgress = (progress) => {
      const moveProgress = reduceMotion.matches ? 1 : segment(progress, 0.28, 0.68);
      modelProgressRef.current = moveProgress;

      if (reduceMotion.matches) {
        section.style.setProperty('--intro', '0');
        section.style.setProperty('--move', '1');
        section.style.setProperty('--reveal-one', '1');
        section.style.setProperty('--reveal-two', '1');
        featureLines.forEach((_, index) => {
          section.style.setProperty(`--line-${index + 1}`, '1');
        });
        return;
      }

      section.style.setProperty('--intro', String(1 - segment(progress, 0.18, 0.38)));
      section.style.setProperty('--move', String(moveProgress));
      section.style.setProperty('--reveal-one', String(segment(progress, 0.5, 0.72)));
      section.style.setProperty('--reveal-two', String(segment(progress, 0.58, 0.8)));

      featureLines.forEach((_, index) => {
        const start = 0.64 + index * 0.055;
        section.style.setProperty(
          `--line-${index + 1}`,
          String(segment(progress, start, start + 0.16)),
        );
      });
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      return clamp(-rect.top / distance);
    };

    const render = (time) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const smoothing = 1 - Math.exp(-elapsed / 120);

      currentProgress += (targetProgress - currentProgress) * smoothing;
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      applyProgress(currentProgress);

      if (currentProgress !== targetProgress) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
        previousTime = 0;
      }
    };

    const requestRender = () => {
      targetProgress = readProgress();
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    currentProgress = readProgress();
    targetProgress = currentProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    reduceMotion.addEventListener('change', requestRender);

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      reduceMotion.removeEventListener('change', requestRender);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection} aria-labelledby="hero-3d-title">
      <div className={styles.stickyStage}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.introCopy}>
          <h1 id="hero-3d-title" className={styles.heroTitle}>
            <span className={styles.titleLeft}>Rooted in Nature</span>
            <span className={styles.titleRight}>Grown with care</span>
          </h1>
        </div>

        <div className={`${styles.cocoaVisual} ${modelStyles.modelVisual}`}>
          <CocoaGlbModel progressRef={modelProgressRef} />
        </div>

        <div className={`${styles.chocolateFrame} ${styles.chocolateFrameTop}`}>
          <Image
            src={darkChocolateImage}
            alt="Mallinas 100% dark chocolate"
            fill
            sizes="(max-width: 768px) 42vw, 24vw"
            className={styles.chocolateImage}
          />
        </div>

        <div className={`${styles.chocolateFrame} ${styles.chocolateFrameBottom}`}>
          <Image
            src={milkHazelnutImage}
            alt="Mallinas milk chocolate with hazelnuts"
            fill
            sizes="(max-width: 768px) 48vw, 25vw"
            className={styles.chocolateImage}
          />
        </div>

        <div className={styles.featureCopy}>
          <ul className={styles.featureList}>
            {featureLines.map((line, index) => (
              <li
                key={line}
                className={styles.featureLine}
                style={{ '--line-progress': `var(--line-${index + 1})` }}
              >
                <span aria-hidden="true">✦</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
