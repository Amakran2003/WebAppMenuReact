import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Nos Restaurants', path: '/restaurants' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5f0] to-[#fff] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-2xl font-serif text-[#9b2226] font-bold">
              Asian Touch
            </Link>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  to={item.path}
                  className={`text-[#9b2226] hover:text-[#660708] font-medium ${
                    location.pathname === item.path ? 'border-b-2 border-[#9b2226]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            className="md:hidden text-[#9b2226]"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
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
      <main className="flex-1 mt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#9b2226] text-white text-center py-4">
        <p>&copy; 2025 Asian Touch. Tous droits réservés.</p>
      </footer>
    </div>
  );
}