'use client';

import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setName('');
      setEmail('');
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <div className={styles.contentWrap}>
          {/* Label Heading */}
          <h2 className={styles.heading}>STAY IN THE LOOP</h2>

          {/* Subscription Form */}
          {submitted ? (
            <div className={styles.successMessage}>
              <span>✨</span> Thank you for subscribing to Mallina&apos;s Gazette.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

