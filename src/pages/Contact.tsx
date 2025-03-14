import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import PortfolioAttribution from '../components/contact/PortfolioAttribution';

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
        <ContactForm />
        <ContactInfo />
      </div>
      
      <PortfolioAttribution />
    </div>
  );
}