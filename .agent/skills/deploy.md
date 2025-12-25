# Skill: Deployment

Help users deploy their portfolio to production.

---

## Pre-Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` succeeds with no errors
- [ ] All images moved to `/public` and paths updated
- [ ] Environment variables documented (if any)
- [ ] Links are valid (GitHub, LinkedIn, project URLs)
- [ ] No placeholder content ("Lorem ipsum", "TODO", etc.)
- [ ] Responsive design works on mobile
- [ ] Favicon and meta tags set

---

## Deployment Options

### 1. Vercel (Recommended)

**Why**: Zero-config for Next.js, free tier, automatic HTTPS, preview deployments.

**Steps**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time - will prompt for setup)
vercel

# Deploy to production
vercel --prod
```

**Or via GitHub**:
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Vercel auto-detects Next.js settings
5. Click Deploy

**Custom Domain**:
```bash
# Add domain in Vercel dashboard, then:
vercel domains add yourdomain.com
```

---

### 2. Netlify

**Steps**:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build first
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

**Or via GitHub**:
1. Push to GitHub
2. Go to netlify.com
3. "New site from Git"
4. Build command: `npm run build`
5. Publish directory: `.next`

---

### 3. Cloudflare Pages

**Steps**:
1. Push to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect repository
4. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output: `.next`

---

### 4. GitHub Pages (Static Export)

**Note**: Requires static export, no server features.

**Steps**:
1. Add to `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
};
```

2. Build:
```bash
npm run build
```

3. Deploy the `out` folder to GitHub Pages

---

### 5. Self-Hosted (Docker)

**Dockerfile**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

**Run**:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Environment Variables

If using environment variables:

1. **Local**: Create `.env.local`
2. **Vercel**: Add in Project Settings → Environment Variables
3. **Netlify**: Add in Site Settings → Environment
4. **Docker**: Pass with `-e` or use `.env` file

---

## Custom Domain Setup

### General Steps
1. Add domain in hosting provider
2. Update DNS records:
   - A record: Points to hosting IP
   - CNAME: Points to hosting subdomain
3. Wait for DNS propagation (up to 48h, usually minutes)
4. SSL certificate auto-provisions

### Common Providers
- **Vercel**: Automatic SSL, add domain in dashboard
- **Netlify**: Automatic SSL, add domain in dashboard
- **Cloudflare**: Automatic SSL + CDN

---

## Post-Deployment

After deploying:

1. **Test the live site**
   - Check all pages load
   - Test on mobile
   - Verify images load
   - Click all links

2. **Set up analytics** (optional)
   - Vercel Analytics (built-in)
   - Plausible (privacy-focused)
   - Google Analytics

3. **Submit to search engines** (optional)
   - Google Search Console
   - Bing Webmaster Tools

---

## Troubleshooting

### Build Fails
- Check `npm run build` locally first
- Review error messages for missing dependencies
- Ensure all imports are valid

### Images Not Loading
- Move to `/public` folder
- Use absolute paths: `/images/photo.jpg`
- Check case sensitivity (Linux is case-sensitive)

### 404 on Routes
- For static export: ensure `generateStaticParams` for dynamic routes
- Check `next.config.ts` for `trailingSlash` setting

### Slow Performance
- Run Lighthouse audit
- Optimize images (use `next/image`)
- Check for large bundle sizes
