import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ContactForm() {
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
  );
}
