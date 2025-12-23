'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ARCHETYPE_EXAMPLES = [
  {
    id: 1,
    name: 'Brutalist',
    description: 'Sharp edges, monospace, high contrast',
    color: 'from-neutral-900 to-neutral-800',
    examples: [
      { name: 'Brutalist Web Design', url: 'https://brutalist-web.design', screenshot: 'https://api.microlink.io/?url=https://brutalist-web.design&screenshot=true&embed=screenshot.url' },
      { name: 'Neobrutalism', url: 'https://neobrutalism.dev', screenshot: 'https://api.microlink.io/?url=https://neobrutalism.dev&screenshot=true&embed=screenshot.url' },
      { name: 'Mono Company', url: 'https://mono.company', screenshot: 'https://api.microlink.io/?url=https://mono.company&screenshot=true&embed=screenshot.url' },
    ],
  },
  {
    id: 2,
    name: 'Editorial',
    description: 'Magazine layouts, serif headers',
    color: 'from-amber-900 to-amber-800',
    examples: [
      { name: 'NY Times', url: 'https://www.nytimes.com', screenshot: 'https://api.microlink.io/?url=https://www.nytimes.com&screenshot=true&embed=screenshot.url' },
      { name: 'The Pudding', url: 'https://pudding.cool', screenshot: 'https://api.microlink.io/?url=https://pudding.cool&screenshot=true&embed=screenshot.url' },
      { name: 'The Verge', url: 'https://www.theverge.com', screenshot: 'https://api.microlink.io/?url=https://www.theverge.com&screenshot=true&embed=screenshot.url' },
    ],
  },
  {
    id: 3,
    name: 'Terminal',
    description: 'Command-line aesthetic, CRT colors',
    color: 'from-green-900 to-green-800',
    examples: [
      { name: 'Terminal Sexy', url: 'https://terminal.sexy', screenshot: 'https://api.microlink.io/?url=https://terminal.sexy&screenshot=true&embed=screenshot.url' },
      { name: 'Robin Sloan', url: 'https://www.robinsloan.com', screenshot: 'https://api.microlink.io/?url=https://www.robinsloan.com&screenshot=true&embed=screenshot.url' },
      { name: 'GitHub', url: 'https://github.com', screenshot: 'https://api.microlink.io/?url=https://github.com&screenshot=true&embed=screenshot.url' },
    ],
  },
  {
    id: 4,
    name: 'Retro Arcade',
    description: 'Pixel fonts, neon colors, 8-bit',
    color: 'from-fuchsia-900 to-purple-900',
    examples: [
      { name: 'Poolsuite', url: 'https://poolsuite.net', screenshot: 'https://api.microlink.io/?url=https://poolsuite.net&screenshot=true&embed=screenshot.url' },
      { name: 'Bruno Simon', url: 'https://bruno-simon.com', screenshot: 'https://api.microlink.io/?url=https://bruno-simon.com&screenshot=true&embed=screenshot.url' },
      { name: 'Windows 93', url: 'https://www.windows93.net', screenshot: 'https://api.microlink.io/?url=https://www.windows93.net&screenshot=true&embed=screenshot.url' },
    ],
  },
  {
    id: 5,
    name: 'Geometric',
    description: 'Color blocking, shapes, bold',
    color: 'from-blue-900 to-blue-800',
    examples: [
      { name: 'Linear', url: 'https://linear.app', screenshot: 'https://api.microlink.io/?url=https://linear.app&screenshot=true&embed=screenshot.url' },
      { name: 'Stripe', url: 'https://stripe.com', screenshot: 'https://api.microlink.io/?url=https://stripe.com&screenshot=true&embed=screenshot.url' },
      { name: 'Vercel', url: 'https://vercel.com', screenshot: 'https://api.microlink.io/?url=https://vercel.com&screenshot=true&embed=screenshot.url' },
    ],
  },
  {
    id: 6,
    name: 'Luxury',
    description: 'Elegant serifs, large whitespace',
    color: 'from-stone-900 to-stone-800',
    examples: [
      { name: 'Apple', url: 'https://www.apple.com', screenshot: 'https://api.microlink.io/?url=https://www.apple.com&screenshot=true&embed=screenshot.url' },
      { name: 'Rolex', url: 'https://www.rolex.com', screenshot: 'https://api.microlink.io/?url=https://www.rolex.com&screenshot=true&embed=screenshot.url' },
      { name: 'Bottega Veneta', url: 'https://www.bottegaveneta.com', screenshot: 'https://api.microlink.io/?url=https://www.bottegaveneta.com&screenshot=true&embed=screenshot.url' },
    ],
  },
];

export default function ConfigPage() {
  const [config, setConfig] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    design: {
      creativity: 5,
      simplicity: 7,
      playfulness: 4,
      animation: 5,
      color_intensity: 4,
      archetype: 0,
    },
    content: {
      tone: 'conversational',
      length: 'balanced',
      focus: 'projects',
    },
    ai: {
      quality_bar: 7,
      research_depth: 6,
      copy_creativity: 5,
    },
    notes: '',
  });

  const [selectedArchetype, setSelectedArchetype] = useState<number>(0);
  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);

  // Auto-select archetype when user picks 2+ examples from same category
  useEffect(() => {
    if (selectedExamples.length < 2) return;

    const archetypeCounts: Record<number, number> = {};
    selectedExamples.forEach((exampleUrl) => {
      const archetype = ARCHETYPE_EXAMPLES.find((a) =>
        a.examples.some((e) => e.url === exampleUrl)
      );
      if (archetype) {
        archetypeCounts[archetype.id] = (archetypeCounts[archetype.id] || 0) + 1;
      }
    });

    // Find archetype with most selections
    const suggested = Object.entries(archetypeCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0];

    if (suggested && archetypeCounts[Number(suggested)] >= 2) {
      setSelectedArchetype(Number(suggested));
    }
  }, [selectedExamples]);

  const toggleExample = (url: string) => {
    setSelectedExamples((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const downloadConfig = () => {
    const yaml = `name: "${config.name || 'Your Name'}"
email: "${config.email}"
github: "${config.github}"
linkedin: "${config.linkedin}"

design:
  creativity: ${config.design.creativity}
  simplicity: ${config.design.simplicity}
  playfulness: ${config.design.playfulness}
  animation: ${config.design.animation}
  color_intensity: ${config.design.color_intensity}
  archetype: ${selectedArchetype}

content:
  tone: "${config.content.tone}"
  length: "${config.content.length}"
  focus: "${config.content.focus}"

ai:
  quality_bar: ${config.ai.quality_bar}
  research_depth: ${config.ai.research_depth}
  copy_creativity: ${config.ai.copy_creativity}

notes: |
${config.notes.split('\n').map((line) => `  ${line}`).join('\n')}
`;

    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Portfolio Config</h1>
          <button
            onClick={downloadConfig}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Info Banner */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-12">
          <div className="flex gap-3">
            <Sparkles size={24} className="text-neutral-500 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-lg mb-2">Most fields are optional</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Only your <span className="text-white font-medium">name</span> is required.
                The AI will research and fill in everything else. Configure what you want to control directly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Basic Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Basic Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={config.github}
                    onChange={(e) => setConfig({ ...config, github: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={config.linkedin}
                    onChange={(e) => setConfig({ ...config, linkedin: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <select
                    value={config.content.tone}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: { ...config.content, tone: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="professional">Professional</option>
                    <option value="conversational">Conversational</option>
                    <option value="technical">Technical</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Focus</label>
                  <select
                    value={config.content.focus}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: { ...config.content, focus: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="projects">Projects</option>
                    <option value="experience">Experience</option>
                    <option value="skills">Skills</option>
                    <option value="personality">Personality</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Personal Notes</label>
              <textarea
                value={config.notes}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 h-32 resize-none text-sm"
                placeholder="Tell the AI about yourself, your goals, design inspirations..."
              />
            </div>
          </div>

          {/* Column 2: Visual Style */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Visual Style
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              Click 2-3 websites you like. We'll suggest the matching archetype.
            </p>

            {selectedArchetype > 0 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <p className="text-green-400 font-medium">
                  ✓ Suggested: {ARCHETYPE_EXAMPLES[selectedArchetype - 1]?.name}
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Based on your {selectedExamples.length} selection{selectedExamples.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            <div className="space-y-8">
              {ARCHETYPE_EXAMPLES.map((archetype) => (
                <div key={archetype.id} className="border-b border-neutral-800 pb-8 last:border-0">
                  <h3 className="font-bold text-lg mb-1">{archetype.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{archetype.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {archetype.examples.map((example) => (
                      <button
                        key={example.url}
                        onClick={() => toggleExample(example.url)}
                        className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedExamples.includes(example.url)
                            ? 'border-white ring-2 ring-white/20'
                            : 'border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        <img
                          src={example.screenshot}
                          alt={example.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to gradient if screenshot fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add(`bg-gradient-to-br`, archetype.color);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{example.name}</span>
                        </div>
                        {selectedExamples.includes(example.url) && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800">
              <label className="block text-sm font-medium mb-2">
                Or manually select archetype
              </label>
              <select
                value={selectedArchetype}
                onChange={(e) => setSelectedArchetype(parseInt(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value={0}>Random (AI decides)</option>
                {ARCHETYPE_EXAMPLES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-neutral-800 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6">
                Design Preferences
              </h2>
              <div className="space-y-6">
                {[
                  { key: 'creativity', label: 'Creativity', desc: 'Experimental ← → Safe' },
                  { key: 'simplicity', label: 'Simplicity', desc: 'Dense ← → Minimal' },
                  { key: 'playfulness', label: 'Playfulness', desc: 'Serious ← → Fun' },
                  { key: 'animation', label: 'Animation', desc: 'Static ← → Motion-rich' },
                  { key: 'color_intensity', label: 'Color', desc: 'Monochrome ← → Vibrant' },
                ].map(({ key, label, desc }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-neutral-500">{desc}</div>
                      </div>
                      <div className="text-2xl font-bold tabular-nums w-12 text-right">
                        {config.design[key as keyof typeof config.design]}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={config.design[key as keyof typeof config.design]}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            design: {
                              ...config.design,
                              [key]: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5
                          [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:bg-white
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:hover:scale-110
                          [&::-moz-range-thumb]:w-5
                          [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:bg-white
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-neutral-600 mt-2">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to build?</h3>
          <p className="text-neutral-400 mb-6">
            Download your config and run the setup script to generate your portfolio
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={downloadConfig}
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-neutral-200 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={20} />
              Download profile.yaml
            </button>
            <div className="text-neutral-600">→</div>
            <div className="text-sm text-neutral-400 font-mono">
              ./bin/setup.sh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
