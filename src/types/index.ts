export type Language = 'es' | 'en';

export type WorkCategory = 'Todo' | 'Plugins Custom' | 'Sistemas Proxy' | 'Configuraciones' | 'Setups';

export interface ProjectImage {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  category: WorkCategory;
  badge?: string;
  isFree?: boolean;
  summary: string;
  features?: string[];
  problem?: string;
  solution?: string[];
  impact?: string;
  tech?: string[];
  highlight?: boolean;
  downloadInstructions?: string;
  ticketChannel?: string;
  images?: ProjectImage[];
}

export interface TimelineEntry {
  id: string;
  name: string;
  role: string;
  logo: string;
  isPopular?: boolean;
  popularTag?: string;
  isCurrent?: boolean;
  currentTag?: string;
  side: 'left' | 'right';
  description: string;
  metrics: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  network?: string;
  content: string;
  highlightTag: string;
}
