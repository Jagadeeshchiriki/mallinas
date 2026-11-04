'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import styles from './Hero.module.css';

// 4 Signature Flavors (Inspired by the interactive flavor system on palmo.co.in)
const FLAVORS = [
  {
    id: 'noir-72',
    name: 'Noir 72% Single Origin',
    tagline: 'Deep Ecuador Cacao • Bourbon Vanilla',
    cocoa: '72%',
    origin: 'Los Ríos, Ecuador',
    notes: 'Dark cherry, smoked oak & velvety cacao nibs',
    price: '₹649',
    badge: 'Signature Bestseller',
    foilColor: 0xffd265, // Royal Gold
    chocColor: 0x1e0f0a,
    ambientColor: 'rgba(218, 60, 36, 0.16)',
    themeGlow: '#DA3C24',
    emoji: '🍫',
  },
  {
    id: 'rose-cardamom',
    name: 'Rose & Cardamom Ganache',
    tagline: 'Damascus Rose • Wild Green Cardamom',
    cocoa: '65%',
    origin: 'Idukki Hills, Kerala',
    notes: 'Floral essence, crushed green cardamom & silky honey',
    price: '₹699',
    badge: 'Artisan Special',
    foilColor: 0xf3a2ab, // Rose Gold
    chocColor: 0x281211,
    ambientColor: 'rgba(232, 96, 76, 0.22)',
    themeGlow: '#E8604C',
    emoji: '🌹',
  },
  {
    id: 'kashmiri-saffron',
    name: 'Royal Saffron & Pistachio',
    tagline: 'Kashmiri Kesar • Roasted Pistachio Crunch',
    cocoa: '58%',
    origin: 'Pampore, Kashmir',
    notes: 'Aromatic red saffron threads, buttery pistachios & cream',
    price: '₹749',
    badge: 'Limited Harvest',
    foilColor: 0xffbf42, // Saffron Amber
    chocColor: 0x2e170c,
    ambientColor: 'rgba(255, 191, 66, 0.22)',
    themeGlow: '#FFBF42',
    emoji: '✨',
  },
  {
    id: 'salted-caramel',
    name: 'Fleur de Sel Salted Caramel',
    tagline: 'Slow-Simmered Caramel • Brittany Sea Salt',
    cocoa: '60%',
    origin: 'Anaimalai Hills, TN',
    notes: 'Deep golden caramel, flaky sea salt crystals & toasted vanilla',
    price: '₹679',
    badge: 'Chef’s Favorite',
    foilColor: 0xe39b56, // Caramel Bronze
    chocColor: 0x331c11,
    ambientColor: 'rgba(196, 155, 96, 0.2)',
    themeGlow: '#C49B60',
    emoji: '🍯',
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Experience state
  // stage: 'pod' (whole cocoa pod) | 'chocolate' (cracked & revealed artisan chocolate bar)
  const [stage, setStage] = useState('pod');
  const [activeFlavorIdx, setActiveFlavorIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [interactionTipVisible, setInteractionTipVisible] = useState(true);

  // References to 3D scene objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const leftPodMeshRef = useRef(null);
  const rightPodMeshRef = useRef(null);
  const chocolateGroupRef = useRef(null);
  const foilMeshRef = useRef(null);
  const chocBarMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const seamLightRef = useRef(null);
  const mainGroupRef = useRef(null);

  // Smooth animation interpolation state
  const animRef = useRef({
    progress: 0, // 0 = fully closed pod, 1 = fully revealed chocolate bar
    targetProgress: 0,
    rotX: 0.15,
    rotY: 0,
    targetRotX: 0.15,
    targetRotY: 0,
    dragStartX: 0,
    dragStartY: 0,
    isPointerDown: false,
  });

  const activeFlavor = FLAVORS[activeFlavorIdx];

  // =========================================================================
  // Three.js 3D Setup & Render Engine
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 9.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.4);
    dirLight1.position.set(5, 7, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffd265, 1.3);
    dirLight2.position.set(-5, -3, 4);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xda3c24, 1.8);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const seamLight = new THREE.PointLight(0xffd265, 0, 8);
    seamLight.position.set(0, 0, 0);
    scene.add(seamLight);
    seamLightRef.current = seamLight;

    // 5. Main Rotating Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // -----------------------------------------------------------------------
    // Helper: Build Procedural Ribbed Half Cocoa Pod Geometry
    // -----------------------------------------------------------------------
    function createPodHalfGeometry(isLeft) {
      const geom = new THREE.BufferGeometry();
      const uSegments = 44;
      const vSegments = 44;
      const positions = [];
      const normals = [];
      const uvs = [];
      const indices = [];

      const length = 4.4;
      const maxR = 1.62;

      for (let i = 0; i <= uSegments; i++) {
        const u = (i / uSegments) * Math.PI; // 0 to PI
        const y = Math.cos(u) * (length / 2);
        const baseRadius = Math.sin(u) * maxR;

        for (let j = 0; j <= vSegments; j++) {
          const vRatio = j / vSegments;
          // Half pod spans from -PI/2 to PI/2
          const v = -Math.PI / 2 + vRatio * Math.PI;

          // 5 deep longitudinal ridges on each half pod
          const ridge = 1 + 0.13 * Math.cos(v * 5);
          // Subtle organic wood/husk roughness
          const wobble = 1 + 0.03 * Math.sin(u * 7 + v * 3);
          const r = baseRadius * ridge * wobble;

          const x = r * Math.cos(v) * (isLeft ? -1 : 1);
          const z = r * Math.sin(v);

          positions.push(x, y, z);
          uvs.push(vRatio, i / uSegments);
        }
      }

      for (let i = 0; i < uSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
          const a = i * (vSegments + 1) + j;
          const b = (i + 1) * (vSegments + 1) + j;
          const c = (i + 1) * (vSegments + 1) + (j + 1);
          const d = i * (vSegments + 1) + (j + 1);

          if (isLeft) {
            indices.push(a, b, d);
            indices.push(b, c, d);
          } else {
            indices.push(a, d, b);
            indices.push(b, d, c);
          }
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      return geom;
    }

    // Outer Husk Material: Rich rustic cocoa amber/brown
    const podMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e2a14,
      roughness: 0.78,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    // Inner Cream/Pulp Lining Material
    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3ecde,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Left Pod Half
    const leftPodGroup = new THREE.Group();
    const leftPodMesh = new THREE.Mesh(createPodHalfGeometry(true), podMaterial);
    leftPodGroup.add(leftPodMesh);

    // Inner bean seeds in left half
    const beanGeom = new THREE.SphereGeometry(0.24, 16, 16);
    beanGeom.scale(1, 1.7, 0.8);
    for (let b = -4; b <= 4; b++) {
      const beanMesh = new THREE.Mesh(beanGeom, pulpMaterial);
      beanMesh.position.set(-0.25, b * 0.36, 0.05);
      beanMesh.rotation.set(0.1 * b, 0.3, 0.2);
      leftPodGroup.add(beanMesh);
    }
    mainGroup.add(leftPodGroup);
    leftPodMeshRef.current = leftPodGroup;

    // Right Pod Half
    const rightPodGroup = new THREE.Group();
    const rightPodMesh = new THREE.Mesh(createPodHalfGeometry(false), podMaterial);
    rightPodGroup.add(rightPodMesh);

    // Inner bean seeds in right half
    for (let b = -4; b <= 4; b++) {
      const beanMesh = new THREE.Mesh(beanGeom, pulpMaterial);
      beanMesh.position.set(0.25, b * 0.36, 0.05);
      beanMesh.rotation.set(-0.1 * b, -0.3, -0.2);
      rightPodGroup.add(beanMesh);
    }
    mainGroup.add(rightPodGroup);
    rightPodMeshRef.current = rightPodGroup;

    // Cocoa Pod Stem
    const stemGeom = new THREE.CylinderGeometry(0.1, 0.18, 0.7, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x3d1a0e, roughness: 0.9 });
    const stem = new THREE.Mesh(stemGeom, stemMat);
    stem.position.set(0, 2.45, 0);
    mainGroup.add(stem);

    // -----------------------------------------------------------------------
    // The Mallina's Artisan Chocolate Bar Group
    // -----------------------------------------------------------------------
    const chocolateGroup = new THREE.Group();
    mainGroup.add(chocolateGroup);
    chocolateGroupRef.current = chocolateGroup;

    // Tempered Chocolate Material (Rich glossy dark cacao)
    const chocMaterial = new THREE.MeshPhysicalMaterial({
      color: FLAVORS[0].chocColor,
      roughness: 0.34,
      metalness: 0.08,
      clearcoat: 0.5,
      clearcoatRoughness: 0.18,
    });
    chocBarMeshRef.current = chocMaterial;

    // Base Chocolate Slab
    const slabGeom = new THREE.BoxGeometry(2.5, 3.8, 0.24);
    const slabMesh = new THREE.Mesh(slabGeom, chocMaterial);
    chocolateGroup.add(slabMesh);

    // 8 Raised Chocolate Snap Squares (2 columns x 4 rows)
    const squareGeom = new THREE.BoxGeometry(1.02, 0.76, 0.12);
    const squareTopGeom = new THREE.BoxGeometry(0.92, 0.68, 0.04);
    const goldInsigniaMat = new THREE.MeshStandardMaterial({
      color: 0xffd265,
      metalness: 0.8,
      roughness: 0.3,
    });

    const colX = [-0.6, 0.6];
    const rowY = [1.25, 0.42, -0.42, -1.25];

    rowY.forEach((y, rIdx) => {
      colX.forEach((x, cIdx) => {
        const sq = new THREE.Mesh(squareGeom, chocMaterial);
        sq.position.set(x, y, 0.14);
        chocolateGroup.add(sq);

        const sqTop = new THREE.Mesh(squareTopGeom, chocMaterial);
        sqTop.position.set(x, y, 0.21);
        chocolateGroup.add(sqTop);

        // Center medallion seal with "M" logo mark on top two squares
        if (rIdx === 0) {
          const sealGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24);
          sealGeom.rotateX(Math.PI / 2);
          const seal = new THREE.Mesh(sealGeom, goldInsigniaMat);
          seal.position.set(x, y, 0.235);
          chocolateGroup.add(seal);
        }
      });
    });

    // Peeling Luxury Gold Foil Wrapper
    const foilGeom = new THREE.BoxGeometry(2.62, 2.05, 0.34);
    const foilMaterial = new THREE.MeshStandardMaterial({
      color: FLAVORS[0].foilColor,
      roughness: 0.25,
      metalness: 0.94,
    });
    foilMeshRef.current = foilMaterial;

    const foilMesh = new THREE.Mesh(foilGeom, foilMaterial);
    foilMesh.position.set(0, -0.92, 0.02);
    chocolateGroup.add(foilMesh);

    // Folded Foil Collar Lip
    const foilLipGeom = new THREE.CylinderGeometry(1.36, 1.34, 0.2, 32, 1, true, 0, Math.PI);
    foilLipGeom.rotateX(Math.PI / 2);
    const foilLip = new THREE.Mesh(foilLipGeom, foilMaterial);
    foilLip.position.set(0, 0.12, 0.18);
    chocolateGroup.add(foilLip);

    // Branded Band on Foil (Red & Gold Brand Ribbon)
    const bandGeom = new THREE.BoxGeometry(2.66, 0.7, 0.36);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xda3c24,
      roughness: 0.5,
      metalness: 0.2,
    });
    const bandMesh = new THREE.Mesh(bandGeom, bandMat);
    bandMesh.position.set(0, -0.85, 0.02);
    chocolateGroup.add(bandMesh);

    // -----------------------------------------------------------------------
    // Floating Cocoa Bean & Spice Particle Field
    // -----------------------------------------------------------------------
    const particleCount = 45;
    const particleGroup = new THREE.Group();
    const particleGeom = new THREE.DodecahedronGeometry(0.08, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffd265,
      metalness: 0.8,
      roughness: 0.3,
    });
    const beanChunkMat = new THREE.MeshStandardMaterial({
      color: 0x4a2211,
      roughness: 0.8,
    });

    const particlesData = [];
    for (let p = 0; p < particleCount; p++) {
      const isGold = p % 2 === 0;
      const mesh = new THREE.Mesh(particleGeom, isGold ? particleMat : beanChunkMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.4 + Math.random() * 2.8;
      const py = (Math.random() - 0.5) * 5.0;
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius;

      mesh.position.set(px, py, pz);
      mesh.scale.setScalar(0.7 + Math.random() * 1.2);
      particleGroup.add(mesh);

      particlesData.push({
        mesh,
        baseAngle: angle,
        radius,
        speed: 0.003 + Math.random() * 0.005,
        ySeed: py,
        rotSpeedX: Math.random() * 0.04,
        rotSpeedY: Math.random() * 0.04,
      });
    }
    mainGroup.add(particleGroup);
    particlesRef.current = particlesData;

    // Initially hide the chocolate bar inside the pod
    chocolateGroup.scale.set(0.01, 0.01, 0.01);
    chocolateGroup.visible = false;

    // -----------------------------------------------------------------------
    // Animation Loop
    // -----------------------------------------------------------------------
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Lerp animation progress (0 = pod closed, 1 = chocolate bar revealed)
      const targetP = animRef.current.targetProgress;
      animRef.current.progress += (targetP - animRef.current.progress) * 0.07;
      const p = animRef.current.progress;

      // Dynamic rotation handling
      if (!animRef.current.isPointerDown && isRotating) {
        animRef.current.targetRotY += 0.006;
      }
      animRef.current.rotX += (animRef.current.targetRotX - animRef.current.rotX) * 0.08;
      animRef.current.rotY += (animRef.current.targetRotY - animRef.current.rotY) * 0.08;

      if (mainGroupRef.current) {
        mainGroupRef.current.rotation.x = animRef.current.rotX;
        mainGroupRef.current.rotation.y = animRef.current.rotY;

        // Subtle floating bob
        mainGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.12;
      }

      // Pod Crack & Shell Splitting Animation
      if (leftPodMeshRef.current && rightPodMeshRef.current) {
        // As p goes from 0 to 1, shells rotate outward and move aside
        const openAngle = p * 1.35; // ~77 degrees
        const openDist = p * 2.1;

        leftPodMeshRef.current.rotation.z = -openAngle;
        leftPodMeshRef.current.position.x = -openDist;
        leftPodMeshRef.current.position.z = -p * 0.8;

        rightPodMeshRef.current.rotation.z = openAngle;
        rightPodMeshRef.current.position.x = openDist;
        rightPodMeshRef.current.position.z = -p * 0.8;

        // Fade stem and pod slightly when fully open to let chocolate shine
        stem.scale.setScalar(Math.max(0.001, 1 - p * 0.95));
      }

      // Chocolate Bar Reveal Animation
      if (chocolateGroupRef.current) {
        if (p > 0.05) {
          chocolateGroupRef.current.visible = true;
          // Scale up smoothly with overshoot bounce
          const scale = Math.min(1.0, p * 1.15);
          chocolateGroupRef.current.scale.set(scale, scale, scale);

          // Position rises up and forward towards camera
          chocolateGroupRef.current.position.z = -0.5 + p * 1.3;
          chocolateGroupRef.current.position.y = (1 - p) * -0.6;

          // Gentle spin flair while revealing
          chocolateGroupRef.current.rotation.y = (1 - p) * Math.PI;
        } else {
          chocolateGroupRef.current.visible = false;
        }
      }

      // Seam Light Glow Spikes during the crack
      if (seamLightRef.current) {
        const seamIntensity = Math.sin(p * Math.PI) * 14.0;
        seamLightRef.current.intensity = seamIntensity;
      }

      // Orbit floating particles
      if (particlesRef.current) {
        particlesRef.current.forEach((item) => {
          item.baseAngle += item.speed;
          item.mesh.position.x = Math.cos(item.baseAngle) * item.radius;
          item.mesh.position.z = Math.sin(item.baseAngle) * item.radius;
          item.mesh.position.y = item.ySeed + Math.sin(elapsed * 2 + item.radius) * 0.2;
          item.mesh.rotation.x += item.rotSpeedX;
          item.mesh.rotation.y += item.rotSpeedY;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // -----------------------------------------------------------------------
    // Resize Handler
    // -----------------------------------------------------------------------
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // =========================================================================
  // Update 3D Materials when Flavor Changes
  // =========================================================================
  useEffect(() => {
    const flav = FLAVORS[activeFlavorIdx];
    if (foilMeshRef.current) {
      foilMeshRef.current.color.setHex(flav.foilColor);
    }
    if (chocBarMeshRef.current) {
      chocBarMeshRef.current.color.setHex(flav.chocColor);
    }
  }, [activeFlavorIdx]);

  // =========================================================================
  // Turn & Reveal Animation Controller
  // =========================================================================
  const toggleStage = useCallback(() => {
    setInteractionTipVisible(false);
    if (stage === 'pod') {
      setStage('chocolate');
      animRef.current.targetProgress = 1; // Open pod & reveal chocolate
    } else {
      setStage('pod');
      animRef.current.targetProgress = 0; // Close pod
    }
  }, [stage]);

  // =========================================================================
  // 360° Mouse / Touch Drag to Rotate (Inspired by Palmo's 3D product view)
  // =========================================================================
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setInteractionTipVisible(false);
    animRef.current.isPointerDown = true;
    animRef.current.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    animRef.current.dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const handlePointerMove = (e) => {
    if (!animRef.current.isPointerDown) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - animRef.current.dragStartX;
    const deltaY = clientY - animRef.current.dragStartY;

    animRef.current.targetRotY += deltaX * 0.008;
    animRef.current.targetRotX = Math.max(-0.6, Math.min(0.6, animRef.current.targetRotX + deltaY * 0.005));

    animRef.current.dragStartX = clientX;
    animRef.current.dragStartY = clientY;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    animRef.current.isPointerDown = false;
  };

  return (
    <section
      className={styles.heroSection}
      style={{
        '--flavor-glow': activeFlavor.themeGlow,
        '--ambient-bg': activeFlavor.ambientColor,
      }}
    >
      {/* Dynamic Ambient Background Lights */}
      <div className={styles.ambientGlow} />
      <div className={styles.ambientSpot1} />
      <div className={styles.ambientSpot2} />

      {/* Main Hero Grid */}
      <div className={styles.heroGrid}>
        {/* Left Column: Bold Editorial Typography & Product Narrative */}
        <div className={styles.contentCol}>
          {/* Top Pill Badge */}
          <div className={styles.badgePill}>
            <span className={styles.badgeDot}></span>
            <span className={styles.badgeText}>Farm-to-Bar Atelier • Tanuku</span>
            <span className={styles.badgeHighlight}>{activeFlavor.cocoa} Single Origin</span>
          </div>

          {/* Main Headline (Palmo-inspired bold editorial display) */}
          <h1 className={styles.heroHeadline}>
            <span className={styles.headlineSub}>Handcrafted From The Seed</span>
            <span className={styles.headlineMain}>
              Purity In Every <span className={styles.headlineAccent}>Bite.</span>
            </span>
          </h1>

          <p className={styles.heroDescription}>
            Witness the transformation from wild harvested cocoa pod to silky tempered perfection.
            Each small batch is stone-ground for 72 hours, infusing rare Indian botanicals with
            single-origin beans.
          </p>

          {/* Interactive Turn & Reveal Action Bar */}
          <div className={styles.stageController}>
            <button
              type="button"
              className={`${styles.revealBtn} ${stage === 'chocolate' ? styles.revealBtnActive : ''}`}
              onClick={toggleStage}
              aria-label={stage === 'pod' ? 'Crack and reveal chocolate' : 'Close and inspect cocoa pod'}
            >
              <span className={styles.revealBtnSpark}>
                {stage === 'pod' ? '✨' : '🌱'}
              </span>
              <span className={styles.revealBtnText}>
                {stage === 'pod' ? 'Crack & Reveal Chocolate' : 'Inspect Raw Cocoa Pod'}
              </span>
              <span className={styles.revealBtnArrow}>→</span>
            </button>

            <Link href="/shop" className={styles.orderCta}>
              Order {activeFlavor.price}
            </Link>
          </div>

          {/* Active Flavor Flavor Profile Highlights */}
          <div className={styles.flavorCardSelected}>
            <div className={styles.flavorHeader}>
              <div className={styles.flavorNameWrap}>
                <span className={styles.flavorEmoji}>{activeFlavor.emoji}</span>
                <div>
                  <div className={styles.flavorTitle}>{activeFlavor.name}</div>
                  <div className={styles.flavorOrigin}>Origin: {activeFlavor.origin}</div>
                </div>
              </div>
              <div className={styles.flavorBadge}>{activeFlavor.badge}</div>
            </div>
            <div className={styles.flavorNotes}>
              <strong>Tasting Notes:</strong> {activeFlavor.notes}
            </div>
          </div>

          {/* Key Craft Metrics */}
          <div className={styles.craftMetrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>72 Hrs</span>
              <span className={styles.metricLbl}>Stone Ground</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>100%</span>
              <span className={styles.metricLbl}>Pure Cocoa Butter</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>Zero</span>
              <span className={styles.metricLbl}>Refined Palm Oil</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Cocoa & Chocolate Viewport */}
        <div className={styles.viewportCol}>
          <div
            ref={containerRef}
            className={`${styles.canvasContainer} ${isDragging ? styles.dragging : ''}`}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            <canvas ref={canvasRef} className={styles.webglCanvas} />

            {/* 3D Stage Progress Indicator */}
            <div className={styles.viewportOverlayTop}>
              <div className={styles.stageIndicator}>
                <span className={`${styles.stageStep} ${stage === 'pod' ? styles.stageStepActive : ''}`}>
                  01. Raw Cocoa Pod
                </span>
                <span className={styles.stageArrow}>➔</span>
                <span className={`${styles.stageStep} ${stage === 'chocolate' ? styles.stageStepActive : ''}`}>
                  02. Mallina&apos;s Artisan Bar
                </span>
              </div>
              <button
                type="button"
                className={styles.rotationToggle}
                onClick={() => setIsRotating(!isRotating)}
                aria-label={isRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
                title={isRotating ? 'Pause rotation' : 'Start rotation'}
              >
                {isRotating ? '⏸ 360° Rotating' : '▶ 360° Paused'}
              </button>
            </div>

            {/* Interactive Drag Hint */}
            {interactionTipVisible && (
              <div className={styles.dragHint}>
                <span className={styles.dragHintIcon}>⟲</span>
                <span>Drag to inspect 360° in 3D</span>
              </div>
            )}

            {/* Stage Quick Switcher Floating Button */}
            <div className={styles.viewportOverlayBottom}>
              <button
                type="button"
                className={styles.quickTransformBtn}
                onClick={toggleStage}
              >
                {stage === 'pod' ? 'Turn & Reveal Chocolate Bar →' : '← Back to Cocoa Pod'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Flavor Selector Cards (Direct homage to Palmo's interactive flavor shelf) */}
      <div className={styles.flavorShelf}>
        <div className={styles.shelfHeader}>
          <div className={styles.shelfTitle}>
            <span>Select Single-Origin Blend</span>
            <small>Interactive 3D preview updates dynamically</small>
          </div>
          <Link href="/shop" className={styles.viewAllLink}>
            Explore All 50+ Varieties →
          </Link>
        </div>

        <div className={styles.flavorGrid}>
          {FLAVORS.map((flav, index) => {
            const isSelected = activeFlavorIdx === index;
            return (
              <button
                key={flav.id}
                type="button"
                className={`${styles.flavorCard} ${isSelected ? styles.flavorCardActive : ''}`}
                onClick={() => {
                  setActiveFlavorIdx(index);
                  // If in pod stage, automatically reveal the chocolate for them!
                  if (stage === 'pod') {
                    setStage('chocolate');
                    animRef.current.targetProgress = 1;
                  }
                }}
              >
                <div className={styles.cardTopRow}>
                  <span className={styles.cardIndex}>0{index + 1}</span>
                  <span className={styles.cardCocoaTag}>{flav.cocoa} Cacao</span>
                </div>
                <div className={styles.cardName}>{flav.name}</div>
                <div className={styles.cardTagline}>{flav.tagline}</div>
                <div className={styles.cardBottomRow}>
                  <span className={styles.cardPrice}>{flav.price}</span>
                  <span className={styles.cardPreviewBadge}>
                    {isSelected ? 'Viewing in 3D' : 'Switch 3D'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

