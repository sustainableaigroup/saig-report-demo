# SAIG Quarto + Typst Report Template

A shared-source reporting system for Sustainable AI Group. Quarto renders the same report to a responsive HTML experience and a publication-quality Typst PDF.

## Included examples

- `index.qmd` — short design-system demonstration.
- `methodology.qmd` — long-report stress test based on the August 31, 2026 Closed AI Inference Emissions Methodology draft.

After GitHub Pages deploys:

- `.../index.html` / `.../index.pdf`
- `.../methodology.html` / `.../methodology.pdf`

## Design system

- **Inter** — headings.
- **DM Sans** — body text.
- **Source Serif 4** — editorial ledes, cover subtitles and executive callouts.
- **DM Mono** — metadata, technical labels, chapter eyebrows and utility navigation.

The HTML sidebar includes a minimal **Resources** group: Download PDF, Dashboard, GitHub and Reach out to SAIG. Edit the three link targets at the top of `report-polish.js` when creating a production report.

## Reusable report patterns

- Use a callout-important titled `Key finding` for an executive insight block:

  ```markdown
  ::: {.callout-important title="Key finding" icon=false}
  Your decision-relevant finding here.
  :::
  ```

- Level-1 sections automatically receive a small section eyebrow on web and PDF.
- HTML figure/table labels are branded automatically.
- PDF running headers resolve to the current top-level section.
- Wide tables are horizontally scrollable on small screens.

## Brand split

- `_brand.yml` — auto-detected base colors and typography only; intentionally no logo.
- `brand-html.yml` — HTML brand, including logo.
- `_brand-pdf.yml` — PDF brand, intentionally no automatic logo.
- `styles.scss` — web layout and responsive behavior.
- `typst/saig-header.typ` — PDF running header/footer and long-document typography.

## Render

```bash
quarto render
```

The existing GitHub Action renders all `.qmd` files and deploys `docs/` to GitHub Pages.
