# Personal Portfolio Template

A clean, minimal engineering portfolio built with React 19 and Vite. Designed for DevOps engineers, SREs, and software engineers who want a professional online presence without the fluff.

**Live:** [sharath.is-a.dev](https://sharath.is-a.dev)

## Features

- 🎨 **Minimal, Motion-Driven Design** — light theme, fluid typography, and floating navigation
- 📄 **YAML-Driven Content** — edit one file (`content.yaml`) to personalize everything!
- 🖨️ **Dynamic PDF Generation** — automatically generates a perfectly formatted ATS-friendly `resume.pdf` straight from your YAML data!
- 🎛️ **Design tokens** — change colors, fonts, and spacing in a single CSS file
- ♿ **Accessible** — keyboard navigation and semantic HTML
- 📱 **Responsive** — works flawlessly on mobile, tablet, and desktop
- 🚀 **Fast** — Vite build, no heavy dependencies
- 🧪 **Tested** — Vitest + React Testing Library

## Use as a Template

1. **Fork this repo** and clone it
2. **Edit `src/data/content.yaml`** — replace with your information (name, bio, experience, skills, etc.)
3. **Generate your Resume PDF** (optional, the CI/CD pipeline does it too):
   ```bash
   npm install
   npm run generate:resume
   ```
4. **Edit `src/theme.css`** — customize colors, fonts, and spacing
5. **Deploy to GitHub Pages:**
   - Go to your repository **Settings** > **Pages**.
   - Change the **Source** to **GitHub Actions**.
   - Make sure your repository is **Public** (required for free GitHub accounts to use Pages).
   - Commit and push to the `main` branch. The included GitHub Actions workflow will automatically lint, test, generate your PDF, and deploy your site!

## Development

```bash
npm install
npm run dev               # Start dev server at localhost:5173
npm test                  # Run tests
npm run generate:resume   # Generate your resume PDF
npm run build             # Production build
npm run lint              # Lint check
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
