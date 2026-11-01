import React, { useState } from 'react';
import { DISCORD_AIR_STUDIO, AIR_STUDIO_LOGO } from '../data/content';
import { ExternalLink, Menu, X } from 'lucide-react';

export type NavTab = 'inicio' | 'trabajos' | 'trayectoria' | 'sobre-mi' | 'contacto';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; name: string }[] = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'trabajos', name: 'Trabajos' },
    { id: 'trayectoria', name: 'Trayectoria' },
    { id: 'sobre-mi', name: 'Sobre mí' },
    { id: 'contacto', name: 'Contacto' },
  ];

  const handleLinkClick = (tabId: NavTab) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090505]/95 backdrop-blur-md border-b border-orange-950/60 shadow-lg shadow-black/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand Lockup: retroflas. | AIR STUDIO with Air Studio logo */}
        <button 
          onClick={() => handleLinkClick('inicio')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
            retroflas<span className="text-orange-500">.</span>
          </span>
          <span className="text-stone-700 font-light select-none">|</span>
          <div className="flex items-center gap-1.5">
            <img 
              src={AIR_STUDIO_LOGO} 
              alt="Air Studio Logo" 
              className="w-5 h-5 rounded-full object-cover ring-1 ring-orange-500/40"
            />
            <span className="text-xs font-mono font-bold tracking-widest text-stone-300 uppercase group-hover:text-white transition-colors">
              AIR STUDIO
            </span>
          </div>
        </button>

        {/* Desktop Navigation - Tab Switchers */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-400">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors cursor-pointer focus:outline-none ${
                  isActive ? 'text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Discord */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={DISCORD_AIR_STUDIO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-200 hover:text-white bg-[#1a0e0e] hover:bg-[#261313] border border-orange-900/60 hover:border-orange-500/60 rounded-lg transition-colors cursor-pointer"
          >
            <span>Discord</span>
            <ExternalLink className="w-3 h-3 text-orange-400" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0707] border-b border-orange-950/80 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left py-2.5 text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'text-orange-400 font-bold border-l-2 border-orange-500 pl-2'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2 border-t border-orange-950/60">
            <a
              href={DISCORD_AIR_STUDIO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 text-sm font-medium text-orange-400"
            >
              <span>Unirse a Air Studio en Discord</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
