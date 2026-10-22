import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BagProvider } from './context/BagContext';
import Navigation from './components/Navigation';
import BagDrawer from './components/BagDrawer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';
import BagPage from './pages/BagPage';
import MobileBottomNav from './components/MobileBottomNav';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<JournalPost />} />
          <Route path="/bag" element={<BagPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <BagProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-noir text-ivory">
          <Navigation />
          <AnimatedRoutes />
          <MobileBottomNav />
          <BagDrawer />
        </div>
      </BagProvider>
    </HashRouter>
  );
}
