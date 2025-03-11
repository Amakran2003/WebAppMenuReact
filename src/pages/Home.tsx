import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Confetti from '../components/Confetti';
import { newsItems, specialties } from '../data/menuData';

// Composant d'élément flottant optimisé
function FloatingElement({ 
  emoji, 
  x, 
  y, 
  delay, 
  duration 
}: { 
  emoji: string; 
  x: number; 
  y: number; 
  delay: number; 
  duration: number; 
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    let rafId: number;
    
    const checkScroll = () => {
      const now = Date.now();
      // Si défilement récent détecté
      setIsScrolling(now - lastScrollTime.current < 100);
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

  return (
    <motion.div
      className="absolute text-3xl sm:text-4xl pointer-events-none z-10 transform-gpu"
      initial={{ opacity: 0, scale: 0 }}
      style={{ 
        opacity: isScrolling ? 0.4 : undefined,
        willChange: 'transform, opacity'
      }}
      animate={!isScrolling ? { 
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1, 0],
        x: [x, x + 50, x + 70, x + 100],
        y: [y, y - 50, y - 70, y - 100],
        rotate: [0, 5, -5, 0]
      } : {
        // Animation simplifiée pendant le défilement
        x: x + 50,
        y: y - 50,
        opacity: 0.4,
        scale: 0.8
      }}
      transition={{ 
        duration: isScrolling ? 0 : duration, 
        delay: delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "linear",
        type: isScrolling ? "tween" : "keyframes"
      }}
    >
      {emoji}
    </motion.div>
  );
}

// Composant pour le suiveur de souris
function MouseFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full bg-[#9b2226] opacity-20 pointer-events-none z-50 hidden md:block"
      style={{
        top: -15,
        left: -15,
        x: springX,
        y: springY
      }}
    />
  );
}

export default function Home() {
  const specialtiesRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Ajout d'un état pour forcer le rendu des confettis
  const [confettiKey, setConfettiKey] = useState(Date.now());
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    setConfettiKey(Date.now());
    
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

  const checkScrollability = () => {
    if (specialtiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = specialtiesRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Improved calculation for active index, especially for the last item
      const lastPossibleScrollPosition = scrollWidth - clientWidth;
      const scrollRatio = scrollLeft / lastPossibleScrollPosition;
      const totalItems = specialties.length;
      
      let newActiveIndex;
      
      // Check if we're at or very near the end of scroll
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        // If we're at the end, set to the last item
        newActiveIndex = totalItems - 1;
      } else {
        // Otherwise calculate based on scroll position
        // This maps the scroll ratio to the item index range
        newActiveIndex = Math.min(
          Math.round(scrollRatio * (totalItems - 1)),
          totalItems - 1
        );
      }

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  // Enhance the scroll detection
  useEffect(() => {
    const scrollContainer = specialtiesRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        checkScrollability();
        // Add a second check after a short delay to catch the end of momentum scrolling
        setTimeout(checkScrollability, 200);
      };
      
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Also run checkScrollability when the component mounts
      checkScrollability();
      
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (specialtiesRef.current) {
      const scrollAmount = 320;
      const currentScroll = specialtiesRef.current.scrollLeft;
      specialtiesRef.current.scrollTo({
        left: direction === 'left' 
          ? currentScroll - scrollAmount 
          : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
      
      // Small timeout to let the scroll happen before checking
      setTimeout(checkScrollability, 300);
    }
  };

  // Animation pour les éléments qui suivent la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] overflow-x-hidden">
      {/* Confetti animation - now shown all the time with optimized animations */}
      <Confetti key={confettiKey} />
      
      {/* Suiveur de souris */}
      <MouseFollower />
      
      {/* Éléments flottants - réduits en nombre */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingElement emoji="🍔" x={100} y={200} delay={0} duration={22} />
        <FloatingElement emoji="🍟" x={300} y={400} delay={5} duration={20} />
        <FloatingElement emoji="🥤" x={700} y={300} delay={2} duration={25} />
      </div>
      
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
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#9b2226]/5 to-[#9b2226]/20 dark:from-[#e45a21]/10 dark:to-[#e45a21]/20 blur-3xl transform-gpu"
          style={{ 
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
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#f8c136]/10 to-[#e45a21]/5 dark:from-[#f8c136]/20 dark:to-[#e45a21]/10 blur-3xl will-change-transform"
          style={{ y: isScrolling ? 0 : y2 }}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#9b2226] dark:text-[#e45a21] mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textShadow: "0px 0px 5px rgba(255, 255, 255, 0.8)" }}
          >
            Bienvenue chez{' '}
            <div className="relative inline-block">
              <span className="relative z-10">Craft Burger Co.</span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-3 bg-[#f8c136]/30 dark:bg-[#f8c136]/50 w-full rounded-lg -z-10"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 lg:mb-10 px-4 max-w-3xl mx-auto"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="inline-block bg-[#9b2226] text-white px-6 sm:px-8 py-3 rounded-lg font-medium
                         hover:bg-[#660708] transition-colors duration-200 text-sm sm:text-base md:text-lg relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
                Voir le menu
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/restaurants"
                className="inline-block bg-white text-[#9b2226] border-2 border-[#9b2226] px-6 sm:px-8 py-3 rounded-lg font-medium
                         hover:bg-[#f9f5f0] transition-colors duration-200 text-sm sm:text-base md:text-lg relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 bg-[#9b2226]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
                Nos restaurants
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Specialties Slider Section */}
      <motion.section 
        className="py-16 sm:py-20 relative" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background décoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-40 -right-20 w-40 h-40 rounded-full border-4 border-[#9b2226]/10 dark:border-[#e45a21]/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 -left-10 w-20 h-20 rounded-full border-4 border-[#f8c136]/10 dark:border-[#f8c136]/20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#9b2226] dark:text-[#e45a21] relative z-10">
                Nos Spécialités
              </h2>
              <motion.div 
                className="absolute -bottom-2 left-0 h-2 bg-[#f8c136]/40 dark:bg-[#f8c136]/60 w-full rounded-lg" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <div className="hidden md:flex space-x-2">
              <motion.button
                onClick={() => scroll('left')}
                className={`p-2 rounded-full ${canScrollLeft ? 'bg-[#9b2226] text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'}`}
                whileHover={canScrollLeft ? { scale: 1.1 } : {}}
                whileTap={canScrollLeft ? { scale: 0.9 } : {}}
                disabled={!canScrollLeft}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                className={`p-2 rounded-full ${canScrollRight ? 'bg-[#9b2226] text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'}`}
                whileHover={canScrollRight ? { scale: 1.1 } : {}}
                whileTap={canScrollRight ? { scale: 0.9 } : {}}
                disabled={!canScrollRight}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
          
          <div 
            className="relative pt-6 pb-4" 
            onMouseEnter={checkScrollability}
            style={{ zIndex: 1 }}
          >
            <div 
              ref={specialtiesRef} 
              className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory relative"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
              onScroll={checkScrollability}
            >
              {specialties.map((specialty, index) => (
                <div
                  key={specialty.id}
                  className="flex-shrink-0 w-[250px] sm:w-[280px] snap-center relative"
                  style={{ isolation: 'isolate' }}
                >
                  <Link 
                    to={`/menu?category=${specialty.menuCategory}&item=${specialty.menuItemId}`}
                    className="block h-full rounded-xl"
                    style={{ position: 'relative', zIndex: 10, transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -5, 
                        zIndex: 999, 
                        boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        rotateY: mousePosition.x > window.innerWidth / 2 ? -5 : 5,
                        rotateX: mousePosition.y > window.innerHeight / 2 ? 5 : -5
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden h-full"
                      style={{
                        willChange: 'transform',
                        position: 'relative',
                        transformOrigin: 'center center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        borderRadius: '0.75rem',
                      }}
                    >
                      <div className="relative overflow-hidden rounded-t-xl">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                          <p className="text-white text-xs font-medium">Découvrir</p>
                        </motion.div>
                        <motion.img 
                          src={specialty.image} 
                          alt={specialty.name} 
                          className="w-full h-36 sm:h-48 object-cover"
                          style={{ 
                            transform: 'translateZ(0)',
                            borderTopLeftRadius: '0.75rem',
                            borderTopRightRadius: '0.75rem',
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#9b2226] dark:text-[#e45a21] mb-1 sm:mb-2 flex items-center">
                          {specialty.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{specialty.description}</p>
                        <span 
                          className="mt-3 sm:mt-4 inline-block text-xs sm:text-sm font-medium text-[#9b2226] dark:text-[#e45a21] hover:underline group-hover:text-[#660708] dark:group-hover:text-[#f8c136] transition-colors duration-200"
                        >
                          Voir sur le menu
                          <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="inline-block ml-1"
                          >
                            →
                          </motion.span>
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Mobile indicator dots */}
            <div className="flex justify-center space-x-2 mt-4 md:hidden">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-[#9b2226] dark:bg-[#e45a21]' : 'bg-gray-300 dark:bg-gray-600'}`}
                  animate={{ scale: index === activeIndex ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // Allow clicking on dots to scroll to that item
                    if (specialtiesRef.current) {
                      const itemWidth = 280; // Width of each specialty item + gap
                      specialtiesRef.current.scrollTo({
                        left: index * itemWidth,
                        behavior: 'smooth'
                      });
                      setActiveIndex(index);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section 
        className="py-12 bg-[#f9f5f0] dark:bg-gray-900 relative overflow-hidden"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background details */}
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#9b2226]/5 dark:bg-[#e45a21]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#f8c136]/5 dark:bg-[#f8c136]/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#9b2226] dark:text-[#e45a21] text-center mb-2">
              Nos Actualités
            </h2>
            <div className="flex justify-center mb-8">
              <motion.div 
                className="h-1 w-20 bg-[#9b2226]/30 dark:bg-[#e45a21]/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
          
          <div className="max-w-2xl mx-auto relative z-10">
            {newsItems.map((news, index) => (
              <Link
                key={news.id}
                to={news.link}
                onClick={() => window.scrollTo(0, 0)}
                className="block mb-8 last:mb-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    zIndex: 100,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group"
                  style={{ willChange: 'transform' }}
                >
                  <div className="relative">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                    <motion.div 
                      className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-700 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {news.date}
                    </motion.div>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[#9b2226] dark:text-[#e45a21] mb-2">{news.title}</h3>
                      <div className="w-10 h-1 bg-[#f8c136]/50 dark:bg-[#f8c136]/70 rounded-full" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{news.description}</p>
                    
                    <div className="mt-4">
                      <span 
                        className="inline-flex items-center text-sm sm:text-base font-medium text-[#9b2226] dark:text-[#e45a21] group-hover:underline"
                      >
                        En savoir plus 
                        <motion.span 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                          className="inline-block ml-1"
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}