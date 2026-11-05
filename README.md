# DeedFlow Marketing Website

Static site (no build step), ready to deploy on [Vercel](https://vercel.com) with zero configuration.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Features (Product) | `features.html` |
| Compliance | `compliance.html` |
| Pricing | `pricing.html` |
| Partners (Channel partners) | `partners.html` |
| Company (Company & Book a demo) | `company.html` |
| Signup (Free trial) | `signup.html` |

Each page's markup lives in a `<template id="tpl">` using `{{placeholders}}`, `<sc-for>` loops
and `<sc-if>` conditions. `js/<page>.js` holds that page's data and state; `js/runtime.js` is a
small (~8KB), dependency-free template runtime that renders the template and patches the DOM as
state changes — this is what powers the real tabs, FAQ accordions, calculators, multi-step signup
flow, and other interactive widgets. `css/style.css` holds shared styles, `css/<page>.css` holds
page-specific styles.

Fonts load from Google Fonts (Inter, JetBrains Mono). **Forms are front-end only** — the
Continue / Submit handlers in `js/company.js` and `js/signup.js` need to be wired to a real
backend before they'll actually submit anywhere.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Vercel will auto-detect it as a static site (no framework, no build step) — accept the defaults and deploy.
3. `index.html` is served at the root, and the other pages are reachable at their matching paths (e.g. `/features.html`, `/pricing.html`).

No environment variables or build commands are required.

## Repository contents

- **`index.html`, `features.html`, `compliance.html`, `pricing.html`, `partners.html`, `company.html`, `signup.html`** — the live, interactive site, served from the repo root.
- **`css/`** — shared and per-page styles.
- **`js/`** — the template runtime (`runtime.js`) plus each page's data/state/interaction logic.
- **`assets/`** — favicon and partner-integration logos used on the Home page.
- **`html-light/`, `html-dark/`** — an earlier non-interactive static HTML export (both themes), kept for reference/backup only. Not routed as part of the live Vercel deployment.
- **`png-light/`, `png-dark/`** — full-page screenshots of each page from that earlier export, per theme.
- **`DeedFlow-website-light.pdf`, `DeedFlow-website-dark.pdf`** — that earlier export's pages as full-length PDFs, per theme.
- **`logo/`** — the DeedFlow brand mark as SVG, for light and dark backgrounds.

## Notes

- Demo content (emails, phone numbers, pricing figures) shown on the pages is placeholder/mock data only.
- The `html-*`, `png-*`, PDF, and `logo/` assets predate this interactive build and are kept only as design reference — the live site is driven entirely by the root `.html` + `css/` + `js/` files above.
