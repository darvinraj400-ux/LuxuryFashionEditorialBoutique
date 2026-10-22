import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBag } from '../context/BagContext';
import { ShoppingBag, Plus, Minus, X } from 'lucide-react';

export default function BagPage() {
  const { state, removeItem, updateQuantity, clearBag, subtotal, itemCount } = useBag();

  return (
    <main className="pt-20 md:pt-24">
      <section className="px-5 md:px-10 lg:px-16 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-editorial text-4xl md:text-5xl font-light mb-2">Your Bag</h1>
          <p className="text-xs tracking-[0.15em] uppercase text-ivory-dim mb-12">
            {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
          </p>

          {state.items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} strokeWidth={0.5} className="text-ivory-dim/30 mx-auto mb-6" />
              <p className="font-editorial text-2xl text-ivory-dim mb-3">Your bag is empty</p>
              <p className="text-sm text-ivory-dim/60 mb-8 max-w-sm mx-auto">
                Explore our collection to discover pieces crafted with intention.
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center px-8 py-4 bg-ivory text-noir text-xs tracking-[0.2em] uppercase hover:bg-ivory-dim transition-colors duration-300 min-h-[48px]"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Items List */}
              <div className="lg:col-span-8">
                <div className="divide-y divide-noir-mid/50">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="py-6 flex gap-5"
                    >
                      {/* Image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <div className="w-24 h-32 md:w-32 md:h-40 bg-noir-light overflow-hidden">
                          <img
                            src={item.product.variants[item.imageIndex]?.images[0] || item.product.variants[0].images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="font-editorial text-lg md:text-xl group-hover:text-burgundy-light transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim mt-1">
                              {item.color} — Size {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ivory-dim/50 hover:text-burgundy-light transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-noir-mid hover:border-ivory-dim transition-colors min-w-[44px] min-h-[44px]"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-noir-mid hover:border-ivory-dim transition-colors min-w-[44px] min-h-[44px]"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-editorial text-lg">
                            €{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Clear bag */}
                <button
                  onClick={clearBag}
                  className="mt-6 text-[10px] tracking-[0.15em] uppercase text-ivory-dim/50 hover:text-burgundy-light transition-colors min-h-[44px]"
                >
                  Clear Bag
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 bg-noir-light/50 border border-noir-mid p-6 md:p-8">
                  <h2 className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-ivory-dim">Subtotal</span>
                      <span>€{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ivory-dim">Shipping</span>
                      <span className="text-ivory-dim">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-noir-mid pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-xs tracking-[0.15em] uppercase">Total</span>
                      <span className="font-editorial text-xl">€{subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 bg-ivory text-noir text-xs tracking-[0.2em] uppercase hover:bg-ivory-dim transition-colors duration-300 min-h-[52px]"
                    onClick={() => alert('This is a demonstration. No real payment will be processed.')}
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-[10px] text-ivory-dim/40 mt-4 leading-relaxed text-center">
                    This is a demonstration store. No real payment will be processed.
                  </p>

                  <div className="mt-8 pt-6 border-t border-noir-mid/50">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim mb-3">Complimentary Services</p>
                    <ul className="space-y-2 text-xs text-ivory-dim">
                      <li>— Complimentary shipping on orders over €500</li>
                      <li>— Gift wrapping available</li>
                      <li>— 30-day returns</li>
                      <li>— alterations service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
