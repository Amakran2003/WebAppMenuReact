import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#9b2226] text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nous Contacter
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#9b2226] mb-6">
            Envoyez-nous un message
          </h2>
          
          <form className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b2226] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b2226] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b2226] focus:border-transparent"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-[#9b2226] text-white py-3 rounded-lg font-medium hover:bg-[#660708] transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Envoyer
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#9b2226] mb-6">
              Informations de Contact
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <MapPin className="w-6 h-6 text-[#9b2226] mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse Principale</h3>
                  <p className="text-gray-600">123 Avenue des Champs-Élysées, 75008 Paris</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Phone className="w-6 h-6 text-[#9b2226] mt-1" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">01 23 45 67 89</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-6 h-6 text-[#9b2226] mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@craftburger.fr</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Clock className="w-6 h-6 text-[#9b2226] mt-1" />
                <div>
                  <h3 className="font-semibold">Horaires d'ouverture</h3>
                  <p className="text-gray-600">Lundi - Dimanche: 11h30 - 23h00</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#9b2226] mb-6">
              Réservations
            </h2>
            <p className="text-gray-600 mb-4">
              Pour les réservations de groupe ou les événements spéciaux, 
              veuillez nous contacter par téléphone ou par email.
            </p>
            <p className="text-gray-600">
              Nous vous répondrons dans les plus brefs délais pour confirmer votre réservation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}