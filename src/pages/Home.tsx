import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import SpecialtiesSection from '../components/SpecialtiesSection';
import NewsSection from '../components/NewsSection';
import MouseFollower from '../components/MouseFollower';

export default function Home() {
  const { themeColors, theme } = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    // Utiliser requestAnimationFrame pour une détection plus fluide du défilement
    let rafId: number;
    const checkScroll = () => {
      const now = Date.now();
      // Si un défilement récent est détecté
      setIsScrolling(now - lastScrollTime.current < 150);
      rafId = requestAnimationFrame(checkScroll);
    };
    
    rafId = requestAnimationFrame(checkScroll);
    
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Valeurs pour les animations parallaxes
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Define a consistent underline style for titles
  const underlineStyle = {
    backgroundColor: '#f8c136' // Yellow color for both light and dark modes
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] overflow-x-hidden">
      {/* Replace confetti with decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-0 right-0 w-full h-full opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, ${theme === 'light' ? 'rgba(155, 34, 38, 0.15)' : 'rgba(228, 90, 33, 0.15)'}, transparent 30%),
              radial-gradient(circle at 80% 60%, ${theme === 'light' ? 'rgba(248, 193, 54, 0.15)' : 'rgba(248, 193, 54, 0.2)'}, transparent 30%),
              radial-gradient(circle at 40% 80%, ${theme === 'light' ? 'rgba(155, 34, 38, 0.1)' : 'rgba(228, 90, 33, 0.1)'}, transparent 20%)
            `,
            transition: 'background 0.5s ease'
          }}
        />
      </div>
      
      {/* Suiveur de souris */}
      <MouseFollower />
      
      {/* Hero Section */}
      <motion.section 
        className="flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          backgroundImage: "radial-gradient(circle at 80% 10%, rgba(255, 200, 70, 0.15), transparent 40%), radial-gradient(circle at 20% 70%, rgba(155, 34, 38, 0.1), transparent 40%)",
        }}
      >
        {/* Background circles - modified for smoother parallax */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transform-gpu"
          style={{ 
            background: `radial-gradient(circle, ${theme === 'light' ? 'rgba(155, 34, 38, 0.1)' : 'rgba(228, 90, 33, 0.15)'}, ${theme === 'light' ? 'rgba(155, 34, 38, 0.2)' : 'rgba(228, 90, 33, 0.25)'})`,
            y: isScrolling ? 0 : y1,
            willChange: 'transform, opacity'
          }}
          animate={!isScrolling ? {
            scale: [1, 1.05, 1],
          } : { scale: 1 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl will-change-transform"
          style={{ 
            background: `radial-gradient(circle, ${theme === 'light' ? 'rgba(248, 193, 54, 0.1)' : 'rgba(248, 193, 54, 0.2)'}, ${theme === 'light' ? 'rgba(155, 34, 38, 0.05)' : 'rgba(155, 34, 38, 0.15)'})`,
            y: isScrolling ? 0 : y2 
          }}
          animate={!isScrolling ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

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
                style={underlineStyle} // Use the consistent underline style
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

      {/* Specialties Section Component */}
      <SpecialtiesSection />

      {/* News Section Component */}
      <NewsSection />
    </div>
  );
}