# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign the personal portfolio from a generic LinkedIn-clone into a clean, minimal engineering portfolio with a slate/charcoal palette, consolidated career narrative, proper technical skills, and template-friendly architecture.

**Architecture:** React 19 SPA on Vite. All content in `src/data/content.yaml`. Radix UI for accessible primitives. Vanilla CSS with design tokens in `src/theme.css`. CSS Modules per component.

**Tech Stack:** React 19, Vite 8, Radix UI (`@radix-ui/react-navigation-menu`, `@radix-ui/react-visually-hidden`), `yaml`, `react-helmet-async`, Vitest, React Testing Library, Inter font (Google Fonts CDN).

## Global Constraints

- Dark-only design. No light/dark toggle. Background: `#0f1117`, text: `#e2e8f0`, accent: `#38bdf8`.
- All personal content comes from `src/data/content.yaml` — components must NOT hardcode personal data.
- Font: Inter from Google Fonts CDN (loaded in `index.html`).
- CSS custom properties defined in `src/theme.css`, imported in `src/index.css`.
- CSS Modules for component-scoped styles (existing pattern).
- All interactive elements must be keyboard-accessible.
- Existing test infrastructure (Vitest + RTL + jsdom) is preserved.
- Do NOT modify: `vite.config.js`, `.github/`, `.husky/`, `eslint.config.js`, `.prettierrc`, `.oxlintrc.json`.
- Keep `@react-pdf/renderer` dependency and `src/resume/` directory untouched.
- Radix UI packages: install `@radix-ui/react-navigation-menu` and `@radix-ui/react-visually-hidden` only.

---

### Task 1: Design Tokens, Global Styles, and Font Setup

**Files:**

- Create: `src/theme.css`
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**

- Consumes: Nothing
- Produces: CSS custom properties available globally via `var(--token-name)`. All subsequent tasks depend on these tokens.

- [ ] **Step 1: Create `src/theme.css` with all design tokens**

```css
/* src/theme.css */
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
  --font-mono: 'JetBrains Mono', ui-monospace, Consolas, monospace;

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

  /* Layout */
  --max-width: 1080px;
  --nav-height: 64px;
}
```

- [ ] **Step 2: Rewrite `src/index.css` — remove all old variables and styles, import theme**

Replace the entire contents of `src/index.css` with:

```css
/* src/index.css */
@import './theme.css';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

h1,
h2,
h3,
h4 {
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

h2 {
  font-size: 2rem;
  letter-spacing: -0.02em;
}

h3 {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}

/* Section shared styles */
section {
  padding: var(--space-4xl) var(--space-xl);
}

@media (max-width: 768px) {
  section {
    padding: var(--space-3xl) var(--space-md);
  }
}

/* Utility: visually hidden */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 3: Update `index.html` — add Inter font, fix title**

Replace the entire contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0f1117" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Sharath Thomas | Senior DevOps Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Clean up `src/App.css` — remove all old styles**

Replace the entire contents of `src/App.css` with:

```css
/* src/App.css */
/* App-level layout — intentionally minimal. Component styles live in CSS Modules. */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  margin-top: var(--nav-height);
}
```

- [ ] **Step 5: Verify the dev server still runs**

Run: `npm run dev`
Expected: No CSS errors, the page renders (content will be broken since components still use old vars — that's expected).

- [ ] **Step 6: Commit**

```bash
git add src/theme.css src/index.css src/App.css index.html
git commit -m "feat: replace design system with slate/charcoal tokens and Inter font"
```

---

### Task 2: Rewrite Content YAML and Update Data Parser

**Files:**

- Modify: `src/data/content.yaml`
- Modify: `src/utils/dataParser.js` (no changes needed if schema stays compatible, but verify)
- Modify: `src/utils/dataParser.test.js`

**Interfaces:**

- Consumes: Nothing
- Produces: `getSiteContent()` returning the new schema. All component tasks (3–7) consume this.

The YAML schema changes:

- `basics.roleDescription` → `basics.bio` (more fitting name)
- `experience` entries consolidated: Ansys/Synopsys becomes one entry with `milestones` array
- `skills` categories expanded from 2 to 8
- `portfolio` → `projects` with `techStack` array added per project
- `education` and `certifications` kept as-is

- [ ] **Step 1: Rewrite `src/data/content.yaml`**

Replace the entire contents with:

```yaml
basics:
  name: 'Sharath Thomas'
  role: 'Senior DevOps Engineer'
  bio: 'Building scalable CI/CD platforms and cloud infrastructure at Synopsys. From migrating mono-repos and containerizing developer tooling at Ansys to designing monitoring solutions with Grafana — I focus on making engineering teams ship faster and more reliably.'
  email: 'sharathct22@gmail.com'
  linkedin: 'https://www.linkedin.com/in/sharathct22'
  github: 'https://github.com/thesct22'
  website: 'https://sharath.is-a.dev'

experience:
  - company: 'Synopsys / Ansys'
    location: 'Sheffield, UK'
    startDate: 'Jul 2022'
    endDate: 'Present'
    note: 'Synopsys acquired Ansys in 2025'
    milestones:
      - role: 'Senior Engineer'
        startDate: 'Jul 2025'
        endDate: 'Present'
        description: 'DevOps and platform support for cloud engineering tools and infrastructure.'
      - role: 'R&D Engineer II'
        startDate: 'Apr 2025'
        endDate: 'Jul 2025'
        description: 'Led R&D engineering initiatives for build and release automation.'
      - role: 'R&D Engineer'
        startDate: 'Dec 2023'
        endDate: 'Apr 2025'
        description: 'Developed and maintained internal CI/CD tooling and infrastructure.'
      - role: 'DevOps Engineer'
        startDate: 'Jul 2023'
        endDate: 'Dec 2023'
        description: 'Managed CI/CD pipelines, containerized solutions, and monitoring dashboards.'
      - role: 'DevOps Intern'
        startDate: 'Jul 2022'
        endDate: 'Jun 2023'
        description: 'Created standardized CI/CD pipelines on GitHub Actions. Migrated repositories from Azure DevOps mono-repo to GitHub preserving git histories. Built a containerized React/Flask web app for UI-based Ansible automation with integrated terminal and configuration panels. Developed Python executable packaging with Nuitka. Promoted containerization and observability practices.'

  - company: 'Samsung R&D Institute India'
    location: 'Bengaluru, India'
    startDate: 'Nov 2019'
    endDate: 'Aug 2020'
    description: 'Developed an IoT-based solution for Samsung Watches, integrating sensor data with cloud services.'

  - company: 'ISA-VIT (International Society of Automation)'
    location: 'Vellore, India'
    startDate: 'Dec 2017'
    endDate: 'Jun 2020'
    description: 'Progressed from Core Member to Technical Lead. Organised technical events and workshops for the student chapter.'

  - company: 'EDGATE Technologies'
    location: 'Bangalore, India'
    startDate: 'Jun 2019'
    endDate: 'Jul 2019'
    description: 'Embedded Systems and IoT internship focusing on hardware-software integration.'

skills:
  - category: 'CI/CD & Pipelines'
    items: ['GitHub Actions', 'Azure DevOps Pipelines', 'Jenkins']
  - category: 'Containers & Orchestration'
    items: ['Docker', 'Kubernetes', 'Google Kubernetes Engine', 'Helm']
  - category: 'Cloud Platforms'
    items: ['Azure', 'Google Cloud Platform']
  - category: 'Monitoring & Observability'
    items: ['Grafana', 'Prometheus', 'ELK Stack', 'Logging']
  - category: 'IaC & Configuration'
    items: ['Ansible', 'Terraform']
  - category: 'Languages'
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Bash', 'HCL']
  - category: 'Frontend'
    items: ['React', 'Flask', 'HTML/CSS']
  - category: 'DevOps Tooling'
    items: ['Git', 'Linux', 'Nuitka', 'Containerized Solutions']

projects:
  - title: 'Toolbox Web App'
    description: 'Containerized web application providing UI-based access to Ansible automation scripts with integrated terminal, text editor, and configuration panels.'
    techStack: ['React', 'Flask', 'Ansible', 'Docker']
    url: 'https://github.com/thesct22/toolbox_webapp'

  - title: 'K8s DSL'
    description: 'Domain-Specific Language for Kubernetes resource definitions, built as MSc coursework at the University of Leicester using Eclipse Xtext.'
    techStack: ['Java', 'Kubernetes', 'Xtext']
    url: 'https://github.com/thesct22/co7217.dsl.k8s.parent'

  - title: 'EnvMon'
    description: 'IoT environment monitoring system with real-time sensor data visualization via line charts, backed by Firebase.'
    techStack: ['Java', 'Firebase', 'Android']
    url: 'https://github.com/thesct22/EnvMon'

  - title: 'Ezyshare'
    description: 'Peer-to-peer file sharing application using WebRTC for direct browser-to-browser file transfers without a relay server.'
    techStack: ['JavaScript', 'WebRTC', 'P2P']
    url: 'https://github.com/thesct22/ezyshare'

  - title: 'Fractional Fourier Transform'
    description: 'Web application for computing and visualizing the Fractional Fourier Transform of input signals with interactive parameter controls.'
    techStack: ['Python', 'NumPy', 'Flask']
    url: 'https://github.com/thesct22/fractional-fourier'

education:
  - institution: 'University of Leicester'
    degree: 'MSc Advanced Computer Science'
    startDate: '2021'
    endDate: '2023'
  - institution: 'VIT Vellore'
    degree: 'BTech Electrical & Electronics Engineering'
    startDate: '2017'
    endDate: '2021'

certifications:
  - name: 'Kubernetes and Cloud Native Associate (KCNA)'
  - name: 'Architecting with Google Kubernetes Engine Specialization'
  - name: 'Architecting with Google Compute Engine Specialization'
  - name: 'Industrial IoT on Google Cloud Platform'
  - name: 'Java for Android'
```

- [ ] **Step 2: Update the data parser test**

Replace the entire contents of `src/utils/dataParser.test.js` with:

```javascript
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { getSiteContent } from './dataParser';

describe('dataParser', () => {
  it('parses basics correctly', () => {
    const data = getSiteContent();
    expect(data.basics.name).toBe('Sharath Thomas');
    expect(data.basics.role).toBe('Senior DevOps Engineer');
    expect(data.basics.bio).toBeDefined();
    expect(data.basics.github).toBe('https://github.com/thesct22');
  });

  it('parses consolidated experience entries', () => {
    const data = getSiteContent();
    expect(data.experience.length).toBe(4);
    expect(data.experience[0].company).toBe('Synopsys / Ansys');
    expect(data.experience[0].milestones).toBeDefined();
    expect(data.experience[0].milestones.length).toBe(5);
  });

  it('parses all 8 skill categories', () => {
    const data = getSiteContent();
    expect(data.skills.length).toBe(8);
    expect(data.skills[0].category).toBe('CI/CD & Pipelines');
  });

  it('parses projects with techStack arrays', () => {
    const data = getSiteContent();
    expect(data.projects.length).toBe(5);
    expect(data.projects[0].techStack).toContain('React');
  });

  it('parses education and certifications', () => {
    const data = getSiteContent();
    expect(data.education.length).toBe(2);
    expect(data.certifications.length).toBe(5);
  });
});
```

- [ ] **Step 3: Run the parser tests**

Run: `npx vitest run src/utils/dataParser.test.js`
Expected: All 5 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/data/content.yaml src/utils/dataParser.test.js
git commit -m "feat: rewrite content YAML with consolidated experience and expanded skills"
```

---

### Task 3: Navbar Component (replaces Layout)

**Files:**

- Create: `src/components/Navbar/Navbar.jsx`
- Create: `src/components/Navbar/Navbar.module.css`
- Delete: `src/components/Layout/Layout.jsx`
- Delete: `src/components/Layout/Layout.module.css`
- Delete: `src/components/Layout/Layout.test.jsx` (if it exists)
- Modify: `src/App.jsx` — replace Layout import with Navbar, restructure

**Interfaces:**

- Consumes: `getSiteContent().basics.name`
- Produces: `<Navbar />` component — fixed navigation bar with section anchors and resume button. Mobile hamburger menu.

**Dependencies:** Requires `@radix-ui/react-navigation-menu` and `@radix-ui/react-visually-hidden` packages.

- [ ] **Step 1: Install Radix UI packages**

```bash
npm install @radix-ui/react-navigation-menu @radix-ui/react-visually-hidden
```

- [ ] **Step 2: Create `src/components/Navbar/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
];

export default function Navbar() {
  const content = getSiteContent() || {};
  const { name = '' } = content.basics || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        <a href="#" className={styles.brand} aria-label="Home">
          {name}
        </a>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          />
        </button>

        <NavigationMenu.Root
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
        >
          <NavigationMenu.List className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link
                  className={styles.navLink}
                  href={link.href}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={styles.resumeButton}
                href="/resume.pdf"
                onClick={handleLinkClick}
              >
                Resume
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create `src/components/Navbar/Navbar.module.css`**

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base);
}

.scrolled {
  border-bottom-color: var(--border);
}

.container {
  width: var(--max-width);
  max-width: 100%;
  padding: 0 var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color var(--transition-fast);
}

.brand:hover {
  color: var(--accent);
}

.menuToggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
  z-index: 1001;
}

.hamburger {
  display: block;
  width: 20px;
  height: 2px;
  background-color: var(--text-primary);
  position: relative;
  transition: background-color var(--transition-fast);
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: var(--text-primary);
  transition: transform var(--transition-base);
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

.hamburger.open {
  background-color: transparent;
}

.hamburger.open::before {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.open::after {
  transform: translateY(-6px) rotate(-45deg);
}

.nav {
  display: flex;
}

.navList {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navLink {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.navLink:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

.resumeButton {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.resumeButton:hover {
  background-color: var(--accent-subtle);
  border-color: var(--accent);
}

@media (max-width: 768px) {
  .menuToggle {
    display: block;
  }

  .nav {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    border-bottom: 1px solid var(--border);
    padding: var(--space-md);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition:
      transform var(--transition-base),
      opacity var(--transition-base);
  }

  .navOpen {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .navList {
    flex-direction: column;
    gap: var(--space-xs);
    width: 100%;
  }

  .navLink,
  .resumeButton {
    width: 100%;
    text-align: center;
    padding: var(--space-md);
  }
}
```

- [ ] **Step 4: Update `src/App.jsx`**

Replace the entire contents with:

```jsx
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import SEO from './components/SEO/SEO';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <SEO />
        <Navbar />
        <main className="main">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
```

Note: `Education` component does not exist yet — it will be created in Task 6. The dev server will show an error until Task 6 is complete. To avoid this, create a stub file `src/components/Education/Education.jsx`:

```jsx
export default function Education() {
  return <section id="education"></section>;
}
```

And a stub `src/components/Education/Education.module.css`:

```css
/* Stub — implemented in Task 6 */
```

- [ ] **Step 5: Delete old Layout component**

```bash
rm -rf src/components/Layout/
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace Layout with Navbar component using Radix NavigationMenu"
```

---

### Task 4: Hero Component Redesign

**Files:**

- Modify: `src/components/Hero/Hero.jsx`
- Modify: `src/components/Hero/Hero.module.css`

**Interfaces:**

- Consumes: `getSiteContent().basics` — uses `name`, `role`, `bio`, `github`, `linkedin`, `email`
- Produces: `<Hero />` — full-viewport intro section with name, role, bio, social links, resume CTA

- [ ] **Step 1: Rewrite `src/components/Hero/Hero.jsx`**

Replace the entire contents with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Hero.module.css';

export default function Hero() {
  const content = getSiteContent() || {};
  const {
    name = '',
    role = '',
    bio = '',
    github = '',
    linkedin = '',
    email = '',
  } = content.basics || {};

  return (
    <section id="about" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.role}>{role}</p>
        <p className={styles.bio}>{bio}</p>

        <div className={styles.actions}>
          <a
            href="/resume.pdf"
            className={styles.resumeButton}
            aria-label="Download Resume"
          >
            Download Resume
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          <div className={styles.socials}>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className={styles.socialLink}
                aria-label="Email"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Hero/Hero.module.css`**

Replace the entire contents with:

```css
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--nav-height));
  padding: var(--space-3xl) var(--space-xl);
  overflow: hidden;
}

.grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 20%,
    transparent 70%
  );
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  margin: 0 0 var(--space-md) 0;
}

.role {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0 0 var(--space-lg) 0;
  letter-spacing: -0.01em;
}

.bio {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 var(--space-2xl) 0;
  max-width: 600px;
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.resumeButton {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--accent);
  padding: 12px 24px;
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.resumeButton:hover {
  background-color: var(--accent-subtle);
  border-color: var(--accent);
  transform: translateY(-1px);
}

.socials {
  display: flex;
  gap: var(--space-sm);
}

.socialLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.socialLink:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

@media (max-width: 600px) {
  .hero {
    padding: var(--space-2xl) var(--space-md);
  }

  .actions {
    flex-direction: column;
    gap: var(--space-md);
    width: 100%;
  }

  .resumeButton {
    width: 100%;
    justify-content: center;
  }

  .socials {
    justify-content: center;
  }
}
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev` and check the hero section renders with the new design.
Expected: Dark background, name in white, role in sky blue, bio in muted text, social icons, download button.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero/
git commit -m "feat: redesign Hero with clean minimal engineering aesthetic"
```

---

### Task 5: Experience Component Redesign

**Files:**

- Modify: `src/components/Experience/Experience.jsx`
- Modify: `src/components/Experience/Experience.module.css`

**Interfaces:**

- Consumes: `getSiteContent().experience` — array where first entry has `milestones` sub-array, others have `description`
- Produces: `<Experience />` — consolidated career narrative section

- [ ] **Step 1: Rewrite `src/components/Experience/Experience.jsx`**

Replace the entire contents with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Experience.module.css';

export default function Experience() {
  const content = getSiteContent() || {};
  const experiences = content.experience || [];

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.entries}>
          {experiences.map((exp, index) => (
            <article key={index} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.meta}>
                    {exp.location} · {exp.startDate} – {exp.endDate}
                  </p>
                  {exp.note && <p className={styles.note}>{exp.note}</p>}
                </div>
              </div>

              {exp.milestones ? (
                <div className={styles.milestones}>
                  {exp.milestones.map((ms, msIndex) => (
                    <div key={msIndex} className={styles.milestone}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneRole}>{ms.role}</span>
                        <span className={styles.milestoneDates}>
                          {ms.startDate} – {ms.endDate}
                        </span>
                      </div>
                      <p className={styles.milestoneDescription}>
                        {ms.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.description}>{exp.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Experience/Experience.module.css`**

Replace the entire contents with:

```css
.section {
  padding: var(--space-4xl) var(--space-xl);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTitle {
  margin-bottom: var(--space-3xl);
}

.entries {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.entry {
  border-left: 2px solid var(--border);
  padding-left: var(--space-xl);
  transition: border-color var(--transition-base);
}

.entry:hover {
  border-left-color: var(--accent);
}

.entryHeader {
  margin-bottom: var(--space-md);
}

.company {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs) 0;
}

.meta {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin: 0;
}

.note {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-style: italic;
  margin: var(--space-xs) 0 0 0;
}

.description {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

.milestones {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.milestone {
  padding: var(--space-md) var(--space-lg);
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.milestone:hover {
  border-color: var(--border-hover);
}

.milestoneHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
  gap: var(--space-md);
}

.milestoneRole {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.milestoneDates {
  font-size: 0.8125rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  white-space: nowrap;
}

.milestoneDescription {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) var(--space-md);
  }

  .entry {
    padding-left: var(--space-md);
  }

  .milestoneHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
}
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev` and check the experience section.
Expected: Consolidated "Synopsys / Ansys" entry with 5 role milestone cards inside. Other entries show plain descriptions. Left border accent on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience/
git commit -m "feat: redesign Experience with consolidated career narrative and milestones"
```

---

### Task 6: Skills, Projects, and Education Components

**Files:**

- Modify: `src/components/Skills/Skills.jsx`
- Modify: `src/components/Skills/Skills.module.css`
- Modify: `src/components/Projects/Projects.jsx`
- Modify: `src/components/Projects/Projects.module.css`
- Modify: `src/components/Education/Education.jsx` (replace stub)
- Modify: `src/components/Education/Education.module.css` (replace stub)

**Interfaces:**

- Consumes: `getSiteContent().skills`, `getSiteContent().projects`, `getSiteContent().education`, `getSiteContent().certifications`
- Produces: `<Skills />`, `<Projects />`, `<Education />` — three fully styled section components

- [ ] **Step 1: Rewrite `src/components/Skills/Skills.jsx`**

Replace the entire contents with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Skills.module.css';

export default function Skills() {
  const content = getSiteContent() || {};
  const skills = content.skills || [];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.grid}>
          {skills.map((categoryObj, catIndex) => (
            <div key={catIndex} className={styles.card}>
              <h3 className={styles.categoryTitle}>{categoryObj.category}</h3>
              <div className={styles.pills}>
                {categoryObj.items?.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Skills/Skills.module.css`**

Replace the entire contents with:

```css
.section {
  padding: var(--space-4xl) var(--space-xl);
  background-color: var(--bg-surface);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTitle {
  margin-bottom: var(--space-3xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.card {
  padding: var(--space-lg);
  background-color: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-fast);
}

.card:hover {
  border-color: var(--border-hover);
}

.categoryTitle {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-md) 0;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  padding: var(--space-xs) var(--space-md);
  background-color: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  cursor: default;
}

.pill:hover {
  background-color: var(--accent-subtle);
  color: var(--accent);
  border-color: var(--accent-border);
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) var(--space-md);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Rewrite `src/components/Projects/Projects.jsx`**

Replace the entire contents with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Projects.module.css';

export default function Projects() {
  const content = getSiteContent() || {};
  const projects = content.projects || [];

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article key={index} className={styles.card}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              {project.techStack && (
                <div className={styles.techStack}>
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <p className={styles.description}>{project.description}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  View Project
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={styles.linkIcon}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/Projects/Projects.module.css`**

Replace the entire contents with:

```css
.section {
  padding: var(--space-4xl) var(--space-xl);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTitle {
  margin-bottom: var(--space-3xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.card {
  padding: var(--space-lg);
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  transition:
    border-color var(--transition-fast),
    transform var(--transition-base);
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.projectTitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-md) 0;
}

.techStack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.techTag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 2px var(--space-sm);
  background-color: var(--accent-subtle);
  color: var(--accent);
  border-radius: var(--radius-sm);
}

.description {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  flex: 1;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  margin-top: var(--space-lg);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--accent-hover);
}

.linkIcon {
  transition: transform var(--transition-fast);
}

.link:hover .linkIcon {
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) var(--space-md);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Implement `src/components/Education/Education.jsx`**

Replace the stub with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Education.module.css';

export default function Education() {
  const content = getSiteContent() || {};
  const education = content.education || [];
  const certifications = content.certifications || [];

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Education & Certifications</h2>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Education</h3>
            <div className={styles.entries}>
              {education.map((edu, index) => (
                <div key={index} className={styles.entry}>
                  <h4 className={styles.degree}>{edu.degree}</h4>
                  <p className={styles.institution}>{edu.institution}</p>
                  <p className={styles.dates}>
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Certifications</h3>
            <div className={styles.entries}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certEntry}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={styles.certIcon}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className={styles.certName}>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `src/components/Education/Education.module.css`**

Replace the stub with:

```css
.section {
  padding: var(--space-4xl) var(--space-xl);
  background-color: var(--bg-surface);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.sectionTitle {
  margin-bottom: var(--space-3xl);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
}

.columnTitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-lg) 0;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.entry {
  padding-left: var(--space-md);
  border-left: 2px solid var(--border);
}

.degree {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs) 0;
}

.institution {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0 0 var(--space-xs) 0;
}

.dates {
  font-size: 0.8125rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin: 0;
}

.certEntry {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}

.certIcon {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.certName {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) var(--space-md);
  }

  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
}
```

- [ ] **Step 7: Verify visually**

Run: `npm run dev`
Expected: Skills shows 8 category cards in a 2-column grid. Projects shows 5 cards with tech tags. Education shows 2-column layout with degrees and certifications.

- [ ] **Step 8: Commit**

```bash
git add src/components/Skills/ src/components/Projects/ src/components/Education/
git commit -m "feat: redesign Skills, Projects, and add Education section"
```

---

### Task 7: Footer, SEO, Tests, and README

**Files:**

- Modify: `src/components/Footer/Footer.jsx`
- Modify: `src/components/Footer/Footer.module.css`
- Modify: `src/components/SEO/SEO.jsx`
- Modify: `src/App.test.jsx`
- Modify: `README.md`

**Interfaces:**

- Consumes: All components from Tasks 1–6
- Produces: Complete working site with passing tests and template-friendly README

- [ ] **Step 1: Rewrite `src/components/Footer/Footer.jsx`**

Replace the entire contents with:

```jsx
import { getSiteContent } from '../../utils/dataParser';
import styles from './Footer.module.css';

export default function Footer() {
  const content = getSiteContent() || {};
  const {
    name = '',
    email = '',
    github = '',
    linkedin = '',
  } = content.basics || {};

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className={styles.link}
              aria-label="Email"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          )}
        </div>
        <p className={styles.copyright}>
          &copy; {currentYear} {name}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Footer/Footer.module.css`**

Replace the entire contents with:

```css
.footer {
  border-top: 1px solid var(--border);
  padding: var(--space-2xl) var(--space-xl);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.socials {
  display: flex;
  gap: var(--space-lg);
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--text-primary);
}

.copyright {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;
}
```

- [ ] **Step 3: Update `src/components/SEO/SEO.jsx`**

Replace the entire contents with:

```jsx
import { Helmet } from 'react-helmet-async';
import { getSiteContent } from '../../utils/dataParser';

export default function SEO() {
  const content = getSiteContent() || {};
  const basics = content.basics || {};
  const {
    name = '',
    role = '',
    bio = '',
    website = '',
    github = '',
    linkedin = '',
  } = basics;

  const title = name && role ? `${name} | ${role}` : name;

  const sameAsLinks = [github, linkedin].filter(Boolean);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: bio,
    url: website,
    sameAs: sameAsLinks,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={bio} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={bio} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={website} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={bio} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
```

- [ ] **Step 4: Rewrite `src/App.test.jsx`**

Replace the entire contents with:

```jsx
// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

vi.mock('./utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Thomas',
      role: 'Senior DevOps Engineer',
      bio: 'Building scalable CI/CD platforms.',
      github: 'https://github.com/thesct22',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
      email: 'sharath@example.com',
      website: 'https://sharath.is-a.dev',
    },
    experience: [
      {
        company: 'Synopsys / Ansys',
        location: 'Sheffield, UK',
        startDate: 'Jul 2022',
        endDate: 'Present',
        milestones: [
          {
            role: 'Senior Engineer',
            startDate: 'Jul 2025',
            endDate: 'Present',
            description: 'DevOps and platform support.',
          },
        ],
      },
    ],
    skills: [
      {
        category: 'CI/CD & Pipelines',
        items: ['GitHub Actions', 'Azure DevOps'],
      },
    ],
    projects: [
      {
        title: 'Toolbox Web App',
        description: 'Containerized web app.',
        techStack: ['React', 'Flask'],
        url: 'https://github.com/thesct22/toolbox_webapp',
      },
    ],
    education: [
      {
        institution: 'University of Leicester',
        degree: 'MSc Advanced Computer Science',
        startDate: '2021',
        endDate: '2023',
      },
    ],
    certifications: [{ name: 'KCNA' }],
  }),
}));

describe('App Component Assembly', () => {
  it('renders the navbar with name', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByText('Sharath Thomas').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Sharath Thomas'
    );
    expect(screen.getByText('Senior DevOps Engineer')).toBeInTheDocument();
  });

  it('renders the experience section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Experience' })
    ).toBeInTheDocument();
    expect(screen.getByText('Synopsys / Ansys')).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders the skills section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Projects' })
    ).toBeInTheDocument();
    expect(screen.getByText('Toolbox Web App')).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<App />);
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    expect(
      screen.getByText('MSc Advanced Computer Science')
    ).toBeInTheDocument();
    expect(screen.getByText('KCNA')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All data parser tests and App tests PASS.

- [ ] **Step 6: Rewrite `README.md`**

Replace the entire contents with:

````markdown
# Personal Portfolio Template

A clean, minimal engineering portfolio built with React 19 and Vite. Designed for DevOps engineers, SREs, and software engineers who want a professional online presence without the fluff.

**Live:** [sharath.is-a.dev](https://sharath.is-a.dev)

## Features

- 🎨 **Dark slate/charcoal design** — clean, professional, no gimmicks
- 📄 **YAML-driven content** — edit one file to personalize everything
- 🎛️ **Design tokens** — change colors, fonts, and spacing in a single CSS file
- ♿ **Accessible** — Radix UI primitives, keyboard navigation, semantic HTML
- 📱 **Responsive** — works on mobile, tablet, and desktop
- 🚀 **Fast** — Vite build, no heavy dependencies
- 🧪 **Tested** — Vitest + React Testing Library

## Use as a Template

1. **Fork this repo** and clone it
2. **Edit `src/data/content.yaml`** — replace with your info (name, bio, experience, skills, projects, education, certifications)
3. **Edit `src/theme.css`** — customize colors, fonts, and spacing
4. **Replace `public/resume.pdf`** with your resume
5. **Deploy:**
   ```bash
   npm install
   npm run build
   # Push to GitHub and enable GitHub Pages from the gh-pages branch
   # Or deploy the `dist/` folder to any static host
   ```
````

## Development

```bash
npm install
npm run dev     # Start dev server at localhost:5173
npm test        # Run tests
npm run build   # Production build
npm run lint    # Lint check
```

## Project Structure

```
src/
├── theme.css            # Design tokens (colors, fonts, spacing)
├── index.css            # Global styles
├── data/content.yaml    # All site content
├── utils/dataParser.js  # YAML parser
├── App.jsx              # Root component
└── components/
    ├── Navbar/          # Fixed navigation
    ├── Hero/            # Intro section
    ├── Experience/      # Career narrative
    ├── Skills/          # Technical skills grid
    ├── Projects/        # Featured projects
    ├── Education/       # Education & certifications
    ├── Footer/          # Minimal footer
    └── SEO/             # Meta tags & JSON-LD
```

## Tech Stack

- React 19, Vite 8
- Radix UI (NavigationMenu, VisuallyHidden)
- Vanilla CSS with CSS Modules
- Inter font (Google Fonts)
- Vitest + React Testing Library
- ESLint + Prettier + Husky

## License

MIT

````

- [ ] **Step 7: Verify everything works end-to-end**

Run: `npm run dev` — visually inspect all sections.
Run: `npx vitest run` — all tests pass.
Run: `npm run build` — build succeeds without errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: complete redesign with Footer, SEO, tests, and template README"
````
