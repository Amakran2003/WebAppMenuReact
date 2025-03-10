import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Données pour les actualités
const newsItems = [
  {
    id: 1,
    title: "Nouveau Smash Burger au menu !",
    description: "Notre nouveau Smash Burger avec bœuf Black Angus et sauce secrète est disponible dès maintenant.",
    date: "15 octobre 2025",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  }
];

// Données pour les spécialités
const specialties = [
  {
    id: 1,
    name: "Le Classique",
    description: "Bœuf, cheddar, bacon, laitue, tomate, oignon",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Burgers",
    menuItemId: "classic-burger"
  },
  {
    id: 2,
    name: "Le Végétarien",
    description: "Galette de légumes, fromage, avocat, roquette",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Burgers",
    menuItemId: "vege-burger"
  },
  {
    id: 3,
    name: "Frites Truffe",
    description: "Frites maison à l'huile de truffe et parmesan",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Sides",
    menuItemId: "truffle-fries"
  },
  {
    id: 4,
    name: "Onion Rings",
    description: "Rondelles d'oignon panées et croustillantes",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Sides",
    menuItemId: "onion-rings"
  },
  {
    id: 5,
    name: "Milkshake Oreo",
    description: "Milkshake crémeux aux biscuits Oreo",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    menuCategory: "Drinks",
    menuItemId: "oreo-milkshake"
  }
];

export default function Home() {
  const specialtiesRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = () => {
    if (specialtiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = specialtiesRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index based on scroll position
      const itemWidth = 280; // Width of each specialty item + gap
      const newActiveIndex = Math.round(scrollLeft / itemWidth);
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  // Add scroll event listener to track position
  useEffect(() => {
    const scrollContainer = specialtiesRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollability);
      return () => scrollContainer.removeEventListener('scroll', checkScrollability);
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

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <motion.section 
        className="flex items-center justify-center px-4 py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#9b2226] mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Bienvenue chez Craft Burger Co.
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 lg:mb-10 px-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Des burgers artisanaux préparés avec passion, des ingrédients locaux et une touche de créativité.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/menu"
              className="inline-block bg-[#9b2226] text-white px-6 sm:px-8 py-3 rounded-lg font-medium
                       hover:bg-[#660708] transition-colors duration-200 text-sm sm:text-base md:text-lg"
            >
              Voir le menu
            </Link>
            <Link
              to="/restaurants"
              className="inline-block bg-white text-[#9b2226] border-2 border-[#9b2226] px-6 sm:px-8 py-3 rounded-lg font-medium
                       hover:bg-[#f9f5f0] transition-colors duration-200 text-sm sm:text-base md:text-lg"
            >
              Nos restaurants
            </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-0">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#9b2226]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Nos Spécialités
            </motion.h2>
            
            <div className="hidden md:flex space-x-2">
              <motion.button
                onClick={() => scroll('left')}
                className={`p-2 rounded-full ${canScrollLeft ? 'bg-[#9b2226] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                whileHover={canScrollLeft ? { scale: 1.1 } : {}}
                whileTap={canScrollLeft ? { scale: 0.9 } : {}}
                disabled={!canScrollLeft}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                className={`p-2 rounded-full ${canScrollRight ? 'bg-[#9b2226] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
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
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -5, 
                        zIndex: 999, 
                        boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl shadow-xl overflow-hidden h-full"
                      style={{
                        willChange: 'transform',
                        position: 'relative',
                        transformOrigin: 'center center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        borderRadius: '0.75rem', // Explicitly define border radius
                      }}
                    >
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img 
                          src={specialty.image} 
                          alt={specialty.name} 
                          className="w-full h-36 sm:h-48 object-cover"
                          style={{ 
                            transform: 'translateZ(0)',
                            borderTopLeftRadius: '0.75rem',
                            borderTopRightRadius: '0.75rem',
                          }}
                        />
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#9b2226] mb-1 sm:mb-2">{specialty.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">{specialty.description}</p>
                        <span 
                          className="mt-3 sm:mt-4 inline-block text-xs sm:text-sm font-medium text-[#9b2226] hover:underline"
                        >
                          Voir sur le menu
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Mobile indicator dots */}
            <div className="flex justify-center space-x-2 mt-4 md:hidden">
              {specialties.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-[#9b2226]' : 'bg-gray-300'}`}
                  animate={{ scale: index === activeIndex ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section 
        className="py-12 bg-[#f9f5f0] relative"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#9b2226] text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nos Actualités
          </motion.h2>
          
          <div className="max-w-2xl mx-auto relative z-10">
            {newsItems.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  zIndex: 100,
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-[#9b2226]">{news.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-500">{news.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">{news.description}</p>
                  <Link 
                    to="/restaurants" 
                    className="mt-4 inline-block text-sm sm:text-base font-medium text-[#9b2226] hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    En savoir plus →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}