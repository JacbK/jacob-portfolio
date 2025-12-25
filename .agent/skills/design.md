# Persona: Design System Reference

This document defines the visual design system for portfolio generation. The main agent instructions reference this file for all design-related decisions.

---

## Archetype Quick Reference

| # | Name | Typography | Colors | Layout | Key Pattern |
|---|------|------------|--------|--------|-------------|
| 1 | **Brutalist** | Monospace (Space Mono, IBM Plex Mono) | Black/white + red/cyan/yellow | Single column, harsh borders | `border-4`, NO cards, `<ul>` lists |
| 2 | **Editorial** | Serif headers (Playfair, Lora) + sans body | Cream/charcoal + burgundy/olive | Asymmetric 70/30, sidebars | Pull quotes, image-first |
| 3 | **Terminal** | Monospace only (JetBrains, Fira Code) | Black + green/amber/cyan | Fixed-width 80ch, CLI prompt | CRT aesthetic, ASCII borders |
| 4 | **Retro Arcade** | Pixel fonts (Press Start 2P, VT323) | Deep purple/black + neon pink/cyan | Chunky 8px grid | SCORE displays, scanlines |
| 5 | **Geometric** | Bold sans (Outfit, Manrope) | White/gray + blue/pink/orange | Overlapping shapes, diagonals | Color blocks, `-rotate-3` |
| 6 | **Luxury** | Light serif (Cormorant, Bodoni) | Champagne/ivory + gold/silver | Narrow centered, huge spacing | `h-screen` sections, 150px+ gaps |

---

## Using Design Inspirations

If `design_inspirations` is provided in profile.yaml, each inspiration includes an `attributes` object with pre-parsed numeric values. **Use these directly.**

### Example Structure

```yaml
design_inspirations:
  - name: "Linear"
    attributes:
      fontFamily: "Inter"
      fontSize: 15
      fontWeight: 500
      letterSpacing: "-0.02em"
      colorBg: "#000000"
      colorText: "#ffffff"
      colorAccent: "#5e6ad2"
      maxWidth: 1200
      alignment: "centered"
      sectionSpacing: 100
      padding: 40
      motionDuration: 200
      motionStyle: "fade"
      borderWidth: 0
      borderRadius: 0
```

### Merging Multiple Inspirations

If multiple inspirations are selected, use this algorithm:

```python
# Font: Use first inspiration
fontFamily = inspirations[0].attributes.fontFamily
fontWeight = inspirations[0].attributes.fontWeight
letterSpacing = inspirations[0].attributes.letterSpacing

# Numeric values: Average and round
fontSize = round(average([i.attributes.fontSize for i in inspirations]))
sectionSpacing = round(average([i.attributes.sectionSpacing for i in inspirations]))
padding = round(average([i.attributes.padding for i in inspirations]))
motionDuration = round(average([i.attributes.motionDuration for i in inspirations]))
borderWidth = round(average([i.attributes.borderWidth for i in inspirations]))
borderRadius = round(average([i.attributes.borderRadius for i in inspirations]))

# Max width: Median
maxWidth = median([i.attributes.maxWidth for i in inspirations])

# Colors: First inspiration's bg/text, blend accents
colorBg = inspirations[0].attributes.colorBg
colorText = inspirations[0].attributes.colorText
colorAccent = blendHexColors([i.attributes.colorAccent for i in inspirations])

# Other: First inspiration
alignment = inspirations[0].attributes.alignment
motionStyle = inspirations[0].attributes.motionStyle
```

### Blend Hex Colors Helper

```javascript
function blendHexColors(hexArray) {
  const rgb = hexArray.map(hex => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return [r, g, b];
  });
  const avgR = Math.round(rgb.reduce((sum, c) => sum + c[0], 0) / rgb.length);
  const avgG = Math.round(rgb.reduce((sum, c) => sum + c[1], 0) / rgb.length);
  const avgB = Math.round(rgb.reduce((sum, c) => sum + c[2], 0) / rgb.length);
  return `#${avgR.toString(16).padStart(2,'0')}${avgG.toString(16).padStart(2,'0')}${avgB.toString(16).padStart(2,'0')}`;
}
```

---

## Archetype Implementation Details

### Components to Delete/Create

| Archetype | Delete | Create |
|-----------|--------|--------|
| **Brutalist** | BentoGrid, Terminal | `<BrutalistSection>` |
| **Editorial** | BentoGrid, Terminal | `<EditorialLayout>`, `<PullQuote>` |
| **Terminal** | Hero, BentoGrid | `<TerminalWindow>`, `<CodeBlock>` |
| **Retro Arcade** | All modern components | `<PixelCard>`, `<ScoreDisplay>` |
| **Geometric** | BentoGrid | `<ColorBlock>`, `<DiagonalSection>` |
| **Luxury** | BentoGrid, Terminal | `<HeroImage>`, `<MinimalText>` |

### Code Snippets by Archetype

```tsx
// 1. Brutalist: border-b-4 border-black sections
<section className="border-b-4 border-black p-8">
  <ul>{projects.map(p => <li className="border-l-4 border-black pl-4">{p.title}</li>)}</ul>
</section>

// 2. Editorial: asymmetric 70/30 with sidebar
<div className="grid grid-cols-[2fr_1fr]">
  <article><img /><h2 className="font-serif text-6xl">{title}</h2></article>
  <aside className="border-l-2 pl-8"><PullQuote /></aside>
</div>

// 3. Terminal: CLI prompt aesthetic
<div className="bg-black text-green-400 font-mono">
  <div className="p-4 border-b border-green-400">
    <span>user@portfolio:~$</span> cat about.txt
  </div>
</div>

// 4. Arcade: chunky borders + score display
<div className="border-8 border-cyan-500 bg-purple-900">
  <div className="font-['Press_Start_2P']">SCORE: {count}</div>
</div>

// 5. Geometric: overlapping rotated shapes
<div className="relative">
  <div className="absolute w-2/3 h-96 bg-blue-600 -rotate-3" />
  <div className="relative z-10 bg-yellow-400"><h1 className="text-8xl font-black" /></div>
</div>

// 6. Luxury: full-screen sections, extreme spacing
<section className="h-screen flex items-center">
  <h1 className="font-serif font-light text-7xl tracking-wider" />
</section>
<section className="py-64"><img className="h-[70vh]" /></section>
```

---

## Typography

### Font Pairings by Archetype

**1. Brutalist**
- Header: Space Mono, Courier Prime, or IBM Plex Mono
- Body: Space Mono (same font everywhere)
- Scale: 14px, 24px, 48px, 72px (severe jumps)

**2. Editorial**
- Header: Playfair Display, Lora, or Cormorant Garamond
- Body: Crimson Text, Spectral, or Source Serif Pro
- Scale: 18px, 26px, 42px, 64px (refined steps)

**3. Technical Terminal**
- Header: JetBrains Mono, Fira Code, or Inconsolata
- Body: JetBrains Mono (monospace only)
- Scale: 13px, 16px, 20px, 32px (terminal sizing)

**4. Retro Arcade**
- Header: Press Start 2P, VT323, or Silkscreen
- Body: Courier Prime, Inconsolata, or IBM Plex Mono
- Scale: 12px, 18px, 28px, 48px (pixel-perfect)

**5. Bold Geometric**
- Header: Outfit, Manrope, or DM Sans
- Body: Inter, Work Sans, or Nunito Sans
- Scale: 16px, 32px, 56px, 88px (doubling)

**6. Refined Luxury**
- Header: Cormorant, Bodoni Moda, or Italiana
- Body: Montserrat, Raleway, or Lato
- Scale: 18px, 30px, 52px, 80px (elegant ratio)

### Typography Rules

- **NEVER** use generic fonts: Inter, Roboto, Arial, system fonts
- **NEVER** converge on trendy fonts: Space Grotesk, Satoshi
- **MUST** use the font pairing matching your archetype
- **MUST** use different font weights for hierarchy (not all 400/500)
- **MUST** vary font sizes by at least 3 distinct scales

---

## Color Palettes

### Palettes by Archetype (pick ONE from your archetype)

**1. Brutalist**
- Palette A: Pure black (#000), white (#fff), red accent (#ff0000)
- Palette B: Dark gray (#1a1a1a), white (#fff), cyan (#00ffff)
- Palette C: Black (#000), white (#fff), yellow (#ffff00)

**2. Editorial**
- Palette A: Cream (#f5f3ed), charcoal (#2d2d2d), burgundy (#8b2635)
- Palette B: Off-white (#fafaf8), dark brown (#3e2723), olive (#6b705c)
- Palette C: Warm gray (#e8e4de), navy (#1e3a5f), rust (#b7472a)

**3. Technical Terminal**
- Palette A: Black (#0d0d0d), green (#00ff41), dark green bg (#001a0d)
- Palette B: Navy (#0a0e27), amber (#ffb000), dark amber bg (#1a0f00)
- Palette C: Charcoal (#1a1d29), cyan (#00d9ff), dark cyan bg (#001a1f)

**4. Retro Arcade**
- Palette A: Deep purple (#1a0033), hot pink (#ff10f0), cyan (#00ffff)
- Palette B: Black (#000000), neon green (#39ff14), magenta (#ff00ff)
- Palette C: Dark blue (#0a0a2e), orange (#ff6600), yellow (#ffff00)

**5. Bold Geometric**
- Palette A: White (#ffffff), black (#000000), electric blue (#0066ff)
- Palette B: Light gray (#f0f0f0), charcoal (#2d2d2d), hot pink (#ff006e)
- Palette C: Pale blue (#e6f2ff), navy (#0a1929), orange (#ff6b35)

**6. Refined Luxury**
- Palette A: Champagne (#f5f0e8), charcoal (#2a2a2a), gold (#b8860b)
- Palette B: Ivory (#fffef7), deep gray (#3a3a3a), silver (#a8a8a8)
- Palette C: Linen (#faf7f2), espresso (#3e2723), rose gold (#b76e79)

### Color Rules

- Pick **ONE** palette from your archetype, use **ONLY** those 3 colors
- Apply `color_intensity` slider (1-10) to adjust saturation/usage
- Changing accent from `#5e6ad2` to `#7c3aed` **DOES NOT COUNT** as customization
- **AVOID**: Purple gradients on white, generic dark mode with blue accents

---

## Layout Patterns

### Spatial Composition by Archetype

**1. Brutalist**
- Hard edges, no border-radius
- Full-width sections with harsh dividers (thick borders)
- Grid system: 3 or 5 columns (odd numbers)
- No shadows, high contrast
- Fixed positioning for headers/sidebars

**2. Editorial**
- Asymmetric 2-column layout (70/30 split)
- Large pull quotes breaking up text
- Magazine-style margins (wide outer margins)
- Serif headers left-aligned, body text justified
- Image + text overlap

**3. Technical Terminal**
- Single column, fixed-width (80ch or 100ch)
- ASCII borders and dividers
- Monospace grid (characters as units)
- Prompt-style navigation (> commands)
- Fixed header with system info

**4. Retro Arcade**
- Scanline effects and CRT glow
- Chunky pixel borders (8px solid borders)
- Neon text shadows and glow effects
- Grid-based layout (multiples of 8px)
- Arcade-style buttons with heavy box-shadow
- Animated pixel art decorations

**5. Bold Geometric**
- Color-blocked sections (alternating backgrounds)
- Overlapping geometric shapes
- Grid layout with sharp angles
- Diagonal dividers between sections
- CTAs as large geometric buttons

**6. Refined Luxury**
- Narrow column (max-width 700px), centered
- Elegant dividers (thin lines, decorative)
- Large letter-spacing on headers
- Fade-in animations, slow and smooth
- Excessive padding (150px+ section spacing)

---

## Design Preference Sliders

### Creativity (1-10)

| Range | Style | Characteristics |
|-------|-------|-----------------|
| 1-3 | Traditional | Centered, symmetrical grid, standard fonts, conventional sections |
| 4-7 | Modern | Asymmetric layouts, varied card sizes, Google Fonts with character |
| 8-10 | Experimental | Unconventional layouts, custom fonts, scroll effects, 3D |

### Simplicity (1-10)

| Range | Style | Characteristics |
|-------|-------|-----------------|
| 1-3 | Dense | Many sections, sidebars, multiple columns, small margins |
| 4-7 | Balanced | 3-4 main sections, good whitespace, breathable |
| 8-10 | Minimal | 2-3 sections max, huge whitespace, single-column |

### Playfulness (1-10)

| Range | Style | Characteristics |
|-------|-------|-----------------|
| 1-3 | Serious | Corporate colors (navy, gray), formal copy, professional photos |
| 4-7 | Approachable | Friendly but not silly, conversational tone |
| 8-10 | Fun | Bright colors, illustrations, jokes, easter eggs, casual photos |

### Animation (1-10)

| Range | Style | Characteristics |
|-------|-------|-----------------|
| 1-3 | Static | Only hover states, no entrance animations |
| 4-6 | Tasteful | Staggered page load, subtle transitions |
| 7-8 | Choreographed | Scroll-triggered, complex entrance |
| 9-10 | Motion-rich | Parallax, 3D transforms, continuous animation |

### Color Intensity (1-10)

| Range | Style | Characteristics |
|-------|-------|-----------------|
| 1-3 | Monochrome | Black/white/gray only, no accent colors |
| 4-7 | Subtle | Dark theme with muted accents |
| 8-10 | Vibrant | Bright saturated colors, gradients, color blocking |

---

## Motion & Animation

### Animation Slider Mapping

- **1-3**: Static - only hover states, no entrance animations
- **4-6**: Tasteful - staggered page load, subtle transitions
- **7-8**: Choreographed - scroll-triggered, complex entrance
- **9-10**: Motion-rich - parallax, 3D transforms, continuous animation

### Tools

- Framer Motion for React components (already installed)
- CSS transitions for simple states
- Scroll-triggered animations for sections
- Hover states that surprise (not just color changes)

### Principle

Focus on high-impact moments: One well-orchestrated page load with staggered reveals (use animation-delay) creates more delight than scattered micro-interactions.

---

## Visual Details

### Creating Depth

- Noise textures (grain overlays)
- Layered transparencies
- Dramatic shadows (not just `drop-shadow: 0 4px 6px`)
- Gradient meshes for backgrounds
- Custom cursors
- Decorative borders (not `border: 1px solid #ccc`)
- Geometric patterns

### Avoiding AI Aesthetics

1. **Typography First**: Font choice sets the entire aesthetic
2. **Use Odd Numbers**: 3 or 5 columns, not 4 or 6 - AI loves symmetry
3. **Intentional Imperfection**: Slightly off-center, varied card heights, asymmetric spacing
4. **Specific Not Generic**: "Things I've shipped" not "Check out my projects"
5. **Human Photos**: Real photos only, no AI avatars or stock
6. **Unique Micro-Copy**: Match user's actual workflow and voice
7. **Content Hierarchy**: Lead with what makes them unique
8. **Contextual Backgrounds**: No solid colors - use gradients, meshes, textures
9. **Real Data**: Actual GitHub stars, real project names, genuine achievements

---

## Implementation Complexity

Match code complexity to aesthetic vision:

| Simplicity | Complexity Level | Approach |
|------------|------------------|----------|
| 8-10 | Minimal code | Perfect spacing, subtle typography, restrained animations |
| 4-7 | Moderate | Good animations, interesting layout, polished details |
| 1-3 | Elaborate | Extensive animations, layered effects, rich visual details |

---

## Design Coherence Checklist

Before completing, verify YES for all:

- [ ] **Component Deletion**: Deleted at least 2 existing components and replaced them
- [ ] **Layout Change**: Section order is different from default (Hero → Projects → Experience → Terminal)
- [ ] **Typography Application**: Fonts are actually used in components (not just defined in layout.tsx)
- [ ] **Structural Changes**: Modified component structure (grid layouts, wrapper elements)
- [ ] **Archetype Compliance**: Layout matches archetype principles

If ANY are NO, the design fails regardless of other factors.
