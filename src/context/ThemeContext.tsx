import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    heading: string; // Added consistent heading color
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      
      if (savedTheme) {
        return savedTheme;
      }
      
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return 'light'; // Default theme
  };
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  // Define theme colors based on current theme
  // Using consistent primary (red) color for both themes
  const themeColors = {
    primary: '#9b2226', // Same red color for both themes
    secondary: theme === 'light' ? '#660708' : '#f8c136',
    background: theme === 'light' ? '#ffffff' : '#121212',
    cardBackground: theme === 'light' ? '#ffffff' : '#1e1e1e',
    text: theme === 'light' ? '#1a1a1a' : '#f5f5f5',
    heading: '#9b2226', // Consistent heading color for both themes
  };
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes to ensure clean state
    root.classList.remove('dark', 'light');
    // Add the current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.getElementById('theme-color');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
    }
    
    // Apply smooth transitions
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Apply theme class to body for additional selectors
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
