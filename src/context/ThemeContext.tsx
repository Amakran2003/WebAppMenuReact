import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useLayoutEffect } from 'react';

// Use a safe version of useLayoutEffect that falls back to useEffect in SSR environments
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
    heading: string;
  };
  isThemeReady: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      // First check for theme in localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      
      // Then check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return 'light'; // Default theme
  };
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isThemeReady, setIsThemeReady] = useState<boolean>(false);
  
  // Define theme colors based on current theme
  const themeColors = {
    primary: '#9b2226', // Same red color for both themes
    secondary: theme === 'light' ? '#660708' : '#f8c136',
    background: theme === 'light' ? '#ffffff' : '#121212',
    cardBackground: theme === 'light' ? '#ffffff' : '#1e1e1e',
    text: theme === 'light' ? '#1a1a1a' : '#f5f5f5',
    heading: '#9b2226', // Consistent heading color for both themes
  };
  
  // Apply theme to document - synchronously where possible
  const applyTheme = useCallback((currentTheme: Theme) => {
    if (typeof window === 'undefined') return;
    
    // Use our enhanced theme-detector.js if it's available
    if (window.applyTheme && typeof window.applyTheme === 'function') {
      window.applyTheme(currentTheme);
      setIsThemeReady(true);
      return;
    }
    
    // Fallback if window.applyTheme is not available
    const root = window.document.documentElement;
    
    // Remove both classes to ensure clean state
    root.classList.remove('dark', 'light');
    // Add the current theme class
    root.classList.add(currentTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', currentTheme);
    
    // Update meta theme-color
    const metaThemeColor = document.getElementById('theme-color');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#121212' : '#ffffff');
    }
    
    // Apply theme class to body
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(currentTheme === 'dark' ? 'dark-theme' : 'light-theme');
    
    // Set color-scheme
    document.documentElement.style.colorScheme = currentTheme;
    
    // Dispatch custom event for theme-detector.js to pick up
    const themeChangeEvent = new CustomEvent('reactThemeChange', { 
      detail: { theme: currentTheme } 
    });
    document.dispatchEvent(themeChangeEvent);
    
    // Mark theme as ready
    setIsThemeReady(true);
  }, []);
  
  // Use useLayoutEffect for synchronous theme application before paint
  useIsomorphicLayoutEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);
  
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
    
    // Listen for theme changes from theme-detector.js
    const handleThemeChanged = (e: CustomEvent) => {
      if (e.detail && (e.detail.theme === 'dark' || e.detail.theme === 'light')) {
        setTheme(e.detail.theme);
      }
    };
    
    document.addEventListener('themeChanged', handleThemeChanged as EventListener);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('themeChanged', handleThemeChanged as EventListener);
    };
  }, []);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors, isThemeReady }}>
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

// Add TypeScript declaration for window.applyTheme
declare global {
  interface Window {
    applyTheme?: (theme: string) => void;
  }
}
