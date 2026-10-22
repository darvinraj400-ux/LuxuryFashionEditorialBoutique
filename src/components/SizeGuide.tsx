import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sizeGuideData } from '../data/products';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-noir border-t border-noir-mid max-h-[80vh] overflow-y-auto md:top-1/2 md:-translate-y-1/2 md:max-h-[70vh] md:max-w-lg md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:border md:rounded-none"
            role="dialog"
            aria-label="Size guide"
            aria-modal="true"
          >
            {/* Header */}
            <div className="sticky top-0 bg-noir border-b border-noir-mid px-5 py-4 flex items-center justify-between">
              <h2 className="font-editorial text-lg tracking-wide">Size Guide</h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close size guide"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-6">
              <p className="text-xs text-ivory-dim mb-6 leading-relaxed">
                All measurements are in centimeters. If you are between sizes, we recommend sizing up for a relaxed fit or down for a closer silhouette.
              </p>

              <h3 className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-3">Women's Sizing</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-noir-mid">
                      {sizeGuideData.women.headers.map((header) => (
                        <th
                          key={header}
                          className="text-left py-3 pr-4 text-[10px] tracking-[0.15em] uppercase text-ivory-dim font-normal"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.women.rows.map((row, i) => (
                      <tr key={i} className="border-b border-noir-mid/50">
                        {row.map((cell, j) => (
                          <td key={j} className="py-3 pr-4 text-xs text-ivory">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-6 border-t border-noir-mid/50">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-3">How to Measure</h3>
                <ul className="space-y-2 text-xs text-ivory-dim leading-relaxed">
                  <li><span className="text-ivory">Bust:</span> Measure around the fullest part of your chest.</li>
                  <li><span className="text-ivory">Waist:</span> Measure at the narrowest point of your natural waistline.</li>
                  <li><span className="text-ivory">Hip:</span> Measure around the fullest part of your hips.</li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-noir-mid/50">
                <p className="text-[10px] tracking-[0.15em] uppercase text-ivory-dim mb-2">Need assistance?</p>
                <p className="text-xs text-ivory-dim">
                  Contact our atelier at <span className="text-burgundy-light">concierge@ateliernoir.com</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
