import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  emoji: string;
  opacity: number;
  size: number;
}

// Émojis liés à la nourriture
const foodEmojis = ["🍔", "🍟", "🥤", "🍅", "🧀"];

// Pré-générer les confettis avec un nombre réduit
const generateConfetti = (count: number = 6): ConfettiPiece[] => {
  const pieces: ConfettiPiece[] = [];
  for (let i = 0; i < count; i++) {
    pieces.push({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 15,
      emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
      opacity: 0.3 + Math.random() * 0.3,
      size: 0.3 + Math.random() * 0.5
    });
  }
  return pieces;
};

// Pré-générer les confettis
const initialConfetti = generateConfetti(6);

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>(initialConfetti);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollingIntensity, setScrollingIntensity] = useState(0); // 0-1 value for scroll intensity
  const lastScrollTime = useRef(0);
  const scrollTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    // S'assurer que le composant est monté
    setIsVisible(true);
    
    if (typeof window !== 'undefined') {
      setConfetti(prev => prev.map(piece => ({
        ...piece,
        x: Math.random() * window.innerWidth
      })));
    }
    
    // Gérer le défilement avec une valeur d'intensité progressive
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
      setScrollingIntensity(0.7); // Réduire l'intensité pendant le défilement
      
      // Clear any existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Set a timer to gradually return to normal animation
      scrollTimerRef.current = window.setTimeout(() => {
        setScrollingIntensity(0); // Revenir à l'animation normale
      }, 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Gérer le redimensionnement de manière optimisée
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setConfetti(prev => prev.map(piece => ({
          ...piece,
          x: Math.random() * window.innerWidth
        })));
      }, 300);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Ne pas rendre si pas visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((piece) => {
        // Calculate simplified animation values based on scrolling intensity
        const currentOpacity = piece.opacity * (1 - scrollingIntensity * 0.5);
        const isSimplified = scrollingIntensity > 0;
        
        return (
          <motion.div
            key={piece.id}
            className="absolute text-2xl transform-gpu"
            style={{ 
              left: piece.x,
              top: -50,
              fontSize: `${piece.size * 3}rem`,
              willChange: 'transform, opacity'
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              // Animation continue même pendant le défilement
              y: [0, window.innerHeight + 50],
              rotate: isSimplified ? [0, 180] : [0, 180, 360],
              scale: isSimplified ? 0.85 : [0.7, 1, 0.8],
              opacity: isSimplified 
                ? [currentOpacity, 0]
                : [piece.opacity, piece.opacity, 0]
            }}
            transition={{
              duration: isSimplified ? piece.duration * 1.3 : piece.duration,
              repeat: Infinity,
              delay: piece.delay,
              ease: "linear",
              type: isSimplified ? "tween" : "keyframes"
            }}
          >
            {piece.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
