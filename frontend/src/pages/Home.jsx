import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/Hero';
import ProjectsSection from '../components/sections/Projects';
import AboutOverlay from '../components/sections/About';
import ContactOverlay from '../components/sections/Contact';
import HistoireOverlay from '../components/sections/Histoire';

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [histoireOpen, setHistoireOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-mono text-sm leading-relaxed transition-colors overflow-x-hidden">
      <Header
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      <main>
        <HeroSection />
        <ProjectsSection />
      </main>

      <Footer />

      <AboutOverlay
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onOpenContact={() => setContactOpen(true)}
        onOpenHistoire={() => setHistoireOpen(true)}
      />
      <ContactOverlay isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <HistoireOverlay isOpen={histoireOpen} onClose={() => setHistoireOpen(false)} />
    </div>
  );
}
