# coolie-ui

A Vite + React + SCSS mock frontend designed to closely match the provided Figma screenshot.

## How to preview

### Locally
1. unzip and run `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

### StackBlitz
1. Upload the ZIP to StackBlitz (Create New -> Upload Project)
2. Run and preview

## Notes about pixel perfect
- This package includes high-fidelity SCSS and a phone mockup to match the Figma layout you shared.
- For **100% exact match**, replace the following with files from your Figma exports:
  - `/src/assets/logo.png` (SVG logo)
  - `/src/assets/favicon.png`
  - exact font files (or Google Font link) in `index.html`
  - precise color tokens (edit `src/styles/_variables.scss`)

If you'd like, I can next: (1) tweak styles further to match exact pixel values you prefer, or (2) include your exported SVGs and font files to achieve 100% fidelity.
