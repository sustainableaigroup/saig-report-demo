# SAIG Quarto + Typst Report Template

A reusable reporting system for Sustainable AI Group. One `index.qmd` source renders to:

- a responsive HTML report for GitHub Pages (`index.html`), and
- a publication-quality Typst PDF with a report-specific filename.

The template separates **report content** from **design/system files** so a new report should normally require replacing only `index.qmd` and any report-specific figures/assets.

## Recommended workflow

### 1. Write and collaborate in Google Docs

Use Google Docs for drafting, commenting, and review. Keep the document focused on content and structure rather than publication design.

Recommended conventions:

- Use actual **Heading 1 / Heading 2 / Heading 3** styles.
- Use normal Google Docs tables.
- Use normal Google Docs footnotes for explanatory notes.
- Use the equation editor or readable plain-text equations.
- Do **not** manually number figures, tables, or sections unless the number is substantively required.
- Put a figure caption directly below the figure using `Figure: ...`.
- Mark executive callouts as:

  ```text
  [KEY FINDING]

  Finding text here.
  ```

- For citations that still need to be converted to the bibliography, use a recognizable placeholder such as:

  ```text
  [CITE: Luccioni et al. 2024]
  ```

  Multiple sources can be separated with semicolons:

  ```text
  [CITE: Luccioni et al. 2024; Jegham et al. 2026]
  ```

Avoid manual spacing, tabs used for layout, text boxes, decorative page breaks, or other Google Docs formatting intended to control final page design. Quarto/Typst handles publication layout.

### 2. Export the Google Doc as Markdown

Export/download the working document as `.md`.

If Google Docs exports accompanying images into an assets folder, keep those files with the Markdown export and provide them together.

### 3. Give the Markdown source to ChatGPT for the publication pass

Upload:

1. the exported `.md`;
2. any images/figures that belong to the report;
3. `index.qmd` from this template if the latest template is not already available in the conversation; and
4. `references.bib` when an existing bibliography should be preserved or extended.

Use this prompt:

> Convert the attached Google Docs Markdown report into the SAIG Quarto + Typst report template.
>
> Use the current template `index.qmd` as the structural and design reference and return a complete replacement `index.qmd` ready to commit to GitHub.
>
> Preserve the report's substantive wording, technical meaning, section structure, tables, equations, citations, footnotes, and figures. This is a publication/formatting pass, not a substantive rewrite. If you identify a substantive issue, flag it separately rather than silently changing it.
>
> Clean Google Docs Markdown artifacts and convert the source into clean Quarto Markdown. In particular:
> - preserve the correct Heading 1 / 2 / 3 hierarchy;
> - convert citation placeholders into Quarto/Pandoc citations such as `[@key]` and update/create `references.bib` as needed;
> - convert equations into appropriate LaTeX/Quarto math;
> - convert Google Docs footnotes into valid Markdown/Quarto footnotes;
> - clean and format tables;
> - place figures cleanly with captions, labels, and cross-references where appropriate;
> - convert `[KEY FINDING]` blocks into the SAIG `callout-important` / `Key finding` component;
> - fix broken characters, duplicated numbering, malformed links, and export artifacts;
> - preserve or create internal cross-references where useful;
> - do not manually duplicate automatic Figure/Table numbering.
>
> Update the report metadata block at the top of `index.qmd` for this report: report type, title, expansion/long name if applicable, subtitle, authors, version, date, and the unique PDF `output-file`.
>
> Keep both formats enabled:
>
> ```yaml
> format:
>   html: default
>   typst:
>     output-file: "REPORT-SPECIFIC-FILENAME.pdf"
> ```
>
> Do not remove `html: default`; GitHub Pages requires the generated `index.html`.
>
> Make sure the web and PDF covers use the shared metadata variables already built into the template rather than hard-coding duplicate cover text. Make sure both Download PDF links resolve to the report-specific PDF filename.
>
> Unless a design change is specifically requested, do not modify `styles.scss`, `_quarto.yml`, `typst/saig-header.typ`, `report-polish.js`, or the brand files.
>
> Return the finished `index.qmd` and any updated supporting files that are actually required.

### 4. Replace the report source in GitHub

For a normal new report:

- replace the existing `index.qmd` with the finished `index.qmd`;
- add/replace report-specific figures or other assets;
- replace `references.bib` only if the publication pass changed it;
- leave the design/system files alone unless a template-wide design change is intended.

Commit/push to `main`. The existing GitHub Action runs `quarto render`, writes the output to `docs/`, and deploys it to GitHub Pages.

## Report-specific metadata: the one place to update

All cover content and the PDF filename are controlled in the YAML block at the top of `index.qmd`.

Example:

```yaml
---
pagetitle: "SAIG Technical Report"

# TEMPLATE: update only this block for each new report.
report:
  type: "TECHNICAL REPORT"
  title: "CLEER"
  expansion: "Closed-model Latent Energy Estimation Range"
  subtitle: "Estimating the energy use of closed AI model inference."
  authors: "Nidhal Jegham, Chan Young Koh, Sasha Luccioni"
  version: "CLEER-TEXT-0826"
  date: "29 SEPTEMBER 2026"

format:
  html: default
  typst:
    output-file: "CLEER-TEXT-0826.pdf"
---
```

The HTML and PDF covers both read from the `report:` values. The web Download PDF links read the Typst `output-file`.

For a new report, this top block is the only place report-specific cover text or the PDF filename should be hard-coded.

**Important:** keep `html: default`. If the document-level `format:` block contains only `typst`, Quarto will not generate `index.html`, and the GitHub Pages root URL will return a 404.

## Expected outputs

For the example above:

```text
index.qmd
   ↓ quarto render
docs/
├── index.html
├── CLEER-TEXT-0826.pdf
└── supporting site files
```

The source file stays named `index.qmd` so the web report stays at the clean GitHub Pages root URL. The PDF gets the unique report-specific filename.

## Template files

Files that normally stay unchanged from report to report:

- `_quarto.yml` — project-wide Quarto configuration and shared HTML/Typst defaults.
- `_brand.yml` — base SAIG colors and typography.
- `brand-html.yml` — HTML-specific brand settings, including logo behavior.
- `_brand-pdf.yml` — PDF-specific brand settings.
- `styles.scss` — web layout, cover styling, typography, responsive behavior, tables, callouts, and navigation.
- `typst/saig-header.typ` — PDF running header/footer and long-document typography.
- `report-polish.js` — HTML Resources links, PDF download behavior, section eyebrows, branded captions, and responsive table wrapping.
- `report-polish.html` — HTML include used by the web output.
- `.github/workflows/deploy.yml` — GitHub Action that renders and deploys the report.
- `assets/` — shared SAIG logo and design assets.

Files commonly changed for each report:

- `index.qmd`
- `references.bib` when citations change
- report-specific files inside `assets/`

## PDF filename and download links

`index.qmd` exposes the PDF filename to the web page:

```html
<script>
window.SAIG_REPORT_PDF = "{{< meta format.typst.output-file >}}";
</script>
```

The cover button uses the same metadata value directly, and `report-polish.js` uses `window.SAIG_REPORT_PDF` for the sidebar Download PDF link.

Do not reintroduce a second `currentPdf()` function in `report-polish.js`. There should be one definition:

```javascript
const currentPdf = () => window.SAIG_REPORT_PDF || "index.pdf";
```

## Production links

The HTML sidebar contains a **Resources** section:

- Download PDF
- Dashboard
- GitHub
- Reach out to SAIG

For a production report, update these targets near the top of `report-polish.js` when needed:

```javascript
const links = {
  dashboardUrl: "#",
  githubUrl: "https://github.com/bgamazay/saig-report-demo",
  contactUrl: "https://sustainableaigroup.com/"
};
```

The Download PDF URL should **not** be manually entered here; it comes from `index.qmd`.

## Reusable report patterns

Use a callout-important titled `Key finding` for an executive insight block:

```markdown
::: {.callout-important title="Key finding" icon=false}
Your decision-relevant finding here.
:::
```

The template also provides:

- automatic Level-1 section eyebrows on web and PDF;
- branded HTML figure/table labels;
- PDF running headers that resolve to the current top-level section;
- responsive horizontal scrolling for wide tables;
- hoverable citations and footnotes on web;
- one-click PDF download links that open in a new tab.

## Design system

- **Inter** — headings.
- **DM Sans** — body text.
- **Source Serif 4** — editorial ledes, cover subtitles, author line, and executive callouts.
- **DM Mono** — metadata, technical labels, section eyebrows, and utility navigation.

The current cover uses SAIG charcoal and Monarch Orange as the main text colors. The web and PDF covers share content but retain format-specific layout because the web cover is responsive while the PDF is fixed portrait.

## PDF header and footer

`typst/saig-header.typ` controls the running PDF header/footer.

For example, the footer can contain a clickable SAIG URL:

```typst
#let saig-footer = context [
  #set text(font: "DM Mono", size: 5.9pt, fill: rgb("#819CA2"))
  #link("https://sustainableaigroup.com/")[sustainableaigroup.com]
]
```

## Render

To render locally:

```bash
quarto render
```

In the normal GitHub workflow, no local rendering is required: pushing to `main` triggers the existing GitHub Action, which renders all `.qmd` files and deploys `docs/` to GitHub Pages.

## Pre-publish checklist

Before treating a report as final, verify:

- `index.qmd` is actually named `index.qmd`.
- `format` contains both `html: default` and `typst`.
- the Typst `output-file` is unique and ends in `.pdf`.
- cover title, subtitle, authors, version, and date are correct.
- both web Download PDF links open the correct PDF in a new tab.
- citations resolve and the References section renders correctly.
- all figure/table assets are committed to the repo.
- no Google Docs export artifacts remain.
- tables are readable in both HTML and PDF.
- equations render correctly in both formats.
- GitHub Actions completes successfully.
- the GitHub Pages root URL loads `index.html`.
- the final PDF filename is correct when downloaded.

## Included examples

The repository may also contain demonstration/stress-test `.qmd` files such as `methodology.qmd`. These are useful while developing the template, but a clean production report repository can remove them if they are no longer needed.

If they remain, Quarto will render them as additional pages/PDFs alongside `index.qmd`.
