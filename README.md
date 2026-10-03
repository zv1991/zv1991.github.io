# Zurab Vashakidze — Academic Website

Personal academic website published with GitHub Pages at **https://zv1991.github.io/**.

This repository contains a static, client-side academic profile. There is no framework, package manager, build step, server application, database, analytics service, or backend API. GitHub Pages serves the files directly from the `main` branch.

The site currently presents research interests, selected publications, teaching information, academic profiles, institutional contact details, publication citation tools, and an interactive mathematical visual design.

---

## Current repository inventory

The repository currently contains **14 files**: six site/documentation files and eight files under `assets/`.

### Root files

| File | Purpose |
| --- | --- |
| `README.md` | This documentation: architecture, feature inventory, privacy/security notes, file descriptions, and maintenance guidance. |
| `index.html` | Main single-page website. Contains semantic page structure, academic content, publication metadata, contact information, structured Schema.org metadata, the Content Security Policy, the browser-time-zone coordinate table used by automatic solar theming, and references to all CSS/JavaScript/assets. |
| `styles.css` | All visual styling and responsive behavior. Covers the light/dark palettes, navigation, hero, publications, journal-cover cards, citation panels, teaching/profile/contact cards, mobile layout, command palette, interactive states, accessibility rules, and device breakpoints. |
| `script.js` | Main interface controller. Handles mobile navigation, publication search/filter/sort/view density, BibTeX panels and clipboard copying, email-copy actions, sharing, quick navigation, active-section tracking, scroll effects, back-to-top behavior, keyboard shortcuts, and UI feedback. |
| `geometry.js` | Dedicated canvas renderer for the live mathematical wireframe in the toolbar and hero. Keeps decorative animation separate from the main interaction code. |
| `solar-theme.js` | Automatic sunrise/sunset theme engine. Uses the browser's IANA time-zone identifier plus locally stored representative coordinates to estimate solar elevation without requesting geolocation permission or calling a network service. |

### Asset files

| File | Purpose |
| --- | --- |
| `assets/favicon.svg` | Small custom Z-shaped favicon used by the browser tab. |
| `assets/google-scholar.svg` | Self-hosted Google Scholar identity icon used in profile links. |
| `assets/orcid.svg` | Self-hosted ORCID icon used for the main ORCID profile and verified co-author ORCID links. |
| `assets/researchgate.svg` | Self-hosted ResearchGate identity icon. |
| `assets/arxiv.svg` | Self-hosted arXiv identity icon. |
| `assets/scopus.svg` | Self-hosted Scopus identity icon. |
| `assets/ug-official-logo.jpg` | Official University of Georgia logo copied from the university's own website and served locally by this repository. |
| `assets/tsu-official-logo.jpg` | Official Ivane Javakhishvili Tbilisi State University coat of arms copied from the university's own website and served locally by this repository. |

The previous placeholder university SVG marks were removed after the official logo files were retrieved.

---

## Page structure

`index.html` is a single-page document with these primary sections:

1. **Hero / top**
   - Name, position, research-interest summary, profile shortcuts, share control, and a compact profile card.
   - Interactive canvas geometry is rendered behind the hero by `geometry.js`.

2. **About**
   - A modest summary of research interests and recent areas of work.

3. **Research**
   - Numerical analysis of evolution equations.
   - Hyperbolic PDEs and nonlinear dynamics.
   - Spectral and polynomial methods.
   - Wave propagation.

4. **Publications**
   - Six selected publications are currently shown.
   - Four published journal papers have responsive journal-cover/identity cards.
   - Two recent arXiv preprints are displayed without journal covers.
   - Publication controls include search, year filtering, sorting, compact/comfortable views, DOI/arXiv links, citation panels, BibTeX copying, and MathSciNet/MR Lookup links.
   - Verified co-author ORCID profiles are linked through small ORCID icons.

5. **Teaching**
   - Calculus I.
   - Calculus II.
   - Precalculus.
   - Numerical Methods.
   - Software Packages in Mathematics (MATLAB).
   - Theory of Functions of Complex Variables.

6. **Academic profiles**
   - Google Scholar.
   - ORCID.
   - Scopus.
   - arXiv.
   - ResearchGate.
   - The University of Georgia staff profile.

7. **Contact**
   - University of Georgia and Tbilisi State University institutional email addresses.
   - Addresses are shown in obfuscated form in visible HTML.
   - Dedicated **Copy email** buttons place the standard address on the clipboard.
   - A non-interactive visual example of the Copy email control appears in the explanatory text.

---

## Main interface features

### Responsive design

The site is designed for desktop monitors, laptops, tablets, and phones.

Responsive rules adjust:

- navigation presentation;
- hero typography and spacing;
- research/profile/teaching grids;
- publication columns;
- journal-cover dimensions and stacking behavior;
- citation panels;
- contact cards;
- command-palette layout;
- button sizes and touch targets.

Published journal entries use fluid `clamp()`-based cover sizing. On narrow phones, the publication year, cover, and text stack vertically instead of competing for horizontal space.

### Live geometric header and hero

Two `<canvas>` elements are rendered by `geometry.js`:

- `#toolbar-mesh` — a fine wireframe behind the translucent toolbar;
- `#hero-mesh` — a larger triangulated/perspective mathematical surface in the hero.

The renderer:

- scales for device pixel ratio, capped for efficiency;
- reacts subtly to pointer position on fine-pointer devices;
- pauses or avoids continuous animation when appropriate;
- uses `IntersectionObserver` to reduce unnecessary rendering;
- respects `prefers-reduced-motion`.

The geometric implementation is original and is not copied from another website.

### Automatic day/night theme

Automatic solar theming is implemented by `solar-theme.js`.

The default behavior is:

1. Read the browser's IANA time-zone identifier with `Intl.DateTimeFormat().resolvedOptions().timeZone`.
2. Look up a representative latitude/longitude from `window.SOLAR_TZ_COORDS`, defined in `index.html`.
3. Calculate the Sun's approximate elevation locally in JavaScript.
4. Use light mode while the calculated solar altitude is above approximately **−0.833°**, and dark mode after it falls below that horizon threshold.
5. Recalculate once per minute while the page remains open.

If a time zone is not in the coordinate table, the site falls back to local civil time: approximately 06:30–18:30 is treated as daytime.

Important privacy properties:

- no `navigator.geolocation`;
- no GPS/browser location prompt;
- no IP-geolocation API;
- no network request is required for theme calculation.

The theme button remains available as a **temporary per-tab override**. Manual override state is stored in `sessionStorage` under `themeOverride`. Returning to automatic mode clears that session override.

### Publication discovery and display

`script.js` provides:

- free-text publication search;
- automatically generated year-filter buttons;
- live visible-publication count;
- clear-filter control;
- sorting by newest, oldest, or title;
- compact/comfortable display modes.

The selected sort order is stored in `localStorage` as `publicationSort`.

The compact/comfortable preference is stored in `localStorage` as `publicationCompact`.

### Citation and BibTeX tools

Each publication has a **Cite** control.

Opening it reveals:

- a BibTeX block;
- a **Copy BibTeX** button;
- a MathSciNet/MR Lookup link.

Journal articles use journal/DOI metadata. Recent preprints without a confirmed MathSciNet journal record are explicitly represented as arXiv fallbacks rather than being presented as indexed journal records.

Clipboard copying uses the modern Clipboard API when possible and includes fallback copy methods for browsers where that API is unavailable.

### ORCID links

Small ORCID icons appear beside co-authors whose ORCID identity was reliably verified.

The icon itself is the link, so selecting it opens the co-author's ORCID profile in a new tab.

Where an ORCID could not be confidently matched, no ORCID link is shown rather than risking an incorrect identity.

### Quick navigation / command palette

The **Quick find** control opens a searchable command palette.

Keyboard shortcut:

- **Ctrl+K** on Windows/Linux;
- **Cmd+K** on macOS.

The palette can search:

- major page sections;
- publication titles;
- authors;
- publication years.

Within the palette:

- Up/Down arrows move through results;
- Enter opens the highlighted result;
- Escape closes the palette.

The regular publication search can also be focused with the **/** key when the user is not already typing in an input.

### Scroll and navigation feedback

The site includes:

- active navigation highlighting based on the section in view;
- a thin scroll-progress indicator;
- subtle reveal transitions;
- card hover interactions on pointer-capable devices;
- a floating back-to-top button after sufficient scrolling.

Motion-sensitive users are supported through `prefers-reduced-motion`.

### Sharing

The **Share profile** button uses the Web Share API on compatible devices. If native sharing is unavailable, it falls back to copying the profile URL to the clipboard.

### Email privacy and copying

Visible email addresses are intentionally obfuscated:

- `z[dot]vashakidze[at]ug[dot]edu[dot]ge`
- `zurab[dot]vashakidze[at]tsu[dot]ge`

The standard addresses are reconstructed in JavaScript only when the visitor activates the corresponding **Copy email** button.

This provides a modest reduction in simple HTML email harvesting while still making the addresses convenient for visitors.

---

## Privacy and browser-permission design

The site is intentionally designed to avoid asking visitors for permissions.

It does **not** use:

- geolocation;
- camera;
- microphone;
- notifications;
- Bluetooth;
- USB;
- local-network device discovery;
- WebRTC peer discovery;
- WebSockets;
- service workers;
- analytics trackers;
- advertising scripts;
- background `fetch()`/XHR requests.

The page currently self-hosts all images/icons required at load time.

External URLs such as ORCID, DOI, arXiv, Google Scholar, publishers, MathSciNet, ResearchGate, Scopus, and university profile pages are ordinary links opened only when the visitor chooses them.

### Content Security Policy

`index.html` defines a restrictive Content Security Policy:

```text
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
connect-src 'none';
font-src 'self' data:;
media-src 'none';
object-src 'none';
frame-src 'none';
worker-src 'none';
manifest-src 'self';
base-uri 'self';
form-action 'none';
```

Of particular importance, `connect-src 'none'` prevents the page from initiating background network connections through mechanisms governed by that directive.

The policy still allows normal visitor-initiated navigation to external academic/profile links.

All current `target="_blank"` links use `rel="noopener"`.

---

## Academic metadata and source links

The site contains Schema.org `Person` structured data with:

- name;
- job title;
- University of Georgia affiliation;
- academic profile URLs;
- research-topic keywords.

Public profile links include:

- Google Scholar;
- ResearchGate;
- arXiv;
- Scopus Author ID **57021771800**;
- ORCID **0000-0001-8736-6213**;
- University of Georgia staff profile.

Citation metrics are intentionally not hard-coded because they change over time and Google Scholar may restrict automated access.

Publication information should be checked against publisher pages, DOI records, arXiv, and MathSciNet/MR Lookup before future bibliographic changes are committed.

---

## File-by-file implementation notes

### `index.html`

This is the authoritative content file.

It contains:

- document metadata;
- viewport configuration;
- Content Security Policy;
- initial JavaScript capability marker;
- approximately 96 representative time-zone coordinate entries for solar theming;
- Schema.org JSON-LD;
- toolbar/navigation markup;
- hero content;
- About, Research, Publications, Teaching, Profiles, and Contact sections;
- all selected publication titles and BibTeX blocks;
- journal-cover card markup;
- verified co-author ORCID URLs;
- obfuscated contact addresses;
- command-palette dialog;
- script references.

When changing academic facts, publication details, teaching entries, profile links, or contact text, this is usually the first file to edit.

### `styles.css`

This file is intentionally comprehensive and currently about 55 KB.

It contains the original base design plus later responsive and feature-specific override sections added as the site evolved.

Important styling areas include:

- CSS custom properties for light/dark palettes;
- responsive containers and typography;
- toolbar/header alignment;
- mobile menu;
- hero/profile card;
- research and course cards;
- publication layout;
- journal-cover identity cards;
- citation controls;
- profile/institution icons;
- contact/email controls;
- command palette;
- scroll/reveal UI;
- live-geometry canvas placement;
- compact publication mode;
- co-author ORCID icons;
- accessibility/reduced-motion rules.

Because later CSS declarations override earlier ones, when modifying a component it is important to search the entire file for the selector and check the final applicable rule.

Known harmless legacy styling remains for the retired static geometry selectors `.header-geometry` and `.hero-geometry`. The live implementation now uses `.toolbar-mesh` and `.hero-mesh` canvases instead. A future cleanup pass could remove those older selectors after regression testing.

### `script.js`

This is the main behavior layer, currently about 22 KB.

Responsibilities include:

- mobile menu opening/closing;
- Escape-key behavior;
- command palette and keyboard navigation;
- publication search/year filters;
- publication sorting;
- compact/comfortable view;
- BibTeX expand/collapse;
- BibTeX clipboard copying;
- robust email copying;
- Web Share / copy-link fallback;
- active-section navigation;
- reveal observers;
- reading progress;
- back-to-top behavior;
- toast feedback.

Persistent settings:

- `publicationSort` in `localStorage`;
- `publicationCompact` in `localStorage`.

The automatic theme is no longer implemented here; `script.js` delegates theme state to `solar-theme.js`.

There is also some harmless legacy pointer/scroll code that updates the old `--geo-x`, `--geo-y`, and `--geo-scroll` CSS variables. The current canvas geometry is independently rendered by `geometry.js`, so these variables are no longer required by the live mesh. They may be removed in a future code-cleanup pass after visual regression testing.

### `geometry.js`

This file is dedicated to decorative mathematical animation.

It creates two independent meshes with different parameters:

- a shallow, fine toolbar mesh;
- a larger hero mesh with perspective and diagonal triangulation.

It handles:

- canvas sizing;
- DPR-aware rendering;
- animated sinusoidal displacement;
- pointer influence;
- line coloring by depth;
- triangular diagonal connections;
- visibility-based animation pausing;
- resize handling;
- reduced-motion behavior.

Keeping this code separate prevents decorative animation changes from affecting publication/search/contact behavior.

### `solar-theme.js`

This file controls automatic day/night mode.

It contains:

- a solar-altitude approximation;
- the −0.833° horizon threshold;
- time-zone lookup through `window.SOLAR_TZ_COORDS`;
- local-clock fallback;
- theme metadata updates;
- theme-button state/labels;
- temporary per-tab manual override;
- periodic one-minute recalculation.

It contains no network request and no geolocation call.

### Platform SVG assets

The five academic-platform SVG files are self-hosted identity icons:

- `google-scholar.svg`
- `orcid.svg`
- `researchgate.svg`
- `arxiv.svg`
- `scopus.svg`

They use small 24×24 SVG view boxes and are referenced directly by `index.html`.

### `assets/favicon.svg`

A small 64×64 custom favicon with a dark background and white Z-shaped mark.

### Official university JPG assets

`ug-official-logo.jpg` and `tsu-official-logo.jpg` are binary JPEG assets copied from the universities' official websites.

They replaced earlier hand-made placeholder SVG marks, which have been deleted.

They are served from the same GitHub Pages origin so visitors do not need to fetch the institutional logos from third-party domains during normal page loading.

---

## Cache-busting query strings

The page currently references versioned static files, for example:

- `styles.css?v=20261003-10`
- `solar-theme.js?v=20261003-1`
- `geometry.js?v=20261003-6`
- `script.js?v=20261003-11`

These query strings are used only to encourage browsers to fetch a new revision after significant updates.

When changing CSS or JavaScript and browser caching becomes a concern, increment the corresponding version string in `index.html`.

---

## Accessibility considerations

The site currently includes:

- semantic section headings;
- a skip-to-content link;
- keyboard-accessible controls;
- ARIA labels for icon-only/ambiguous controls;
- accessible navigation state;
- accessible command-palette dialog;
- `aria-live` feedback for publication counts and toast messages;
- visible keyboard focus states;
- reduced-motion support;
- mobile touch targets;
- alt/hidden treatment appropriate to decorative versus meaningful images.

When adding new interactive features, preserve keyboard access and avoid relying on hover alone.

---

## Deployment

The repository is public and uses `main` as its default branch.

The site is designed for GitHub Pages deployment directly from the repository root.

There is no compilation step. A normal deployment consists of committing the edited static files to `main`; GitHub Pages then publishes the updated content.

---

## Recommended maintenance workflow

When making future changes:

1. **Content changes** — edit `index.html`.
2. **Visual/layout changes** — edit `styles.css`; search for all occurrences of the relevant selector because the stylesheet has layered overrides.
3. **General interaction changes** — edit `script.js`.
4. **Wireframe/geometry changes** — edit `geometry.js`.
5. **Automatic solar-theme changes** — edit `solar-theme.js` and, if needed, the `SOLAR_TZ_COORDS` table in `index.html`.
6. **Brand/icon changes** — replace the corresponding self-hosted file under `assets/`.
7. **Publication updates** — update the visible record, DOI/arXiv links, BibTeX, journal-cover metadata, co-author ORCID links, and command-palette/search-visible text together.
8. **After JS/CSS changes** — consider incrementing the relevant cache-busting version in `index.html`.
9. **Before publishing** — verify desktop, tablet, mobile, light/day mode, dark/night mode, keyboard navigation, copy actions, citation panels, and outbound profile links.

---

## Notes on the development history

The current website is the result of iterative refinement. Major changes made during development include:

- initial GitHub Pages academic profile;
- justified typography and light/night theming;
- citation and BibTeX controls;
- responsive mobile navigation;
- academic-platform branding;
- institutional email/contact cards;
- dynamic publication search/filter/sort tools;
- command-palette navigation;
- geometric toolbar/hero redesign;
- responsive journal-cover cards;
- verified co-author ORCID links;
- automatic sunrise/sunset theming;
- removal of visitor-tracking/counter experiments;
- removal of external runtime image dependencies;
- restrictive CSP and permission-minimizing design;
- replacement of placeholder university marks with official self-hosted logos;
- cleanup of obsolete asset files.

The guiding design goals are now:

- academically professional rather than promotional;
- modest and welcoming in tone;
- responsive and keyboard-friendly;
- privacy-conscious;
- self-contained at page-load time;
- easy to host on GitHub Pages without a backend.
