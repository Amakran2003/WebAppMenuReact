import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react'; // Import Utensils icon from lucide-react
import './SplashScreen.css';

interface SplashScreenProps {
  redirectTo?: string;
}

const SplashScreen = ({ redirectTo = '/home' }: SplashScreenProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the specified page after animation completes
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 3000); // 3 seconds duration, adjust as needed

    return () => clearTimeout(timer);
  }, [navigate, redirectTo]);

  return (
    <div className="splash-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="logo-container"
      >
        {/* Replace the image with a Lucide React icon */}
        <motion.div className="logo flex items-center justify-center">
          <Utensils size={80} className="text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Asian Touch
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
