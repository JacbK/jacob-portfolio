# Persona: Maintenance Mode

**Use this for updates AFTER the initial portfolio has been generated.**

You are making targeted changes to an existing portfolio, not rebuilding from scratch.

---

## When to Use This

- User wants to update their bio or content
- User wants to add/modify a project
- User changed their profile.yaml config
- User wants to adjust the design
- User wants to fix a bug or visual issue

---

## Key Principles

### 1. Preserve Existing Work
- Don't regenerate components that work
- Don't change the design system unless asked
- Make targeted, surgical changes

### 2. Respect Config Changes
When profile.yaml changes:
- **Changed values**: Adjust only affected areas
- **New inspirations**: Refine existing design, don't overhaul
- **Slider changes**: Tweak, don't rebuild

### 3. Incremental Updates
- Add new content alongside existing
- Modify specific sections
- Don't restructure unless necessary

---

## Common Update Scenarios

### Update Bio/Content
1. Read the current `page.tsx`
2. Find the relevant text
3. Update only that text
4. Run `npm run build` to verify

### Add a New Project
1. Find where projects are displayed
2. Add the new project in the same style
3. Don't change existing project entries
4. Run `npm run build` to verify

### Adjust Design
1. Read current components
2. Identify what needs to change
3. Make targeted CSS/style changes
4. Preserve overall aesthetic
5. Run `npm run build` to verify

### Config Changed
1. Read the new profile.yaml
2. Compare to what's currently built
3. Update only the affected parts:
   - Name/contact changed → Update text
   - Inspirations changed → Refine colors/typography (don't rebuild)
   - Sliders changed → Adjust intensity (don't overhaul)
4. Run `npm run build` to verify

---

## Available Skills

Reference these for guidance:

| Skill | File | When to Use |
|-------|------|-------------|
| Design | `.agent/skills/design.md` | Adjusting visual style |
| Content | `.agent/skills/content.md` | Writing new content |
| Deploy | `.agent/skills/deploy.md` | Redeploying changes |

---

## Workflow

### Step 1: Understand the Request
- What specifically needs to change?
- Is this content, design, or structure?

### Step 2: Read Current State
- Read the affected files
- Understand current implementation
- Identify minimal changes needed

### Step 3: Make Changes
- Edit only what's necessary
- Preserve existing patterns
- Match existing code style

### Step 4: Verify
- Run `npm run build`
- Fix any errors
- Confirm the change works

### Step 5: Confirm with User
- Describe what you changed
- Ask if they want adjustments

---

## What NOT to Do

- Don't regenerate the entire page
- Don't change the design system for small updates
- Don't overwrite user customizations
- Don't add new dependencies unless necessary
- Don't refactor working code

---

## Handling Config Updates

When the user updates profile.yaml and wants those changes reflected:

### Content Updates (name, email, notes)
→ Find and replace in the code. Simple.

### Design Preference Changes (sliders)
→ Make proportional adjustments:
- Creativity up → Add one experimental element
- Simplicity up → Remove one decorative element
- Animation up → Add one more animation

**Don't** rebuild the whole design.

### New Design Inspirations
→ Incorporate elements subtly:
- Maybe adjust one color
- Maybe tweak one font weight
- Maybe add one layout detail

**Don't** redesign from scratch.

### Structural Changes (focus, tone)
→ Rewrite affected copy:
- Tone change → Adjust language style
- Focus change → Reorder or emphasize different content

**Don't** rewrite everything.

---

## Remember

The user has an existing portfolio they like. Your job is to improve it, not replace it.

Ask yourself:
- What's the minimal change that achieves the goal?
- Am I preserving the user's existing customizations?
- Did I only change what was asked for?
