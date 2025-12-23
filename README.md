# Site-in-a-Box

A Next.js portfolio template that doesn't just use AI—it uses AI that actually gives a damn about quality.

## What Makes This Different

Most AI portfolio generators spit out the same generic template with your name swapped in. This one:

1. **Self-grades its work** and iterates until it's actually good
2. **Reads your preferences** from a config file (creativity, simplicity, tone, etc.)
3. **Uses your materials** (resume, photos) if you provide them
4. **Customizes the design** based on sliders, not templates
5. **Writes like a human** because it's been told exactly how not to sound like AI

## Quick Start

```bash
git clone https://github.com/your-username/site-in-a-box.git my-portfolio
cd my-portfolio

# Run setup (handles everything)
./bin/setup.sh
```

**That's it!** The setup script will:
1. Install dependencies
2. Guide you through config (visual UI or YAML)
3. Launch AI to build your portfolio

The AI will:
- Research you online (GitHub, web search)
- Extract info from your resume if provided
- Generate content and design based on your preferences
- Self-grade and iterate until it's excellent
- Build your complete portfolio

**Optional**: Add materials before running setup:
```bash
cp ~/resume.pdf materials/documents/
cp ~/headshot.jpg materials/images/profile.jpg
```

## Configuration

The setup script gives you two options:

**Option 1: Visual UI** (recommended)
- Opens browser at `localhost:3000/config`
- Fill out form, pick visual style, download config
- Simple, visual, guided

**Option 2: YAML Editor**
- Opens `profile.yaml` in your editor
- Minimal setup: just add your name
- Everything else is optional

### What You Need to Provide

**Required:**
- Your name

**Optional** (AI will research if missing):
- Email, GitHub, LinkedIn
- Design preferences (defaults to balanced)
- Content tone and focus
- Personal notes about yourself

#### Design Sliders (1-10)

- **Creativity**: 1 = boring corporate, 10 = experimental artist
- **Simplicity**: 1 = information overload, 10 = ultra minimal
- **Playfulness**: 1 = serious business, 10 = fun and quirky
- **Animation**: 1 = static page, 10 = motion design showcase
- **Color Intensity**: 1 = monochrome, 10 = vibrant rainbow

### Content Preferences

- **Tone**: professional | conversational | technical | creative
- **Length**: concise | balanced | detailed
- **Focus**: projects | experience | skills | personality

### AI Behavior

- **Quality Bar (1-10)**: How self-critical should the AI be?
  - 1-3: Accept first draft
  - 7-8: Iterate 2-3 times
  - 9-10: Iterate until genuinely excellent

- **Research Depth (1-10)**: How thorough should research be?
  - 1-3: Quick scan
  - 7-8: Deep dive
  - 9-10: Exhaustive search

Example config:
```yaml
design:
  creativity: 6
  simplicity: 8
  playfulness: 3
  animation: 5
  color_intensity: 2

content:
  tone: "technical"
  length: "concise"
  focus: "projects"

ai:
  quality_bar: 8
  research_depth: 7
  copy_creativity: 5
```

## The Materials Folder

The `/materials` folder is optional but recommended:

```
materials/
├── images/
│   ├── profile.jpg          # Your headshot
│   ├── project-name.png     # Project screenshots
│   └── og-image.png         # Social share image
└── documents/
    ├── resume.pdf           # AI will parse this
    ├── bio.txt              # Pre-written bio (optional)
    └── projects.txt         # Project list (optional)
```

The AI will:
- Extract experience, education, skills from your resume
- Use your photos in the UI
- Reference any pre-written content you provide

If you don't provide materials, it'll just use web research.

## How the AI Works

### Phase 1: Configuration Analysis
Reads `profile.yaml` and `/materials` to understand your preferences and available assets.

### Phase 2: Research & Discovery
- Scrapes GitHub for repos, languages, stars
- Reads LinkedIn for experience and skills
- Searches for blog posts, talks, projects
- Parses your resume if provided

### Phase 3: Content Generation
Writes your bio, tagline, project descriptions using:
- Your specified tone and length
- Anti-patterns to avoid sounding like AI
- Specific examples over generic statements

### Phase 4: Self-Grading
The AI scores itself on:
1. **Authenticity** - Does this feel like a real person?
2. **Design Coherence** - Does it match the preferences?
3. **Content Quality** - Is the writing compelling?
4. **Technical Accuracy** - Are facts correct?
5. **Visual Polish** - Does it look professional?

If any score is below your quality bar, it iterates and tries again.

### Phase 5: Implementation
Writes to `src/data/user.json` and customizes components based on your design preferences.

### Phase 6: Verification
Runs build tests, verifies links, checks images, confirms accessibility.

## What You Get

Three main components that adapt to your preferences:

- **Hero Section** - Name, title, tagline, social links, CTA buttons
- **Project Grid** - Bento-style layout with project cards
- **Terminal Section** - Stylized terminal for your "about me"

Plus:
- Fully responsive
- Dark theme (customizable)
- TypeScript throughout
- Framer Motion animations (intensity based on your slider)
- Production-ready build

## Manual Mode

Don't trust AI? Fair enough.

```bash
npm install
npm run dev
```

Then edit `src/data/user.json` directly. The schema is in `src/data/schema.ts`.

## Customization After Generation

The AI generates the initial build, but you can tweak:

**Colors**: Edit Tailwind classes or set custom colors in `profile.yaml`
**Fonts**: Change in `src/app/layout.tsx`
**Sections**: Add/remove in `src/app/page.tsx`
**Components**: Modify `src/components/ui/*.tsx`

## Commands

### Development
```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

### AI Maintenance (Keep Your Portfolio Fresh)

After the initial build, use these commands to keep your portfolio up-to-date:

```bash
npm run agent:refresh   # Re-scrape GitHub/LinkedIn for changes
npm run agent:project   # Add or edit a single project
npm run agent:job       # Update work experience (new job, promotion, etc.)
npm run agent:rewrite   # Regenerate copy (tagline, bio, descriptions)
```

Each command launches Claude Code with specialized instructions for that task.

#### Refresh: Update from Sources
```bash
npm run agent:refresh
```
- Checks GitHub for new repos, star counts, tech stack changes
- Checks LinkedIn for job changes, new skills
- Merges updates intelligently (preserves manual edits)
- Shows diff of changes before applying

**When to use**: Monthly, or after major project launches

#### Add/Edit Project
```bash
npm run agent:project
```
- Add new project from GitHub URL or manual entry
- Edit existing project descriptions
- Maintains same quality bar as initial build
- Handles images from `/materials` folder

**When to use**: After shipping a new project

#### Update Experience
```bash
npm run agent:job
```
- Add new job or promotion
- Update current role responsibilities
- Mark old jobs as past
- Writes compelling, impact-focused descriptions

**When to use**: After job changes, promotions, major achievements

#### Regenerate Copy
```bash
npm run agent:rewrite
```
- Rewrite tagline, bio, or project descriptions
- Change tone (professional → conversational, etc.)
- Keeps facts, updates style
- Self-grades before applying

**When to use**: When your voice changes, targeting different roles, or content feels stale

### How AI Maintenance Works

All updates follow these principles:
1. **Preserve manual edits** - Fields marked "manual" in metadata aren't auto-overwritten
2. **Show diffs** - You see what changed before it's applied
3. **Quality checks** - Same grading rubric as initial build
4. **Validate** - Tests build, checks links, verifies consistency

## Deployment

```bash
# Vercel (easiest)
npm install -g vercel
vercel

# Or use Netlify, Railway, Render, etc.
```

## Troubleshooting

**"AI keeps asking me questions"**
Fill out `profile.yaml` more completely. The more you specify, the less it needs to ask.

**"The design doesn't match my sliders"**
The AI interprets sliders as guidance, not exact specifications. If creativity=8 and simplicity=8 conflict, it makes judgment calls. Be explicit in the `notes` field.

**"Quality bar 10 takes forever"**
Yeah, that's intentional. It'll iterate 5+ times to get things perfect. Use 7-8 for a good balance.

**"It didn't use my materials"**
Make sure filenames match:
- `profile.jpg` or `profile.png` (not `headshot.jpg`)
- `resume.pdf` (not `CV.pdf`)
- Project images: `project-name.png` (kebab-case)

**"The content is still generic"**
Increase `ai.copy_creativity` and `ai.quality_bar` in the config. Also fill out the `notes` section with specific details about yourself.

**"LinkedIn research failed with error 999"**
This is normal - LinkedIn blocks scrapers. The AI will automatically fall back to web search to find your information. Provide your LinkedIn URL in the config if you want it linked on your site, but the AI doesn't need direct access to build your portfolio.

**"I want a specific design style, not random"**
Use the visual config UI at `/config` (dev mode) to select websites you like, or set `design.archetype` to 1-6 in profile.yaml to force a specific aesthetic.

**"Claude keeps asking permission to visit websites"**
Run this once to auto-approve web searches:
```bash
./bin/configure-claude.sh
```
This creates `~/.claude/settings.json` with auto-approval for web tools.

## How It Avoids Looking Like AI

### Design Diversity System

**Every portfolio gets a unique visual identity** by randomly selecting 1 of 6 aesthetic archetypes:

1. **Brutalist** - Sharp edges, monospace fonts, high contrast, no shadows
2. **Editorial** - Magazine layouts, serif headers, asymmetric columns
3. **Technical Terminal** - Command-line aesthetic, monospace only, CRT colors
4. **Retro Arcade** - Pixel fonts, neon colors, 8-bit graphics, scanline effects
5. **Bold Geometric** - Color blocking, shapes, high contrast
6. **Refined Luxury** - Elegant serifs, gold/silver accents, large whitespace

Each archetype has:
- **3 specific font pairings** (header + body)
- **3 distinct color palettes** (primary + secondary + accent)
- **Unique layout patterns** (grid systems, spacing, borders)

The AI randomly picks an archetype, then commits 100% to that visual direction. No blending, no hedging.

**Result**: Even with identical content, two portfolios will look completely different.

### Anti-AI Content Patterns

The instructions also enforce:
- Use odd numbers (3 columns, not 4)
- Vary typography scale (18px, 28px, not 16px, 24px)
- Add intentional imperfection (asymmetric spacing)
- Use specific language, not generic ("Things I've shipped" not "My Projects")
- Lead with what makes you unique, not what makes you qualified
- Write problem → solution → impact, not feature lists

The self-grading system auto-fails generic patterns.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## License

MIT - Clone it, fork it, sell it, whatever.
