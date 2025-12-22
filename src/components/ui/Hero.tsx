'use client';

import { motion, type Variants } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Twitter, Globe, ArrowDown } from 'lucide-react';
import clsx from 'clsx';
import type { UserProfile } from '@/data/schema';

interface HeroProps {
  user: UserProfile | null;
  isLoading?: boolean;
}

const SkeletonLine = ({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) => (
  <div className={clsx('animate-pulse bg-neutral-800 rounded', width, height)} />
);

const SocialLink = ({
  href,
  icon: Icon,
  label
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 transition-all"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-neutral-300" />
  </motion.a>
);

export function Hero({ user, isLoading = false }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Loading/Empty State
  if (isLoading || !user) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <SkeletonLine width="w-32 mx-auto" height="h-3" />
            <SkeletonLine width="w-80 mx-auto" height="h-12" />
            <SkeletonLine width="w-64 mx-auto" height="h-6" />
          </div>
          <div className="max-w-2xl mx-auto">
            <SkeletonLine width="w-full" height="h-4" />
            <div className="mt-2">
              <SkeletonLine width="w-3/4 mx-auto" height="h-4" />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-neutral-800 animate-pulse" />
            ))}
          </div>
          <p className="text-neutral-500 text-sm animate-pulse">
            Setting up your portfolio...
          </p>
        </div>
      </section>
    );
  }

  // Populated State
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Location badge */}
        {user.location && (
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm">
              <MapPin className="w-4 h-4" />
              {user.location}
            </span>
          </motion.div>
        )}

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          {user.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-neutral-400 font-medium"
        >
          {user.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
        >
          {user.tagline}
        </motion.p>

        {/* Short bio */}
        {user.bio?.short && (
          <motion.p
            variants={itemVariants}
            className="text-neutral-500 max-w-xl mx-auto"
          >
            {user.bio.short}
          </motion.p>
        )}

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-4">
          {user.contact?.github && (
            <SocialLink href={user.contact.github} icon={Github} label="GitHub" />
          )}
          {user.contact?.linkedin && (
            <SocialLink href={user.contact.linkedin} icon={Linkedin} label="LinkedIn" />
          )}
          {user.contact?.twitter && (
            <SocialLink href={user.contact.twitter} icon={Twitter} label="Twitter" />
          )}
          {user.contact?.email && (
            <SocialLink href={`mailto:${user.contact.email}`} icon={Mail} label="Email" />
          )}
          {user.contact?.website && (
            <SocialLink href={user.contact.website} icon={Globe} label="Website" />
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-6">
          <motion.a
            href="#projects"
            className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#about"
            className="px-8 py-3 rounded-full bg-neutral-900 border border-neutral-700 text-white font-medium hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            About Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
        >
          <ArrowDown className="w-6 h-6 text-neutral-600" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
