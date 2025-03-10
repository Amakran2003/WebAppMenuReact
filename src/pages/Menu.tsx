import React from 'react';
import { motion } from 'framer-motion';

const menuCategories = [
  {
    name: 'Boissons',
    items: [
      { name: 'Thé vert', description: 'Thé japonais traditionnel', price: '3,50€', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800' },
      { name: 'Bubble Tea', description: 'Thé au lait avec perles de tapioca', price: '5,90€', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=800' },
      { name: 'Saké', description: 'Alcool de riz japonais (12cl)', price: '7,50€', image: 'https://images.unsplash.com/photo-1579274482166-8f8ee2c5f399?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Plats',
    items: [
      { name: 'Riz sauté', description: 'Riz sauté aux légumes et œuf', price: '8,90€', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Nouilles sautées', description: 'Nouilles sautées au poulet et légumes', price: '10,90€', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
      { name: 'Gyoza', description: '6 raviolis japonais grillés', price: '6,90€', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Sushis',
    items: [
      { name: 'Maki Saumon', description: '6 pièces de maki au saumon', price: '5,90€', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800' },
      { name: 'California Roll', description: '6 pièces de california avocat-crabe', price: '6,90€', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=800' },
      { name: 'Nigiri Mix', description: '6 pièces variées de nigiri', price: '9,90€', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Thai',
    items: [
      { name: 'Pad Thaï', description: 'Nouilles de riz sautées au poulet et cacahuètes', price: '12,90€', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800' },
      { name: 'Curry vert', description: 'Curry vert au lait de coco et poulet', price: '13,90€', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800' },
      { name: 'Tom Yum', description: 'Soupe épicée aux crevettes et citronnelle', price: '8,90€', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Mochi', description: 'Gâteau de riz japonais fourré', price: '4,90€', image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&q=80&w=800' },
      { name: 'Perles de coco', description: 'Dessert thaïlandais aux perles de tapioca', price: '5,50€', image: 'https://images.unsplash.com/photo-1606243147559-cd6b1c323aaa?auto=format&fit=crop&q=80&w=800' },
      { name: 'Crème brûlée matcha', description: 'Crème brûlée parfumée au thé vert', price: '6,90€', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = React.useState('Plats');

  return (
    <div className="pb-24"> {/* Add padding to account for bottom nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className="text-4xl font-serif font-bold text-[#9b2226] text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Notre Carte
        </motion.h1>

        <div className="space-y-8">
          {menuCategories
            .filter(category => category.name === activeCategory)
            .map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    className="menu-item bg-white rounded-lg shadow-md overflow-hidden flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-2">
                        <span className="text-[#9b2226] font-bold">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around py-3">
            {menuCategories.map((category) => (
              <motion.button
                key={category.name}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === category.name
                    ? 'text-[#9b2226] font-medium'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">{category.name}</span>
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