/* SAIG report web polish.
   Replace dashboardUrl / githubUrl here when a report is promoted from template to production. */

(() => {
  const links = {
    dashboardUrl: "#",
    githubUrl: "https://github.com/bgamazay/saig-report-demo",
    contactUrl: "https://sustainableaigroup.com/"
  };

  // PDF filename is supplied by index.qmd.
  // Falls back to index.pdf if no custom filename is provided.
  const currentPdf = () => window.SAIG_REPORT_PDF || "index.pdf";

  const addResources = () => {
    const toc =
      document.querySelector("#TOC") ||
      document.querySelector('nav[role="doc-toc"]');

    if (!toc || toc.querySelector(".saig-resource-nav")) return;

    const block = document.createElement("div");
    block.className = "saig-resource-nav";

    block.innerHTML = `
      <div class="saig-resource-title">Resources</div>
      <a
        class="saig-resource-link saig-resource-primary"
        href="${currentPdf()}"
        target="_blank"
        rel="noopener noreferrer"
      ><span aria-hidden="true">↓</span> Download PDF</a>
      <a
        class="saig-resource-link"
        href="${links.dashboardUrl}"
      ><span aria-hidden="true">↗</span> Dashboard</a>
      <a
        class="saig-resource-link"
        href="${links.githubUrl}"
        target="_blank"
        rel="noopener"
      ><span aria-hidden="true">↗</span> GitHub</a>
      <a
        class="saig-resource-link"
        href="${links.contactUrl}"
        target="_blank"
        rel="noopener"
      ><span aria-hidden="true">↗</span> Reach out to SAIG</a>
    `;

    toc.appendChild(block);
  };

  const addEyebrows = () => {
    let auto = 0;

    document
      .querySelectorAll("main.content section.level1 > h1")
      .forEach((heading) => {
        if (
          heading.closest(".saig-cover") ||
          heading.id === "references" ||
          heading.id === "refs"
        ) return;

        if (
          heading.previousElementSibling?.classList?.contains(
            "chapter-eyebrow"
          )
        ) return;

        const title = heading.textContent.trim();
        const numeric = title.match(/^(\d+)\.?\s/);
        const appendix = title.match(/^Appendix\s+([A-Z])\.?/i);

        let label;

        if (appendix) {
          label = `APPENDIX ${appendix[1].toUpperCase()}`;
        } else if (numeric) {
          label = `SECTION ${String(Number(numeric[1])).padStart(2, "0")}`;
        } else {
          auto += 1;
          label = `SECTION ${String(auto).padStart(2, "0")}`;
        }

        const eyebrow = document.createElement("div");
        eyebrow.className = "chapter-eyebrow";
        eyebrow.textContent = label;

        heading.parentNode.insertBefore(eyebrow, heading);
      });
  };

  const brandCaptions = () => {
    document
      .querySelectorAll("figcaption, table caption")
      .forEach((caption) => {
        if (caption.querySelector(".saig-caption-label")) return;

        const nodes = Array.from(caption.childNodes);
        const text = caption.textContent || "";
        const match = text.match(
          /^\s*((?:Figure|Table)\s+\d+[:.]?)/i
        );

        if (!match) return;

        let remaining = match[1].length;

        for (const node of nodes) {
          if (remaining <= 0) break;
          if (node.nodeType !== Node.TEXT_NODE) continue;

          const value = node.nodeValue || "";
          const take = Math.min(remaining, value.length);

          if (take <= 0) continue;

          const labelText = value.slice(0, take);
          const rest = value.slice(take);

          const span = document.createElement("span");
          span.className = "saig-caption-label";
          span.textContent = labelText.replace(/[:.]$/, "");

          node.parentNode.insertBefore(span, node);
          node.nodeValue = rest.replace(/^\s*[:.]?\s*/, " ");

          remaining -= take;
        }
      });
  };

  const wrapTables = () => {
    document
      .querySelectorAll("main.content table")
      .forEach((table) => {
        if (
          table.parentElement?.classList?.contains(
            "saig-table-scroll"
          )
        ) return;

        const wrapper = document.createElement("div");
        wrapper.className = "saig-table-scroll";

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
  };

  const init = () => {
    addResources();
    addEyebrows();
    brandCaptions();
    wrapTables();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
