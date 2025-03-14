/**
 * ScrollToTop Component
 * 
 * Utility component that scrolls the page to the top when navigating between routes.
 * Special handling for menu item navigation:
 * - Does not scroll to top when navigating to menu with specific item parameters
 * - This allows preserving scroll position for menu items that should be in view
 * 
 * Imported by:
 * - App.tsx (part of the router setup)
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  
  useEffect(() => {
    // Ne pas faire défiler automatiquement vers le haut si nous naviguons vers le menu avec des paramètres de requête
    // car nous voulons défiler vers l'élément spécifique
    if (pathname === '/menu' && search.includes('item=')) {
      console.log('Skipping auto-scroll to top for menu item navigation');
      return;
    }
    
    // Sinon, revenir en haut de la page
    window.scrollTo(0, 0);
  }, [pathname, search]);
  
  return null;
}
