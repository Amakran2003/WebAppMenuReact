import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  // Clean up any potential DOM issues from previous basket implementation
  useEffect(() => {
    const ensureUsableUI = () => {
      // Supprimer tous les overlays potentiellement bloquants
      document.querySelectorAll('.fixed.inset-0').forEach(el => {
        if (el.parentElement) {
          el.parentElement.removeChild(el);
        }
      });
      
      // Rétablir les événements de pointeur et le défilement
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'visible';
      
      // Super-élever les éléments de navigation
      document.querySelectorAll('a, button, .nav-item, .logo').forEach(el => {
        el.setAttribute('style', 'z-index: 9999 !important; position: relative;');
      });
    };
    
    // Exécuter immédiatement
    ensureUsableUI();
  }, []);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Nos Restaurants', path: '/restaurants' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5f0] to-[#fff] flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-[9999]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/home" 
              className="text-xl sm:text-2xl font-serif text-[#9b2226] font-bold nav-item"
              style={{ zIndex: 1000, position: 'relative' }}
            >
              Asian Touch
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  to={item.path}
                  className={`text-[#9b2226] hover:text-[#660708] font-medium text-sm lg:text-base nav-item ${
                    location.pathname === item.path ? 'border-b-2 border-[#9b2226]' : ''
                  }`}
                  style={{ zIndex: 1000, position: 'relative' }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              className="text-[#9b2226] relative z-60"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: isMobileMenuOpen ? 'visible' : 'hidden' }}
        >
          <div className="px-4 py-2 space-y-1 bg-white shadow-lg">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`block py-2 text-[#9b2226] hover:text-[#660708] ${
                    location.pathname === item.path ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 lg:mt-20 relative z-[50]">
        {children}
      </main>

      {/* Footer - Only show if not on Menu page */}
      {!isMenuPage && (
        <footer className="bg-[#9b2226] text-white py-4 text-sm sm:text-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; 2025 Asian Touch. Tous droits réservés.</p>
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <a href="#" className="hover:underline">Mentions légales</a>
              <a href="#" className="hover:underline">Politique de confidentialité</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}