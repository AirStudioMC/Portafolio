import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, MessageSquare, ExternalLink, Filter, ArrowUpRight, Download, CheckCircle2 } from 'lucide-react';
import { DISCORD_AIR_STUDIO, PROJECTS_DATA } from '../data/content';
import { WorkCategory, Project } from '../types';
import { ProjectModal } from './ProjectModal';

const FILTER_CATEGORIES: WorkCategory[] = [
  "Todo",
  "Plugins Custom",
  "Sistemas Proxy",
  "Configuraciones",
  "Setups",
];

export const Works: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<WorkCategory>("Todo");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesFilter =
        activeFilter === "Todo" ||
        project.category.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.features && project.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (project.tech && project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
    >
      {/* Section Header matching image 2: Mis trabajos. */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Mis{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500">
              trabajos.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-400">
            Plugins custom, sistemas proxy, redes de alta disponibilidad y configuraciones.
          </p>
        </div>
        <div className="text-xs font-mono text-orange-400 bg-orange-950/40 border border-orange-900/60 px-3 py-1.5 rounded-lg">
          <span>{filteredProjects.length} {filteredProjects.length === 1 ? 'trabajo disponible' : 'trabajos disponibles'}</span>
        </div>
      </div>

      {/* Filter Tabs in Orange/Red */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-950/60 ring-1 ring-orange-400/40'
                  : 'bg-[#150c0c] text-stone-300 hover:text-white hover:bg-[#221212] border border-orange-950/80 hover:border-orange-500/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search Input with orange focus */}
      <div className="relative mt-2 mb-8 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={activeFilter === 'Todo' ? "Buscar trabajos..." : `Buscar en ${activeFilter}...`}
          className="w-full bg-[#120a0a] border border-orange-950/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Projects Grid if items exist */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-[#140b0b] hover:bg-[#1a0e0e] border border-orange-950/80 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xl relative group glow-orange"
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-orange-400 uppercase">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                {/* 1-sentence concise description */}
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* 3 Key features bullet points */}
                {project.features && (
                  <ul className="mt-4 space-y-1.5 text-xs text-stone-300">
                    {project.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Screenshots preview strip if available */}
                {project.images && project.images.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-orange-950/60">
                    <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Vista previa in-game ({project.images.length})</span>
                      <span className="text-orange-400 group-hover:underline text-[10px]">Ver en grande ↗</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {project.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="relative rounded-lg bg-[#090404] border border-orange-950/80 group-hover:border-orange-500/40 overflow-hidden h-24 flex items-center justify-center p-1.5 transition-colors"
                        >
                          <img
                            src={img.url}
                            alt={img.caption || "Screenshot"}
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Download action */}
              <div className="mt-6 pt-4 border-t border-orange-950/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                  <Download className="w-3.5 h-3.5" />
                  <span>Descarga Gratis</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold transition-colors cursor-pointer"
                >
                  Ver Instrucciones ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State for categories without published works yet */
        <div className="bg-[#120909] border border-orange-950/80 rounded-2xl p-8 md:p-12 text-center shadow-xl glow-orange">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-5">
            <Filter className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-orange-950/60 text-orange-300 border border-orange-900/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>CATEGORÍA: {activeFilter.toUpperCase()}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            No hay trabajos publicados en {activeFilter} actualmente
          </h3>

          <p className="mt-3 text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
            Air Studio está actualizando y compilando el catálogo oficial de proyectos para la modalidad de {activeFilter}.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={DISCORD_AIR_STUDIO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl transition-all shadow-md shadow-orange-950/60 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Encargar proyecto en {activeFilter} vía Discord</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
};
