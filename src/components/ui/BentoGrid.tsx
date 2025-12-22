'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import clsx from 'clsx';
import type { Project } from '@/data/schema';

interface BentoGridProps {
  projects: Project[] | null;
  isLoading?: boolean;
}

const SkeletonCard = ({ featured = false }: { featured?: boolean }) => (
  <div
    className={clsx(
      'rounded-2xl bg-neutral-900 border border-neutral-800 p-6 animate-pulse',
      featured ? 'md:col-span-2 md:row-span-2' : ''
    )}
  >
    <div className="h-40 bg-neutral-800 rounded-lg mb-4" />
    <div className="space-y-3">
      <div className="h-6 bg-neutral-800 rounded w-3/4" />
      <div className="h-4 bg-neutral-800 rounded w-full" />
      <div className="h-4 bg-neutral-800 rounded w-2/3" />
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 bg-neutral-800 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isFeatured = project.featured;

  return (
    <motion.article
      className={clsx(
        'group relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden',
        'hover:border-neutral-700 transition-all duration-300',
        isFeatured ? 'md:col-span-2 md:row-span-2' : ''
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-medium">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </span>
        </div>
      )}

      {/* Project image placeholder */}
      <div
        className={clsx(
          'relative bg-gradient-to-br from-neutral-800 to-neutral-900',
          isFeatured ? 'h-64' : 'h-40'
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">
              {project.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className={clsx('p-6', isFeatured ? 'p-8' : 'p-6')}>
        <h3 className={clsx(
          'font-bold text-white mb-2',
          isFeatured ? 'text-2xl' : 'text-lg'
        )}>
          {project.name}
        </h3>

        <p className={clsx(
          'text-neutral-400 mb-4 line-clamp-3',
          isFeatured ? 'text-base' : 'text-sm'
        )}>
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, isFeatured ? 6 : 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > (isFeatured ? 6 : 4) && (
            <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-500 text-xs">
              +{project.techStack.length - (isFeatured ? 6 : 4)}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              whileHover={{ x: 2 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              whileHover={{ x: 2 }}
            >
              <Github className="w-4 h-4" />
              Source
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
};

export function BentoGrid({ projects, isLoading = false }: BentoGridProps) {
  // Loading/Empty State
  if (isLoading || !projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-neutral-800 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-64 bg-neutral-800 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard featured />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <p className="text-center text-neutral-500 text-sm mt-8 animate-pulse">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  // Sort projects with featured first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-950 -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A selection of projects I&apos;ve worked on, from open source tools to full-stack applications.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
