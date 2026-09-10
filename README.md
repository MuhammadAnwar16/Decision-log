# Decision Log

A lightweight Architecture Decision Record (ADR) ledger built for engineering and product teams. Decision Log provides a structured interface for recording, tracking, filtering, and exporting high-stakes technical decisions -- all stored locally in the browser with zero external dependencies.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Export Formats](#export-formats)
- [Theming](#theming)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Decision Log is a single-page application designed to help teams capture and govern Architecture Decision Records (ADRs) in a structured, searchable format. It addresses the common problem of undocumented or scattered technical decisions by providing a centralized ledger with filtering, sorting, and export capabilities.

All data is persisted in the browser via local storage. No server, database, or third-party service is required.

---

## Features

- **ADR Governance Ledger** -- Record decisions with title, rationale, category, impact level, status, author, tags, alternatives considered, pros, and cons.
- **Full-Text Search** -- Search across titles, descriptions, tags, and authors in real time.
- **Multi-Axis Filtering** -- Filter by category (Technical, Product, Infrastructure, Security, Process) and impact level (Critical, High, Medium, Low).
- **Sort Controls** -- Sort by newest, oldest, or active-only views.
- **Telemetry Strip** -- At-a-glance metrics for total records, active policy count, and high/critical risk scope.
- **Markdown Export** -- Copy or download the full decision ledger as a Markdown file, formatted per the ADR specification.
- **JSON Export** -- Export the complete dataset as structured JSON for integration with external tools.
- **Light and Dark Themes** -- Toggle between light and dark mode with persistent preference via local storage.
- **Dual-Pane Layout** -- Fixed sidebar form for recording new decisions alongside an independently scrollable decision stream.
- **Interactive Landing Page** -- Marketing-style landing page with in-place device mockups that demonstrate app functionality without navigating away.
- **Responsive Design** -- Fully responsive layout across desktop and mobile viewports.

---

## Tech Stack

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| Framework     | React 19                        |
| Build Tool    | Vite 8                          |
| Animations    | Framer Motion                   |
| Styling       | CSS Modules + CSS Custom Props  |
| Typography    | Google Fonts (Black Ops One, JetBrains Mono, Roboto) |
| Storage       | Browser Local Storage           |
| Linting       | ESLint                          |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/MuhammadAnwar16/Decision-log.git
cd Decision-log
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Production Build

```bash
npm run build
```

The optimized output is written to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
decision-log/
  index.html                  # HTML entry point
  vite.config.js              # Vite build configuration
  package.json                # Dependencies and scripts
  public/                     # Static assets (logo, favicon)
  src/
    main.jsx                  # Application bootstrap
    index.jsx                 # React DOM render
    App.jsx                   # Root component (landing vs. app routing)
    index.css                 # Base styles
    components/
      Landing.jsx             # Marketing landing page with interactive mockups
      DecisionApp.jsx         # Main application shell (layout, search, exports)
      DecisionForm.jsx        # Form component for recording new ADRs
      DecisionList.jsx        # Filterable, sortable decision stream
      DecisionCard.jsx        # Individual decision record display
      DecisionDetail.jsx      # Expanded decision detail view
      BentoGrid.jsx           # Feature grid component for landing page
      FAQSection.jsx          # Frequently asked questions section
      RealityGap.jsx          # Problem/solution comparison section
      ScrollTextReveal.jsx    # Scroll-driven text animation component
      Header.jsx              # Site header
      Modal.jsx               # Reusable modal overlay
      StatusBadge.jsx         # Decision status indicator
    hooks/
      useDecisions.js         # Decision state management, seed data, and export utilities
    styles/
      globals.css             # CSS custom properties and theme tokens
      DecisionApp.module.css  # Application shell styles
      Landing.module.css      # Landing page styles
      [other].module.css      # Component-scoped CSS modules
    utils/                    # Shared utility functions
    assets/                   # Static assets bundled by Vite
```

---

## Usage

### Recording a Decision

1. Launch the application and select "Open Decision Ledger" from the landing page.
2. Use the left-hand sidebar form to fill in the decision details:
   - **Title** -- A concise name for the architectural decision.
   - **Rationale** -- The context, problem statement, and reasoning behind the decision.
   - **Category** -- One of: Technical, Product, Infrastructure, Security, or Process.
   - **Impact** -- The risk level: Critical, High, Medium, or Low.
   - **Status** -- The decision lifecycle state: Accepted, Proposed, Deprecated, or Superseded.
   - **Author** -- The individual or team responsible for the decision.
   - **Tags** -- Comma-separated labels for cross-referencing (e.g., `kafka, scalability`).
3. Submit the form. The new record appears at the top of the decision stream.

### Searching and Filtering

- Use the **search bar** in the top navigation to find records by title, description, tag, or author.
- Use the **category** and **impact** dropdown filters in the decision stream header to narrow results.
- Use the **sort controls** to order by newest, oldest, or active-only records.

### Managing Records

- **Toggle Status** -- Click the toggle control on any decision card to mark it as active or inactive.
- **Delete** -- Remove a record permanently from the local ledger.
- **Expand** -- View the full decision detail including alternatives, pros, and cons.

---

## Export Formats

### Markdown

The Markdown export generates an ADR-formatted document for each decision, including metadata fields (status, driver, date, category, impact, tags), context, decision outcome, alternatives, and trade-offs. Use "Copy .md" to copy to clipboard or "Export .md" to download as a file.

### JSON

The JSON export produces the complete decision array as a structured file, suitable for programmatic consumption, CI/CD integration, or migration to other tools.

---

## Theming

The application supports both dark and light themes. Toggle between modes using the theme button in the top navigation bar. The selected preference is persisted in local storage and applied on subsequent visits.

Theme tokens are defined as CSS custom properties in `src/styles/globals.css`, making it straightforward to customize the color palette.

---

## Deployment

### GitHub Pages

The Vite configuration includes `base: './'` for relative asset paths, making the production build compatible with GitHub Pages and other static hosting platforms.

```bash
npm run build
```

Deploy the contents of the `dist/` directory to your hosting provider.

### Other Static Hosts

The production build output is a set of static files with no server-side requirements. It can be deployed to any static file host including Netlify, Vercel, Cloudflare Pages, or AWS S3 + CloudFront.

---

## License

This project is provided as-is for internal team use. See the repository for any applicable license terms.
