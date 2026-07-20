# De Felice Lab — website

A static site (plain HTML/CSS/JS, no build step, no dependencies) for the De Felice Lab
research program. The hero section uses a WebGL fabric-ripple background rendered on a
`<canvas>`, sampling `assets/logosDeFeliceLab/textureBackground.png`.

## Running locally

The site **must be served over HTTP** — do not open `index.html` directly as a `file://`
URL. The hero's WebGL shader loads a texture image, and browsers block that texture read
under `file://` (the canvas becomes "tainted" and the hero falls back to a flat navy
colour). A local HTTP server fixes this.

Pick whichever you have installed. Run it from the project root (`E:\Repositorios\lab`):

### Python 3

```bash
python -m http.server 8777
```

### Node.js

```bash
npx serve -l 8777
# or
npx http-server -p 8777
```

### PHP

```bash
php -S localhost:8777
```

Then open:

```
http://localhost:8777/index.html
```

Other pages:

- `http://localhost:8777/study.html` — studies / recruitment page

## Requirements

- Any static file server (Python, Node, PHP, or similar) — see options above.
- A modern browser with **WebGL** enabled (Chrome, Edge, Firefox, Safari). Without WebGL,
  the hero gracefully falls back to a solid navy background.
- An internet connection on first load — fonts are pulled from Google Fonts. Everything
  else (styles, scripts, images) is local.

## Project structure

```
index.html                     Home page (hero, translational loop, publications, contact)
study.html                     Studies / recruitment page
assets/
  styles.css                   Full site stylesheet
  logoSemTexto.png             Header brand mark
  img/                         Imagery
  logosDeFeliceLab/
    textureBackground.png      Texture sampled by the hero WebGL shader
Hero Waves.dc.html             Original Claude Design component (reference source of the hero)
```

## Notes

- The hero WebGL background lives inline in `index.html` (a `<script>` before `</script>`
  near the end of the body) and is styled by the `.hero-canvas` / `.hero-scrim` rules in
  `assets/styles.css`. It was ported from `Hero Waves.dc.html`.
- Motion respects `prefers-reduced-motion`: with reduced motion enabled the hero paints a
  single static frame instead of the animated loop.
