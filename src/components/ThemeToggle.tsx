import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, themeColors } = useTheme();
  
  return (
    <motion.button
      className={`p-2 rounded-full transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gray-200 hover:bg-gray-300'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={18} style={{ color: themeColors.heading }} /> // Using consistent heading color
      ) : (
        <Sun size={18} style={{ color: themeColors.heading }} /> // Using consistent heading color instead of amber
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </motion.button>
  );
}
