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
