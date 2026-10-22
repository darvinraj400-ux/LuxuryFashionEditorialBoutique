import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useBag } from '../context/BagContext';
import { Link } from 'react-router-dom';

export default function BagDrawer() {
  const { state, closeBag, removeItem, updateQuantity, subtotal, itemCount } = useBag();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={closeBag}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full sm:w-[420px] bg-noir border-l border-noir-mid flex flex-col"
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-noir-mid flex-shrink-0">
              <h2 className="font-editorial text-lg tracking-wide">Your Bag</h2>
              <button
                onClick={closeBag}
                className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close bag"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-5 text-center">
                  <ShoppingBag size={32} strokeWidth={0.5} className="text-ivory-dim mb-4" />
                  <p className="font-editorial text-xl text-ivory-dim mb-2">Your bag is empty</p>
                  <p className="text-xs text-ivory-dim/60 tracking-wide">
                    Explore the collection to find your next piece.
                  </p>
                  <Link
                    to="/collection"
                    onClick={closeBag}
                    className="mt-6 text-xs tracking-[0.2em] uppercase text-burgundy-light hover:text-burgundy transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              ) : (
                <div className="px-5 py-4 space-y-6">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="w-20 h-28 bg-noir-light flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.variants[item.imageIndex]?.images[0] || item.product.variants[0].images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-editorial text-sm leading-tight mb-1">{item.product.name}</h3>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim mb-1">
                          {item.color} — Size {item.size}
                        </p>
                        <p className="text-xs text-ivory-dim mb-3">
                          €{item.product.price.toLocaleString()}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-noir-mid hover:border-ivory-dim transition-colors min-w-[44px] min-h-[44px]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-noir-mid hover:border-ivory-dim transition-colors min-w-[44px] min-h-[44px]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="ml-auto text-[10px] tracking-[0.15em] uppercase text-ivory-dim/60 hover:text-burgundy-light transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-noir-mid px-5 py-5 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs tracking-[0.15em] uppercase text-ivory-dim">Subtotal</span>
                  <span className="font-editorial text-lg">€{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-ivory-dim/50 mb-4 leading-relaxed">
                  Shipping and taxes calculated at checkout. This is a demonstration — no real payment will be processed.
                </p>
                <button
                  className="w-full py-4 bg-ivory text-noir text-xs tracking-[0.2em] uppercase hover:bg-ivory-dim transition-colors duration-300 min-h-[48px]"
                  onClick={() => {
                    alert('This is a demonstration. No real payment will be processed.');
                  }}
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/bag"
                  onClick={closeBag}
                  className="block text-center mt-3 text-[10px] tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors py-2"
                >
                  View Full Bag ({itemCount})
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
