# Decision Log 📜

A minimalist, editorial-grade web application designed for engineers, architects, founders, and leaders to record, track, audit, and reflect on critical decisions.

Built with **React 18+**, **Vite**, and **pure CSS Modules**, following strict editorial design principles with Georgia serif typography, a 5-step spacing scale, and a pure monochrome palette highlighted by a single accent color.

---

## ✨ Features

- **Context & Problem Capture**: Clearly document the circumstances and triggers that led to a decision.
- **Explicit Alternatives Matrix**: Record rejected competing options along with their respective pros and cons to eliminate repetitive re-debates.
- **Review Deadlines & Auditing**: Set target review dates to evaluate actual results against original hypotheses.
- **Outcome Retrospectives**: Log post-implementation learnings, metric results, and success ratings (`Positive`, `Neutral`, `Negative`, `Pivoted`).
- **Editorial Broadside Design**: Georgia-first serif typography, high-contrast layouts, and subtle micro-interactions.
- **Dark & Light Modes**: Seamless monochrome theme switching with persistence.
- **Full Data Portability**: Export your decisions into formatted Markdown Architectural Decision Records (ADRs) or raw JSON backups, and import existing JSON records.
- **Privacy-First & Zero Bloat**: All records are stored client-side in `localStorage` with no external UI dependencies and a bundle size under 200KB.

---

## 📂 Project Structure

```
decision-log/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Landing.jsx           # Editorial broadside landing & manifesto
│   │   ├── DecisionApp.jsx       # Main dashboard workspace & metrics
│   │   ├── DecisionForm.jsx      # Form for creating/editing decisions & outcomes
│   │   ├── DecisionList.jsx      # Searchable & filterable decision feed
│   │   ├── DecisionCard.jsx      # Decision record card with collapsible details
│   │   └── Modal.jsx             # Accessible modal dialog
│   ├── styles/
│   │   ├── globals.css           # Design tokens, typography & CSS variables
│   │   ├── Landing.module.css    # Landing page scoped styles
│   │   ├── DecisionApp.module.css# Application workspace scoped styles
│   │   └── components.module.css # Card, form, list, and modal scoped styles
│   ├── hooks/
│   │   └── useDecisions.js       # State management hook with localStorage sync
│   ├── App.jsx                   # View routing & theme management
│   ├── index.jsx                 # Application entrypoint
│   └── index.css                 # Global stylesheet loader
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── PROMPTS.txt
```

---

## 🎨 Design System

- **Typography**: Georgia and system serif font hierarchy.
- **Spacing Scale**:
  - `--space-1`: `4px`
  - `--space-2`: `8px`
  - `--space-3`: `16px`
  - `--space-4`: `24px`
  - `--space-5`: `32px`
- **Color Palette**:
  - Pure Monochrome: `#121212` (Black), `#ffffff` (White), `#fbfbfa` / `#0d0d0d` (Backgrounds)
  - Single Accent Color: `#c2410c` (Editorial Terracotta / Warm Sienna)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/decision-log.git
cd decision-log

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
The compiled output will be generated in the `dist/` directory.

---

## 🌐 GitHub Pages Deployment

This project is configured with `base: './'` in `vite.config.js` for out-of-the-box GitHub Pages support.

### Option 1: Automated Deployment via GitHub Actions
Create a `.github/workflows/deploy.yml` file:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option 2: gh-pages CLI
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Then run:
```bash
npm run deploy
```

---

## 📄 License
MIT License.
# Decision-log
