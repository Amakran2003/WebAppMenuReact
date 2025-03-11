import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { menuCategories } from '../data/menuData';
import { useTheme } from '../context/ThemeContext';

export default function Menu() {
  const { themeColors } = useTheme();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const itemParam = searchParams.get('item');
  
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const highlightedItemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Si un paramètre de catégorie est fourni, sélectionnez cette catégorie
    if (categoryParam) {
      const categoryExists = menuCategories.some(cat => cat.name === categoryParam);
      if (categoryExists) {
        setActiveCategory(categoryParam);
      }
    }
    
    // Définir l'élément à mettre en évidence
    if (itemParam) {
      setHighlightedItem(itemParam);
    }
  }, [categoryParam, itemParam]);
  
  useEffect(() => {
    // Faire défiler jusqu'à l'élément mis en évidence avec un léger délai
    // pour permettre au rendu de se terminer
    if (highlightedItem && highlightedItemRef.current) {
      const timer = setTimeout(() => {
        highlightedItemRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [highlightedItem, activeCategory]);

  // Fonction qui gère le changement de catégorie
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Reset highlighted item when changing categories unless it's from URL params
    if (!categoryParam || !itemParam) {
      setHighlightedItem(null);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="pb-24 lg:pb-12 relative"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className="text-4xl font-serif font-bold text-center mb-12"
          style={{ color: themeColors.heading }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeCategory}
        </motion.h1>

        {/* Desktop Category Navigation */}
        <div className="hidden lg:flex justify-center mb-10 space-x-8">
          {menuCategories.map((category) => (
            <motion.button
              key={category.name}
              className="px-5 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: activeCategory === category.name ? themeColors.primary : themeColors.cardBackground,
                color: activeCategory === category.name ? '#ffffff' : themeColors.text
              }}
              onClick={() => handleCategoryChange(category.name)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="space-y-8">
          {menuCategories
            .filter(category => category.name === activeCategory)
            .map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Display all categories in the standard way */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={`${item.id}-${itemIndex}`}
                      id={item.id}
                      ref={item.id === highlightedItem ? highlightedItemRef : null}
                      className="rounded-lg shadow-md overflow-hidden flex flex-col relative"
                      style={{
                        backgroundColor: themeColors.cardBackground,
                        boxShadow: item.id === highlightedItem ? `0 0 0 4px ${themeColors.primary}` : undefined
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: item.id === highlightedItem ? 1.02 : 1
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: itemIndex * 0.1
                      }}
                      whileHover={{ y: -3 }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold"
                                style={{ color: themeColors.text }}>
                              {item.name}
                            </h3>
                            <span className="font-bold ml-2"
                                  style={{ color: themeColors.primary }}>
                              {item.price}
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: themeColors.text }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation - Hide on large screens */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t"
        style={{
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.text === '#1a1a1a' ? '#e5e7eb' : '#4b5563'
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="flex justify-around py-2 overflow-x-auto">
            {menuCategories.map((category) => (
              <motion.button
                key={category.name}
                className="flex flex-col items-center px-2 sm:px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                style={{
                  color: activeCategory === category.name ? themeColors.primary : themeColors.text
                }}
                onClick={() => handleCategoryChange(category.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs sm:text-sm">{category.name}</span>
                {activeCategory === category.name && (
                  <motion.div
                    className="w-1 h-1 rounded-full mt-1"
                    style={{ backgroundColor: themeColors.primary }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}