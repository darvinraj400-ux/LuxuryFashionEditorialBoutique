import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, collections, categories } from '../data/products';
import { SlidersHorizontal, X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Collection() {
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCollection = activeCollection === 'all' || p.collection === activeCollection;
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      return matchesCollection && matchesCategory;
    });
  }, [activeCollection, activeCategory]);

  const activeFilters = (activeCollection !== 'all' ? 1 : 0) + (activeCategory !== 'all' ? 1 : 0);

  return (
    <main className="pt-20 md:pt-24">
      {/* Header */}
      <section className="px-5 md:px-10 lg:px-16 py-12 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-3">
            The Collection
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            Garments
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm text-ivory-dim max-w-lg leading-relaxed">
            Each piece is designed with intention — from the initial sketch to the final stitch. 
            Browse by collection or garment type.
          </motion.p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-5 md:px-10 lg:px-16 mb-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ivory-dim min-h-[44px]"
          >
            <SlidersHorizontal size={14} />
            Filter
            {activeFilters > 0 && (
              <span className="w-5 h-5 bg-burgundy text-ivory text-[9px] rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
          {activeFilters > 0 && (
            <button
              onClick={() => { setActiveCollection('all'); setActiveCategory('all'); }}
              className="text-[10px] tracking-[0.15em] uppercase text-burgundy-light min-h-[44px] flex items-center"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter panels */}
        <motion.div
          initial={false}
          animate={{ 
            height: showFilters ? 'auto' : 0,
            opacity: showFilters ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden md:overflow-visible md:h-auto md:opacity-100 ${showFilters ? '' : 'hidden md:block'}`}
        >
          {/* Collection filter */}
          <div className="mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-2">Collection</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCollection('all')}
                className={`px-3 py-2 text-xs tracking-wide border transition-colors duration-200 min-h-[44px] ${
                  activeCollection === 'all'
                    ? 'border-ivory text-ivory'
                    : 'border-noir-mid text-ivory-dim hover:border-ivory-dim'
                }`}
              >
                All
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setActiveCollection(col.id)}
                  className={`px-3 py-2 text-xs tracking-wide border transition-colors duration-200 min-h-[44px] ${
                    activeCollection === col.id
                      ? 'border-ivory text-ivory'
                      : 'border-noir-mid text-ivory-dim hover:border-ivory-dim'
                  }`}
                >
                  {col.subtitle}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-2 text-xs tracking-wide border transition-colors duration-200 min-h-[44px] ${
                  activeCategory === 'all'
                    ? 'border-ivory text-ivory'
                    : 'border-noir-mid text-ivory-dim hover:border-ivory-dim'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 text-xs tracking-wide border transition-colors duration-200 min-h-[44px] ${
                    activeCategory === cat.id
                      ? 'border-ivory text-ivory'
                      : 'border-noir-mid text-ivory-dim hover:border-ivory-dim'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters display */}
          {activeFilters > 0 && (
            <div className="flex items-center gap-2 mt-3 md:hidden">
              {activeCollection !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-1 bg-noir-mid text-[10px] tracking-wide">
                  {collections.find(c => c.id === activeCollection)?.subtitle}
                  <button onClick={() => setActiveCollection('all')} className="ml-1 min-w-[20px] min-h-[20px] flex items-center justify-center">
                    <X size={10} />
                  </button>
                </span>
              )}
              {activeCategory !== 'all' && (
                <span className="flex items-center gap-1 px-2 py-1 bg-noir-mid text-[10px] tracking-wide">
                  {categories.find(c => c.id === activeCategory)?.name}
                  <button onClick={() => setActiveCategory('all')} className="ml-1 min-w-[20px] min-h-[20px] flex items-center justify-center">
                    <X size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Results count */}
        <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim/50 mt-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </p>
      </section>

      {/* Products Grid - Editorial Layout */}
      <section className="px-5 md:px-10 lg:px-16 pb-20 md:pb-32">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-editorial text-xl text-ivory-dim mb-2">No pieces found</p>
            <p className="text-xs text-ivory-dim/60">Try adjusting your filters.</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-y-20"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                className={`${i % 3 === 1 ? 'sm:mt-8 lg:mt-0' : ''} ${i % 3 === 2 ? 'lg:mt-16' : ''}`}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-4 bg-noir-light relative">
                    <motion.img
                      src={product.variants[0].images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-burgundy text-ivory px-2 py-1">
                        New
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-editorial text-lg leading-tight group-hover:text-burgundy-light transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <p className="text-xs text-ivory-dim">€{product.price.toLocaleString()}</p>
                      <div className="flex gap-1.5">
                        {product.variants.map((v) => (
                          <span
                            key={v.color}
                            className="w-3 h-3 rounded-full border border-noir-mid"
                            style={{ backgroundColor: v.colorCode }}
                            title={v.color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
