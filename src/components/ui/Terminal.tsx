'use client';

import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Circle } from 'lucide-react';
import clsx from 'clsx';

interface TerminalProps {
  content: string | null;
  title?: string;
  isLoading?: boolean;
}

const TerminalButton = ({ color }: { color: 'red' | 'yellow' | 'green' }) => {
  const colors = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };
  return <Circle className={clsx('w-3 h-3 fill-current', colors[color])} />;
};

const LoadingTerminal = () => (
  <div className="font-mono text-sm">
    <div className="flex items-center gap-2 text-green-400 mb-2">
      <span className="text-neutral-500">$</span>
      <span>initializing...</span>
    </div>
    <div className="text-neutral-500 animate-pulse">
      <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
    </div>
  </div>
);

export function Terminal({ content, title = 'about-me', isLoading = false }: TerminalProps) {
  const formattedContent = content?.split('\n\n').map((paragraph, i) => (
    <p key={i} className="mb-4 last:mb-0">
      {paragraph}
    </p>
  ));

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-neutral-400">
            A bit more about who I am and what drives me.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-4 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <TerminalButton color="red" />
              <TerminalButton color="yellow" />
              <TerminalButton color="green" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 text-neutral-400 text-sm flex-1 justify-center -ml-12">
              <TerminalIcon className="w-4 h-4" />
              <span>{title}.sh</span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-6 min-h-[300px]">
            {isLoading || !content ? (
              <LoadingTerminal />
            ) : (
              <div className="font-mono text-sm leading-relaxed">
                {/* Command prompt */}
                <div className="flex items-start gap-2 text-green-400 mb-4">
                  <span className="text-neutral-500 select-none">$</span>
                  <span>cat about-me.txt</span>
                </div>

                {/* Content with subtle typewriter feel */}
                <motion.div
                  className="text-neutral-300 pl-4 border-l-2 border-neutral-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {formattedContent}
                </motion.div>

                {/* Cursor line */}
                <div className="flex items-center gap-2 text-green-400 mt-6">
                  <span className="text-neutral-500 select-none">$</span>
                  <span className="w-2 h-5 bg-green-400 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional terminal commands (decorative) */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {['npm run passion', 'git commit -m "ship it"', 'brew install creativity'].map(
            (cmd) => (
              <span
                key={cmd}
                className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 text-sm font-mono"
              >
                {cmd}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Terminal;
