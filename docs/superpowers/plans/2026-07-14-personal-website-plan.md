# Personal Website & Resume SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, lightning-fast React SPA using Vite to serve as a personal website and resume for Sharath C T, fully driven by a YAML configuration file.

**Architecture:** A static React application deployed to GitHub Pages. All content is stored in `src/data/content.yaml`. Tests are written first (TDD) using Vitest and RTL. Code quality is enforced by ESLint, Prettier, and Husky pre-commit hooks.

**Tech Stack:** React 18, Vite, Vanilla CSS Modules, `yaml` (for parsing), Vitest, React Testing Library, Husky, lint-staged.

## Global Constraints

- React 18+ with Vite.
- Use ONLY free or free-for-personal-use libraries.
- Vanilla CSS with CSS Modules (no Tailwind or heavy CSS-in-JS libraries).
- Test-Driven Development (TDD) mandatory for all components.
- Strict ESLint and Prettier configs enforced by Husky.

---

### Task 1: Project Scaffolding & CI/CD Setup

**Files:**

- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/package.json`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/vite.config.js`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/.github/workflows/deploy.yml`

**Interfaces:**

- Consumes: None
- Produces: Base project structure with testing and linting configuration.

- [ ] **Step 1: Initialize Vite Project & Dependencies**

```bash
npm create vite@latest . -- --template react
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom eslint prettier husky lint-staged
npm install yaml react-helmet-async
```

- [ ] **Step 2: Configure ESLint, Prettier, and Husky**

```bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

- [ ] **Step 3: Setup GitHub Actions Workflow**
      Create `.github/workflows/deploy.yml` to run tests and deploy to `gh-pages`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold vite react project with testing, linting, and CI/CD"
```

---

### Task 2: Data Layer Configuration (YAML parsing)

**Files:**

- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/data/content.yaml`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/utils/dataParser.js`
- Test: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/utils/dataParser.test.js`

**Interfaces:**

- Consumes: None
- Produces: `getSiteContent()` returning parsed JavaScript object from YAML.

- [ ] **Step 1: Write the failing test**

```javascript
// src/utils/dataParser.test.js
import { describe, it, expect } from 'vitest';
import { getSiteContent } from './dataParser';

describe('dataParser', () => {
  it('parses the YAML content successfully', () => {
    const data = getSiteContent();
    expect(data.name).toBe('Sharath Cherian Thomas');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
      Run: `npx vitest run src/utils/dataParser.test.js`
      Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
      Write `src/data/content.yaml` using data extracted from the old `resumeData.js`, adding the "Senior Engineer at Ansys/Synopsys" role.
      Implement `src/utils/dataParser.js` using `yaml`.

- [ ] **Step 4: Run test to verify it passes**
      Run: `npx vitest run src/utils/dataParser.test.js`
      Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/content.yaml src/utils/
git commit -m "feat: add YAML data layer and parser"
```

---

### Task 3: Base Layout & SEO Configuration

**Files:**

- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Layout/Layout.jsx`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/SEO/SEO.jsx`
- Test: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Layout/Layout.test.jsx`

**Interfaces:**

- Consumes: `getSiteContent()`
- Produces: `Layout` wrapper component and `SEO` component.

- [ ] **Step 1: Write the failing test**
      Create `src/components/Layout/Layout.test.jsx`.

- [ ] **Step 2: Run test to verify it fails**
      Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
      Implement `SEO.jsx` and `Layout.jsx`.

- [ ] **Step 4: Run test to verify it passes**
      Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: create Layout wrapper and SEO component"
```

---

### Task 4: Hero & Experience Components

**Files:**

- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Hero/Hero.jsx`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Experience/Experience.jsx`
- Test: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Hero/Hero.test.jsx`, `src/components/Experience/Experience.test.jsx`

**Interfaces:**

- Consumes: `getSiteContent()`
- Produces: `Hero` and `Experience` sections.

- [ ] **Step 1: Write failing tests**
      Write tests for Hero and Experience.

- [ ] **Step 2: Run test to verify it fails**
      Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
      Implement components with Vanilla CSS Modules.

- [ ] **Step 4: Run test to verify it passes**
      Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero src/components/Experience
git commit -m "feat: implement Hero and Experience components"
```

---

### Task 5: Skills, Projects, & Footer Components

**Files:**

- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/components/Skills/Skills.jsx`, `Projects.jsx`, `Footer.jsx`

**Interfaces:**

- Consumes: `getSiteContent()`
- Produces: Completed sections.

- [ ] **Step 1: Write failing tests**
      Write tests for the components.

- [ ] **Step 2: Run test to verify it fails**
      Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
      Build the components with CSS modules.

- [ ] **Step 4: Run test to verify it passes**
      Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills src/components/Projects src/components/Footer
git commit -m "feat: implement Skills, Projects, and Footer components"
```

---

### Task 6: Assembly & Resume PDF

**Files:**

- Modify: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/src/App.jsx`
- Create: `/home/sthomas/.gemini/antigravity-ide/scratch/personal-website/public/resume.pdf`

**Interfaces:**

- Consumes: All components.
- Produces: Final working SPA.

- [ ] **Step 1: Assemble App**
      Import all components into `App.jsx`.

- [ ] **Step 2: Add Resume PDF**
      Copy `sharathct.pdf` from the old repo to `public/resume.pdf`.

- [ ] **Step 3: Verify functionality**
      Run dev server and check.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx public/resume.pdf
git commit -m "feat: assemble application and add resume PDF"
```
