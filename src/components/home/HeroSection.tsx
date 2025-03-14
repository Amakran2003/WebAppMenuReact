/**
 * HeroSection Component
 * 
 * The main hero section displayed at the top of the homepage.
 * Features animated elements, responsive design, and parallax scrolling effects.
 * 
 * Imported by:
 * - Home.tsx
 */
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ThemedButton from '../common/ThemedButton';

// Remove unused props interface since isScrolling is no longer needed
export default function HeroSection() {
  const { themeColors, theme } = useTheme();

  // Define a consistent underline style for titles
  const underlineStyle = {
    backgroundColor: '#f8c136' // Yellow color for both light and dark modes
  };

  return (
    <motion.section 
      className="flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ 
        backgroundImage: "radial-gradient(circle at 80% 10%, rgba(255, 200, 70, 0.15), transparent 40%), radial-gradient(circle at 20% 70%, rgba(155, 34, 38, 0.1), transparent 40%)",
      }}
    >
      <div className="text-center max-w-5xl mx-auto z-10">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 lg:mb-8"
          style={{ 
            color: themeColors.heading,
            textShadow: theme === 'light' 
              ? "0px 0px 5px rgba(255, 255, 255, 0.8)" 
              : "0px 0px 8px rgba(0, 0, 0, 0.7), 0px 0px 3px rgba(155, 34, 38, 0.5)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Bienvenue chez{' '}
          <div className="relative inline-block">
            <span className="relative z-10">Craft Burger Co.</span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-3 w-full rounded-lg -z-10"
              style={underlineStyle}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </div>
        </motion.h1>
        
        <motion.div 
          className="relative mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
            alt="Burger délicieux"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl shadow-xl"
            style={{ 
              boxShadow: theme === 'light' 
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                : "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4)"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 lg:mb-10 px-4 max-w-3xl mx-auto"
          style={{ 
            color: theme === 'light' ? '#4b5563' : '#e5e7eb',
            textShadow: theme === 'dark' ? "0px 1px 2px rgba(0, 0, 0, 0.8)" : "none" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Des burgers artisanaux préparés avec passion, des ingrédients locaux et une touche de créativité.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <ThemedButton to="/menu" variant="primary">
            Voir le menu
          </ThemedButton>
          
          <ThemedButton to="/restaurants" variant="secondary">
            Nos restaurants
          </ThemedButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
