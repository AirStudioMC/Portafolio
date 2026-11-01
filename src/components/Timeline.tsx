import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE_DATA } from '../data/content';
import { Sparkles, Flame } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
    >
      {/* Section Header matching image 3: Mi trayectoria. */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mi{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500">
            trayectoria.
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400">
          Los servidores y proyectos de los que he formado parte.
        </p>
      </div>

      {/* Central Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line (hidden on mobile, centered on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-orange-500/50 via-red-500/30 to-stone-800/20" />

        <div className="space-y-10 md:space-y-12">
          {TIMELINE_DATA.map((item) => {
            const isLeft = item.side === 'left';
            return (
              <div 
                key={item.id} 
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Card */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <div className={`bg-[#120a0a] hover:bg-[#1a0e0e] border rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl relative group ${
                    item.isPopular 
                      ? 'border-amber-400/60 shadow-amber-950/20 ring-1 ring-amber-400/30' 
                      : item.isCurrent
                      ? 'border-orange-500/60 shadow-orange-950/30 ring-1 ring-orange-500/30 glow-orange'
                      : 'border-orange-950/80 hover:border-orange-500/40'
                  }`}>
                    {/* Yellow Highlighted Tag for OrionMC */}
                    {item.isPopular && (
                      <div className="mb-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-400/40 shadow-sm animate-pulse">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.popularTag}</span>
                      </div>
                    )}

                    {/* Orange/Red Tag for Air Studio */}
                    {item.isCurrent && (
                      <div className="mb-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-bold text-orange-300 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 shadow-sm">
                        <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{item.currentTag}</span>
                      </div>
                    )}

                    {/* Server Header: Logo + Title + Role Tag */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#190d0d] border border-orange-950/80 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                        <img
                          src={item.logo}
                          alt={`Logo ${item.name}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {item.name}
                          </h3>
                        </div>
                        <div className="mt-1">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                            item.isCurrent
                              ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/40'
                              : item.role === 'Founder'
                              ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                              : item.role === 'Co-Dueño'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : 'bg-red-500/15 text-red-400 border border-red-500/30'
                          }`}>
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal mt-2">
                      {item.description}
                    </p>

                    {/* Metrics Strip */}
                    <div className="mt-4 pt-3.5 border-t border-orange-950/60 flex flex-wrap gap-2">
                      {item.metrics.map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#190d0d] text-stone-300 border border-orange-950/70"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Connecting Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#090505] border-2 border-orange-500 items-center justify-center shadow-lg shadow-orange-950/80">
                  <div className={`w-2 h-2 rounded-full ${
                    item.isPopular 
                      ? 'bg-amber-400' 
                      : item.isCurrent 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'bg-orange-500'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
