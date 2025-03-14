/**
 * BackgroundDecorations Component
 * 
 * Creates decorative background effects with gradient circles.
 * Theme-aware with different appearances in light and dark modes.
 * Fixed positioning ensures it appears behind all content.
 * 
 * Imported by:
 * - Home.tsx
 */
import { useTheme } from '../../context/ThemeContext';

export default function BackgroundDecorations() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className={`absolute top-0 right-0 w-full h-full ${theme === 'light' ? 'opacity-50' : 'opacity-20'}`}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${theme === 'light' ? 'rgba(155, 34, 38, 0.4)' : 'rgba(228, 90, 33, 0.15)'}, transparent 35%),
            radial-gradient(circle at 80% 60%, ${theme === 'light' ? 'rgba(248, 193, 54, 0.5)' : 'rgba(248, 193, 54, 0.2)'}, transparent 40%),
            radial-gradient(circle at 40% 80%, ${theme === 'light' ? 'rgba(155, 34, 38, 0.35)' : 'rgba(228, 90, 33, 0.1)'}, transparent 30%)
          `,
          transition: 'background 0.5s ease'
        }}
      />
    </div>
  );
}
