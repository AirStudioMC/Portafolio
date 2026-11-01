import React from 'react';
import { DISCORD_AIR_STUDIO, AIR_STUDIO_LOGO } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-10 border-t border-orange-950/80 bg-[#070404] text-xs text-stone-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => onNavigate && onNavigate('inicio')}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <span className="text-base font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
            retroflas<span className="text-orange-500">.</span>
          </span>
          <span className="text-stone-700 font-light select-none">|</span>
          <div className="flex items-center gap-1.5">
            <img 
              src={AIR_STUDIO_LOGO} 
              alt="Air Studio Logo" 
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase group-hover:text-stone-200">
              AIR STUDIO
            </span>
          </div>
        </button>

        {/* Action Link matching reference screenshot */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Diseño, Minecraft y Air Studio.</span>
          <a
            href={DISCORD_AIR_STUDIO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 font-medium inline-flex items-center gap-0.5 transition-colors"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
