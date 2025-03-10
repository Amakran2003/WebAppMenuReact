import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

// Define interface for menu items to fix type issues
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string; // Make category optional
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    name: 'Boissons',
    items: [
      { id: 'the-vert', name: 'Thé vert', description: 'Thé japonais traditionnel', price: '3,50€', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800' },
      { id: 'bubble-tea', name: 'Bubble Tea', description: 'Thé au lait avec perles de tapioca', price: '5,90€', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=800' },
      { id: 'sake', name: 'Saké', description: 'Alcool de riz japonais (12cl)', price: '7,50€', image: 'https://images.unsplash.com/photo-1579274482166-8f8ee2c5f399?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Brunch',
    items: [
      // Boissons chaudes
      { id: 'matcha-latte', name: 'Matcha Latte', description: 'Thé matcha et lait crémeux', price: '5,50€', image: 'https://images.unsplash.com/photo-1545518514-ce8448f54637?auto=format&fit=crop&q=80&w=800', category: 'Boissons chaudes' },
      { id: 'cappuccino', name: 'Cappuccino', description: 'Double expresso et mousse de lait', price: '4,20€', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800', category: 'Boissons chaudes' },
      
      // Boissons froides
      { id: 'iced-matcha', name: 'Matcha Glacé', description: 'Matcha glacé sur lit de lait', price: '5,90€', image: 'https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?auto=format&fit=crop&q=80&w=800', category: 'Boissons froides' },
      { id: 'citron-ice-tea', name: 'Ice Tea Yuzu', description: 'Thé glacé parfumé au yuzu', price: '4,90€', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800', category: 'Boissons froides' },
      
      // Smoothies
      { id: 'mango-smoothie', name: 'Smoothie Mangue', description: 'Mangue, ananas et lait de coco', price: '6,50€', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=800', category: 'Smoothies' },
      { id: 'berry-smoothie', name: 'Smoothie Baies', description: 'Fruits rouges, banane et lait d\'amande', price: '6,50€', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800', category: 'Smoothies' },
      
      // Côté salé
      { id: 'avocado-toast', name: 'Avocado Toast', description: 'Pain au levain, avocat et œuf poché', price: '11,90€', image: 'https://images.unsplash.com/photo-1603046891744-76e6e5ab1dbf?auto=format&fit=crop&q=80&w=800', category: 'Côté salé' },
      { id: 'salmon-bagel', name: 'Bagel Saumon', description: 'Bagel, saumon fumé et cream cheese', price: '10,90€', image: 'https://images.unsplash.com/photo-1595422656744-42dbde91e534?auto=format&fit=crop&q=80&w=800', category: 'Côté salé' },
      { id: 'dim-sum', name: 'Assortiment Dim Sum', description: 'Sélection de 8 dim sum vapeur', price: '12,90€', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800', category: 'Côté salé' },
      
      // Côté sucré
      { id: 'pancakes', name: 'Pancakes', description: 'Pancakes, fruits rouges et sirop d\'érable', price: '8,90€', image: 'https://images.unsplash.com/photo-1611146029964-553bc583bf1c?auto=format&fit=crop&q=80&w=800', category: 'Côté sucré' },
      { id: 'french-toast', name: 'Pain Perdu', description: 'Pain perdu à la cannelle et fruits frais', price: '9,50€', image: 'https://images.unsplash.com/photo-1639108094328-2b94a49b1c2e?auto=format&fit=crop&q=80&w=800', category: 'Côté sucré' },
      { id: 'acai-bowl', name: 'Açaí Bowl', description: 'Smoothie bowl açaí, granola et fruits frais', price: '10,50€', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800', category: 'Côté sucré' }
    ]
  },
  {
    name: 'Plats',
    items: [
      { id: 'riz-saute', name: 'Riz sauté', description: 'Riz sauté aux légumes et œuf', price: '8,90€', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800' },
      { id: 'nouilles-sautees', name: 'Nouilles sautées', description: 'Nouilles sautées au poulet et légumes', price: '10,90€', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
      { id: 'gyoza', name: 'Gyoza', description: '6 raviolis japonais grillés', price: '6,90€', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Sushis',
    items: [
      { id: 'maki-saumon', name: 'Maki Saumon', description: '6 pièces de maki au saumon', price: '5,90€', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800' },
      { id: 'california-roll', name: 'California Roll', description: '6 pièces de california avocat-crabe', price: '6,90€', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=800' },
      { id: 'nigiri-mix', name: 'Nigiri Mix', description: '6 pièces variées de nigiri', price: '9,90€', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Thai',
    items: [
      { id: 'pad-thai', name: 'Pad Thaï', description: 'Nouilles de riz sautées au poulet et cacahuètes', price: '12,90€', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800' },
      { id: 'curry-vert', name: 'Curry vert', description: 'Curry vert au lait de coco et poulet', price: '13,90€', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800' },
      { id: 'tom-yum', name: 'Tom Yum', description: 'Soupe épicée aux crevettes et citronnelle', price: '8,90€', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { id: 'mochi', name: 'Mochi', description: 'Gâteau de riz japonais fourré', price: '4,90€', image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&q=80&w=800' },
      { id: 'perles-coco', name: 'Perles de coco', description: 'Dessert thaïlandais aux perles de tapioca', price: '5,50€', image: 'https://images.unsplash.com/photo-1606243147559-cd6b1c323aaa?auto=format&fit=crop&q=80&w=800' },
      { id: 'creme-brulee', name: 'Crème brûlée matcha', description: 'Crème brûlée parfumée au thé vert', price: '6,90€', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Promos',
    items: [
      { id: 'menu-midi', name: 'Menu Midi', description: 'Plat + Boisson + Dessert', price: '14,90€', image: 'https://images.unsplash.com/photo-1617518468243-1e6e9403e3f2?auto=format&fit=crop&q=80&w=800' },
      { id: 'combo-sushis', name: 'Combo Sushis', description: '12 pièces + Soupe miso', price: '16,90€', image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&q=80&w=800' },
      { id: 'formule-duo', name: 'Formule Duo', description: '2 plats + 2 desserts', price: '29,90€', image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export default function Menu() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const itemParam = searchParams.get('item');
  
  const [activeCategory, setActiveCategory] = useState('Plats');
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
          className="text-4xl font-serif font-bold text-[#9b2226] text-center mb-12"
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
              className={`px-5 py-2 rounded-lg transition-colors ${
                activeCategory === category.name
                  ? 'bg-[#9b2226] text-white font-medium'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
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
                {/* Si c'est la catégorie Brunch, grouper les items par sous-catégorie */}
                {category.name === 'Brunch' ? (
                  <>
                    {/* Regrouper les items par sous-catégorie */}
                    {['Boissons chaudes', 'Boissons froides', 'Smoothies', 'Côté salé', 'Côté sucré'].map(subcategory => {
                      // Filtrer les items de cette sous-catégorie
                      const subcategoryItems = category.items.filter(item => item.category === subcategory);
                      
                      return subcategoryItems.length > 0 ? (
                        <div key={subcategory} className="mb-10">
                          <h3 className="text-2xl font-serif text-[#9b2226] mb-4">{subcategory}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subcategoryItems.map((item, itemIndex) => (
                              <motion.div
                                key={`${item.id}-${itemIndex}`}
                                id={item.id}
                                ref={item.id === highlightedItem ? highlightedItemRef : null}
                                className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative ${
                                  item.id === highlightedItem ? 'ring-4 ring-[#9b2226] ring-opacity-75' : ''
                                }`}
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
                                      <h3 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                      </h3>
                                      <span className="text-[#9b2226] font-bold ml-2">
                                        {item.price}
                                      </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </>
                ) : (
                  // Affichage standard pour les autres catégories
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={`${item.id}-${itemIndex}`}
                        id={item.id}
                        ref={item.id === highlightedItem ? highlightedItemRef : null}
                        className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative ${
                          item.id === highlightedItem ? 'ring-4 ring-[#9b2226] ring-opacity-75' : ''
                        }`}
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
                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.name}
                              </h3>
                              <span className="text-[#9b2226] font-bold ml-2">
                                {item.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation - Hide on large screens */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 lg:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="flex justify-around py-2 overflow-x-auto">
            {menuCategories.map((category) => (
              <motion.button
                key={category.name}
                className={`flex flex-col items-center px-2 sm:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === category.name
                    ? 'text-[#9b2226] font-medium'
                    : 'text-gray-600'
                }`}
                onClick={() => handleCategoryChange(category.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs sm:text-sm">{category.name}</span>
                {activeCategory === category.name && (
                  <motion.div
                    className="w-1 h-1 bg-[#9b2226] rounded-full mt-1"
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