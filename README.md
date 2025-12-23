# Persona

AI-powered portfolio generator. Clone it, run setup, get a portfolio.

## Quick Start

```bash
git clone https://github.com/your-username/persona.git
cd persona
./bin/setup.sh
```

The setup script will:
1. Install dependencies
2. Open a config UI in your browser
3. Launch your AI coding assistant to build the portfolio

## What You Need

- Node.js 18+
- An AI coding assistant (Claude Code, Codex, Gemini, Aider, or Cursor)

## Optional: Add Your Materials

Drop files in `/materials` before running setup:

```
materials/
├── images/
│   └── profile.jpg      # Your headshot
└── documents/
    └── resume.pdf       # AI will extract your info
```

## Manual Mode

Don't want AI? Edit `src/data/user.json` directly:

```bash
npm install
npm run dev
```

## Deploy

```bash
vercel
```

Or use Netlify, Railway, Render, etc.

## License

MIT
