import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

export function Header() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="TwoTable" className="h-8 w-auto" />
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('why-different')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Why TwoTable
          </button>
          <button 
            onClick={() => scrollToSection('waitlist')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          >
            Join Waitlist
          </button>
        </nav>

        <button 
          onClick={() => scrollToSection('waitlist')}
          className="md:hidden bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold"
        >
          Join
        </button>
      </div>
    </motion.header>
  );
}
