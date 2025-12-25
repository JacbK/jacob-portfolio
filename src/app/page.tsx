import Link from 'next/link';
import { Settings, Sparkles } from 'lucide-react';

export default function Home() {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full border border-neutral-800">
            <Sparkles size={16} className="text-neutral-400" />
            <span className="text-sm text-neutral-400">AI-Powered Portfolio Builder</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Persona
          </h1>
          <p className="text-xl text-neutral-400">
            Build a unique portfolio that actually represents you.
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-left space-y-6">
          <h2 className="text-lg font-semibold">Getting Started</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-sm font-mono">1</div>
              <div>
                <p className="font-medium">Configure your profile</p>
                <p className="text-sm text-neutral-500">
                  {isDev ? (
                    <>Use the <Link href="/config" className="text-white underline">config UI</Link> or edit <code className="bg-neutral-800 px-1.5 py-0.5 rounded">profile.yaml</code></>
                  ) : (
                    <>Edit <code className="bg-neutral-800 px-1.5 py-0.5 rounded">profile.yaml</code> with your info</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-sm font-mono">2</div>
              <div>
                <p className="font-medium">Add materials (optional)</p>
                <p className="text-sm text-neutral-500">
                  Drop resume, headshot, or project images in <code className="bg-neutral-800 px-1.5 py-0.5 rounded">/materials</code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-sm font-mono">3</div>
              <div>
                <p className="font-medium">Run the AI builder</p>
                <p className="text-sm text-neutral-500">
                  Use your AI CLI tool to build from <code className="bg-neutral-800 px-1.5 py-0.5 rounded">.agent/instructions.md</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <p className="text-neutral-500 text-sm max-w-md mx-auto">
          No templates. No cookie-cutter layouts. The AI builds from scratch based on who you are.
        </p>

        {/* Dev Config Button */}
        {isDev && (
          <Link
            href="/config"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
          >
            <Settings size={18} />
            Open Config
          </Link>
        )}
      </div>
    </main>
  );
}
