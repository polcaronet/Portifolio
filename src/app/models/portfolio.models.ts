// src/app/models/portfolio.models.ts

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  stars: number;
  forks: number;
  category: 'Full Stack' | 'Backend' | 'Ferramentas' | 'Mobile';
  status: 'Ativo' | 'Arquivado';
  github: string;
  demo?: string;
  highlight?: boolean;
}

export interface LiveVideo {
  id: string;
  title: string;
  desc: string;
  hashtags: string[];
  views: string;
  likes: string;
  duration: string;
  durationSec: number;
  date: string;
  tags: string[];
}

export interface ContentPost {
  category: string;
  emoji: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  link?: string;
  code?: string;
}

export interface TimelineItem {
  type: 'work' | 'edu' | 'award' | 'stream' | 'game' | 'community' | 'rocket';
  year: string;
  title: string;
  place: string;
  desc: string;
  category?: string;
}

export interface Social {
  icon: string;
  label: string;
  handle: string;
  href: string;
  color: string;
}

export interface NavLink {
  path: string;
  label: string;
  icon: string;
  badge?: { text: string; type: 'red' | 'green' | 'yellow' | 'purple' };
}
