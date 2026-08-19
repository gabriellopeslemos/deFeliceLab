(function () {
  "use strict";

  const PUBLICATIONS_URL = "assets/publications.json";
  const TAG_CLASS_COUNT = 3;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function buildRow(pub, index) {
    const row = el("a", "pub-row");
    row.href = pub.url || "#";
    if (pub.url) {
      row.target = "_blank";
      row.rel = "noopener noreferrer";
    }

    row.appendChild(el("span", "pub-year", pub.year != null ? String(pub.year) : ""));

    const body = document.createElement("span");

    if (pub.tag) {
      const tagClass = `pub-tag pub-tag--${(index % TAG_CLASS_COUNT) + 1}`;
      body.appendChild(el("span", tagClass, pub.tag));
    }

    body.appendChild(el("span", "pub-title", pub.title || ""));

    if (pub.byline || pub.journal) {
      const byline = el("span", "pub-byline");
      if (pub.byline) {
        byline.appendChild(document.createTextNode(pub.byline + (pub.journal ? " · " : "")));
      }
      if (pub.journal) {
        const em = document.createElement("em");
        em.textContent = pub.journal;
        byline.appendChild(em);
      }
      body.appendChild(byline);
    }

    if (pub.why) {
      body.appendChild(el("span", "pub-why", pub.why));
    }

    row.appendChild(body);
    row.appendChild(el("span", "pub-cites", pub.cites || ""));

    return row;
  }

  function render(list, publications) {
    const sorted = publications.slice().sort((a, b) => (b.year || 0) - (a.year || 0));
    const limit = parseInt(list.dataset.pubsLimit, 10);
    const shown = Number.isFinite(limit) ? sorted.slice(0, limit) : sorted;

    list.innerHTML = "";
    shown.forEach((pub, index) => {
      list.appendChild(buildRow(pub, index));
    });
  }

  const lists = document.querySelectorAll(".pubs-list");
  if (lists.length) {
    fetch(PUBLICATIONS_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`${PUBLICATIONS_URL} responded ${response.status}`);
        return response.json();
      })
      .then((publications) => {
        lists.forEach((list) => render(list, publications));
      })
      .catch((error) => {
        console.warn("Could not load publications from ORCID data:", error);
      });
  }
})();
