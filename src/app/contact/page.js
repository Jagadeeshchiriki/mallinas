import styles from './contact.module.css';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Mallinas+Chocolates/@16.772887,81.6810608,1041m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a37b7384e81fc35:0x528c659eafffe21d!8m2!3d16.7728819!4d81.6836357!16s%2Fg%2F11xl0y_r88?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D';
const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps?q=16.7728819,81.6836357&z=16&output=embed';

export const metadata = {
  title: "Contact Us | Mallina's Chocolates",
  description: "Get in touch with Mallina's Chocolates for orders, farm-to-bar bookings, corporate gifting, or any questions. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroLabel}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Say Hello
          </div>
          <h1 className={styles.pageHeroTitle}>
            Get in <span>Touch</span>
          </h1>
          <p className={styles.pageHeroDesc}>
            Have a question, want to place a custom order, or book a farm-to-bar experience?
            We&apos;d love to hear from you — reach out and let&apos;s make something sweet!
          </p>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h3>Send Us a Message</h3>
              <p>Fill out the form and we&apos;ll get back to you within 24 hours.</p>
              <form>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="Your first name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Your last name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject">
                      <option value="">Select a subject...</option>
                      <option value="order">Custom Order</option>
                      <option value="farm-to-bar">Farm to Bar Booking</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Tell us about your requirements, preferred dates, quantity, etc..."></textarea>
                  </div>
                </div>
                <div className={styles.formSubmit}>
                  <button type="submit" className={`btn btn-lg ${styles.chocolateButton}`}>
                    Send Message →
                  </button>
                  <span className={styles.formNote}>We typically respond within 24 hours.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Location</div>
            <h2>Find Us Here</h2>
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              title="Mallinas Chocolates location map"
              className={styles.mapFrame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
              aria-label="Open Mallinas Chocolates in Google Maps"
            >
              <span className={styles.mapCta}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Open Mallinas Chocolates in Maps
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faq}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions about orders, farm-to-bar experiences, and more.</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4><span>Q.</span> Do you deliver across India?</h4>
              <p>Yes! We ship nationwide with temperature-controlled packaging to ensure your chocolates arrive in perfect condition.</p>
            </div>
            <div className={styles.faqItem}>
              <h4><span>Q.</span> Can I customize a gift box?</h4>
              <p>Absolutely! We love creating custom assortments. Just let us know your preferences, budget, and occasion.</p>
            </div>
            <div className={styles.faqItem}>
              <h4><span>Q.</span> How far in advance should I book a farm-to-bar experience?</h4>
              <p>We recommend booking at least 5-7 days in advance to secure your preferred date and time.</p>
            </div>
            <div className={styles.faqItem}>
              <h4><span>Q.</span> Do you cater for corporate events?</h4>
              <p>Yes! We offer corporate gifting, team-building farm-to-bar experiences, and bulk orders with custom branding options.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
