import Image from 'next/image';
import Link from 'next/link';
import groveImage from '../images/about/cacao-grove.jpg';
import podImage from '../images/about/chocolate-estate.png';
import rawCacaoImage from '../images/about/CANOPY.jpg';
import craftingImage from '../images/about/chocolate-crafting.png';
import styles from './farm-to-bar.module.css';

export const metadata = {
  title: "Farm to Bar | Mallina's Chocolates",
  description:
    "Follow Mallina's farm-to-bar journey from cacao grown in the Godavari canopy to carefully crafted artisan chocolate.",
};

const processSteps = [
  {
    title: 'Grown beneath the Godavari canopy',
    body: [
      'Our chocolate begins among cacao trees growing in the warm, fertile landscape of the Godavari region. Coconut palms and companion plants create a living canopy around the grove, helping the fruit mature in a rich farm ecosystem.',
      'By keeping the journey close to the source, we can pay attention to every harvest and preserve the distinct character of the cacao from its earliest stage.',
    ],
    image: groveImage,
    alt: 'Cacao trees growing beneath coconut palms at the Mallina’s estate',
  },
  {
    title: 'Picked when colour signals ripeness',
    body: [
      'Cacao pods do not all ripen at once. Each pod is observed and harvested only when its colour and maturity are right, protecting the delicate beans and sweet pulp held inside.',
      'The pods are opened close to the farm, and the fresh beans are gathered in small batches. Careful selection here gives every later stage a cleaner, more expressive foundation.',
    ],
    image: podImage,
    alt: 'Ripe yellow and red cacao pods growing on a cacao tree',
  },
  {
    title: 'Fermented slowly, dried with patience',
    body: [
      'Fresh cacao begins developing its chocolate character through fermentation. Time and temperature are watched closely as the beans transform, softening raw bitterness and building deeper fruit, nut and cacao notes.',
      'The beans are then dried gradually to hold that flavour in balance. This quiet post-harvest work is where much of a fine chocolate’s aroma and complexity is created.',
    ],
    image: rawCacaoImage,
    alt: 'An opened cacao pod with cacao beans ready for processing',
  },
  {
    title: 'Roasted, refined and finished by hand',
    body: [
      'Dried beans are roasted to reveal their individual character, then cracked and refined into smooth chocolate. We balance the recipe with restraint so the cacao remains the clearest flavour in every bar.',
      'Tempering creates the final shine and snap before each batch is moulded, cooled and wrapped. The result is a direct expression of the farm—finished with the precision of a chocolatier.',
    ],
    image: craftingImage,
    alt: 'Smooth chocolate being poured into a bar mould by hand',
  },
];

export default function FarmToBarPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/farmtobar/farmhouse.png"
          alt="Aerial view of Mallina’s farm surrounded by the Godavari coconut canopy"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          
          <h1>
            <span className={styles.headlineLine1}>From Our Farm</span>
            <span className={styles.headlineLine2}>Into Every Bar</span>
          </h1>
          <p>
            One place, one closely watched journey—from living cacao trees to chocolate
            made with a true sense of origin.
          </p>
        </div>
      </section>

      <section className={styles.intro} id="our-process">
        
        <h2>Chocolate with a memory of the land.</h2>
        <p>
          Farm to bar means knowing where flavour begins. At Mallina&apos;s, every stage is
          connected: the shaded grove, the ripe fruit, the patient transformation of the
          bean, and the final craft of the bar.
        </p>
      </section>

      <div className={styles.process}>
        {processSteps.map((step, index) => (
          <section
            className={`${styles.chapter} ${index % 2 === 1 ? styles.chapterReverse : ''}`}
            key={step.title}
          >
            <div className={styles.chapterImageWrap}>
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.chapterImage}
              />
            </div>
            <div className={styles.chapterCopy}>
              <h2>{step.title}</h2>
              {step.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className={styles.closing}>
        <div className={styles.closingInner}>
          <span className={styles.closingLabel}>Taste the whole journey</span>
          <h2>The farm is present in every square.</h2>
          <p>
            Explore chocolate shaped by origin, thoughtful farming and careful craft in
            the Godavari region.
          </p>
          <Link href="/shop" className={styles.shopLink}>
            Explore our chocolate <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
