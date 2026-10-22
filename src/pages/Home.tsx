import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { products, collections } from '../data/products';
import { journalPosts } from '../data/journal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredProducts = products.filter(p => p.isNew).slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://image.qwenlm.ai/generated-images/1983cb96-4109-44b2-aa8c-287dcb620e4b/_result.png"
            alt="AW26 Obsidian Campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end px-5 md:px-10 lg:px-16 pb-20 md:pb-32"
        >
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-3 md:mb-4">
              {collections[0].name} — {collections[0].subtitle}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-editorial text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light leading-[0.85] tracking-tight mb-6 md:mb-8"
            >
              Obsidian
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm md:text-base text-ivory-dim max-w-md leading-relaxed mb-8">
              {collections[0].description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border-b border-ivory/30 pb-1 hover:border-ivory transition-colors duration-300 min-h-[44px]"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Editorial Section - Asymmetric Layout */}
      <section className="px-5 md:px-10 lg:px-16 py-20 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
        >
          {/* Large image - left side */}
          <motion.div variants={fadeUp} className="md:col-span-7 md:col-start-1">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/3fe3a630-de3d-469c-b3f6-61eb127748c5/_result.png"
                alt="Editorial - flowing fabric"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text - right side */}
          <motion.div variants={fadeUp} className="md:col-span-4 md:col-start-9 md:mt-32">
            <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy-light mb-4">Editorial Note</p>
            <h3 className="font-editorial text-3xl md:text-4xl font-light leading-tight mb-6">
              Between shadow<br />& structure
            </h3>
            <p className="text-sm text-ivory-dim leading-relaxed mb-6">
              The AW26 collection is a study in contrasts — the weight of wool against the fluidity of silk, 
              the precision of tailoring against the softness of an oversized silhouette.
            </p>
            <Link
              to="/journal/obsidian-essay"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors duration-300 min-h-[44px]"
            >
              Read the Essay →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products - Editorial Layout */}
      <section className="px-5 md:px-10 lg:px-16 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-2">
            New Arrivals
          </motion.p>
          <motion.h3 variants={fadeUp} className="font-editorial text-3xl md:text-4xl font-light mb-12 md:mb-16">
            Latest Pieces
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className={`${i === 1 ? 'sm:mt-16' : ''}`}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-4 bg-noir-light">
                    <motion.img
                      src={product.variants[0].images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-editorial text-lg leading-tight group-hover:text-burgundy-light transition-colors duration-300">
                        {product.name}
                      </h4>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim mt-1">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-xs text-ivory-dim flex-shrink-0">
                      €{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Full-bleed Editorial Image */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative h-[60vh] md:h-[80vh] overflow-hidden"
        >
          <img
            src="https://image.qwenlm.ai/generated-images/cacf569a-ccc6-4fe8-9899-9e3e6c4c7f24/_result.png"
            alt="Silk Column Dress editorial"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-noir/20" />
          <div className="absolute bottom-8 left-5 right-5 md:bottom-16 md:left-10 lg:left-16">
            <p className="font-editorial text-2xl md:text-4xl font-light text-ivory">
              "Simplicity is the ultimate sophistication."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Journal Preview */}
      <section className="px-5 md:px-10 lg:px-16 py-20 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-2">From the Journal</p>
              <h3 className="font-editorial text-3xl md:text-4xl font-light">Stories & Notes</h3>
            </div>
            <Link
              to="/journal"
              className="text-xs tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors min-h-[44px] flex items-center"
            >
              View All
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {journalPosts.slice(0, 2).map((post, i) => (
              <motion.div key={post.id} variants={fadeUp}>
                <Link to={`/journal/${post.id}`} className="group block">
                  <div className={`overflow-hidden mb-5 ${i === 0 ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-burgundy-light mb-2">{post.category}</p>
                  <h4 className="font-editorial text-xl md:text-2xl font-light mb-2 group-hover:text-burgundy-light transition-colors duration-300">
                    {post.title}
                  </h4>
                  <p className="text-sm text-ivory-dim leading-relaxed line-clamp-2">{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-noir-mid px-5 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h4 className="font-editorial text-xl tracking-[0.2em] uppercase mb-4">Atelier Noir</h4>
            <p className="text-xs text-ivory-dim leading-relaxed max-w-xs">
              An independent fashion house dedicated to considered design, exceptional materials, and timeless craft.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-3">Navigate</p>
            <ul className="space-y-2">
              <li><Link to="/collection" className="text-xs text-ivory-dim hover:text-ivory transition-colors">Collection</Link></li>
              <li><Link to="/journal" className="text-xs text-ivory-dim hover:text-ivory transition-colors">Journal</Link></li>
              <li><Link to="/bag" className="text-xs text-ivory-dim hover:text-ivory transition-colors">Bag</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 md:col-start-9">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-3">Contact</p>
            <ul className="space-y-2">
              <li className="text-xs text-ivory-dim">concierge@ateliernoir.com</li>
              <li className="text-xs text-ivory-dim">Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-noir-mid/50">
          <p className="text-[10px] text-ivory-dim/40 tracking-wide">
            © 2026 Atelier Noir. All rights reserved. This is a fictional fashion house.
          </p>
        </div>
      </footer>
    </main>
  );
}
