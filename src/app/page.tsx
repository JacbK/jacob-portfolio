import { Hero } from '@/components/ui/Hero';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { Terminal } from '@/components/ui/Terminal';
import { isUserDataPopulated, type UserProfile } from '@/data/schema';
import userData from '@/data/user.json';

export default function Home() {
  // Check if user data is populated
  const user = isUserDataPopulated(userData as Partial<UserProfile>)
    ? (userData as UserProfile)
    : null;

  const isLoading = !user;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <Hero user={user} isLoading={isLoading} />

      {/* Projects Bento Grid */}
      <BentoGrid
        projects={user?.projects ?? null}
        isLoading={isLoading}
      />

      {/* About Me Terminal */}
      <Terminal
        content={user?.bio?.long ?? null}
        isLoading={isLoading}
      />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-500 text-sm">
            {user ? (
              <>
                Built by {user.name} with{' '}
                <a
                  href="https://github.com/anthropics/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Claude Code
                </a>
              </>
            ) : (
              <>
                Powered by{' '}
                <a
                  href="https://github.com/anthropics/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Site-in-a-Box
                </a>
                {' '}— Run <code className="text-neutral-400">./bin/setup.sh</code> to get started
              </>
            )}
          </p>
        </div>
      </footer>
    </main>
  );
}
