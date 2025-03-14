/**
 * ThemeToggle Component
 * 
 * Button component for toggling between light and dark themes.
 * Features:
 * - Animated icon transition (sun/moon)
 * - Theme-aware styling
 * - Accessibility support with screen reader text
 * - Animation effects on hover and click
 * - Debug logging for theme changes
 * 
 * Imported by:
 * - Layout.tsx (used in the navigation header)
 */
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme, themeColors } = useTheme();
  
  // Add an effect that logs theme changes for debugging
  useEffect(() => {
    console.log('Theme toggle component detected theme:', theme);
  }, [theme]);
  
  return (
    <motion.button
      className={`p-2 rounded-full transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gray-200 hover:bg-gray-300'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      onClick={() => {
        toggleTheme();
        console.log('Theme toggled to:', theme === 'light' ? 'dark' : 'light');
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={18} style={{ color: themeColors?.primary || '#9b2226' }} />
      ) : (
        <Sun size={18} className="text-amber-400" />
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </motion.button>
  );
}
