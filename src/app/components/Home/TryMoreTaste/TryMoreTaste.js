'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './TryMoreTaste.module.css';

// Statically imported images
import tasteDarkchocolate from '../../../../../public/images/products/dark-100.png';
import tasteRaspberry from '../../../../../public/images/products/milk-50.jpg';
import tasteBlueberry from '../../../../../public/images/products/dark-80.png';
import tasteMatcha from '../../../../../public/images/products/dark-70-cashew.jpg';
import tasteHazelnutDark from '../../../../../public/images/products/dark-90.png';
import tasteAlmondDark from '../../../../../public/images/products/Dark chocolate_Almonds.jpeg';
import tasteCashewDark from '../../../../../public/images/products/dark-70-cashew.jpg';
import tasteHazelnutMilk from '../../../../../public/images/products/taste-hazelnut-milk.jpg';
import tasteDarkPraline from '../../../../../public/images/products/taste-dark-praline.png';
import tasteMilkPraline from '../../../../../public/images/products/taste-milk-praline.png';

const PRODUCTS = [
  {
    id: 1,
    name: '100% Dark chocolate',
    subtitle: 'A luxurious chocolate inspired by Dubai',
    price: 'Rs. 200.00',
    image: tasteDarkchocolate,
  },
  {
    id: 2,
    name: 'Milk Chocolate',
    subtitle: 'A flavorful blend of raspberry and chocolate',
    price: 'Rs. 200.00',
    image: tasteRaspberry,
  },
  {
    id: 3,
    name: '80% Dark Chocolate',
    subtitle: 'A delightful mix of blueberry and chocolate',
    price: 'Rs. 200.00',
    image: tasteBlueberry,
  },
  {
    id: 4,
    name: '70% Dark chocolate',
    subtitle: 'A smooth blend of matcha and chocolate',
    price: 'Rs. 200.00',
    image: tasteMatcha,
  },
  {
    id: 5,
    name: 'Hazelnut Dark Chocolate',
    subtitle: 'Rich 70% dark cocoa infused with roasted hazelnuts',
    price: 'Rs. 200.00',
    image: tasteHazelnutDark,
  },
  {
    id: 6,
    name: 'Almond Dark Chocolate',
    subtitle: 'Whole roasted almonds in single-origin dark cocoa',
    price: 'Rs. 200.00',
    image: tasteAlmondDark,
  },
  {
    id: 7,
    name: 'Cashew Nut Dark',
    subtitle: 'Creamy Godavari cashews in velvety dark chocolate',
    price: 'Rs. 200.00',
    image: tasteCashewDark,
  },
  {
    id: 8,
    name: 'Hazelnut Milk Chocolate',
    subtitle: 'Sweet cream milk chocolate with crunchy hazelnuts',
    price: 'Rs. 200.00',
    image: tasteHazelnutMilk,
  },
  {
    id: 9,
    name: 'Artisan Dark Praline',
    subtitle: 'Hand-crafted cocoa praline with a lush ganache center',
    price: 'Rs. 40.00',
    image: tasteDarkPraline,
  },
  {
    id: 10,
    name: 'Silky Milk Praline',
    subtitle: 'Golden honey milk chocolate shell with soft filling',
    price: 'Rs. 40.00',
    image: tasteMilkPraline,
  },
];

const LOOPED_PRODUCTS = Array.from({ length: 3 }, (_, cycle) =>
  PRODUCTS.map((product) => ({ ...product, loopKey: `${cycle}-${product.id}` })),
).flat();

export default function TryMoreTaste() {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`);
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 24;
    const cardWidth = card.offsetWidth + gap;
    const cycleWidth = cardWidth * PRODUCTS.length;

    if (track.scrollLeft < cycleWidth * 0.5) {
      track.scrollLeft += cycleWidth;
    } else if (track.scrollLeft > cycleWidth * 1.5) {
      track.scrollLeft -= cycleWidth;
    }

    const position = ((track.scrollLeft - cycleWidth) % cycleWidth + cycleWidth) % cycleWidth;
    setActiveDot(Math.round(position / cardWidth) % PRODUCTS.length);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const card = track.querySelector(`.${styles.card}`);
    const frameId = window.requestAnimationFrame(() => {
      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 24;
      if (card) track.scrollLeft = (card.offsetWidth + gap) * PRODUCTS.length;
    });
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      track.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToDot = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`);
    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 24;
    const cardWidth = card ? card.offsetWidth + gap : 390;
    const cycleWidth = cardWidth * PRODUCTS.length;
    track.scrollTo({
      left: cycleWidth + index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (event) => {
    const track = trackRef.current;
    if (!track) return;
    isDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = event.pageX - track.offsetLeft;
    scrollLeftRef.current = track.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isDownRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    event.preventDefault();
    const x = event.pageX - track.offsetLeft;
    const distance = (x - startXRef.current) * 1.4;
    if (Math.abs(distance) > 5) isDraggingRef.current = true;
    track.scrollLeft = scrollLeftRef.current - distance;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = (id, e) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <section className={styles.section} aria-label="Try More Taste Chocolates">
      <div className={styles.container}>
        {/* Section Heading */}
        <h2 className={styles.heading}>Try More Taste</h2>

        <div className={styles.carouselWrapper}>
          <div
            ref={trackRef}
            className={styles.track}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {LOOPED_PRODUCTS.map((item) => {
              const isFav = !!favorites[item.id];
              const isAdded = !!addedItems[item.id];

              return (
                <article
                  key={item.loopKey}
                  className={styles.card}
                >
                  {/* Top Image */}
                  <div className={styles.imgWrapper}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 620px) 88vw, (max-width: 960px) 48vw, 390px"
                      className={styles.productImg}
                      draggable={false}
                    />
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    {/* Title & Wishlist */}
                    <div className={styles.titleRow}>
                      <h3 className={styles.productTitle}>{item.name}</h3>
                      <button
                        type="button"
                        className={`${styles.wishlistBtn} ${isFav ? styles.wishlistActive : ''}`}
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label={`Add ${item.name} to wishlist`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill={isFav ? '#C84F35' : 'none'}
                          stroke={isFav ? '#C84F35' : '#4A2E1F'}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    {/* Subtitle */}
                    <p className={styles.productSubtitle}>{item.subtitle}</p>

                    {/* Bottom Row: Price & Add to Cart */}
                    <div className={styles.bottomRow}>
                      <span className={styles.price}>{item.price}</span>
                      <button
                        type="button"
                        className={`${styles.cartBtn} ${isAdded ? styles.cartBtnAdded : ''}`}
                        onClick={(e) => handleAddToCart(item.id, e)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>{isAdded ? 'Added' : 'Add To Cart'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.dotsWrapper} aria-label="Carousel pagination">
          {PRODUCTS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.dot} ${activeDot === index ? styles.dotActive : ''}`}
              onClick={() => scrollToDot(index)}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
