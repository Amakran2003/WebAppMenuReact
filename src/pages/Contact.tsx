import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { themeColors } = useTheme();
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-12"
        style={{ color: themeColors.heading }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nous Contacter
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="rounded-xl shadow-lg p-6 sm:p-8"
          style={{ backgroundColor: themeColors.cardBackground }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6"
              style={{ color: themeColors.heading }}>
            Envoyez-nous un message
          </h2>
          
          <form className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2"
                     style={{ color: themeColors.text }}>
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: themeColors.text === '#1a1a1a' ? '#e5e7eb' : '#4b5563',
                  backgroundColor: themeColors.cardBackground,
                  color: themeColors.text,
                  boxShadow: `0 0 0 2px ${themeColors.primary}`
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2"
                     style={{ color: themeColors.text }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: themeColors.text === '#1a1a1a' ? '#e5e7eb' : '#4b5563',
                  backgroundColor: themeColors.cardBackground,
                  color: themeColors.text,
                  boxShadow: `0 0 0 2px ${themeColors.primary}`
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2"
                     style={{ color: themeColors.text }}>
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: themeColors.text === '#1a1a1a' ? '#e5e7eb' : '#4b5563',
                  backgroundColor: themeColors.cardBackground,
                  color: themeColors.text,
                  boxShadow: `0 0 0 2px ${themeColors.primary}`
                }}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg font-medium text-white transition-colors duration-200"
              style={{ 
                backgroundColor: themeColors.primary,
                ":hover": { backgroundColor: themeColors.secondary }
              }}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6"
                style={{ color: themeColors.heading }}>
              Informations de Contact
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <MapPin className="w-6 h-6 mt-1" 
                         style={{ color: themeColors.heading }} />
                <div>
                  <h3 className="font-semibold" style={{ color: themeColors.text }}>Adresse Principale</h3>
                  <p style={{ color: themeColors.text }}>
                    123 Avenue des Champs-Élysées, 75008 Paris
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Phone className="w-6 h-6 mt-1" 
                        style={{ color: themeColors.heading }} />
                <div>
                  <h3 className="font-semibold" style={{ color: themeColors.text }}>Téléphone</h3>
                  <p style={{ color: themeColors.text }}>
                    01 23 45 67 89
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-6 h-6 mt-1" 
                       style={{ color: themeColors.heading }} />
                <div>
                  <h3 className="font-semibold" style={{ color: themeColors.text }}>Email</h3>
                  <p style={{ color: themeColors.text }}>
                    contact@craftburger.fr
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <Clock className="w-6 h-6 mt-1" 
                        style={{ color: themeColors.heading }} />
                <div>
                  <h3 className="font-semibold" style={{ color: themeColors.text }}>Horaires d'ouverture</h3>
                  <p style={{ color: themeColors.text }}>
                    Lundi - Dimanche: 11h30 - 23h00
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6"
                style={{ color: themeColors.heading }}>
              Réservations
            </h2>
            <p className="mb-4" style={{ color: themeColors.text }}>
              Pour les réservations de groupe ou les événements spéciaux, 
              veuillez nous contacter par téléphone ou par email.
            </p>
            <p style={{ color: themeColors.text }}>
              Nous vous répondrons dans les plus brefs délais pour confirmer votre réservation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}