// Site-in-a-Box: User Profile Schema
// This file defines the TypeScript interfaces for user data
// The AI agent populates user.json following this schema

export interface Contact {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface TechStack {
  languages: string[];
  frameworks: string[];
  tools: string[];
  currently_learning?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Bio {
  short: string;
  long: string;
}

export interface ProjectMeta {
  source?: 'github' | 'manual';
  added?: string;
  last_updated?: string;
}

export interface ExperienceMeta {
  source?: 'linkedin' | 'manual';
  added?: string;
  last_updated?: string;
  current?: boolean;
  promoted?: boolean;
  promotion_date?: string;
  end_date?: string;
}

export interface DesignMetadata {
  archetype: 1 | 2 | 3 | 4 | 5 | 6;
  archetype_name: 'Brutalist' | 'Editorial' | 'Technical Terminal' | 'Retro Arcade' | 'Bold Geometric' | 'Refined Luxury';
  font_pairing: {
    header: string;
    body: string;
  };
  color_palette: {
    name: string; // e.g., "Palette A", "Palette B", "Palette C"
    primary: string;
    secondary: string;
    accent: string;
  };
  randomization_seed?: string; // timestamp or random value to document uniqueness
}

export interface DataMeta {
  last_refresh?: string;
  last_full_build?: string;
  last_copy_refresh?: string;
  sources?: {
    [key: string]: 'auto' | 'manual';
  };
  auto_fields?: string[];
  manual_fields?: string[];
  design?: DesignMetadata;
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  location?: string;
  bio: Bio;
  contact: Contact;
  experience: Experience[];
  projects: Project[];
  techStack: TechStack;
  education?: Education[];
  achievements?: string[];
  _meta?: DataMeta;
}

// Type guard to check if user data is populated
export function isUserDataPopulated(data: Partial<UserProfile> | null): data is UserProfile {
  return (
    data !== null &&
    typeof data.name === 'string' &&
    data.name.length > 0 &&
    typeof data.title === 'string' &&
    typeof data.bio === 'object' &&
    data.bio !== null
  );
}

// Default empty state
export const emptyUserProfile: Partial<UserProfile> = {};
