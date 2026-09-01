#let saig-current-section = context {
  let prior = query(selector(heading.where(level: 1)).before(here()))
  let upcoming = query(selector(heading.where(level: 1)).after(here()))
  let selected = none

  if upcoming.len() > 0 and upcoming.first().location().page() == here().page() {
    selected = upcoming.first()
  } else if prior.len() > 0 {
    selected = prior.last()
  }

  if selected == none {
    [TECHNICAL REPORT]
  } else {
    selected.body
  }
}

#let saig-header = context [
  #set text(font: "DM Mono", size: 6.5pt, fill: rgb("#4F747D"))
  #grid(
    columns: (1fr, 1.4fr, 1fr),
    align(left)[Sustainable AI Group],
    align(center)[#saig-current-section],
    align(right)[Page #counter(page).display("1")]
  )
  #v(5pt)
  #line(length: 100%, stroke: 0.55pt + rgb("#E6ECED"))
]

#let saig-footer = context [
  #set text(font: "DM Mono", size: 5.9pt, fill: rgb("#819CA2"))
  Sustainable AI Group
]

#set page(
  header: saig-header,
  footer: saig-footer,
  numbering: none,
)

#set par(justify: false, leading: 0.72em)

// Refined long-document typography.
#show figure.caption: set text(font: "DM Sans", size: 8.6pt, fill: rgb("#5D7076"))
#show table: it => block(above: 7pt, below: 10pt)[
  #set text(font: "DM Sans", size: 8.8pt)
  #it
]
