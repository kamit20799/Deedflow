# DeedFlow Marketing Website

Static HTML export of the DeedFlow marketing site, ready to deploy on [Vercel](https://vercel.com) with zero configuration.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Features (Product) | `Features.html` |
| Compliance | `Compliance.html` |
| Pricing | `Pricing.html` |
| Partners (Channel partners) | `Partners.html` |
| Company (Company & Book a demo) | `Company.html` |
| Signup (Free trial) | `Signup.html` |

All pages are self-contained — images are embedded as base64 data URIs, so there are no external asset dependencies for the site to render.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Vercel will auto-detect it as a static site (no framework, no build step) — accept the defaults and deploy.
3. `index.html` is served at the root, and the other pages are reachable at their matching paths (e.g. `/Features.html`, `/Pricing.html`).

No environment variables or build commands are required.

## Repository contents

- **`index.html`, `Features.html`, `Compliance.html`, `Pricing.html`, `Partners.html`, `Company.html`, `Signup.html`** — the live site (light theme), served from the repo root. Internal navigation links were corrected to match these filenames (the original export's links pointed at nonexistent `*.dc.html` names).
- **`html-light/`, `html-dark/`** — the original static HTML snapshots for both themes, kept for reference/backup. Not routed as part of the live Vercel deployment.
- **`png-light/`, `png-dark/`** — full-page screenshots of each page, per theme.
- **`DeedFlow-website-light.pdf`, `DeedFlow-website-dark.pdf`** — all pages exported as full-length PDFs, per theme.
- **`logo/`** — the DeedFlow mark as SVG, for light and dark backgrounds.

## Notes

- This is a **static export** — interactive elements (sliders, toggles, form inputs) are visual only and don't carry real behavior or submit data anywhere.
- The live, fully interactive version of the design stays in the Claude design canvas it was built in.
- Demo content (emails, phone numbers, pricing figures) shown on the pages is placeholder/mock data only.
