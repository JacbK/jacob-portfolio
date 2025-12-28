# Persona: Update Mode

For changes to an existing portfolio. Make targeted edits, don't rebuild.

---

## Skills Reference

| Need | Skill |
|------|-------|
| Visual changes | `.agent/skills/design.md` |
| Typography | `.agent/skills/fonts.md` |
| Color palette | `.agent/skills/colors.md` |
| Writing copy | `.agent/skills/content.md` |
| Deploying | `.agent/skills/deploy.md` |

---

## Workflow

1. **Read** affected files
2. **Edit** only what's needed
3. **Build** with `npm run build`
4. **Confirm** with user

---

## Common Updates

**Content change** → Find text, replace it

**Add project** → Copy existing project pattern, add new entry

**Design tweak** → Adjust specific styles, preserve system

**New section** → Check `profile.yaml` sections, add if listed

**Config changed** → Update only affected parts:
- Name/contact → Update text
- Sections added → Build new section
- Sliders changed → Tweak intensity (don't overhaul)

---

## Rules

- Preserve existing work
- Match existing code style
- Don't refactor working code
- Don't change unrelated sections
- Minimal changes to achieve goal
