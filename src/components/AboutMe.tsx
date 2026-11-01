import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { RETROFLAS_AVATAR } from '../data/content';
import { NavTab } from './Navbar';
import { Testimonials } from './Testimonials';

interface AboutMeProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onNavigate }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
    >
      {/* Main Bio Card */}
      <div className="bg-[#120a0a] border border-orange-950/80 rounded-3xl p-8 md:p-12 shadow-2xl glow-orange">
        {/* Header with Avatar and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-orange-950/70">
          <div className="relative shrink-0">
            <img
              src={RETROFLAS_AVATAR}
              alt="Retroflas Profile"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500 shadow-lg shadow-orange-950/50"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#120a0a]" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Un poco{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500">
                sobre mí.
              </span>
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 mt-1">
              <span>retroflas</span>
              <span>·</span>
              <span className="text-stone-400">Air Studio Dev</span>
            </div>
          </div>
        </div>

        {/* Exact User Message */}
        <div className="mt-8 space-y-5 text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
          <p>
            Soy <strong className="text-white font-semibold">Retroflas</strong>. Me especializo en crear networks, configurar cualquier tipo de plugins y crear plugins de Minecraft.
          </p>

          <p>
            Cuento con experiencia comprobada en redes internacionales como <strong className="text-orange-400 font-semibold">OrionMC</strong> (con picos de hasta +350 personas), donde he hecho modalidades, optimizar los servidores, etc...
          </p>

          <p className="text-lg sm:text-xl font-bold text-white pt-2">
            ¿Quires un servidor profesional? Contactame.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4 pt-6 border-t border-orange-950/70">
          <button
            onClick={() => {
              onNavigate('contacto');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-950/60"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contactarme en Discord</span>
          </button>

          <button
            onClick={() => {
              onNavigate('trabajos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-stone-300 hover:text-white bg-[#190d0d] hover:bg-[#251212] border border-orange-900/60 rounded-xl transition-colors cursor-pointer"
          >
            <span>Ver mis trabajos</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Testimonials Component inside 'Sobre mí' */}
        <Testimonials />
      </div>
    </motion.section>
  );
};
