import { Project, TimelineEntry, Testimonial } from '../types';

export const DISCORD_PERSONAL = "retroflas";
export const DISCORD_AIR_STUDIO = "https://discord.gg/Jmdc2Y7BmP";
export const DISCORD_TICKET_CHANNEL = "#🧰︱ᴀʏᴜᴅᴀ-ᴛɪᴄᴋᴇᴛ";

export const AIR_STUDIO_LOGO = "/public/assets/aistudio/5251f6f6-17bc-4e1a-837d-80fac1dce8d3_34b39924.png";
export const RETROFLAS_AVATAR = "/public/assets/aistudio/de773a53baacf501063ff0fa2b7c6c37_1f875923.png";

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "starmc",
    name: "StarMC",
    role: "Founder",
    logo: "/public/assets/aistudio/2b19c7bde35cfd94f054794ff69673f6_dfe0fad8.png",
    side: "left",
    description: "Creación de la network desde cero, construcciones hechas por el studio, plugins custom y diseño profesional del servidor",
    metrics: ["Sistemas Custom", "Gestión Comunidad", "Developer"],
  },
  {
    id: "oasismc",
    name: "OasisMC",
    role: "Dueño",
    logo: "/public/assets/aistudio/4d2a35beedac15fb4a2d8f6f1740ad38_5e8cebd1.png",
    side: "right",
    description: "Creación de la network, diseño del logo, construcciones custom y plugins custom",
    metrics: ["Optimización", "diseño profesional"],
  },
  {
    id: "orionmc",
    name: "OrionMC",
    role: "Co-Dueño",
    logo: "/public/assets/aistudio/image_87f5f06b.png",
    isPopular: true,
    popularTag: "MUY POPULAR | +100 Jugadores Simultáneos Internacionales",
    side: "left",
    description: "Creación de modalidades como fullpvp, fastfarm, SurvivalSMP, optimización de los servidores y creación propia de plugins profesionales",
    metrics: ["+100 Jugadores Concurrentes", "Cobertura Internacional", "20.0 TPS Continuos"],
  },
  {
    id: "airstudio",
    name: "Air Studio",
    role: "Dueño & Lead Dev",
    logo: AIR_STUDIO_LOGO,
    isCurrent: true,
    currentTag: "ESTUDIO ACTUAL · ACTIVO",
    side: "right",
    description: "Estudio de desarollo de configuraciones, setups, networks y plugins.",
    metrics: ["Estudio Oficial", "Creación de Plugins", "Configuraciones de Paga", "Servicios Profesionales"],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "goatpvp",
    name: "GoatPvP",
    role: "Dueño",
    avatar: "/public/assets/aistudio/image_234d3e67.png",
    content: "Excelente trabajo en la configuración del servidor y los plugins. Resolvió problemas de rendimiento que teníamos en la red y la atención fue rápida y profesional. Recomendado 100%.",
    highlightTag: "Optimización & Redes",
  },
  {
    id: "jimmy",
    name: "Jimmy",
    role: "Dueño",
    avatar: "/public/assets/aistudio/image_2885c7ae.png",
    content: "Nos ayudó con la arquitectura de la network y la sincronización de modalidades. Muy buen trato, soporte constante en Discord y código limpio sin fallos.",
    highlightTag: "Arquitectura de Network",
  },
  {
    id: "leo",
    name: "Leo",
    role: "Dueño",
    content: "Súper confiable para cualquier setup y creación de plugins. La entrega fue puntual y todo quedó funcionando perfectamente a la primera.",
    highlightTag: "Setups & Desarrollo",
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "fsdirectos",
    title: "FsDirectos",
    category: "Plugins Custom",
    badge: "GRATIS",
    isFree: true,
    summary: "Sirve para anunciar y gestionar transmisiones de streamers y YouTubers dentro del servidor mediante menús interactivos.",
    features: [
      "Menú GUI interactivo para ver streams activos.",
      "Comandos dinámicos para creadores de contenido (/directo).",
      "Altamente configurable y optimizado contra lag.",
    ],
    downloadInstructions: "Este plugin es gratis. Para descargarlo, entra al Discord oficial (https://discord.gg/Jmdc2Y7BmP), abre un ticket en #🧰︱ᴀʏᴜᴅᴀ-ᴛɪᴄᴋᴇᴛ y pídelo.",
    ticketChannel: "#🧰︱ᴀʏᴜᴅᴀ-ᴛɪᴄᴋᴇᴛ",
    tech: ["Spigot / Paper API", "Java 17/21", "Inventory GUI", "Config.yml"],
    images: [
      {
        url: "/public/assets/aistudio/image_e173d419.png",
        caption: "Menú GUI in-game de streams activos",
      },
      {
        url: "/public/assets/aistudio/image_c7a0edaa.png",
        caption: "Anuncio interactivo en el chat del servidor",
      },
    ],
  },
];
