# God-Tier Personal Website Design

## 1. Overview and Goals
Create a premium, lightning-fast Single Page Application (SPA) to serve as a personal website and resume for Sharath C T. The site will replace the old `thesct22.github.io` repo. The design will be engineering-focused, utilizing a dark mode, glassmorphism aesthetic with responsive typography and smooth micro-animations. It must achieve perfect SEO/accessibility scores and be fully ATS/AI optimized.

## 2. Architecture & Tech Stack
- **Framework**: React 18+ powered by Vite.
- **Styling**: Vanilla CSS with CSS Modules. No heavy UI frameworks; custom-built, highly optimized styles.
- **Data Layer**: A centralized `src/data/content.yaml` file. All website content (experience, skills, projects) is parsed from this file, allowing easy updates without touching React components.
- **Data Source**: Data will be pulled from the old repository and the user's LinkedIn profile (`https://www.linkedin.com/in/sharathct22/`).
- **Resume Output**: A statically provided `resume.pdf` in the `public/` directory, linked via a prominent "Download Resume" button.

## 3. Layout & Components
Single-page scrolling application with fixed glassmorphism navigation.
- **Hero Section**: High-impact intro, dynamic animated background, primary Call-To-Action (Resume download).
- **Experience Section**: Timeline format. Prominently features the role: **Senior Engineer at Ansys/Synopsys** (DevOps, platform support).
- **Skills Section**: Categorized, animated skill tags derived from YAML.
- **Projects Section**: Grid layout showcasing past projects (migrated from the old repo).
- **Contact/Footer**: Professional links and social profiles.

## 4. CI/CD & Engineering Standards (God-Tier setup)
- **Code Quality**: Strict ESLint and Prettier configs.
- **Pre-commit Hooks**: Husky and `lint-staged` to enforce quality before every commit.
- **Testing**: Test-Driven Development (TDD) using Vitest and React Testing Library (RTL). Tests written prior to component implementation.
- **Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically test, build, and deploy the `dist` folder to the `gh-pages` branch on push to `main`.

## 5. SEO, ATS & AI Optimization
- **Metadata**: React Helmet (or native manipulation) for dynamic titles and descriptions.
- **Semantic HTML**: Extensive use of `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` with appropriate ARIA roles.
- **JSON-LD Schema**: Auto-generation of Person structured data from the `content.yaml` file injected into the `<head>` to ensure perfect readability by Google and AI parsers.
