import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';
  const { theme, themeColors } = useTheme();

  // Detect if we're on desktop or mobile
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is the "md" breakpoint in Tailwind
    };
    
    // Initial check
    checkIfDesktop();
    
    // Update on window resize
    window.addEventListener('resize', checkIfDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  // Clean up any potential DOM issues from previous basket implementation
  useEffect(() => {
    const ensureUsableUI = () => {
      // Remove any potentially blocking overlays
      document.querySelectorAll('.fixed.inset-0').forEach(el => {
        if (el.parentElement) {
          el.parentElement.removeChild(el);
        }
      });
      
      // Restore pointer events and scrolling
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'visible';
      
      // Super-elevate navigation elements
      document.querySelectorAll('a, button, .nav-item, .logo').forEach(el => {
        el.setAttribute('style', 'z-index: 9999 !important; position: relative;');
      });
    };
    
    // Run immediately
    ensureUsableUI();
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/home' },
    { name: 'Nos Restaurants', path: '/restaurants' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" 
         style={{ backgroundColor: themeColors.background }}>
      <header className="fixed top-0 left-0 right-0 backdrop-blur-sm shadow-sm z-[9999] transition-colors duration-300"
              style={{ backgroundColor: `${theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.9)'}` }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/home" 
              className="text-xl sm:text-2xl font-serif font-bold nav-item"
              style={{ color: themeColors.heading, zIndex: 1000, position: 'relative' }}
            >
              Craft Burger Co.
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  to={item.path}
                  className={`font-medium text-sm lg:text-base nav-item ${
                    location.pathname === item.path ? 'border-b-2' : ''
                  }`}
                  style={{ 
                    color: themeColors.heading,
                    borderColor: location.pathname === item.path ? themeColors.heading : 'transparent',
                    zIndex: 1000, 
                    position: 'relative' 
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="relative">
              <ThemeToggle />
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                {theme === 'light'}
              </span>
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button
              className="relative z-60"
              style={{ color: themeColors.heading }}
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
          <div className="px-4 py-2 space-y-1 shadow-lg"
               style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a' }}>
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`block py-2 ${location.pathname === item.path ? 'font-semibold' : ''}`}
                  style={{ color: themeColors.heading }}
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

      {/* Footer - Show on all pages on desktop, hide on menu page on mobile */}
      {(!isMenuPage || (isMenuPage && isDesktop)) && (
        <footer className="py-4 text-sm sm:text-base transition-colors duration-300"
                style={{ 
                  backgroundColor: theme === 'light' ? themeColors.primary : '#1e1e1e',
                  color: theme === 'light' ? '#ffffff' : '#f5f5f5'
                }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; 2025 Craft Burger Co. Tous droits réservés.</p>
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <a href="#" 
                 className="hover:underline"
                 style={{ color: theme === 'light' ? '#ffffff' : '#f5f5f5' }}>
                Mentions légales
              </a>
              <a href="#" 
                 className="hover:underline"
                 style={{ color: theme === 'light' ? '#ffffff' : '#f5f5f5' }}>
                Politique de confidentialité
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}