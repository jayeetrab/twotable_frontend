import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { Promise } from '@/components/landing/Promise';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { Comparison } from '@/components/landing/Comparison';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Promise />
        <InteractiveDemo />
        <WaitlistForm />
        <Comparison />
        
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
