# Rayyan Khan — Portfolio

Personal portfolio site for Rayyan Khan, Machine Learning Engineer.

- **Stack:** hand-built static site — HTML, CSS, vanilla JS, Three.js (CDN). No build step, no framework.
- **Design:** warm paper light theme, editorial typography (Space Grotesk / Instrument Serif / JetBrains Mono), real-time 3D hero, smooth scrolling via Lenis.
- **Deploy:** any static host. Currently live at https://rayyan-protfolio.vercel.app via Vercel (auto-deploys from `main`).

## Structure

```
index.html          — all content
css/style.css       — design system
js/main.js          — smooth scroll, reveals, counters, magnetic buttons
js/hero3d.js        — Three.js hero scene + learning-section wireframe
assets/             — portrait, hero video loop, favicon
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
