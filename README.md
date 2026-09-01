# SAIG Quarto + Typst demo

This repository demonstrates a single-source technical report that renders to:

- `docs/index.html` — polished browser report with hoverable citations
- `docs/index.pdf` — Typst PDF generated from the same Quarto source

## Local build

1. Install Quarto.
2. Open Terminal in this repository.
3. Run:

```bash
quarto check
quarto render
```

Then open `docs/index.html` in a browser. The **Download PDF** button links to `docs/index.pdf`.

For live HTML editing:

```bash
quarto preview index.qmd --to html
```

When you want to refresh only the PDF:

```bash
quarto render index.qmd --to typst
```

Typst is bundled with Quarto; a separate Typst installation is not required.

## Where to edit things

- `index.qmd` — report content
- `references.bib` — bibliography
- `_brand.yml` — cross-format colors, fonts and logo
- `styles.scss` — web-specific visual design
- `typst/saig-header.typ` — PDF-specific page treatment
- `assets/` — logo, gradient and figures

## GitHub Pages

The included `.github/workflows/deploy.yml` renders both formats and deploys the `docs/` folder to GitHub Pages on every push to `main`.

After pushing the repository, go to **Settings → Pages → Build and deployment → Source → GitHub Actions**. The first successful workflow run will publish the report.

## Important

All numerical findings in this demo are illustrative placeholders. The cited sources are real and exist only to demonstrate citation handling and report structure.


## Brand split

- `_brand.yml`: auto-detected no-logo base brand.
- `brand-html.yml`: HTML brand including logo.
- `_brand-pdf.yml`: PDF brand with no automatic logo.
