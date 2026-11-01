import React from 'react';
import { Quote, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const Testimonials: React.FC = () => {
  return (
    <div className="mt-14 pt-10 border-t border-orange-950/70">
      {/* Testimonials Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-1.5">
          <ShieldCheck className="w-4 h-4 text-orange-500" />
          <span>RECOMENDACIONES COMPROBADAS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Testimonios de Dueños y Clientes
        </h3>
        <p className="text-sm text-stone-400 mt-1">
          Opiniones reales de propietarios de networks y servidores que han trabajado conmigo.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="bg-[#150b0b] hover:bg-[#1c0f0f] border border-orange-950/80 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg relative group"
          >
            <div>
              {/* Card Top: Quote icon & Highlight Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Quote className="w-4 h-4 fill-current opacity-80" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-900/60">
                  {t.highlightTag}
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                "{t.content}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-6 pt-4 border-t border-orange-950/60 flex items-center gap-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-orange-500/50 shadow-md shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-[#221010] border-2 border-orange-500/40 flex items-center justify-center text-orange-400 font-mono font-bold text-sm shrink-0 shadow-inner">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white truncate">
                    {t.name}
                  </h4>
                  <span title="Cliente verificado" className="inline-flex">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </span>
                </div>
                <p className="text-xs text-orange-400 font-semibold truncate font-mono">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
