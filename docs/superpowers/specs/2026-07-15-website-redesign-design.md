# Personal Website Redesign — Design Spec

## 1. Overview

Complete visual and content redesign of Sharath Thomas's personal portfolio site (sharath.is-a.dev). The current site suffers from a generic LinkedIn-clone layout, empty experience descriptions, an inappropriate "Welcome to my portfolio" greeting, a purple color scheme that doesn't suit a DevOps engineer, and a skills section that lists spoken languages instead of technical competencies.

The redesign replaces all of this with a clean, minimal engineering aesthetic — slate/charcoal palette, sharp grid layouts, Inter typography, and subtle animations. Content is consolidated from bloated LinkedIn-style entries into a curated career narrative. The repo is refactored to be template-friendly for others to fork.

## 2. Architecture & Tech Stack

- **Framework**: React 19 + Vite (existing — kept as-is)
- **UI Primitives**: Radix UI for accessible, unstyled components (Dialog, Tooltip, NavigationMenu, VisuallyHidden)
- **Styling**: Vanilla CSS with design tokens in a dedicated `theme.css`. CSS Modules per component (existing pattern — kept)
- **Data Layer**: Single `src/data/content.yaml` file (existing pattern — kept, content rewritten)
- **YAML Parsing**: `yaml` package (existing — kept)
- **SEO**: `react-helmet-async` (existing — kept)
- **Fonts**: Inter via Google Fonts CDN (`index.html` `<link>`)
- **Resume**: Static PDF in `public/resume.pdf` (existing — kept)
- **Testing**: Vitest + React Testing Library (existing — kept)
- **Linting**: ESLint + Prettier + Husky (existing — kept)

### Not changing

- Build system, CI/CD pipeline, deployment to GitHub Pages
- Testing framework and linting configuration
- The YAML-driven data architecture

## 3. Design Tokens (theme.css)

All colors, spacing, typography, and transitions defined as CSS custom properties in `src/theme.css`. Template users edit this one file to restyle the entire site.

```css
:root {
  /* Backgrounds */
  --bg-primary: #0f1117;
  --bg-surface: #161922;
  --bg-elevated: #1c1f2e;
  --bg-hover: #1e2435;

  /* Text */
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Accent */
  --accent: #38bdf8;
  --accent-hover: #7dd3fc;
  --accent-subtle: rgba(56, 189, 248, 0.1);
  --accent-border: rgba(56, 189, 248, 0.2);

  /* Borders */
  --border: #1e293b;
  --border-hover: #334155;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.25);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
}
```

## 4. Layout & Sections

### 4.1 Navigation (fixed top)

- Solid `--bg-primary` background with `--border` bottom border
- Left: Name "Sharath Thomas" as home link (text, not logo)
- Right: Section anchors (Experience, Skills, Projects, Education) + "Resume" button (accent-colored, small)
- Mobile: Radix NavigationMenu hamburger → slide-down menu
- Smooth scroll behavior on anchor clicks
- Active section highlighting via IntersectionObserver

### 4.2 Hero Section

No badge, no "welcome" text. Direct and professional.

- **Name**: "Sharath Thomas" — `font-size: 3.5rem`, `font-weight: 800`, `--text-primary`
- **Role**: "Senior DevOps Engineer" — `font-size: 1.25rem`, `--accent` color, `font-weight: 500`
- **Bio** (2-3 lines, crafted from real profile data):

  > Building scalable CI/CD platforms and cloud infrastructure at Synopsys. From migrating mono-repos and containerizing developer tooling at Ansys to designing monitoring solutions with Grafana — I focus on making engineering teams ship faster and more reliably.

- **Social links**: GitHub, LinkedIn, Email — icon-only buttons in a row, `--text-secondary` default, `--text-primary` on hover
- **CTA**: "Download Resume" — outlined button with `--accent` border
- **Background**: Subtle CSS grid-dot pattern (opacity 0.03), no blobs, no animations. Clean.
- Vertically centered, min-height `calc(100vh - nav height)`
- Max-width 720px for text content

### 4.3 Experience Section

Consolidated career narrative. Not a LinkedIn dump.

**Layout**: Left-aligned cards with subtle left border accent. No timeline dots.

**Entries**:

1. **Synopsys / Ansys** — Sheffield, UK — Jul 2022 – Present
   - Card shows company name and overall date range
   - Inside: role progression displayed as compact milestones:
     - `Senior Engineer` (Jul 2025 – Present) — DevOps and platform support
     - `R&D Engineer II` (Apr 2025 – Jul 2025)
     - `R&D Engineer` (Dec 2023 – Apr 2025)
     - `DevOps Engineer` (Jul 2023 – Dec 2023)
     - `DevOps Intern` (Jul 2022 – Jun 2023) — Detailed description of CI/CD migration, containerized Ansible tooling, React/Flask app development, Nuitka-based code obfuscation, monitoring/logging evangelism
   - Note: "Synopsys acquired Ansys in 2025" shown as subtle footnote text

2. **Samsung R&D Institute India** — Bengaluru, India — Nov 2019 – Aug 2020
   - Intern — IoT solution development for Samsung Watches

3. **ISA-VIT (International Society of Automation)** — Vellore, India — Dec 2017 – Jun 2020
   - Core Member → Technical Lead — Student chapter leadership

4. **EDGATE Technologies** — Bangalore, India — Jun 2019 – Jul 2019
   - Intern — Embedded Systems and IoT

### 4.4 Skills Section

Grid of category cards (2 columns desktop, 1 column mobile). Each card has a category title and skill pills.

**Categories and items**:

| Category                   | Skills                                             |
| -------------------------- | -------------------------------------------------- |
| CI/CD & Pipelines          | GitHub Actions, Azure DevOps Pipelines, Jenkins    |
| Containers & Orchestration | Docker, Kubernetes, Google Kubernetes Engine, Helm |
| Cloud Platforms            | Azure, Google Cloud Platform                       |
| Monitoring & Observability | Grafana, Prometheus, ELK Stack, Logging            |
| IaC & Configuration        | Ansible, Terraform                                 |
| Languages                  | Python, JavaScript, TypeScript, Java, Bash, HCL    |
| Frontend                   | React, Flask, HTML/CSS                             |
| DevOps Tooling             | Git, Linux, Nuitka, Containerized Solutions        |

Skill pills: `--bg-elevated` background, `--text-secondary` text, `--border` border, small rounded rectangles. Hover: `--accent-subtle` background, `--accent` text.

### 4.5 Projects Section

Card grid (2 columns desktop, 1 column mobile).

Each card:

- Project title (h3)
- Tech stack tags (small pills, monospace)
- 2-3 line description
- "View Project →" link (accent color)

**Featured projects**:

1. **Toolbox Web App** — React, Flask, Ansible, Docker
   - Containerized web application providing UI-based access to Ansible automation scripts with integrated terminal, text editor, and configuration panels.
   - Link: https://github.com/thesct22/toolbox_webapp

2. **K8s DSL** — Java, Kubernetes, Xtext
   - Domain-Specific Language for Kubernetes resource definitions, built as MSc coursework at the University of Leicester.
   - Link: https://github.com/thesct22/co7217.dsl.k8s.parent

3. **EnvMon** — Java, Firebase, Android
   - IoT environment monitoring system with real-time sensor data visualization via line charts, backed by Firebase.
   - Link: https://github.com/thesct22/EnvMon

4. **Ezyshare** — JavaScript, WebRTC, P2P
   - Peer-to-peer file sharing application using WebRTC for direct browser-to-browser file transfers.
   - Link: https://github.com/thesct22/ezyshare

5. **Fractional Fourier Transform** — Python, NumPy
   - Web application for computing and visualizing the Fractional Fourier Transform of signals.
   - Link: https://github.com/thesct22/fractional-fourier

### 4.6 Education & Certifications

Two-column layout (stacked on mobile).

**Left column — Education**:

- MSc Advanced Computer Science — University of Leicester (2021–2023)
- BTech Electrical & Electronics Engineering — VIT Vellore (2017–2021)

**Right column — Certifications**:

- Kubernetes and Cloud Native Associate (KCNA)
- Architecting with Google Kubernetes Engine Specialization
- Architecting with Google Compute Engine Specialization
- Industrial IoT on Google Cloud Platform
- Java for Android

### 4.7 Footer

Minimal. Single row:

- Social icons (GitHub, LinkedIn, Email) centered
- Copyright line below: "© 2026 Sharath Thomas"
- No duplication of hero content

## 5. Responsive Breakpoints

- Desktop: >1024px — full layout, 2-column grids
- Tablet: 768px–1024px — adjusted spacing, grids may collapse
- Mobile: <768px — single column, hamburger nav, stacked layouts

## 6. Animations

Minimal and purposeful:

- **Scroll reveal**: Sections fade in + translate up 20px on scroll into viewport (IntersectionObserver, CSS transitions only — no animation library)
- **Hover states**: Subtle color transitions on cards (border color, background) — `--transition-fast`
- **Nav**: Smooth scroll for anchor links
- **No**: Floating blobs, gradient text, particle effects, typewriter effects

## 7. Template-Friendliness

The repo should be easy for others to fork and personalize:

1. **content.yaml** — All personal content lives here. Change name, bio, experience, skills, projects. Zero React code changes needed.
2. **theme.css** — All visual tokens. Change colors, fonts, spacing. The site re-themes instantly.
3. **README.md** — Clear "How to use this as a template" section with:
   - Fork instructions
   - "Edit `content.yaml` and `theme.css`" guide
   - Deploy to GitHub Pages instructions
4. **Clean component structure** — Each component reads from `getSiteContent()`, has its own CSS module, does one thing.

## 8. SEO & Accessibility

- Proper `<title>` and `<meta description>` via react-helmet-async
- Single `<h1>` (the name in Hero), proper heading hierarchy throughout
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- All interactive elements keyboard-accessible (Radix UI handles this)
- ARIA labels on icon-only buttons
- Sufficient color contrast (WCAG AA minimum)
- JSON-LD Person schema auto-generated from content.yaml

## 9. File Structure

```
src/
├── theme.css                    # Design tokens
├── index.css                    # Global resets and base styles
├── main.jsx                     # Entry point
├── App.jsx                      # Root component, assembles sections
├── App.css                      # App-level layout styles
├── data/
│   └── content.yaml             # All site content
├── utils/
│   ├── dataParser.js            # YAML → JS object
│   └── dataParser.test.js       # Parser tests
└── components/
    ├── Navbar/
    │   ├── Navbar.jsx
    │   └── Navbar.module.css
    ├── Hero/
    │   ├── Hero.jsx
    │   └── Hero.module.css
    ├── Experience/
    │   ├── Experience.jsx
    │   └── Experience.module.css
    ├── Skills/
    │   ├── Skills.jsx
    │   └── Skills.module.css
    ├── Projects/
    │   ├── Projects.jsx
    │   └── Projects.module.css
    ├── Education/
    │   ├── Education.jsx
    │   └── Education.module.css
    ├── Footer/
    │   ├── Footer.jsx
    │   └── Footer.module.css
    ├── SEO/
    │   └── SEO.jsx
    └── ScrollReveal/
        ├── ScrollReveal.jsx
        └── ScrollReveal.module.css
```

### Components removed from current site

- `Layout/` — replaced by `Navbar/` (the layout wrapper was just nav + children)

### Components added

- `Navbar/` — dedicated navigation with Radix NavigationMenu
- `Education/` — new section
- `ScrollReveal/` — reusable wrapper for scroll animations

## 10. What's NOT in scope

- Blog / articles section
- Contact form
- Analytics integration
- Dark/light mode toggle (dark-only for this design)
- Multi-page routing
- Backend / API calls
