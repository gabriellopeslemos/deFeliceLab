# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. Never open the browser to test withou asking.

## Project

Static marketing/recruitment site for the De Felice Lab (neurodegeneration research, Queen's University Kingston + UFRJ/IDOR Brazil). Plain HTML/CSS/JS — **no build step, no npm dependencies, no framework**. Pages: `index.html` (home), `study.html` (recruitment), `team.html` (people), `publications.html` (full pubs list).

## Running locally

The site **must be served over HTTP**, never opened as a `file://` URL — the hero's WebGL shader samples a texture image, and browsers taint the canvas under `file://` (hero falls back to a flat navy background instead of animating).

```bash
python -m http.server 8777
# or: npx serve -l 8777   /   php -S localhost:8777
```

Then open `http://localhost:8777/index.html`. Requires a WebGL-capable browser and (on first load) internet access for Google Fonts; everything else is local.

There is no test suite, linter, or build/bundle command in this repo — verify changes by loading pages in a browser.

## Copy / content tone

This is an academic research lab's site, not a startup landing page. Write and edit user-facing copy (in `assets/i18n.js`, EN and PT-BR alike) in a **professional, restrained register** — state what the lab does and what participation involves plainly. Avoid marketing/hype phrasing (e.g. superlatives, "shape the future of X", exclamation-driven CTAs, growth-hacky urgency). Prefer concrete, verifiable claims (methods, numbers, institutions) over aspirational framing. Note: some existing copy (e.g. the hero headline "Shape the Future of Neuroscience") predates this guideline and hasn't been rewritten — don't treat it as the style to match.

## Architecture

**i18n**: `assets/i18n.js` is a single hand-maintained EN/PT-BR dictionary (`translations.en` / `translations.pt`) applied at runtime. Elements opt in via `data-i18n="key"` (innerHTML swap) or `data-i18n-attr-<attrname>="key"` (attribute swap, e.g. `data-i18n-attr-alt`). Selected language persists in `localStorage` (`defelicelab-lang`) and is shared across all pages. **When adding any user-facing copy, add both an `en` and `pt` entry to the dictionary and reference it via `data-i18n*`** rather than hardcoding text in the HTML — every existing page follows this pattern.

**Publications pipeline**: `#pubs` on `index.html` and the full list on `publications.html` are populated client-side by `assets/pubs.js`, which fetches the static `assets/publications.json`. That JSON is *generated*, not hand-edited — it's produced by `scripts/fetch_orcid_publications.py`, which pulls works from the ORCID public API (Client Credentials Grant, read-only) for the ORCID iDs configured in `.env` (`ORCID_CLIENT_ID`/`ORCID_CLIENT_SECRET`/`ORCID_IDS`, see `.env.example`). Manual curation not available from ORCID (topic tag, full byline, "why it matters" note, citation count) lives in `scripts/publications-overrides.json`, keyed by lowercase DOI (or normalized lowercase title if no DOI), and gets merged in on each script run. After regenerating, **commit `assets/publications.json`** — there's no CI job that does this automatically.

```bash
python -m venv .venv && .venv\Scripts\activate
pip install -r scripts/requirements.txt
python scripts/fetch_orcid_publications.py
```

**Hero WebGL background**: lives inline in a `<script>` near the end of `index.html`'s `<body>` (not in `assets/`), styled by `.hero-canvas` / `.hero-scrim` in `assets/styles.css`. It renders a procedural fabric-ripple shader over `assets/logosDeFeliceLab/textureBackground.webp`. `assets/Hero Waves.dc.html` at the repo root is the original Claude-Design-Component source it was ported from — treat it as reference only, not live code. Respects `prefers-reduced-motion` (paints a single static frame instead of animating).

**`assets/support.js`**: a generated `dc-runtime` bundle (React-based component/template runtime from the Claude Design Component tooling). **It is not loaded by any page in this site** — it's leftover tooling infrastructure, not application logic. Don't treat it as part of the live site's behavior.

**Other JS modules** (`assets/`, all vanilla, no build step, loaded via `<script defer>`):
- `nav.js` — mobile nav toggle (hamburger, Escape-to-close, closes on resize past breakpoint).
- `team-reveal.js` — IntersectionObserver-based scroll-in stagger animation for `.reveal-card` elements on `team.html`, grouped/staggered per `.team-grid`; skips straight to visible when `prefers-reduced-motion` or no `IntersectionObserver` support.

**Images**: `scripts/optimize_images.py` is a one-off (not pipeline) Pillow script that resizes/re-encodes named team photos and funder logos to WebP at fixed max widths/quality. Run manually when adding new large source images; it is not invoked automatically.

**Styling**: single stylesheet `assets/styles.css`, organized as sequential commented sections (Header, Hero, Cycle/research pillars, Imaging split, Publications, Study section, …) — read the section comment headers rather than assuming a component-file split.
