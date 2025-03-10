import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: 'Asian Touch Paris',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    hours: 'Lun-Dim: 11h30-23h00',
    phone: '01 23 45 67 89',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Asian Touch Lyon',
    address: '45 Rue de la République, 69002 Lyon',
    hours: 'Lun-Dim: 11h30-22h30',
    phone: '04 56 78 90 12',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Asian Touch Bordeaux',
    address: '78 Rue Sainte-Catherine, 33000 Bordeaux',
    hours: 'Mar-Dim: 11h30-22h00',
    phone: '05 34 56 78 90',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Restaurants() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-4xl font-serif font-bold text-[#9b2226] text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nos Restaurants
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-[#9b2226] mb-4">
                {restaurant.name}
              </h3>
              
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#9b2226]" />
                  <span>{restaurant.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#9b2226]" />
                  <span>{restaurant.hours}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#9b2226]" />
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