import { Hero } from '@/components/ui/Hero';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { Terminal } from '@/components/ui/Terminal';
import Experience from '@/components/ui/Experience';
import { isUserDataPopulated, type UserProfile } from '@/data/schema';
import Link from 'next/link';
import { Settings } from 'lucide-react';

// Dynamically import user data - may not exist on first run
let userData: Partial<UserProfile> = {};
try {
  userData = require('@/data/user.json');
} catch {
  // File doesn't exist yet - user hasn't run the AI generator
  userData = {};
}

export default function Home() {
  // Check if user data is populated
  const user = isUserDataPopulated(userData)
    ? (userData as UserProfile)
    : null;

  const isLoading = !user;
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Dev-only config button - only show if no user data */}
      {isDev && !user && (
        <Link
          href="/config"
          className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-lg hover:bg-neutral-200 transition-all z-50 flex items-center gap-2"
        >
          <Settings size={24} />
          <span className="hidden sm:inline font-medium">Config</span>
        </Link>
      )}

      {/* Hero Section */}
      <Hero user={user} isLoading={isLoading} />

      {/* Projects Bento Grid */}
      <BentoGrid
        projects={user?.projects ?? null}
        isLoading={isLoading}
      />

      {/* Experience Timeline */}
      <Experience
        experiences={user?.experience ?? []}
      />

      {/* About Me Terminal */}
      <Terminal
        content={user?.bio?.long ?? null}
        isLoading={isLoading}
      />

      {/* Footer */}
      {!user && (
        <footer className="py-12 px-6 border-t border-neutral-900">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-neutral-500 text-sm">
              Run <code className="text-neutral-400">./bin/setup.sh</code> to get started
            </p>
          </div>
        </footer>
      )}
    </main>
  );
}
