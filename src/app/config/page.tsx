'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Save, Download } from 'lucide-react';
import Link from 'next/link';

// Example archetype images (you'd replace these with actual curated examples)
const ARCHETYPE_EXAMPLES = [
  {
    id: 1,
    name: 'Brutalist',
    description: 'Sharp edges, monospace, high contrast',
    examples: [
      { url: 'https://brutalist-web.design/', thumbnail: '🔲' },
      { url: 'https://neobrutalism.dev/', thumbnail: '⬛' },
      { url: 'https://mono.company/', thumbnail: '▪️' },
    ],
  },
  {
    id: 2,
    name: 'Editorial',
    description: 'Magazine layouts, serif headers, asymmetric',
    examples: [
      { url: 'https://www.nytimes.com/', thumbnail: '📰' },
      { url: 'https://pudding.cool/', thumbnail: '📖' },
      { url: 'https://www.theverge.com/', thumbnail: '📄' },
    ],
  },
  {
    id: 3,
    name: 'Technical Terminal',
    description: 'Command-line aesthetic, monospace, CRT',
    examples: [
      { url: 'https://terminal.sexy/', thumbnail: '💻' },
      { url: 'https://www.robinsloan.com/', thumbnail: '🖥️' },
      { url: 'https://github.com/', thumbnail: '⌨️' },
    ],
  },
  {
    id: 4,
    name: 'Retro Arcade',
    description: 'Pixel fonts, neon colors, 8-bit graphics',
    examples: [
      { url: 'https://www.poolsuite.net/', thumbnail: '🎮' },
      { url: 'https://bruno-simon.com/', thumbnail: '👾' },
      { url: 'https://www.windows93.net/', thumbnail: '🕹️' },
    ],
  },
  {
    id: 5,
    name: 'Bold Geometric',
    description: 'Color blocking, shapes, high contrast',
    examples: [
      { url: 'https://linear.app/', thumbnail: '🔷' },
      { url: 'https://stripe.com/', thumbnail: '◼️' },
      { url: 'https://vercel.com/', thumbnail: '▲' },
    ],
  },
  {
    id: 6,
    name: 'Refined Luxury',
    description: 'Elegant serifs, gold/silver, large whitespace',
    examples: [
      { url: 'https://www.apple.com/', thumbnail: '✨' },
      { url: 'https://www.rolex.com/', thumbnail: '💎' },
      { url: 'https://www.bottega.com/', thumbnail: '🏛️' },
    ],
  },
];

export default function ConfigPage() {
  const [config, setConfig] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
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

  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);
  const [suggestedArchetype, setSuggestedArchetype] = useState<number | null>(null);

  // Calculate suggested archetype based on selected examples
  useEffect(() => {
    if (selectedExamples.length === 0) {
      setSuggestedArchetype(null);
      return;
    }

    const archetypeCounts: Record<number, number> = {};
    selectedExamples.forEach((url) => {
      const archetype = ARCHETYPE_EXAMPLES.find((a) =>
        a.examples.some((e) => e.url === url)
      );
      if (archetype) {
        archetypeCounts[archetype.id] = (archetypeCounts[archetype.id] || 0) + 1;
      }
    });

    const suggested = Object.entries(archetypeCounts).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    setSuggestedArchetype(suggested ? parseInt(suggested) : null);
  }, [selectedExamples]);

  const toggleExample = (url: string) => {
    setSelectedExamples((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const downloadConfig = () => {
    const yaml = `# Site-in-a-Box: Profile Configuration
name: "${config.name || 'Your Name'}"

# Contact & Social Links
email: "${config.email}"
github: "${config.github}"
linkedin: "${config.linkedin}"
twitter: "${config.twitter}"
website: "${config.website}"

# Design Preferences
design:
  creativity: ${config.design.creativity}
  simplicity: ${config.design.simplicity}
  playfulness: ${config.design.playfulness}
  animation: ${config.design.animation}
  color_intensity: ${config.design.color_intensity}
  archetype: ${suggestedArchetype || config.design.archetype}

# Content Preferences
content:
  tone: "${config.content.tone}"
  length: "${config.content.length}"
  focus: "${config.content.focus}"

# AI Behavior
ai:
  quality_bar: ${config.ai.quality_bar}
  research_depth: ${config.ai.research_depth}
  copy_creativity: ${config.ai.copy_creativity}

# Personal Notes
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
    return null; // Don't render in production
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-4xl font-bold">Portfolio Config</h1>
          </div>
          <button
            onClick={downloadConfig}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Download size={20} />
            Download profile.yaml
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Basic Info & Sliders */}
          <div className="space-y-8">
            <section className="bg-neutral-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={config.github}
                    onChange={(e) =>
                      setConfig({ ...config, github: e.target.value })
                    }
                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={config.linkedin}
                    onChange={(e) =>
                      setConfig({ ...config, linkedin: e.target.value })
                    }
                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </section>

            <section className="bg-neutral-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Design Preferences</h2>
              <div className="space-y-6">
                {[
                  { key: 'creativity', label: 'Creativity', desc: 'How experimental?' },
                  { key: 'simplicity', label: 'Simplicity', desc: 'How minimal?' },
                  { key: 'playfulness', label: 'Playfulness', desc: 'How fun vs serious?' },
                  { key: 'animation', label: 'Animation', desc: 'How much motion?' },
                  { key: 'color_intensity', label: 'Color Intensity', desc: 'How vibrant?' },
                ].map(({ key, label, desc }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <label className="text-sm font-medium">{label}</label>
                        <p className="text-xs text-neutral-500">{desc}</p>
                      </div>
                      <span className="text-2xl font-bold">
                        {config.design[key as keyof typeof config.design]}
                      </span>
                    </div>
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
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-neutral-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Personal Notes</h2>
              <textarea
                value={config.notes}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white h-32 font-mono text-sm"
                placeholder="Tell the AI about yourself, your goals, design inspirations, projects to highlight..."
              />
            </section>
          </div>

          {/* Right Column: Visual Archetype Selector */}
          <div className="space-y-8">
            <section className="bg-neutral-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2">Choose Visual Style</h2>
              <p className="text-neutral-400 text-sm mb-6">
                Click on websites you like. We'll suggest an archetype based on your selections.
              </p>

              {suggestedArchetype && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-medium">
                    Suggested: {ARCHETYPE_EXAMPLES[suggestedArchetype - 1]?.name}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Based on your {selectedExamples.length} selections
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {ARCHETYPE_EXAMPLES.map((archetype) => (
                  <div key={archetype.id} className="border-b border-neutral-800 pb-6 last:border-0">
                    <h3 className="font-bold text-lg mb-1">{archetype.name}</h3>
                    <p className="text-sm text-neutral-500 mb-3">{archetype.description}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {archetype.examples.map((example) => (
                        <button
                          key={example.url}
                          onClick={() => toggleExample(example.url)}
                          className={`aspect-square rounded-lg border-2 transition-all flex items-center justify-center text-4xl ${
                            selectedExamples.includes(example.url)
                              ? 'border-white bg-white/10'
                              : 'border-neutral-700 hover:border-neutral-600'
                          }`}
                        >
                          {example.thumbnail}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-800">
                <label className="block text-sm text-neutral-400 mb-2">
                  Or manually select archetype
                </label>
                <select
                  value={suggestedArchetype || config.design.archetype}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      design: { ...config.design, archetype: parseInt(e.target.value) },
                    })
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                >
                  <option value={0}>Random (AI decides)</option>
                  {ARCHETYPE_EXAMPLES.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
