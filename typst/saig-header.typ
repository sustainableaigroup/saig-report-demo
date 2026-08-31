#let saig-header = context [
  #set text(font: "DM Mono", size: 6.6pt, fill: rgb("#4F747D"))
  #grid(
    columns: (1fr, 1fr, 1fr),
    align(left)[Sustainable AI Group],
    align(center)[TECHNICAL REPORT DEMO],
    align(right)[Page #counter(page).display("1")]
  )
  #v(5pt)
  #line(length: 100%, stroke: 0.55pt + rgb("#E6ECED"))
]

#let saig-footer = context [
  #set text(font: "DM Mono", size: 5.9pt, fill: rgb("#819CA2"))
  Illustrative content - not a client analysis
]

#set page(
  header: saig-header,
  footer: saig-footer,
  numbering: none,
)

#set par(justify: false, leading: 0.72em)
