import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: 'Craft Burger Paris',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    hours: 'Lun-Dim: 11h30-23h00',
    phone: '01 23 45 67 89',
    image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Craft Burger Lyon',
    address: '45 Rue de la République, 69002 Lyon',
    hours: 'Lun-Dim: 11h30-22h30',
    phone: '04 56 78 90 12',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Craft Burger Bordeaux',
    address: '78 Rue Sainte-Catherine, 33000 Bordeaux',
    hours: 'Mar-Dim: 11h30-22h00',
    phone: '05 34 56 78 90',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Restaurants() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#9b2226] text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nos Restaurants
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#9b2226] mb-3 sm:mb-4">
                {restaurant.name}
              </h3>
              
              <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#9b2226] flex-shrink-0" />
                  <span className="line-clamp-2">{restaurant.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#9b2226] flex-shrink-0" />
                  <span>{restaurant.hours}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#9b2226] flex-shrink-0" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}