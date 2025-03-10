import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Beef } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete?: () => void;
  redirectTo?: string;
}

export default function SplashScreen({ onComplete, redirectTo }: SplashScreenProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simple timer to call the onComplete callback after animation
    const timer = setTimeout(() => {
      try {
        if (onComplete) {
          onComplete();
        } else if (redirectTo) {
          // Simplified redirect logic for better mobile support
          const cleanPath = redirectTo.replace(/^\//, '');
          
          // First attempt: React Router
          navigate(cleanPath);
          
          // Backup attempt after a short delay if React Router might fail
          setTimeout(() => {
            if (document.location.pathname.indexOf(cleanPath) === -1) {
              // If navigation didn't work, try direct location change as fallback
              const basePath = import.meta.env.BASE_URL || '/';
              window.location.href = '#/' + cleanPath;
            }
          }, 300);
        } else {
          // Default fallback to home if no redirect specified
          navigate('/home');
        }
      } catch (error) {
        console.error('Navigation error in SplashScreen', error);
        // Ultimate fallback - direct hash change
        window.location.hash = '#/home';
      }
    }, 1500); // 1.5 seconds animation
    
    return () => clearTimeout(timer);
  }, [onComplete, redirectTo, navigate]);

  return (
    <div className="splash-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="logo-container"
      >
        <motion.div className="logo flex items-center justify-center">
          <Beef size={80} className="text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Craft Burger Co.
        </motion.h1>
      </motion.div>
    </div>
  );
};
