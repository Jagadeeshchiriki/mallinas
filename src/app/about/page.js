import AboutHero from '../components/About/AboutHero/AboutHero';
import OurStorySection from '../components/About/OurStorySection/OurStorySection';
import WhyChooseSection from '../components/About/WhyChooseSection/WhyChooseSection';
import ExperienceProposalsSection from '../components/About/ExperienceProposalsSection/ExperienceProposalsSection';
import styles from './about.module.css';

export const metadata = {
  title: "About Us | Mallina's Chocolates",
  description:
    "Learn about the story behind Mallina's Chocolates — our passion for handcrafted artisan chocolates, our values, and our journey from a home kitchen to a beloved brand.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <OurStorySection />

      <WhyChooseSection />

      <ExperienceProposalsSection />
{/* 
      <section className={styles.journey}>
        <div className="container">
          <div className="section-header">
            <div className="section-label" style={{ color: 'var(--color-gold)' }}>Milestones</div>
            <h2 style={{ color: '#fff' }}>Our Journey</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>
              Key moments that shaped Mallina&apos;s Chocolates into what it is today.
            </p>
          </div>
          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineYear}>2020</div>
              <h4>The Beginning</h4>
              <p>Started making handmade chocolates in a small home kitchen in Hyderabad.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineYear}>2021</div>
              <h4>Growing Buzz</h4>
              <p>Word spread on social media. Started taking orders for birthdays and festivals.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineYear}>2023</div>
              <h4>Workshops Launch</h4>
              <p>Began hosting chocolate-making workshops, sharing the art with aspiring chocolatiers.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineYear}>2024</div>
              <h4>Online Store</h4>
              <p>Launched the official Mallina&apos;s online store to deliver joy across India.</p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
