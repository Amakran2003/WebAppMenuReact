import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { themeColors } = useTheme();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Handle form submission with Formspree
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xgvaezyd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };
  
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
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2"
                     style={{ color: themeColors.text }}>
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                name="message"
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
              disabled={formStatus === 'submitting'}
              className="w-full py-3 rounded-lg font-medium text-white transition-colors duration-200"
              style={{ 
                backgroundColor: themeColors.primary,
                opacity: formStatus === 'submitting' ? 0.7 : 1
              }}
              whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.02 }}
              whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.98 }}
            >
              {formStatus === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
            </motion.button>
            
            {formStatus === 'success' && (
              <p className="text-green-600 text-center mt-4">
                Votre message a été envoyé avec succès!
              </p>
            )}
            
            {formStatus === 'error' && (
              <p className="text-red-600 text-center mt-4">
                Une erreur s'est produite. Veuillez réessayer plus tard.
              </p>
            )}
            
            {/* Hidden field for routing to personal email */}
            <input type="hidden" name="_replyto" value="abderrazaq.makran@icloud.com" />
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
      
      {/* Portfolio Attribution Section */}
      <motion.div 
        className="mt-12 pt-10 border-t text-center"
        style={{ borderColor: themeColors.text === '#1a1a1a' ? '#e5e7eb' : '#4b5563' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm mb-3" style={{ color: themeColors.text }}>
          Site Web réalisé par Abderrazaq MAKRAN
        </p>
        <div className="flex justify-center space-x-4">
          <motion.a 
            href="https://github.com/Amakran2003" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:underline"
            style={{ color: themeColors.primary }}
            whileHover={{ scale: 1.05 }}
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/abderrazaq-makran" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm hover:underline"
            style={{ color: themeColors.primary }}
            whileHover={{ scale: 1.05 }}
          >
            <Linkedin className="w-4 h-4 mr-1" />
            LinkedIn
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}