import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useBag } from '../context/BagContext';

const navLinks = [
  { to: '/', label: 'Editorial' },
  { to: '/collection', label: 'Collection' },
  { to: '/journal', label: 'Journal' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toggleBag, itemCount } = useBag();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-noir/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 md:px-10 lg:px-16 h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1} />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs tracking-[0.2em] uppercase text-ivory-dim hover:text-ivory transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <h1 className="font-editorial text-lg md:text-xl tracking-[0.3em] uppercase font-light">
              Atelier Noir
            </h1>
          </Link>

          {/* Bag button */}
          <button
            onClick={toggleBag}
            className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center relative"
            aria-label={`Shopping bag, ${itemCount} items`}
          >
            <ShoppingBag size={18} strokeWidth={1} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-0 w-4 h-4 bg-burgundy text-ivory text-[9px] rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-noir"
          >
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex items-center justify-between px-5 h-16">
                <span className="font-editorial text-sm tracking-[0.2em] uppercase text-ivory-dim">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      className="block py-5 font-editorial text-4xl md:text-5xl font-light tracking-wide text-ivory hover:text-burgundy-light transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="px-5 pb-12"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-ivory-dim mb-4">Season</p>
                <p className="font-editorial text-lg text-ivory">Autumn/Winter 2026 — Obsidian</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
