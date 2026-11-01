import React, { useEffect } from 'react';
import { X, ShieldCheck, AlertTriangle, ExternalLink, Zap, Download, Sparkles, MessageSquare } from 'lucide-react';
import { Project } from '../types';
import { FailoverSimulator } from './FailoverSimulator';
import { DISCORD_AIR_STUDIO } from '../data/content';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#120808] border border-orange-950/90 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#1a0e0e] border border-orange-900/60 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs">
            <span className="text-orange-400 font-semibold uppercase">{project.category}</span>
            {project.badge && (
              <>
                <span className="text-stone-600">·</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  project.isFree 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-orange-500/15 text-orange-300 border border-orange-500/30'
                }`}>
                  {project.badge}
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="mt-2 text-sm md:text-base text-stone-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Key Features (if available) */}
        {project.features && project.features.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Características Clave</span>
            </h3>
            <div className="space-y-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#180d0d] border border-orange-950/60">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mt-1.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-stone-200 font-medium">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Capturas de Pantalla / Galería de Imágenes */}
        {project.images && project.images.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Vista Previa del Plugin en Funcionamiento ({project.images.length})</span>
              </span>
              <span className="text-[11px] text-stone-500 font-sans normal-case">Capturas in-game</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl bg-[#0d0707] border border-orange-950/80 hover:border-orange-500/60 transition-all overflow-hidden flex flex-col shadow-lg"
                >
                  <div className="p-3 bg-[#080404] flex items-center justify-center min-h-[160px] max-h-[220px] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.caption || `Captura ${idx + 1}`}
                      className="w-full h-auto max-h-[190px] object-contain rounded transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-[#150b0b] border-t border-orange-950/80 flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-300 font-medium line-clamp-1">
                      {img.caption}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/60 text-orange-400 border border-orange-900/60 shrink-0">
                      In-Game
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Free Download Instructions Box */}
        {project.downloadInstructions && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#1c0c0c] to-[#120808] border border-orange-500/50 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase">
                <Download className="w-4 h-4 text-orange-400" />
                <span>Instrucciones de Descarga Gratuita</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                100% GRATIS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
              {project.downloadInstructions}
            </p>
          </div>
        )}

        {/* Problem & Impact Row (if available) */}
        {project.problem && project.impact && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#180d0d] border border-orange-950/80">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-semibold uppercase mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Problema Resuelto</span>
              </div>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141b12] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Impacto y Métrica</span>
              </div>
              <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-medium">
                {project.impact}
              </p>
            </div>
          </div>
        )}

        {/* Technical Solution (if available) */}
        {project.solution && project.solution.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-3">
              Solución Técnica e Implementación
            </h3>
            <div className="space-y-2.5">
              {project.solution.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#180d0d] border border-orange-950/60">
                  <span className="w-5 h-5 rounded bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                    {index + 1}
                  </span>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Interactive Simulator if Velocity HA */}
        {project.id === 'velocity-ha' && (
          <div className="mt-8 pt-6 border-t border-orange-950/80">
            <h3 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Simulador Interactivo de Failover</span>
            </h3>
            <FailoverSimulator />
          </div>
        )}

        {/* Tech Badges & CTA */}
        <div className="mt-8 pt-6 border-t border-orange-950/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.tech?.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded bg-[#1a0e0e] border border-orange-950/80 text-xs font-mono text-stone-300"
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href={DISCORD_AIR_STUDIO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-950/50"
          >
            {project.isFree ? (
              <>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pedir en Discord (#🧰︱ᴀʏᴜᴅᴀ-ᴛɪᴄᴋᴇᴛ)</span>
              </>
            ) : (
              <>
                <span>Consultar sobre este proyecto</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};
