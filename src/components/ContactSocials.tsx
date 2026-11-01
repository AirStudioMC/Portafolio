import React, { useState } from 'react';
import { MessageSquare, Users, ArrowUpRight, Copy, Check, Clock } from 'lucide-react';
import { DISCORD_PERSONAL, DISCORD_AIR_STUDIO, AIR_STUDIO_LOGO, RETROFLAS_AVATAR } from '../data/content';

export const ContactSocials: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPersonal = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_PERSONAL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Header matching image 5: Nos vemos por aquí. */}
      <div className="max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Nos vemos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500">
            por aquí.
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400">
          Mis redes, la comunidad de Air Studio y contacto directo para desarrollo de servidores.
        </p>
      </div>

      {/* Grid of Contact & Social Cards in Orange/Red */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Discord Personal (retroflas) with Retroflas Avatar */}
        <div
          onClick={handleCopyPersonal}
          className="group bg-[#140b0b] hover:bg-[#1c0f0f] border border-orange-950/80 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <img
                  src={RETROFLAS_AVATAR}
                  alt="Retroflas Avatar"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-orange-500/60 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#140b0b]" />
              </div>
              <div className="text-stone-400 group-hover:text-orange-400 transition-colors">
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-orange-400" />
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
              Mi Discord
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-mono">
              Escríbeme directamente
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-orange-950/60 flex items-center justify-between text-xs font-mono">
            <span className="text-white font-semibold">{DISCORD_PERSONAL}</span>
            <span className="text-orange-400 font-medium">Click para copiar</span>
          </div>
        </div>

        {/* Card 2: Discord Oficial Air Studio with Air Studio Logo (Image 1) */}
        <a
          href={DISCORD_AIR_STUDIO}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#140b0b] hover:bg-[#1c0f0f] border border-orange-950/80 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1f1010] border border-orange-900/60 p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={AIR_STUDIO_LOGO}
                  alt="Air Studio Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
              Discord de Air Studio
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-mono">
              Únete a la comunidad oficial
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-orange-950/60 flex items-center justify-between text-xs font-mono">
            <span className="text-orange-400 truncate max-w-[170px]">{DISCORD_AIR_STUDIO}</span>
            <span className="text-stone-300 font-medium">Unirse ↗</span>
          </div>
        </a>

        {/* Card 3: Soporte & Comisiones */}
        <div className="bg-[#140b0b] border border-orange-950/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1f1010] border border-orange-900/60 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVO
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Comisiones & Asesoría
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Desarrollo de plugins a medida y auditorías de red.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-orange-950/60 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>SLA DE RESPUESTA</span>
            <span className="text-emerald-400 font-semibold">&lt; 12 Horas</span>
          </div>
        </div>
      </div>
    </section>
  );
};
