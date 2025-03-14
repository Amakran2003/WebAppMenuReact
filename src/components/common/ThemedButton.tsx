/**
 * ThemedButton Component
 * 
 * Reusable styled button component with theme awareness.
 * Features:
 * - Two variants: primary (filled) and secondary (outlined)
 * - Animation effects on hover and click
 * - Theme-aware styling
 * - Advanced text effects on hover
 * - Router Link integration
 * 
 * Props:
 * - to: Route path for the Link component
 * - variant: 'primary' | 'secondary'
 * - children: React nodes to display inside the button
 * 
 * Imported by:
 * - HeroSection.tsx
 * - Various other components where buttons are needed
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface ThemedButtonProps {
  to: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function ThemedButton({ to, variant, children }: ThemedButtonProps) {
  const { theme } = useTheme();
  
  // Common button classes
  const baseClasses = "inline-block px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base md:text-lg relative overflow-hidden group";
  
  // Determine classes based on variant and theme
  const variantClasses = variant === 'primary' 
    ? `bg-[#9b2226] text-white hover:bg-[#660708] ${
        theme === 'dark' ? 'shadow-lg shadow-[#9b2226]/20' : ''
      }`
    : `border-2 border-[#9b2226] text-[#9b2226] ${
        theme === 'dark' 
          ? 'bg-[#1e1e1e] hover:bg-[#2a2a2a]' 
          : 'bg-white hover:bg-gray-50'
      }`;
    
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to={to} className={`${baseClasses} ${variantClasses}`}>
        {/* Reduced opacity overlay */}
        <motion.span 
          className={`absolute inset-0 ${
            variant === 'primary' 
              ? 'bg-gradient-to-r from-white/10 to-white/5' 
              : 'bg-[#9b2226]/5'
          } transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`}
        />
        
        {/* Text with hover effect for primary button variant */}
        <span 
          className={`relative z-10 ${
            variant === 'primary' 
              ? 'group-hover:text-transparent' 
              : ''
          } transition-all duration-300`}
          style={{
            // Text stroke effect for primary button variant on hover
            WebkitTextStroke: variant === 'primary' 
              ? 'var(--text-stroke)' 
              : 'none',
            '--text-stroke': 'var(--stroke-width) var(--stroke-color)',
            '--stroke-width': '0.3px',
            '--stroke-color': 'rgba(255, 255, 255, 0.9)',
            fontWeight: 'bold',
            letterSpacing: '0.01em',
            // For browsers that don't support text-stroke
            textShadow: variant === 'primary' 
              ? 'var(--text-shadow)'
              : 'none',
            '--text-shadow': '0 0 var(--shadow-width) var(--shadow-color)',
            '--shadow-width': '0.5px',
            '--shadow-color': 'rgba(255, 255, 255, 0.9)'
          } as React.CSSProperties}
        >
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
