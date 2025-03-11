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
const generateConfetti = (count: number): ConfettiPiece[] => {
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

export default function Confetti() {
  // Détecter les appareils mobiles
  const [isMobile, setIsMobile] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);
  const scrollTimerRef = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  
  // Initialisation avec détection de l'appareil
  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
      setIsMobile(isMobileDevice);
      
      // Générer moins de confettis sur mobile
      const confettiCount = isMobileDevice ? 3 : 6;
      setConfetti(generateConfetti(confettiCount));
    };
    
    checkIfMobile();
    setIsVisible(true);
    
    // Positionner les confettis en fonction de la largeur de l'écran
    if (typeof window !== 'undefined') {
      const updateConfettiPositions = () => {
        setConfetti(prev => prev.map(piece => ({
          ...piece,
          x: Math.random() * window.innerWidth
        })));
      };
      updateConfettiPositions();
      
      // Optimisation des performances avec requestAnimationFrame pour la détection du défilement
      const checkScroll = () => {
        const now = Date.now();
        // Durée plus longue pour mobile pour réduire le nombre de mises à jour
        const scrollThreshold = isMobile ? 400 : 200;
        setIsScrolling(now - lastScrollTime.current < scrollThreshold);
        rafId.current = requestAnimationFrame(checkScroll);
      };
      
      rafId.current = requestAnimationFrame(checkScroll);
      
      // Gestionnaire de défilement optimisé
      const handleScroll = () => {
        lastScrollTime.current = Date.now();
        setIsScrolling(true);
        
        // Annuler le timer existant
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
        
        // Définir un timer pour revenir à l'animation normale
        scrollTimerRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, isMobile ? 400 : 300);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Gérer le redimensionnement de manière optimisée
      let resizeTimeout: number;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(updateConfettiPositions, 300);
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        if (rafId.current) cancelAnimationFrame(rafId.current);
        clearTimeout(resizeTimeout);
      };
    }
  }, []);

  // Ne pas rendre si pas visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((piece) => {
        // Animations simplifiées pour les appareils mobiles ou pendant le défilement
        const shouldSimplify = isScrolling || isMobile;
        
        // Réduire l'opacité pendant le défilement
        const currentOpacity = shouldSimplify ? piece.opacity * 0.5 : piece.opacity;
        
        return (
          <motion.div
            key={piece.id}
            className="absolute text-2xl transform-gpu"
            style={{ 
              left: piece.x,
              top: -50,
              fontSize: `${piece.size * (isMobile ? 2 : 3)}rem`,
              willChange: 'transform, opacity',
              // Ajouter des propriétés pour améliorer les performances
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={
              shouldSimplify 
                ? {
                    // Animation simplifiée pour mobile et pendant le défilement
                    y: window.innerHeight * 0.6,
                    opacity: currentOpacity,
                    scale: 0.8,
                    rotate: 180
                  }
                : {
                    // Animation complète pour desktop
                    y: [0, window.innerHeight + 50],
                    rotate: [0, 180, 360],
                    scale: [0.7, 1, 0.8],
                    opacity: [piece.opacity, piece.opacity, 0]
                  }
            }
            transition={{
              // Durée prolongée sur mobile pour une animation plus fluide
              duration: shouldSimplify ? piece.duration * 1.5 : piece.duration,
              repeat: Infinity,
              delay: piece.delay,
              ease: "linear",
              // Utiliser tween pour mobile car plus performant
              type: shouldSimplify ? "tween" : "keyframes"
            }}
          >
            {piece.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
