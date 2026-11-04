import styles from './about.module.css';

export const metadata = {
  title: "About Us | Mallina's Chocolates",
  description: "Learn about the story behind Mallina's Chocolates — our passion for handcrafted artisan chocolates, our values, and our journey from a home kitchen to a beloved brand.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.pageHeroLabel}>
            <span>📖</span> Our Story
          </div>
          <h1 className={styles.pageHeroTitle}>
            About <span>Mallina&apos;s</span>
          </h1>
          <p className={styles.pageHeroDesc}>
            From a small home kitchen to a beloved chocolate brand — discover the passion,
            love, and craft behind every chocolate we make.
          </p>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyVisual}>
              <div className={styles.storyImageBox}>
                👩‍🍳
              </div>
              <div className={styles.storyBadge}>
                <strong>2020</strong>
                <span>Founded</span>
              </div>
            </div>
            <div className={styles.storyContent}>
              <h2>A Dream Born in a <span>Kitchen</span></h2>
              <p>
                Mallina&apos;s Chocolates began as a passion project in a small home kitchen in Tanuku.
                What started with a love for experimenting with flavors and sharing homemade treats with
                friends and family soon blossomed into something much more.
              </p>
              <p>
                Our founder discovered that the joy of chocolate wasn&apos;t just in eating it — it was in
                the artistry of making it. Each chocolate is a canvas for creativity, blending traditional
                techniques with unique Indian-inspired flavors that you won&apos;t find anywhere else.
              </p>
              <div className={styles.storyHighlight}>
                <p>
                  &ldquo;Every chocolate we create is a little piece of love, wrapped in flavor
                  and delivered with a smile.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR VALUES ===== */}
      <section className={styles.values}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">What Drives Us</div>
            <h2>Our Core Values</h2>
            <p>The principles that guide every chocolate we craft and every experience we create.</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌿</div>
              <h3>Quality First</h3>
              <p>We source only the finest ingredients — from Belgian cocoa to single-origin beans — ensuring every bite is exceptional.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎨</div>
              <h3>Creative Craft</h3>
              <p>We push boundaries with unique flavor combinations that marry global chocolate traditions with local Indian ingredients.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💚</div>
              <h3>Sustainability</h3>
              <p>We use eco-friendly packaging, support ethical cocoa sourcing, and minimize our environmental footprint at every step.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Community</h3>
              <p>Through our workshops and events, we share the joy of chocolate making and build a community of chocolate lovers.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3>Attention to Detail</h3>
              <p>From hand-painted designs to precise tempering, every detail matters in creating chocolates that delight all senses.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>❤️</div>
              <h3>Made with Love</h3>
              <p>At our core, we believe the best ingredient is love. That&apos;s why we put our heart into every piece we craft.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR JOURNEY ===== */}
      <section className={styles.journey}>
        <div className="container">
          <div className="section-header">
            <div className="section-label" style={{ color: 'var(--color-gold)' }}>Milestones</div>
            <h2 style={{ color: '#fff' }}>Our Journey</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>Key moments that shaped Mallina&apos;s Chocolates into what it is today.</p>
          </div>
          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2020</div>
              <h4>The Beginning</h4>
              <p>Started making handmade chocolates in a small home kitchen in Hyderabad.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2021</div>
              <h4>Growing Buzz</h4>
              <p>Word spread on social media. Started taking orders for birthdays and festivals.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2023</div>
              <h4>Workshops Launch</h4>
              <p>Began hosting chocolate-making workshops, sharing the art with aspiring chocolatiers.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2024</div>
              <h4>Online Store</h4>
              <p>Launched the official Mallina&apos;s online store to deliver joy across India.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
