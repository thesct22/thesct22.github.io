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
