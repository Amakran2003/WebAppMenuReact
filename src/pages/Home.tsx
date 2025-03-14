import HeroSection from '../components/home/HeroSection.tsx';
import SpecialtiesSection from '../components/home/SpecialtiesSection.tsx';
import NewsSection from '../components/home/NewsSection.tsx';
import MouseFollower from '../components/home/MouseFollower.tsx';
import BackgroundDecorations from '../components/home/BackgroundDecorations.tsx';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] overflow-x-hidden">
      {/* Decorative background */}
      <BackgroundDecorations />
      
      {/* Mouse follower */}
      <MouseFollower />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Specialties Section */}
      <SpecialtiesSection />

      {/* News Section */}
      <NewsSection />
    </div>
  );
}