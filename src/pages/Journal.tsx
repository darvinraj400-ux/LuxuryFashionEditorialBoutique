import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { journalPosts } from '../data/journal';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Journal() {
  return (
    <main className="pt-20 md:pt-24">
      {/* Header */}
      <section className="px-5 md:px-10 lg:px-16 py-12 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-3">
            The Journal
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            Stories & Notes
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm text-ivory-dim max-w-lg leading-relaxed">
            Campaign essays, designer notes, and reflections on the craft of making garments.
          </motion.p>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="px-5 md:px-10 lg:px-16 pb-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {journalPosts[0] && (
            <motion.div variants={fadeUp}>
              <Link to={`/journal/${journalPosts[0].id}`} className="group block">
                <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-6 bg-noir-light">
                  <motion.img
                    src={journalPosts[0].image}
                    alt={journalPosts[0].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="max-w-2xl">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-burgundy-light mb-2">
                    {journalPosts[0].category} — {new Date(journalPosts[0].date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <h2 className="font-editorial text-3xl md:text-4xl font-light mb-3 group-hover:text-burgundy-light transition-colors duration-300">
                    {journalPosts[0].title}
                  </h2>
                  <p className="text-sm text-ivory-dim leading-relaxed mb-2">{journalPosts[0].subtitle}</p>
                  <p className="text-sm text-ivory-dim/70 leading-relaxed">{journalPosts[0].excerpt}</p>
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Other Posts */}
      <section className="px-5 md:px-10 lg:px-16 pb-20 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {journalPosts.slice(1).map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <Link to={`/journal/${post.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-5 bg-noir-light">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-burgundy-light mb-2">
                  {post.category} — {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="font-editorial text-xl md:text-2xl font-light mb-2 group-hover:text-burgundy-light transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-xs text-ivory-dim/60 mb-3">{post.subtitle}</p>
                <p className="text-sm text-ivory-dim leading-relaxed line-clamp-3">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
