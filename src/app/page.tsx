export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <h1 className="font-serif text-4xl mb-6">Jacob Kieser</h1>

        <p className="text-neutral-400 mb-8 leading-relaxed">
          Software engineer building data infrastructure and internal tools.
        </p>

        <div className="space-y-2 text-sm text-neutral-500 mb-8">
          <p>
            <span className="text-neutral-300">Palantir</span> — Forward Deployed Software Engineer, Warp Speed
          </p>
          <p>
            <span className="text-neutral-300">Uber</span> — Backend Engineer, Competitive Intelligence Platform
          </p>
        </div>

        <a
          href="mailto:jacobk2112@gmail.com"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          jacobk2112@gmail.com
        </a>
      </div>
    </main>
  );
}
