import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, collections } from '../data/products';
import { useBag } from '../context/BagContext';
import Gallery from '../components/Gallery';
import SizeGuide from '../components/SizeGuide';
import { ChevronLeft, Ruler } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem, openBag } = useBag();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showCare, setShowCare] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedVariant(0);
    setSelectedSize(null);
    setSizeError(false);
    setAddedToBag(false);
  }, [id]);

  if (!product) {
    return (
      <main className="pt-24 px-5 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="font-editorial text-2xl text-ivory-dim mb-4">Piece not found</p>
        <Link to="/collection" className="text-xs tracking-[0.2em] uppercase text-burgundy-light">
          Return to Collection
        </Link>
      </main>
    );
  }

  const collection = collections.find((c) => c.id === product.collection);
  const currentImages = product.variants[selectedVariant].images;

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem({
      product,
      size: selectedSize,
      color: product.variants[selectedVariant].color,
      quantity: 1,
      imageIndex: selectedVariant,
    });
    setAddedToBag(true);
    openBag();
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const sizeDependent = product.sizes.length > 1 || (product.sizes.length === 1 && product.sizes[0] !== 'One Size');

  return (
    <main className="pt-16 md:pt-20">
      {/* Back navigation */}
      <div className="px-5 md:px-10 lg:px-16 py-4">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors min-h-[44px]"
        >
          <ChevronLeft size={14} />
          Back to Collection
        </Link>
      </div>

      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="md:sticky md:top-20 md:h-[calc(100vh-5rem)]">
          <Gallery images={currentImages} alt={product.name} aspectRatio="aspect-[3/4] md:aspect-auto md:h-full" />
        </div>

        {/* Product Info */}
        <div className="px-5 md:px-10 lg:px-16 py-10 md:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Collection & Category */}
            <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-dim mb-2">
              {collection?.subtitle} — {product.category}
            </p>

            {/* Name & Price */}
            <h1 className="font-editorial text-3xl md:text-4xl font-light mb-3">{product.name}</h1>
            <p className="font-editorial text-xl text-ivory-dim mb-8">€{product.price.toLocaleString()}</p>

            {/* Editorial quote */}
            <p className="font-editorial text-lg italic text-ivory-dim/70 mb-8 border-l border-burgundy pl-4">
              "{product.editorial}"
            </p>

            {/* Description */}
            <p className="text-sm text-ivory-dim leading-relaxed mb-8">{product.description}</p>

            {/* Color Selection */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-3">
                  Color — {product.variants[selectedVariant].color}
                </p>
                <div className="flex gap-3">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedVariant(i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                        i === selectedVariant ? 'border-ivory' : 'border-noir-mid hover:border-ivory-dim'
                      }`}
                      aria-label={`Select ${variant.color}`}
                      aria-pressed={i === selectedVariant}
                    >
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: variant.colorCode }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim">
                  {sizeDependent ? 'Size' : 'Size'} {selectedSize && `— ${selectedSize}`}
                </p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors min-h-[44px]"
                >
                  <Ruler size={12} />
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`min-w-[48px] h-12 px-3 text-xs tracking-wide border transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-ivory bg-ivory text-noir'
                        : 'border-noir-mid text-ivory-dim hover:border-ivory-dim'
                    }`}
                    aria-label={`Select size ${size}`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-burgundy-light mt-2"
                  role="alert"
                >
                  Please select a size before adding to bag.
                </motion.p>
              )}
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToBag}
              className={`w-full py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 min-h-[52px] ${
                addedToBag
                  ? 'bg-burgundy text-ivory'
                  : 'bg-ivory text-noir hover:bg-ivory-dim'
              }`}
            >
              {addedToBag ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>

            {/* Accordion Details */}
            <div className="mt-10 border-t border-noir-mid">
              {/* Description toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between py-4 text-xs tracking-[0.15em] uppercase text-ivory-dim min-h-[48px]"
                aria-expanded={showDetails}
              >
                <span>Details</span>
                <span className={`transition-transform duration-200 ${showDetails ? 'rotate-45' : ''}`}>+</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-ivory-dim leading-relaxed pb-4">{product.description}</p>
              </motion.div>

              <div className="border-t border-noir-mid/50">
                <button
                  onClick={() => setShowMaterials(!showMaterials)}
                  className="w-full flex items-center justify-between py-4 text-xs tracking-[0.15em] uppercase text-ivory-dim min-h-[48px]"
                  aria-expanded={showMaterials}
                >
                  <span>Materials & Composition</span>
                  <span className={`transition-transform duration-200 ${showMaterials ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: showMaterials ? 'auto' : 0, opacity: showMaterials ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-ivory-dim leading-relaxed pb-4">{product.materials}</p>
                </motion.div>
              </div>

              <div className="border-t border-noir-mid/50">
                <button
                  onClick={() => setShowCare(!showCare)}
                  className="w-full flex items-center justify-between py-4 text-xs tracking-[0.15em] uppercase text-ivory-dim min-h-[48px]"
                  aria-expanded={showCare}
                >
                  <span>Care Instructions</span>
                  <span className={`transition-transform duration-200 ${showCare ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: showCare ? 'auto' : 0, opacity: showCare ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-ivory-dim leading-relaxed pb-4">{product.care}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Size Guide Overlay */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </main>
  );
}
