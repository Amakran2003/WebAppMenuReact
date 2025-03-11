import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function MouseFollower() {
  const { themeColors } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full opacity-20 pointer-events-none z-50 hidden md:block"
      style={{
        backgroundColor: themeColors.heading,
        top: -15,
        left: -15,
        x: springX,
        y: springY
      }}
    />
  );
}

export default MouseFollower;
