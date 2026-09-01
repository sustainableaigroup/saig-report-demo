# Setup: SAIG Quarto + Typst report

## 1. Install Quarto

Install the latest stable Quarto release from https://quarto.org/docs/download/.

Typst support is included with Quarto. You do not need to install Typst separately.

Verify the install:

```bash
quarto check
```

## 2. Render the demo

From Terminal, move into this repository and render all configured formats:

```bash
cd /path/to/SAIG_Quarto_Typst_Demo
quarto render
```

The build creates:

```text
docs/index.html
docs/index.pdf
```

Open `docs/index.html` in a browser. Hover over citations to see reference popups and use the **Download PDF** control to open the Typst PDF.

## 3. Edit with live preview

For a browser preview that refreshes as you edit:

```bash
quarto preview index.qmd --to html
```

Refresh the PDF when needed:

```bash
quarto render index.qmd --to typst
```

Or regenerate both formats:

```bash
quarto render
```

## 4. Where things live

- `index.qmd` - report text, citations, equations, tables and figures
- `references.bib` - bibliography
- `_brand.yml` - SAIG cross-format colors, typography and logo
- `styles.scss` - HTML-specific design
- `typst/saig-header.typ` - PDF-specific page treatment
- `assets/` - SAIG logo/background and report graphics
- `.github/workflows/deploy.yml` - automatic GitHub Pages build/deploy

## 5. Put it on GitHub

Create an empty GitHub repository, then run from this folder:

```bash
git init
git add .
git commit -m "Initial SAIG Quarto report"
git branch -M main
git remote add origin https://github.com/YOUR-ORG/YOUR-REPO.git
git push -u origin main
```

In GitHub, open:

**Settings -> Pages -> Build and deployment -> Source -> GitHub Actions**

The included workflow will build the HTML and PDF and deploy the `docs/` artifact whenever you push to `main`.

## 6. Replace the boilerplate

For a real engagement, leave the infrastructure files alone at first and replace the content in `index.qmd`. Add sources to `references.bib` and cite them in prose with syntax such as:

```markdown
Data-centre electricity demand is an important part of AI impact assessment [@iea2025].
```

Quarto resolves the same citation into the HTML hover experience and the PDF bibliography.


## Brand split

- `_brand.yml`: auto-detected no-logo base brand.
- `brand-html.yml`: HTML brand including logo.
- `_brand-pdf.yml`: PDF brand with no automatic logo.
