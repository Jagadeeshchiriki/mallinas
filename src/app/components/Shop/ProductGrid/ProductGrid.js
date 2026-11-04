'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGrid.module.css';

const PRODUCTS = [
  {
    id: 1,
    name: '70% Dark Chocolate',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-70.jpg',
  },
  {
    id: 2,
    name: '70% Dark Chocolate with Hazelnuts',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-70-hazelnut.jpg',
  },
  {
    id: 3,
    name: '70% Dark Chocolate with Cashewnuts',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-70-cashew.jpg',
  },
  {
    id: 4,
    name: '70% Dark Chocolate with Almonds',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-70-almond.png',
  },
  {
    id: 5,
    name: '80% Dark Chocolate',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-80.png',
  },
  {
    id: 6,
    name: '90% Dark Chocolate',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-90.png',
  },
  {
    id: 7,
    name: '100% Dark Chocolate',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/dark-100.png',
  },
  {
    id: 8,
    name: '50% Milk Chocolate',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/milk-50.jpg',
  },
  {
    id: 9,
    name: '50% Milk Chocolate with Cashew',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/milk-50-cashew.jpg',
  },
  {
    id: 10,
    name: '50% Milk Chocolate with Almonds',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/milk-50-almond.jpg',
  },
  {
    id: 11,
    name: '50% Milk Chocolate with Hazelnuts',
    price: 'Rs. 200',
    priceVal: 200,
    image: '/images/products/milk-50-hazelnut.jpg',
  },
  {
    id: 12,
    name: 'Antioxidant Reserve',
    price: 'Rs. 210',
    priceVal: 210,
    image: '/images/products/antioxidant.png',
  },
];

export default function ProductGrid() {
  const [quantities, setQuantities] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [addedNotice, setAddedNotice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    setAddedNotice({ id: product.id, name: product.name, qty });
    setTimeout(() => {
      setAddedNotice(null);
    }, 2000);
  };

  return (
    <section className={styles.productSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.header}>
          <h2 className={styles.title}>OUR PRODUCTS</h2>
        </div>

        {/* 3-Column Grid */}
        <div className={styles.grid}>
          {PRODUCTS.map((prod) => {
            const qty = quantities[prod.id] || 1;
            const isJustAdded = addedNotice?.id === prod.id;

            return (
              <div key={prod.id} className={styles.card}>
                {/* Product Image Frame */}
                <div className={styles.imageFrame}>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.productImage}
                  />
                </div>

                {/* Info */}
                <div className={styles.cardInfo}>
                  <h3 className={styles.productName}>{prod.name}</h3>
                  <div className={styles.productPrice}>{prod.price}</div>
                </div>

                {/* Bottom Controls Row: Quantity Selector & Add to Cart */}
                <div className={styles.actionRow}>
                  <div className={styles.qtyBox}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => handleQtyChange(prod.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{qty}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => handleQtyChange(prod.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`${styles.addToCartBtn} ${isJustAdded ? styles.added : ''}`}
                    onClick={() => handleAddToCart(prod)}
                  >
                    {isJustAdded ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Bar */}
        <div className={styles.pagination}>
          <span className={styles.pageBar}>|</span>
          <button
            type="button"
            className={`${styles.pageNumber} ${currentPage === 1 ? styles.pageActive : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            type="button"
            className={`${styles.pageNumber} ${currentPage === 2 ? styles.pageActive : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            type="button"
            className={`${styles.pageNumber} ${currentPage === 3 ? styles.pageActive : ''}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
        </div>
      </div>
    </section>
  );
}

