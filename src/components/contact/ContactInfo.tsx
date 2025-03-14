import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ContactInfo() {
  const { themeColors } = useTheme();
  
  return (
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
  );
}
