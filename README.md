# Zurab Vashakidze — Academic Website

<p align="justify">Personal academic website published with GitHub Pages at <strong>https://zv1991.github.io/</strong>.</p>

<p align="justify">This repository contains a static, client-side academic profile. There is no framework, package manager, build step, server application, database, analytics service, or backend API. GitHub Pages serves the files directly from the `main` branch.</p>

<p align="justify">The site currently presents research interests, selected publications, teaching information, academic profiles, institutional contact details, publication citation tools, and an interactive mathematical visual design.</p>

---

## Current repository inventory

<p align="justify">The repository currently contains <strong>14 files</strong>: six site/documentation files and eight files under `assets/`.</p>

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

<p align="justify">The previous placeholder university SVG marks were removed after the official logo files were retrieved.</p>

---

## Page structure

<p align="justify">`index.html` is a single-page document with these primary sections:</p>

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
   - Eight selected publications are currently shown.
   - Six published journal papers have responsive journal-cover/identity cards.
   - Two recent arXiv preprints are displayed without journal covers.
   - The restored publication list includes the 2022 *Georgian Mathematical Journal* article **“On the convergence of a three-layer semi-discrete scheme for the nonlinear dynamic Kirchhoff string equation”**, 29(4), 615–627, DOI `10.1515/gmj-2022-2149`.
   - It also includes the 2020 article **“An Application of the Legendre Polynomials for the Numerical Solution of the Nonlinear Dynamical Kirchhoff String Equation”**, *Memoirs on Differential Equations and Mathematical Physics*, 79, 107–119.
   - Publication controls include search, year filtering, sorting, compact/comfortable views, DOI/arXiv/PDF links, citation panels, BibTeX copying, and MathSciNet/MR Lookup links.
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

<p align="justify">The site is designed for desktop monitors, laptops, tablets, and phones.</p>

<p align="justify">Responsive rules adjust:</p>

- navigation presentation;
- hero typography and spacing;
- research/profile/teaching grids;
- publication columns;
- journal-cover dimensions and stacking behavior;
- citation panels;
- contact cards;
- command-palette layout;
- button sizes and touch targets.

<p align="justify">Published journal entries use fluid `clamp()`-based cover sizing, with a final cross-platform safety layer that constrains every cover to its card, prevents mobile text inflation from changing the composition, and uses conservative fallbacks when newer CSS features are unavailable. On narrow phones, the publication year, cover, and text stack vertically instead of competing for horizontal space. Large desktop/TV viewports receive a modest cover-size increase while the same aspect ratio and text bounds are preserved.</p>

<p align="justify">Publication media are also constrained responsively: images, SVGs, video, and canvas elements cannot exceed their publication container, and wide tables are allowed to scroll horizontally on small screens rather than overflowing the viewport. These safeguards are intended to behave consistently on Android, iOS, tablets, laptops, and desktop displays.</p>

### Journal-cover treatments

<p align="justify">Published journal records use compact, responsive cover/identity cards designed to remain legible across device sizes.</p>

<p align="justify"><strong>Cross-platform compatibility:</strong> the final journal-cover layer is designed around rendered cover size rather than operating-system detection. This keeps the same HTML/CSS behavior on Android, iOS/iPadOS, Windows, macOS, Linux, and large-screen/Android TV browsers. All covers use bounded dimensions, explicit or controlled title lines, direct font resizing instead of transform-based scaling, and `-webkit-text-size-adjust`/`text-size-adjust` safeguards. Modern browsers use container-relative units where available; older or embedded browsers fall back to conservative fixed font sizes and explicit width/height values if `aspect-ratio` is unsupported.</p>

<p align="justify">Current cover treatments include:</p>

- **Numerical Methods for Partial Differential Equations** — Wiley-style journal identity card. The title is split into four controlled lines so its longest phrase cannot overflow on compact or embedded-browser layouts.
- **Georgian Mathematical Journal** — orange De Gruyter-inspired cover with the title fixed to three explicit lines: **Georgian / Mathematical / Journal**. The issue strip and title use cover-relative sizing so they remain inside the card in normal, compact, tablet, and phone layouts.
- **ZAMM — Journal of Applied Mathematics and Mechanics** — Wiley/GAMM identity card. Its long subtitle is split into three controlled lines with cover-relative sizing and conservative fallbacks.
- **Journal of Mathematical Analysis and Applications** — Elsevier-inspired binding-style card with responsive sizing and boundary-safe typography. On tablet widths, the long <strong>Mathematical Analysis</strong> line is split into two controlled lines so iPad and Android tablet browsers cannot clip it inside the narrow cover.
- **Memoirs on Differential Equations and Mathematical Physics** — dark blue journal identity card for the restored 2020 publication. The title uses four explicit display lines (**Differential / Equations and / Mathematical / Physics**) so narrow mobile browsers cannot choose an unsafe wrap. Cover-relative typography, anchored volume/year/ISSN metadata, and Compact/tablet/phone overrides keep all text within the cover across desktop, laptop, Android, and iOS layouts.

<p align="justify">The JMAA card uses separate title spans for <strong>“Journal of”</strong>, <strong>“Mathematical Analysis”</strong>, and <strong>“and Applications.”</strong> Because the text crosses both dark and pale cover regions, the final styling combines light and dark contrast treatments, including a light inner outline and darker outer halo/shadow. This keeps the title readable when portions of a word or line cross the simulated binding/background boundary. A later tablet-specific fix made the JMAA cover a CSS size container and split <strong>Mathematical Analysis</strong> into <strong>Mathematical</strong> and <strong>Analysis</strong> only at tablet/Compact widths; phones retain the wider two-line composition because their stacked publication layout provides a larger cover.</p>

<p align="justify">The Memoirs cover uses CSS container-query units so its typography follows the actual rendered cover width rather than the viewport alone. After mobile testing exposed clipping with automatic balanced wrapping, the journal title was changed to four explicit lines: <strong>Differential</strong>, <strong>Equations and</strong>, <strong>Mathematical</strong>, and <strong>Physics</strong>. The title span itself no longer clips its text, while the outer cover continues to hide only decorative overflow. Volume, year, and ISSN metadata remain anchored inside the cover, and dedicated Compact, tablet/small-laptop, phone, and very-narrow-phone rules preserve spacing and legibility.</p>

### Live geometric header and hero

<p align="justify">Two `<canvas>` elements are rendered by `geometry.js`:</p>

- `#toolbar-mesh` — a fine wireframe behind the translucent toolbar;
- `#hero-mesh` — a larger triangulated/perspective mathematical surface in the hero.

<p align="justify">The renderer:</p>

- scales for device pixel ratio, capped for efficiency;
- reacts subtly to pointer position on fine-pointer devices;
- pauses or avoids continuous animation when appropriate;
- uses `IntersectionObserver` to reduce unnecessary rendering;
- respects `prefers-reduced-motion`.

<p align="justify">The geometric implementation is original and is not copied from another website.</p>

### Automatic day/night theme

<p align="justify">Automatic solar theming is implemented by `solar-theme.js`.</p>

<p align="justify">The default behavior is:</p>

1. Read the browser's IANA time-zone identifier with `Intl.DateTimeFormat().resolvedOptions().timeZone`.
2. Look up a representative latitude/longitude from `window.SOLAR_TZ_COORDS`, defined in `index.html`.
3. Calculate the Sun's approximate elevation locally in JavaScript.
4. Use light mode while the calculated solar altitude is above approximately **−0.833°**, and dark mode after it falls below that horizon threshold.
5. Recalculate once per minute while the page remains open.

<p align="justify">If a time zone is not in the coordinate table, the site falls back to local civil time: approximately 06:30–18:30 is treated as daytime.</p>

<p align="justify">Important privacy properties:</p>

- no `navigator.geolocation`;
- no GPS/browser location prompt;
- no IP-geolocation API;
- no network request is required for theme calculation.

<p align="justify">The theme button remains available as a <strong>temporary per-tab override</strong>. Manual override state is stored in `sessionStorage` under `themeOverride`. Returning to automatic mode clears that session override.</p>

### Publication discovery and display

<p align="justify">`script.js` provides:</p>

- free-text publication search;
- automatically generated year-filter buttons;
- live visible-publication count;
- clear-filter control;
- sorting by newest, oldest, or title;
- compact/comfortable display modes.

<p align="justify">The selected sort order is stored in `localStorage` as `publicationSort`.</p>

<p align="justify">The compact/comfortable preference is stored in `localStorage` as `publicationCompact`.</p>

### Citation and BibTeX tools

<p align="justify">Each publication has a <strong>Cite</strong> control.</p>

<p align="justify">Opening it reveals:</p>

- a BibTeX block;
- a **Copy BibTeX** button;
- a MathSciNet/MR Lookup link.

<p align="justify">Journal articles use journal/DOI metadata. Recent preprints without a confirmed MathSciNet journal record are explicitly represented as arXiv fallbacks rather than being presented as indexed journal records.</p>

<p align="justify">Clipboard copying uses the modern Clipboard API when possible and includes fallback copy methods for browsers where that API is unavailable.</p>

### ORCID links

<p align="justify">Small ORCID icons appear beside co-authors whose ORCID identity was reliably verified.</p>

<p align="justify">The icon itself is the link, so selecting it opens the co-author's ORCID profile in a new tab.</p>

<p align="justify">Where an ORCID could not be confidently matched, no ORCID link is shown rather than risking an incorrect identity.</p>

### Quick navigation / command palette

<p align="justify">The <strong>Quick find</strong> control opens a searchable command palette.</p>

<p align="justify">Keyboard shortcut:</p>

- **Ctrl+K** on Windows/Linux;
- **Cmd+K** on macOS.

<p align="justify">The palette can search:</p>

- major page sections;
- publication titles;
- authors;
- publication years.

<p align="justify">Within the palette:</p>

- Up/Down arrows move through results;
- Enter opens the highlighted result;
- Escape closes the palette.

<p align="justify">The regular publication search can also be focused with the <strong>/</strong> key when the user is not already typing in an input.</p>

### Scroll and navigation feedback

<p align="justify">The site includes:</p>

- active navigation highlighting based on the section in view;
- a thin scroll-progress indicator;
- subtle reveal transitions;
- card hover interactions on pointer-capable devices;
- a floating back-to-top button after sufficient scrolling.

<p align="justify">Motion-sensitive users are supported through `prefers-reduced-motion`.</p>

### Sharing

<p align="justify">The <strong>Share profile</strong> button uses the Web Share API on compatible devices. If native sharing is unavailable, it falls back to copying the profile URL to the clipboard.</p>

### Email privacy and copying

<p align="justify">Visible email addresses are intentionally obfuscated:</p>

- `z[dot]vashakidze[at]ug[dot]edu[dot]ge`
- `zurab[dot]vashakidze[at]tsu[dot]ge`

<p align="justify">The standard addresses are reconstructed in JavaScript only when the visitor activates the corresponding <strong>Copy email</strong> button.</p>

<p align="justify">This provides a modest reduction in simple HTML email harvesting while still making the addresses convenient for visitors.</p>

---

## Privacy and browser-permission design

<p align="justify">The site is intentionally designed to avoid asking visitors for permissions.</p>

<p align="justify">It does <strong>not</strong> use:</p>

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

<p align="justify">The page currently self-hosts all images/icons required at load time.</p>

<p align="justify">External URLs such as ORCID, DOI, arXiv, Google Scholar, publishers, MathSciNet, ResearchGate, Scopus, and university profile pages are ordinary links opened only when the visitor chooses them.</p>

### Content Security Policy

<p align="justify">`index.html` defines a restrictive Content Security Policy:</p>

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

<p align="justify">Of particular importance, `connect-src 'none'` prevents the page from initiating background network connections through mechanisms governed by that directive.</p>

<p align="justify">The policy still allows normal visitor-initiated navigation to external academic/profile links.</p>

<p align="justify">All current `target="_blank"` links use `rel="noopener"`.</p>

---

## Academic metadata and source links

<p align="justify">The site contains Schema.org `Person` structured data with:</p>

- name;
- job title;
- University of Georgia affiliation;
- academic profile URLs;
- research-topic keywords.

<p align="justify">Public profile links include:</p>

- Google Scholar;
- ResearchGate;
- arXiv;
- Scopus Author ID **57021771800**;
- ORCID **0000-0001-8736-6213**;
- University of Georgia staff profile.

<p align="justify">Citation metrics are intentionally not hard-coded because they change over time and Google Scholar may restrict automated access.</p>

<p align="justify">Publication information should be checked against publisher pages, DOI records, arXiv, and MathSciNet/MR Lookup before future bibliographic changes are committed.</p>

---

## File-by-file implementation notes

### `index.html`

<p align="justify">This is the authoritative content file.</p>

<p align="justify">It contains:</p>

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

<p align="justify">When changing academic facts, publication details, teaching entries, profile links, or contact text, this is usually the first file to edit.</p>

### `styles.css`

<p align="justify">This file is intentionally comprehensive and layered; its size changes as responsive cover refinements and interface features are added.</p>

<p align="justify">It contains the original base design plus later responsive and feature-specific override sections added as the site evolved.</p>

<p align="justify">Important styling areas include:</p>

- CSS custom properties for light/dark palettes;
- responsive containers and typography;
- toolbar/header alignment;
- mobile menu;
- hero/profile card;
- research and course cards;
- publication layout;
- journal-cover identity cards, including GMJ, JMAA, ZAMM, NMPDE, and Memoirs-specific treatments;
- JMAA dual-contrast text outlines/halos for mixed light/dark cover regions;
- responsive publication images and horizontally scrollable tables on small screens;
- a final cross-platform journal-cover safety layer for Android, iOS/iPadOS, Windows, macOS, Linux, and large-screen/Android TV browsers;
- cover-relative typography with conservative fallbacks for browsers lacking container-query units or `aspect-ratio`;
- explicit controlled title/subtitle lines for NMPDE, GMJ, ZAMM, JMAA, and Memoirs where long text could otherwise depend on platform wrapping;
- citation controls;
- profile/institution icons;
- contact/email controls;
- command palette;
- scroll/reveal UI;
- live-geometry canvas placement;
- compact publication mode;
- co-author ORCID icons;
- accessibility/reduced-motion rules.

<p align="justify">Because later CSS declarations override earlier ones, when modifying a component it is important to search the entire file for the selector and check the final applicable rule.</p>

<p align="justify">Known harmless legacy styling remains for the retired static geometry selectors `.header-geometry` and `.hero-geometry`. The live implementation now uses `.toolbar-mesh` and `.hero-mesh` canvases instead. A future cleanup pass could remove those older selectors after regression testing.</p>

### `script.js`

<p align="justify">This is the main behavior layer, currently about 22 KB.</p>

<p align="justify">Responsibilities include:</p>

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

<p align="justify">Persistent settings:</p>

- `publicationSort` in `localStorage`;
- `publicationCompact` in `localStorage`.

<p align="justify">The automatic theme is no longer implemented here; `script.js` delegates theme state to `solar-theme.js`.</p>

<p align="justify">There is also some harmless legacy pointer/scroll code that updates the old `--geo-x`, `--geo-y`, and `--geo-scroll` CSS variables. The current canvas geometry is independently rendered by `geometry.js`, so these variables are no longer required by the live mesh. They may be removed in a future code-cleanup pass after visual regression testing.</p>

### `geometry.js`

<p align="justify">This file is dedicated to decorative mathematical animation.</p>

<p align="justify">It creates two independent meshes with different parameters:</p>

- a shallow, fine toolbar mesh;
- a larger hero mesh with perspective and diagonal triangulation.

<p align="justify">It handles:</p>

- canvas sizing;
- DPR-aware rendering;
- animated sinusoidal displacement;
- pointer influence;
- line coloring by depth;
- triangular diagonal connections;
- visibility-based animation pausing;
- resize handling;
- reduced-motion behavior.

<p align="justify">Keeping this code separate prevents decorative animation changes from affecting publication/search/contact behavior.</p>

### `solar-theme.js`

<p align="justify">This file controls automatic day/night mode.</p>

<p align="justify">It contains:</p>

- a solar-altitude approximation;
- the −0.833° horizon threshold;
- time-zone lookup through `window.SOLAR_TZ_COORDS`;
- local-clock fallback;
- theme metadata updates;
- theme-button state/labels;
- temporary per-tab manual override;
- periodic one-minute recalculation.

<p align="justify">It contains no network request and no geolocation call.</p>

### Platform SVG assets

<p align="justify">The five academic-platform SVG files are self-hosted identity icons:</p>

- `google-scholar.svg`
- `orcid.svg`
- `researchgate.svg`
- `arxiv.svg`
- `scopus.svg`

<p align="justify">They use small 24×24 SVG view boxes and are referenced directly by `index.html`.</p>

### `assets/favicon.svg`

<p align="justify">A small 64×64 custom favicon with a dark background and white Z-shaped mark.</p>

### Official university JPG assets

<p align="justify">`ug-official-logo.jpg` and `tsu-official-logo.jpg` are binary JPEG assets copied from the universities' official websites.</p>

<p align="justify">They replaced earlier hand-made placeholder SVG marks, which have been deleted.</p>

<p align="justify">They are served from the same GitHub Pages origin so visitors do not need to fetch the institutional logos from third-party domains during normal page loading.</p>

---

## Cache-busting query strings

<p align="justify">The page currently references versioned static files, for example:</p>

- `styles.css?v=20261004-23`
- `solar-theme.js?v=20261003-1`
- `geometry.js?v=20261003-6`
- `script.js?v=20261003-11`

<p align="justify">These query strings are used only to encourage browsers to fetch a new revision after significant updates.</p>

<p align="justify">When changing CSS or JavaScript and browser caching becomes a concern, increment the corresponding version string in `index.html`.</p>

---

## Accessibility considerations

<p align="justify">The site currently includes:</p>

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

<p align="justify">When adding new interactive features, preserve keyboard access and avoid relying on hover alone.</p>

---

## Deployment

<p align="justify">The repository is public and uses `main` as its default branch.</p>

<p align="justify">The site is designed for GitHub Pages deployment directly from the repository root.</p>

<p align="justify">There is no compilation step. A normal deployment consists of committing the edited static files to `main`; GitHub Pages then publishes the updated content.</p>

---

## Recommended maintenance workflow

<p align="justify">When making future changes:</p>

1. **Content changes** — edit `index.html`.
2. **Visual/layout changes** — edit `styles.css`; search for all occurrences of the relevant selector because the stylesheet has layered overrides.
3. **General interaction changes** — edit `script.js`.
4. **Wireframe/geometry changes** — edit `geometry.js`.
5. **Automatic solar-theme changes** — edit `solar-theme.js` and, if needed, the `SOLAR_TZ_COORDS` table in `index.html`.
6. **Brand/icon changes** — replace the corresponding self-hosted file under `assets/`.
7. **Publication updates** — update the visible record, DOI/arXiv/PDF links, BibTeX, journal-cover metadata, co-author ORCID links, and command-palette/search-visible text together. For journal-cover cards, verify the result in normal and Compact views at desktop, tablet, and phone widths.
8. **After JS/CSS changes** — consider incrementing the relevant cache-busting version in `index.html`.
9. **Before publishing** — verify desktop, laptop, tablet, mobile, and large-screen/TV layouts in both light/day and dark/night modes; check all journal-cover text at normal and Compact density, keyboard navigation, copy actions, citation panels, and outbound profile links.

---

## Notes on the development history

<p align="justify">The current website is the result of iterative refinement. Major changes made during development include:</p>

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
- restoration of the omitted 2022 *Georgian Mathematical Journal* and 2020 *Memoirs on Differential Equations and Mathematical Physics* records;
- iterative GMJ cover fitting so all cover text remains within bounds;
- JMAA cross-device cover refinement with dual light/dark contrast treatment for text crossing mixed backgrounds;
- JMAA tablet-specific clipping fix using cover-relative sizing and controlled line splitting for the long <strong>Mathematical Analysis</strong> title on iPad/Android tablet widths;
- repository-wide journal-cover compatibility pass covering Android, iOS/iPadOS, Windows, macOS, Linux, and Android TV/large-screen browsers, including controlled NMPDE/ZAMM line layouts, text-inflation safeguards, container-relative scaling, and older-browser fallbacks;
- publication-level responsive image/table safeguards for Android, iOS, tablet, laptop, and desktop layouts;
- Memoirs cover refinement with explicit four-line mobile-safe title layout, cover-relative text sizing, unclipped title rendering, anchored metadata, and dedicated Compact/tablet/phone safeguards;
- verified co-author ORCID links;
- automatic sunrise/sunset theming;
- removal of visitor-tracking/counter experiments;
- removal of external runtime image dependencies;
- restrictive CSP and permission-minimizing design;
- replacement of placeholder university marks with official self-hosted logos;
- cleanup of obsolete asset files.

<p align="justify">The guiding design goals are now:</p>

- academically professional rather than promotional;
- modest and welcoming in tone;
- responsive and keyboard-friendly;
- privacy-conscious;
- self-contained at page-load time;
- easy to host on GitHub Pages without a backend.
