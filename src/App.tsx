import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { Timeline } from './components/Timeline';
import { AboutMe } from './components/AboutMe';
import { ContactSocials } from './components/ContactSocials';
import { VisitorCounter } from './components/VisitorCounter';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090505] text-stone-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Navbar with active tab indicator and Air Studio branding */}
      <Navbar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />

      {/* Main View Container: Renders strictly the selected tab */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <Hero onNavigate={handleNavigate} />
        )}

        {activeTab === 'trabajos' && (
          <Works />
        )}

        {activeTab === 'trayectoria' && (
          <Timeline />
        )}

        {activeTab === 'sobre-mi' && (
          <AboutMe onNavigate={handleNavigate} />
        )}

        {activeTab === 'contacto' && (
          <ContactSocials />
        )}

        {/* Visitas al portafolio widget (present in all views) */}
        <VisitorCounter />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
