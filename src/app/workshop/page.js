import Link from 'next/link';
import styles from './workshop.module.css';

export const metadata = {
  title: "Workshops | Mallina's Chocolates",
  description: "Join our hands-on chocolate making workshops. Learn tempering, truffle making, and more. Perfect for beginners, couples, kids, and corporate team-building.",
};

const workshops = [
  {
    id: 1,
    title: 'Beginner Truffle Making',
    desc: 'Learn the basics of chocolate tempering and create 12 beautiful truffles to take home. Perfect for first-timers!',
    emoji: '🍬',
    level: 'beginner',
    duration: '2.5 hrs',
    groupSize: '6-10',
    price: '₹2,499',
    priceNote: 'per person',
  },
  {
    id: 2,
    title: 'Advanced Bonbon Art',
    desc: 'Master the art of hand-painted bonbons with colored cocoa butter, tempering techniques, and creative fillings.',
    emoji: '🎨',
    level: 'advanced',
    duration: '4 hrs',
    groupSize: '4-8',
    price: '₹4,999',
    priceNote: 'per person',
  },
  {
    id: 3,
    title: 'Kids Chocolate Fun',
    desc: 'A fun, hands-on session for little chocolatiers aged 6-14. Make chocolate lollipops, bars, and decorations!',
    emoji: '👧',
    level: 'beginner',
    duration: '1.5 hrs',
    groupSize: '8-15',
    price: '₹1,499',
    priceNote: 'per child',
  },
  {
    id: 4,
    title: 'Corporate Team Building',
    desc: 'A unique team-building experience where your team collaborates to create a chocolate collection together.',
    emoji: '🏢',
    level: 'intermediate',
    duration: '3 hrs',
    groupSize: '10-30',
    price: '₹1,999',
    priceNote: 'per person',
  },
];

export default function WorkshopPage() {
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroLabel}>
            <span>🏫</span> Learn &amp; Create
          </div>
          <h1 className={styles.pageHeroTitle}>
            Chocolate <span>Workshops</span>
          </h1>
          <p className={styles.pageHeroDesc}>
            Dive into the world of chocolate making! Our hands-on workshops are designed for
            everyone — from curious beginners to aspiring chocolatiers.
          </p>
        </div>
      </section>

      {/* ===== WORKSHOPS ===== */}
      <section className={styles.workshops}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Upcoming Workshops</div>
            <h2>Choose Your Experience</h2>
            <p>Interactive, fun, and delicious workshops for every skill level.</p>
          </div>
          <div className={styles.workshopsGrid}>
            {workshops.map((ws) => (
              <div key={ws.id} className={styles.workshopCard}>
                <div className={styles.workshopImage}>
                  {ws.emoji}
                  <div className={`${styles.workshopLevel} ${
                    ws.level === 'beginner' ? styles.levelBeginner :
                    ws.level === 'intermediate' ? styles.levelIntermediate :
                    styles.levelAdvanced
                  }`}>
                    {ws.level.charAt(0).toUpperCase() + ws.level.slice(1)}
                  </div>
                </div>
                <div className={styles.workshopContent}>
                  <div className={styles.workshopMeta}>
                    <div className={styles.workshopMetaItem}>
                      <span>⏱️</span> {ws.duration}
                    </div>
                    <div className={styles.workshopMetaItem}>
                      <span>👥</span> {ws.groupSize} people
                    </div>
                  </div>
                  <h3>{ws.title}</h3>
                  <p>{ws.desc}</p>
                  <div className={styles.workshopFooter}>
                    <div className={styles.workshopPrice}>
                      {ws.price} <small>{ws.priceNote}</small>
                    </div>
                    <Link href="/contact" className="btn btn-primary" style={{ padding: '0.55rem 1.3rem', fontSize: '0.85rem' }}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={styles.howItWorks}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Simple Process</div>
            <h2>How It Works</h2>
            <p>Joining a workshop is easy — here&apos;s what to expect.</p>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>📋</div>
              <h4>Choose &amp; Book</h4>
              <p>Pick a workshop that excites you and book your spot online or via WhatsApp.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>🏠</div>
              <h4>Show Up</h4>
              <p>Arrive at our studio. All ingredients, tools, and aprons are provided.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>🍫</div>
              <h4>Create &amp; Learn</h4>
              <p>Get hands-on guidance from our expert chocolatier and make your own creations.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepIcon}>🎁</div>
              <h4>Take Home</h4>
              <p>Pack your handmade chocolates in beautiful boxes and take them home!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className="section-header">
            <div className="section-label" style={{ color: 'var(--color-gold)' }}>Happy Learners</div>
            <h2 style={{ color: '#fff' }}>What Our Students Say</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>Real feedback from people who&apos;ve joined our workshops.</p>
          </div>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p>&ldquo;Such an amazing experience! The truffle-making class was so much fun and I learned so much. My family loved the chocolates I brought home!&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>P</div>
                <div>
                  <div className={styles.testimonialName}>Priya Sharma</div>
                  <div className={styles.testimonialRole}>Beginner Workshop</div>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p>&ldquo;We booked the corporate team-building session and it was the best team activity we&apos;ve done. Creative, engaging, and delicious!&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>R</div>
                <div>
                  <div className={styles.testimonialName}>Rahul Mehta</div>
                  <div className={styles.testimonialRole}>Corporate Workshop</div>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p>&ldquo;My daughter&apos;s birthday party at Mallina&apos;s was unforgettable. The kids had a blast making their own chocolate lollipops!&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>A</div>
                <div>
                  <div className={styles.testimonialName}>Ananya Reddy</div>
                  <div className={styles.testimonialRole}>Kids Workshop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaContent}`}>
          <h2>Ready to Get Your Hands Chocolatey?</h2>
          <p>Book your spot in our next workshop and discover the joy of chocolate making.</p>
          <Link href="/contact" className="btn btn-white btn-lg">
            Book a Workshop →
          </Link>
        </div>
      </section>
    </>
  );
}
