'use client';

import { motion, type Variants } from 'framer-motion';
import type { Experience as ExperienceType } from '@/data/schema';

interface ExperienceProps {
  experiences: ExperienceType[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Experience({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12"
        >
          Experience
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-6 pb-8 last:pb-0 relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-900 dark:bg-neutral-100 border-2 border-neutral-300 dark:border-neutral-700"></div>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>

              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-3">
                {exp.company}
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="mr-2 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
