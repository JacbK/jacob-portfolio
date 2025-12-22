# Site-in-a-Box

A Next.js portfolio template that uses AI to build itself. Give it your GitHub or LinkedIn, and it handles the rest.

## What is this?

Most portfolio templates make you copy-paste your info into a dozen files. This one asks Claude to do the boring work.

You run a script, answer a couple questions, and the AI researches you online, pulls your projects and experience, writes compelling copy, and populates everything automatically.

The result? A modern, animated portfolio site that actually reflects your work.

## Quick Start

```bash
git clone https://github.com/your-username/site-in-a-box.git my-portfolio
cd my-portfolio
./bin/setup.sh
```

The setup script will:
1. Install dependencies
2. Check for Claude Code
3. Launch an AI agent that interviews you and builds your site

If you don't have Claude Code installed, the script will tell you how to get it.

## What You Get

- **Animated hero section** with your name, title, and social links
- **Project showcase** in a responsive bento grid layout
- **Terminal-style about section** because we're all nerds here
- **Dark theme** that doesn't burn your retinas
- **Fully typed** with TypeScript
- **Production ready** - just add content and deploy

## Requirements

- Node.js 18 or newer
- Claude Code (for the AI setup flow)

## The Manual Way

Not into AI agents? That's fair. You can populate it yourself:

```bash
npm install
npm run dev
```

Then edit `src/data/user.json` with your info. The schema is in `src/data/schema.ts`.

## Supercharging the AI (Optional)

The AI agent works fine out of the box, but if you want it to really dig into your online presence, you can set up MCP servers:

**Exa** - AI-powered search for finding your work across the web
**GitHub API** - Pulls your repos, languages, contribution stats
**Brave Search** - General web search for talks, mentions, etc.

Config examples are in `mcp-requirements.json`. The agent will work without these, it just won't be as thorough.

## How It Works

1. You give the agent your name and a profile link (GitHub, LinkedIn, whatever)
2. It searches for your projects, roles, tech stack, writing, talks
3. It generates professional copy (tagline, bio, project descriptions)
4. It writes everything to `src/data/user.json`
5. The UI reads that JSON and renders your site

The skeleton components are already built. The AI just fills in the content.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/ui/    # Hero, BentoGrid, Terminal
└── data/
    ├── schema.ts     # TypeScript interfaces
    └── user.json     # Your content (AI populated)

.agent/
└── instructions.md   # The AI's "job description"

bin/
└── setup.sh         # Bootstrap script
```

## Customization

**Colors**: The site uses Tailwind's neutral palette. Change classes in the components to adjust.

**Fonts**: Currently Inter and JetBrains Mono. Swap in `src/app/layout.tsx`.

**Sections**: Add new sections by:
1. Updating the schema in `src/data/schema.ts`
2. Creating a component in `src/components/ui/`
3. Adding it to `src/app/page.tsx`
4. Updating `.agent/instructions.md` so the AI knows to populate it

## Deployment

This is a standard Next.js app. Deploy anywhere:

**Vercel** (easiest):
```bash
npm install -g vercel
vercel
```

**Others**: Works with Netlify, Railway, Render, or any Node.js host.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Troubleshooting

**"Port 3000 in use"**
Kill the process: `lsof -ti:3000 | xargs kill -9`

**"Empty portfolio showing"**
The `user.json` is empty. Run `./bin/setup.sh` or populate it manually.

**"Fonts not loading"**
This uses Google Fonts (Inter + JetBrains Mono). If you're offline, they'll fallback to system fonts.

**"Agent not finding my info"**
Make sure your GitHub/LinkedIn is public. For better results, set up MCP servers (see above).

## Why This Exists

Building a portfolio shouldn't take a week. Updating it shouldn't take an afternoon.

I wanted something that could scaffold itself intelligently, look modern without being trendy, and get out of your way so you can ship it and forget about it.

Use it. Fork it. Break it. Whatever.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)

## License

MIT - Do what you want with it.
