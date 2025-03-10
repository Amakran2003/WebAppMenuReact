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
    name: 'Burgers',
    items: [
      { id: 'classic-burger', name: 'Le Classique', description: 'Bœuf Black Angus, cheddar, bacon, laitue, tomate, oignon rouge, sauce maison', price: '14,90€', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80' },
      { id: 'blue-burger', name: 'Le Blue', description: 'Bœuf Black Angus, fromage bleu, champignons caramélisés, roquette, sauce au poivre', price: '15,90€', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' },
      { id: 'vege-burger', name: 'Le Végétarien', description: 'Galette de légumes, fromage de chèvre, avocat, roquette, tomate, sauce yaourt aux herbes', price: '13,90€', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80' },
      { id: 'bbq-burger', name: 'Le BBQ', description: 'Bœuf Black Angus, cheddar fumé, oignons caramélisés, bacon grillé, sauce BBQ maison', price: '15,90€', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
      { id: 'spicy-burger', name: 'Le Spicy', description: 'Bœuf Black Angus, jalapeños, pepper jack, guacamole, oignons rouges, sauce chipotle', price: '15,90€', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Sides',
    items: [
      { id: 'fries', name: 'Frites Maison', description: 'Frites fraîches coupées à la main, sel de mer', price: '4,50€', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80' },
      { id: 'truffle-fries', name: 'Frites Truffe', description: 'Frites maison à l\'huile de truffe, parmesan râpé, persil', price: '6,50€', image: 'https://media.istockphoto.com/id/2140808381/photo/fries-with-parmesan-cheese-and-truffled-mayonnaise-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=huWMm_nZ7Tha07t0F92gx7uwsYjO796F6peGpfEiz_E=' },
      { id: 'onion-rings', name: 'Onion Rings', description: 'Rondelles d\'oignon panées et croustillantes', price: '5,50€', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80' },
      { id: 'coleslaw', name: 'Coleslaw', description: 'Chou, carotte, oignon rouge, sauce crémeuse', price: '3,90€', image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Drinks',
    items: [
      { id: 'craft-beer', name: 'Bière Artisanale', description: 'Sélection de bières locales (33cl)', price: '6,50€', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80' },
      { id: 'oreo-milkshake', name: 'Milkshake Oreo', description: 'Milkshake crémeux aux biscuits Oreo', price: '7,50€', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
      { id: 'caramel-milkshake', name: 'Milkshake Caramel', description: 'Milkshake vanille au caramel salé maison', price: '7,50€', image: 'https://images.unsplash.com/photo-1624781740834-fbfce1c4690a?auto=format&fit=crop&w=800&q=80' },
      { id: 'homemade-lemonade', name: 'Limonade Maison', description: 'Citron pressé, menthe fraîche, sucre de canne', price: '4,90€', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { id: 'cheesecake', name: 'Cheesecake', description: 'Cheesecake New York, coulis de fruits rouges', price: '6,90€', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80' },
      { id: 'brownie', name: 'Brownie', description: 'Brownie chocolat noir, noix de pécan, glace vanille', price: '7,50€', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80' },
      { id: 'apple-pie', name: 'Tarte aux Pommes', description: 'Tarte aux pommes caramélisées, glace cannelle', price: '7,90€', image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    name: 'Menus',
    items: [
      { id: 'menu-classic', name: 'Menu Classique', description: 'Burger + Frites + Boisson', price: '18,90€', image: 'https://images.unsplash.com/photo-1619881589970-3303f4446c53?auto=format&fit=crop&w=800&q=80' },
      { id: 'menu-double', name: 'Menu Double', description: 'Double burger + Frites + Boisson', price: '22,90€', image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80' },
      { id: 'menu-kids', name: 'Menu Enfant', description: 'Mini burger + Frites + Boisson + Surprise', price: '11,90€', image: 'https://images.unsplash.com/photo-1633896949673-1eb9d131a9b4?auto=format&fit=crop&w=800&q=80' }
    ]
  }
];

export default function Menu() {
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