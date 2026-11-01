import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, MessageSquare, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { DISCORD_PERSONAL, DISCORD_AIR_STUDIO, RETROFLAS_AVATAR } from '../data/content';
import { NavTab } from './Navbar';

interface HeroProps {
  onNavigate: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_PERSONAL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 max-w-6xl mx-auto infra-grid-bg animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Minimalist Typography & Actions in Orange/Red */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Main Title matching reference */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Hola, soy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500">
              retroflas.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-normal">
            Desarrollador Backend de Minecraft, Plugins Custom y Arquitectura de Proxies de Alta Disponibilidad.
          </p>

          <p className="mt-3 text-sm text-stone-400 font-mono">
            Optimización de redes Velocity, replicación con Redis y servidores Paper sin tiempo de inactividad.
          </p>

          {/* Action Buttons in Orange & Red */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                onNavigate('trayectoria');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl transition-all shadow-lg shadow-orange-950/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-400"
            >
              <span>Ver mi trayectoria</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onNavigate('contacto');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-200 hover:text-white bg-[#160c0c] hover:bg-[#221212] border border-orange-900/60 hover:border-orange-500/60 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Mi Discord</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Right Column: Sleek Discord Widget with retroflas's Minecraft Avatar */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-[#120a0a] border border-orange-950/80 hover:border-orange-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-sm glow-orange transition-all">
            {/* Top Bar of Discord Card */}
            <div className="flex items-center justify-between pb-3.5 border-b border-orange-950/60 text-xs text-stone-400">
              <span className="font-semibold text-stone-300">Discord</span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Disponible</span>
              </div>
            </div>

            {/* Profile Header with user's official avatar (Image 2) */}
            <div className="mt-4 flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={RETROFLAS_AVATAR}
                  alt="Retroflas Avatar"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-orange-500/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#120a0a]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span>retroflas</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-900/60">
                    DEV
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 font-mono">
                  Backend · Velocity · Redis
                </p>
              </div>
            </div>

            {/* Message Box */}
            <div className="mt-4 p-3.5 bg-[#190d0d] border border-orange-950/80 rounded-xl text-xs space-y-1.5">
              <div className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-semibold">
                DISCORD DIRECTO
              </div>
              <p className="text-stone-200 font-medium">
                Disponible para desarrollo de plugins, clústeres Velocity y optimización de servidores.
              </p>
              <div className="pt-1.5 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Usuario: <strong className="text-white font-semibold">{DISCORD_PERSONAL}</strong></span>
                <button
                  onClick={handleCopyDiscord}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  title="Copiar usuario de Discord"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="mt-4 pt-3 border-t border-orange-950/60 flex items-center justify-between">
              <a
                href={DISCORD_AIR_STUDIO}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-xs font-semibold text-center text-stone-200 hover:text-white py-2 rounded-lg bg-[#221010] hover:bg-[#2c1414] border border-orange-900/50 hover:border-orange-500/50 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Abrir Air Studio en Discord</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
