import Link from 'next/link';
import styles from './contact.module.css';

export const metadata = {
  title: "Contact Us | Mallina's Chocolates",
  description: "Get in touch with Mallina's Chocolates for orders, workshop bookings, corporate gifting, or any questions. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroLabel}>
            <span>💌</span> Say Hello
          </div>
          <h1 className={styles.pageHeroTitle}>
            Get in <span>Touch</span>
          </h1>
          <p className={styles.pageHeroDesc}>
            Have a question, want to place a custom order, or book a workshop?
            We&apos;d love to hear from you — reach out and let&apos;s make something sweet!
          </p>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <div>
                <h2>Let&apos;s Create Something <span>Sweet</span></h2>
                <p>
                  Whether you need chocolates for a special occasion, want to book a workshop,
                  or just want to say hi — we&apos;re all ears!
                </p>
              </div>

              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>📍</div>
                  <div className={styles.infoCardContent}>
                    <h4>Visit Us</h4>
                    <p>Tanuku, West Godavari, Andhra Pradesh, India</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>✉️</div>
                  <div className={styles.infoCardContent}>
                    <h4>Email Us</h4>
                    <p><a href="mailto:hello@mallinaschocolate.com">hello@mallinaschocolate.com</a></p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>📞</div>
                  <div className={styles.infoCardContent}>
                    <h4>Call Us</h4>
                    <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>⏰</div>
                  <div className={styles.infoCardContent}>
                    <h4>Working Hours</h4>
                    <p>Mon - Sat: 10 AM - 7 PM<br />Sunday: By appointment</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialSection}>
                <h4>Follow Us</h4>
                <div className={styles.socialLinks}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>IG</a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>FB</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>X</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>YT</a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>WA</a>
                </div>
              </div>
            </div>

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
                      <option value="workshop">Workshop Booking</option>
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
                  <button type="submit" className="btn btn-primary btn-lg">
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
            <div className={styles.mapPlaceholder}>
              <span className={styles.mapEmoji}>📍</span>
              <h3>Tanuku, West Godavari, Andhra Pradesh, India</h3>
              <p>Our studio is located in the heart of Tanuku</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faq}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions about orders, workshops, and more.</p>
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
              <h4><span>Q.</span> How far in advance should I book a workshop?</h4>
              <p>We recommend booking at least 5-7 days in advance to secure your preferred date and time.</p>
            </div>
            <div className={styles.faqItem}>
              <h4><span>Q.</span> Do you cater for corporate events?</h4>
              <p>Yes! We offer corporate gifting, team-building workshops, and bulk orders with custom branding options.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
