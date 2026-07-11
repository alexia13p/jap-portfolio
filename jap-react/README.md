# Jan Patrick Tolentino — Portfolio (React 19 + Vite)

Production-ready personal portfolio for **Jan Patrick B. "JAP" Tolentino**, IT Support / Technical Support Specialist (7+ years). Built as a real Vite application — no browser Babel, no CDN React, no design-system bundle.

Features a premium animated **Nexus Core** hero (React Three Fiber), the signature JAP logo animation, GSAP entrance motion, Lenis smooth scrolling, scroll-reveal, glass work cards, and a scrolling trust bar.

## Tech stack
- **React 19** + **Vite 6**
- **Three.js** + **@react-three/fiber** + **@react-three/drei** (Nexus Core: PBR materials, HDR environment lighting, float, slow rotation, mouse parallax, glowing circuit channels)
- **@react-three/postprocessing** — Bloom, Depth of Field, Vignette
- **GSAP** — hero entrance + page transitions
- **Lenis** — smooth scrolling
- Clean CSS architecture: global tokens (`src/styles/tokens.css`) + inline component styles referencing CSS variables

## Getting started
```bash
npm install
npm run dev      # local dev server (Vite) → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```
Node 18+ recommended.

## Project structure
```
public/
  favicon.svg
  images/og-cover.svg
  resume/jap-resume.pdf
src/
  assets/
  components/     LogoAnimation, CTAButton, Tag, SectionLabel, TimelineItem,
                  ProjectCard, TrustBar, ParallaxBackground, Reveal, Loader
  sections/       Hero (Nexus Core), NexusCore (R3F scene), Intro, Work,
                  Experience, Training, Philosophy, Footer
  animations/     GSAP transition helpers
  hooks/          useLenis, useScrollReveal, useMediaQuery
  shaders/        circuitTexture (procedural PBR maps for the core)
  styles/         tokens.css, global.css
  data/           portfolio.js (all content in one place)
  App.jsx
  main.jsx
index.html
vite.config.js
package.json
```

## Editing content
All copy — work, experience, training, trust stats, socials, contact — lives in **`src/data/portfolio.js`**. Update there; the sections read from it.

## Deploy
- **Vercel** — import the repo. Framework preset: *Vite*. Build `npm run build`, output `dist`. `vercel.json` is included.
- **Netlify** — connect the repo. `netlify.toml` sets build `npm run build`, publish `dist`.
- **GitHub Pages** — `npm run build`, then publish the `dist/` folder (e.g. via the `gh-pages` action). `base: './'` in `vite.config.js` makes assets path-relative so it works from a project subpath.
- **Shared hosting** — upload the contents of `dist/` after building.

## Accessibility & performance
- Respects `prefers-reduced-motion` (logo, GSAP, Lenis, scroll-reveal, parallax all no-op).
- 3D scene uses adaptive DPR and is code-split / lazy-loaded so first paint is a lightweight loader.
- SEO metadata + Open Graph/Twitter tags in `index.html`.
- Note: the hero's HDR environment lighting fetches an HDR map from the pmndrs CDN on first load (needs internet). Swap `Environment preset="city"` for a bundled `.hdr` via `files=` if you need fully offline lighting.

## Contact
- Email: jap.tolentino11@gmail.com
- Phone: +63 995 135 4256
- Location: Calamba City, Laguna, Philippines
