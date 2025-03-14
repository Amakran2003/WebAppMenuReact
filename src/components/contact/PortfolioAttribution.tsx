import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function PortfolioAttribution() {
  const { themeColors } = useTheme();
  
  return (
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
  );
}
