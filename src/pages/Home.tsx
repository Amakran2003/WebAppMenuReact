import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <motion.section 
      className="flex items-center justify-center px-4 min-h-[calc(100vh-8rem)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif font-bold text-[#9b2226] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Bienvenue au Asian Touch
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Découvrez notre cuisine asiatique raffinée, préparée avec passion et authenticité.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/menu"
            className="inline-block bg-[#9b2226] text-[#ffd700] px-8 py-3 rounded-lg font-medium
                     hover:bg-[#660708] transition-colors duration-200"
          >
            Voir le menu
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}