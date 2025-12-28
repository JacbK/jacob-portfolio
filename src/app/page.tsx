import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <rect width="64" height="64" rx="14" fill="white" />
            <path
              d="M20 48V16H32C35.1826 16 38.2348 17.2643 40.4853 19.5147C42.7357 21.7652 44 24.8174 44 28C44 31.1826 42.7357 34.2348 40.4853 36.4853C38.2348 38.7357 35.1826 40 32 40H28V48H20ZM28 32H32C33.0609 32 34.0783 31.5786 34.8284 30.8284C35.5786 30.0783 36 29.0609 36 28C36 26.9391 35.5786 25.9217 34.8284 25.1716C34.0783 24.4214 33.0609 24 32 24H28V32Z"
              fill="black"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-medium mb-4">Persona</h1>

        <p className="text-neutral-400 mb-8 leading-relaxed">
          Your portfolio will appear here once built.
          <br />
          Run the setup script to get started.
        </p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-8 text-left">
          <code className="text-sm text-neutral-300 font-mono">
            ./bin/setup.sh
          </code>
        </div>

        <Link
          href="/config"
          className="inline-block text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Or configure manually &rarr;
        </Link>
      </div>
    </main>
  );
}
