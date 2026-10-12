# Portfolio Redesign — Build Spec (rayyankhan.online)
Target: Next.js 14 App Router + TypeScript + Tailwind CSS in `~/workspace/portfolio-next/`.
Reference: live site HTML at `/tmp/live-site/index.html` (source of truth for content).

## Design tokens
- bg: #09090B | surface: #151518 | text: #F5F5F7 | muted: #A1A1AA | accent: #B9F34C | border: #27272A
- Fonts (next/font/google): Geist Sans (body + headings), JetBrains Mono (labels/eyebrows)
- Display headings: Geist Sans, tight tracking (-0.03em), large fluid sizes (clamp)
- Dark-first. Include a working light-mode toggle (light: bg #FAFAF9, text #09090B, accent #65A30D).
- No purple gradients, no glowing blobs, no bento grids, no generic AI imagery.

## Routes
- `/` — all sections
- `/work/lahore-smog-forecast`, `/work/portfolio-rag-chatbot`, `/work/conformer-speech-enhancement`, `/work/fire-weapon-detection` — case studies

## Sections (single page)
1. **Nav** — floating pill, transparent-to-solid on scroll; links: Work, About, Expertise, Experience, Contact; active-section indicator; theme toggle; mobile menu; keyboard accessible.
2. **Hero** — full viewport. Eyebrow: "Rayyan Khan — Mardan, Pakistan". H1: "Engineering intelligence. Designing experiences." Sub: "I'm Rayyan Khan — an AI/ML engineer and full-stack developer building intelligent systems and thoughtfully designed digital products." CTAs: "Explore Work" (→ #work), "Let's Connect" (→ #contact). Subtle interactive background: lightweight canvas grid that reacts to pointer (no heavy particles, no Three.js). Availability badge only if true — use "Open to work" (verified: he uses this). Scroll indicator. Social links (GitHub, LinkedIn).
3. **About** — editorial two-column: portrait (`/tmp/live-site` has portrait assets; use `assets/portrait.webp`), bio covering: final-year CS @ UET Mardan (CGPA 3.63), ML Team Lead @ ITSimplera, ML Intern @ CodeClub Peshawar 2025. Three disciplines: Engineering / Design / AI. Keep the honest "building upward into GenAI" note, but don't make the page read like a learning journal.
4. **Expertise** — 3 animated tabs:
   - 01 AI & Machine Learning: Python, PyTorch, scikit-learn, Hugging Face, OpenCV, YOLO; computer vision, NLP, RAG (FAISS/ChromaDB), LLM APIs, agents; evidence → link to projects.
   - 02 Full-Stack Engineering: React/Next.js, TypeScript, Node.js, Python, FastAPI, PostgreSQL, REST, auth, Docker, CI/CD, Vercel/Render deploys.
   - 03 UI/UX & Creative Development: responsive design, design systems, interaction/motion design, accessibility, prototyping.
   Only list what he actually uses. No proficiency bars.
5. **Work** — 4 large featured showcases (alternating asymmetric layout, big visual area, hover interactions, scroll reveals):
   - Lahore Smog Forecast — LSTM 24h PM2.5 forecasting, 4 years hourly Lahore data. Links: GitHub + live Streamlit.
   - Portfolio RAG Chatbot — MiniLM + FAISS + OpenRouter.
   - Conformer Speech Enhancement — complex ratio masking, PESQ/STOI/SI-SDR eval.
   - Fire & Weapon Detection — YOLO, 8k frames annotated in CVAT, 0.89 mAP@0.5.
   Each: category, problem, solution, stack, architecture notes, challenges, verified metrics ONLY, GitHub + live links, link to case-study page.
   Then a compact **archive** list of the other 6: Ask the Constitution, Roman Urdu Sentiment Analyzer, PDF AI Authorship Analyzer, Veterinary RAG Assistant (WIP), LLM + RAG Experiments, Word-Ai.
6. **Experience** — vertical timeline: ML Team Lead @ ITSimplera Solutions (2026–Present), ML Intern @ CodeClub Peshawar (Jul 2025), BS CS @ UET Mardan (2023–2027, CGPA 3.63, Dean's Appreciation Award 2025). Restrained credentials subsection (AI Agents 101, RAG for Production, Programming Competition Award AWKUM 2025).
7. **FAQ** — keep the 4 existing questions from the live site.
8. **Contact** — "Have an idea worth building? Let's make it real." Email rayanuet@gmail.com, GitHub, LinkedIn. Minimal footer.
9. **Chatbot** — floating launcher (simple SVG bot mark, no Three.js), expandable panel embedding the existing Streamlit app via iframe (`https://portfolio-rag-chat-5k6zrbaixyywuxah4nykew.streamlit.app/?embed=true`). Suggested questions: "What are Rayyan's best AI projects?", "What is his full-stack experience?", "Explain his RAG chatbot architecture.", "How can I collaborate with him?" Never auto-opens. Mobile-friendly.

## Motion
- Scroll reveals (IntersectionObserver or framer-motion), staggered text entrances, magnetic buttons (desktop only), animated nav indicator. Respect `prefers-reduced-motion`. No scroll hijacking.

## SEO / correctness
- Title: "Rayyan Khan | Machine Learning & AI Engineer, Pakistan". Meta description, OG tags, Person + ItemList JSON-LD, sitemap, robots.txt.
- Contact email: rayanuet@gmail.com. GitHub: github.com/rayyan4t4. LinkedIn: linkedin.com/in/rayyanstein.
- IMPORTANT: the live site claims the smog model "beats persistence by 27% MAE" — this baseline was computed with a data leak and is INVALID. Do NOT repeat "27%" or persistence MAE 24.1952 anywhere. Describe the LSTM, dataset, and evaluation honestly without the persistence comparison.
- Do not invent metrics, testimonials, clients, or experience. No "5+ years" claim.

## Case-study pages (4)
Each: hero (title, category, links), Problem, Solution, Architecture (simple SVG diagram), Engineering challenges, Results (verified metrics only), stack, links. For smog: describe 2-layer LSTM, hourly data, 15k held-out rows — no persistence claim.
