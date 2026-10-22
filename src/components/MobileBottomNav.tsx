import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, BookOpen, Grid3X3, Home } from 'lucide-react';
import { useBag } from '../context/BagContext';

const navItems = [
  { to: '/', icon: Home, label: 'Editorial' },
  { to: '/collection', icon: Grid3X3, label: 'Collection' },
  { to: '/journal', icon: BookOpen, label: 'Journal' },
  { to: '/bag', icon: ShoppingBag, label: 'Bag' },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { itemCount } = useBag();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-noir/95 backdrop-blur-md border-t border-noir-mid"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to === '/collection' && location.pathname.startsWith('/product'));
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  size={18}
                  strokeWidth={isActive ? 1.5 : 1}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-ivory' : 'text-ivory-dim/50'
                  }`}
                />
                {item.label === 'Bag' && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-burgundy text-ivory text-[8px] rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[9px] tracking-[0.1em] uppercase mt-1 transition-colors duration-200 ${
                  isActive ? 'text-ivory' : 'text-ivory-dim/50'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-px bg-burgundy-light"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
