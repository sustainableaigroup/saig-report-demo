# Verified PDF logo fix

## Root cause 1: repeated logo on every PDF page

Quarto automatically detects a root `_brand.yml`. The uploaded repo's `_brand.yml` contains `logo.medium` and `logo.large`. For Typst, Quarto implements the document logo as a top-left page background, so it repeats on every page.

The repo also had `format.typst.brand: _brand-pdf.yml`, but leaving an auto-detected root brand containing the logo makes the configuration unnecessarily ambiguous. This fix makes the root `_brand.yml` logo-free and moves the logo-bearing brand to `brand-html.yml`, which is explicitly loaded only by HTML.

## Root cause 2: clipped cover logo

The cover card had a fixed height of `0.78in` plus `inset: 10pt`. At `width: 2.28in`, the 1341x381 logo renders about 0.648in tall; adding 20pt of vertical inset requires about 0.926in. The fixed 0.78in card therefore clipped the logo. The fixed height has been removed so Typst sizes the card to its contents.

## Cleanup

There were two files named `saig-header.typ`:
- `/saig-header.typ` (unused)
- `/typst/saig-header.typ` (the one referenced by `_quarto.yml`)

The unused root copy is removed to prevent future edits to the wrong file.
