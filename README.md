# Zurab Vashakidze — Academic Website

Personal academic website published with GitHub Pages at **https://zv1991.github.io/**.

The site presents research interests, selected publications, teaching information, academic profiles, institutional contact details, and publication citation tools in a responsive single-page layout.

## Main features

- Responsive layout for desktop, laptop, tablet, and mobile screens
- Light and dark themes with automatic sunrise/sunset switching
- Manual theme override for the current browser tab
- Interactive mathematical wireframe geometry in the toolbar and hero area
- Accessible mobile navigation
- Ctrl+K / Cmd+K quick-navigation palette
- Publication search and year filtering
- Publication sorting by newest, oldest, or title
- Compact and comfortable publication views
- Journal-cover treatments for published journal articles
- DOI, arXiv, and MathSciNet/MR Lookup links where applicable
- Expandable BibTeX citation panels with one-click copying
- ORCID links for co-authors where a reliable ORCID record could be verified
- Google Scholar, ORCID, Scopus, arXiv, ResearchGate, and institutional profile links
- Obfuscated institutional email addresses with buttons that copy the real address
- Scroll progress, active-section highlighting, subtle reveal effects, and a back-to-top control
- Structured Schema.org person metadata for search engines
- Reduced-motion support for accessibility

## Site structure

- `index.html` — page content, publication records, profile links, contact information, and structured metadata
- `styles.css` — responsive layout, themes, journal covers, controls, and visual styling
- `script.js` — navigation, publication filtering/sorting, citation controls, clipboard actions, command palette, sharing, and other page interactions
- `geometry.js` — interactive toolbar and hero wireframe geometry
- `solar-theme.js` — automatic day/night theme logic based on approximate local sunrise and sunset
- `assets/favicon.svg` — site favicon

## Automatic day/night mode

The default theme follows the visitor's approximate local sunrise and sunset.

The implementation:

- reads the browser's IANA time-zone identifier;
- uses a representative latitude and longitude for supported time zones;
- calculates the Sun's elevation locally in JavaScript;
- switches to light mode when the Sun is above the horizon and dark mode after sunset;
- refreshes the calculation periodically while the page remains open;
- falls back to local civil time when a time zone is not in the built-in coordinate table.

The site does **not** request GPS/geolocation permission and does not use an external IP-geolocation service for this feature.

A visitor may temporarily override the automatically selected theme for the current browser tab and return to automatic mode with the same theme control.

## Publications and citations

The selected-publications section supports:

- text search;
- year filters;
- sorting;
- compact/comfortable display modes;
- journal covers or journal-identity cards for published articles;
- DOI and arXiv links;
- expandable BibTeX entries;
- direct MathSciNet/MR Lookup links;
- copying BibTeX to the clipboard;
- ORCID icons linked to verified co-author profiles.

Where an ORCID could not be verified confidently, no ORCID link is shown rather than risking an incorrect researcher identity.

## Contact information

Institutional email addresses are displayed in an obfuscated form to reduce automated harvesting.

The **Copy email** buttons reconstruct and copy the standard email address to the visitor's clipboard. The unobfuscated addresses are not printed directly in the visible page markup.

## Profile sources

The website links to and summarizes public information from:

- Google Scholar
- ResearchGate
- arXiv
- Scopus Author ID 57021771800
- ORCID 0000-0001-8736-6213
- The University of Georgia staff profile

Publication metadata is also cross-checked against available publisher, DOI, arXiv, and MathSciNet/MR Lookup records where appropriate.

Citation metrics are intentionally not hard-coded because they change over time.

## Maintaining the site

For most content changes:

- edit `index.html` for biography, publications, teaching, profile links, and contact information;
- edit `styles.css` for visual or responsive changes;
- edit `script.js` for interface behavior;
- edit `geometry.js` for the mathematical wireframe animation;
- edit `solar-theme.js` or the time-zone coordinate table in `index.html` for automatic theme behavior.

Changes committed to the `main` branch are used by GitHub Pages for deployment.
