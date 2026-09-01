(function () {
  "use strict";

  const PUBLICATIONS_URL = "assets/publications.json";
  const TAG_CLASS_COUNT = 3;

  function t(key, fallback) {
    const value = window.deFeliceI18n && window.deFeliceI18n.t(key);
    return value !== undefined ? value : fallback;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Decodes HTML entities (e.g. "&amp;") that show up as literal text in
  // some ORCID-sourced fields, using a textarea so nothing is ever parsed as markup.
  function decodeEntities(str) {
    if (!str) return str;
    const box = document.createElement("textarea");
    box.innerHTML = str;
    return box.value;
  }

  function augment(pub) {
    return Object.assign({}, pub, {
      _title: decodeEntities(pub.title),
      _byline: decodeEntities(pub.byline),
      _journal: decodeEntities(pub.journal),
      _why: decodeEntities(pub.why),
      _tag: decodeEntities(pub.tag)
    });
  }

  function uniqueSorted(values, compare) {
    return Array.from(new Set(values)).sort(compare);
  }

  function buildRow(pub, index) {
    const row = el("a", "pub-row");
    row.href = pub.url || "#";
    if (pub.url) {
      row.target = "_blank";
      row.rel = "noopener noreferrer";
      row.classList.add("pub-row--external");
    }

    const yearWrap = el("span", "pub-year");
    if (pub.year != null) {
      const yearLabel = el("span", "sr-only", t("pubsYearSrLabel", "Year:") + " ");
      yearLabel.setAttribute("data-i18n", "pubsYearSrLabel");
      yearWrap.appendChild(yearLabel);
      yearWrap.appendChild(document.createTextNode(String(pub.year)));
    }
    row.appendChild(yearWrap);

    const body = document.createElement("span");

    if (pub._tag) {
      const tagClass = `pub-tag pub-tag--${(index % TAG_CLASS_COUNT) + 1}`;
      body.appendChild(el("span", tagClass, pub._tag));
    }

    body.appendChild(el("span", "pub-title", pub._title || ""));

    if (pub._byline || pub._journal) {
      const byline = el("span", "pub-byline");
      if (pub._byline) {
        byline.appendChild(document.createTextNode(pub._byline + (pub._journal ? " · " : "")));
      }
      if (pub._journal) {
        const em = document.createElement("em");
        em.textContent = pub._journal;
        byline.appendChild(em);
      }
      body.appendChild(byline);
    }

    if (pub._why) {
      body.appendChild(el("span", "pub-why", pub._why));
    }

    if (pub.url) {
      const opensNote = el("span", "sr-only", " " + t("pubsOpensNewTab", "Opens in a new tab."));
      opensNote.setAttribute("data-i18n", "pubsOpensNewTab");
      body.appendChild(opensNote);
    }

    row.appendChild(body);

    const citesWrap = el("span", "pub-cites");
    if (pub.cites) {
      const citesLabel = el("span", "sr-only", t("pubsCitesSrLabel", "Citations:") + " ");
      citesLabel.setAttribute("data-i18n", "pubsCitesSrLabel");
      citesWrap.appendChild(citesLabel);
      citesWrap.appendChild(document.createTextNode(String(pub.cites)));
    }
    row.appendChild(citesWrap);

    return row;
  }

  function renderEmpty(list, onClear) {
    list.innerHTML = "";
    const wrap = el("div", "pubs-empty");
    const msg = document.createElement("p");
    msg.setAttribute("data-i18n", "pubsEmptyFiltered");
    msg.textContent = t("pubsEmptyFiltered", "No publications match these filters.");
    wrap.appendChild(msg);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pubs-empty-clear";
    btn.setAttribute("data-i18n", "pubsFilterClear");
    btn.textContent = t("pubsFilterClear", "Clear filters");
    btn.addEventListener("click", onClear);
    wrap.appendChild(btn);
    list.appendChild(wrap);
  }

  function renderError(list, onRetry) {
    list.innerHTML = "";
    const wrap = el("div", "pubs-error");
    const msg = document.createElement("p");
    msg.setAttribute("data-i18n", "pubsError");
    msg.textContent = t("pubsError", "Could not load publications right now.");
    wrap.appendChild(msg);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pubs-error-retry";
    btn.setAttribute("data-i18n", "pubsErrorRetry");
    btn.textContent = t("pubsErrorRetry", "Try again");
    btn.addEventListener("click", onRetry);
    wrap.appendChild(btn);
    list.appendChild(wrap);
  }

  let filterInstanceCount = 0;

  // Builds the filter <fieldset>, inserted right before `list`. Each select
  // is only created when the dataset actually has at least one value for it,
  // so (for now) only Year and Journal appear — Topic will show up on its own
  // once scripts/publications-overrides.json starts tagging entries.
  function buildFilterBar(list, publications, onChange) {
    const instanceId = filterInstanceCount++;
    const filters = { year: "", journal: "", tag: "" };

    const fieldset = document.createElement("fieldset");
    fieldset.className = "pubs-filters";

    const legend = document.createElement("legend");
    legend.className = "sr-only";
    legend.setAttribute("data-i18n", "pubsFiltersLegend");
    legend.textContent = t("pubsFiltersLegend", "Filter publications");
    fieldset.appendChild(legend);

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "pubs-filter-clear";
    clearBtn.hidden = true;
    clearBtn.setAttribute("data-i18n", "pubsFilterClear");
    clearBtn.textContent = t("pubsFilterClear", "Clear filters");

    function updateClearVisibility() {
      clearBtn.hidden = !(filters.year || filters.journal || filters.tag);
    }

    const selects = {};

    function addSelect(key, labelKey, labelFallback, allKey, allFallback, values) {
      if (!values.length) return;
      const field = document.createElement("div");
      field.className = "pubs-filter-field";

      const id = `pubs-filter-${key}-${instanceId}`;
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.setAttribute("data-i18n", labelKey);
      label.textContent = t(labelKey, labelFallback);
      field.appendChild(label);

      const select = document.createElement("select");
      select.id = id;
      select.className = "pubs-filter-select";

      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.setAttribute("data-i18n", allKey);
      allOption.textContent = t(allKey, allFallback);
      select.appendChild(allOption);

      values.forEach((value) => {
        const option = document.createElement("option");
        option.value = String(value);
        option.textContent = String(value);
        select.appendChild(option);
      });

      select.addEventListener("change", () => {
        filters[key] = select.value;
        updateClearVisibility();
        onChange();
      });

      field.appendChild(select);
      fieldset.appendChild(field);
      selects[key] = select;
    }

    const years = uniqueSorted(
      publications.map((p) => p.year).filter((y) => y != null),
      (a, b) => b - a
    );
    const journals = uniqueSorted(
      publications.map((p) => p._journal).filter(Boolean),
      (a, b) => a.localeCompare(b)
    );
    const tags = uniqueSorted(
      publications.map((p) => p._tag).filter(Boolean),
      (a, b) => a.localeCompare(b)
    );

    addSelect("year", "pubsFilterYearLabel", "Year", "pubsFilterAllYears", "All years", years);
    addSelect("journal", "pubsFilterJournalLabel", "Journal", "pubsFilterAllJournals", "All journals", journals);
    addSelect("tag", "pubsFilterTagLabel", "Topic", "pubsFilterAllTags", "All topics", tags);

    function reset() {
      filters.year = "";
      filters.journal = "";
      filters.tag = "";
      Object.keys(selects).forEach((key) => { selects[key].value = ""; });
      updateClearVisibility();
      onChange();
    }
    clearBtn.addEventListener("click", reset);
    fieldset.appendChild(clearBtn);

    list.parentNode.insertBefore(fieldset, list);

    return { filters, reset };
  }

  function applyFilters(publications, filters) {
    return publications.filter((p) => {
      if (filters.year && String(p.year) !== filters.year) return false;
      if (filters.journal && p._journal !== filters.journal) return false;
      if (filters.tag && p._tag !== filters.tag) return false;
      return true;
    });
  }

  function setupList(list, publications) {
    const countEl = el("p", "pubs-results-count");
    countEl.setAttribute("aria-live", "polite");

    let refreshCount = null;
    document.addEventListener("click", (e) => {
      if (refreshCount && e.target.closest && e.target.closest(".lang-btn")) {
        setTimeout(refreshCount, 0);
      }
    });

    function renderList() {
      const filtered = applyFilters(publications, filterBar.filters);
      const sorted = filtered.slice().sort((a, b) => (b.year || 0) - (a.year || 0));
      const limit = parseInt(list.dataset.pubsLimit, 10);
      const shown = Number.isFinite(limit) ? sorted.slice(0, limit) : sorted;

      list.innerHTML = "";
      if (!shown.length) {
        renderEmpty(list, filterBar.reset);
      } else {
        shown.forEach((pub, index) => list.appendChild(buildRow(pub, index)));
      }

      const isFiltered = filtered.length !== publications.length;
      refreshCount = () => {
        const key = isFiltered ? "pubsResultsCountFiltered" : "pubsResultsCountAll";
        const fallback = isFiltered ? "{n} of {total} publications" : "{n} publications";
        countEl.textContent = t(key, fallback)
          .replace("{n}", String(shown.length))
          .replace("{total}", String(publications.length));
      };
      refreshCount();
    }

    const filterBar = buildFilterBar(list, publications, renderList);
    list.parentNode.insertBefore(countEl, list);
    renderList();
  }

  function load(list, isRetry) {
    if (isRetry) {
      list.innerHTML = "";
      const loading = el("p", "pubs-loading", t("pubsLoading", "Loading publications from ORCID…"));
      loading.setAttribute("data-i18n", "pubsLoading");
      list.appendChild(loading);
      const prevFilters = list.parentNode.querySelector(".pubs-filters");
      if (prevFilters) prevFilters.remove();
      const prevCount = list.parentNode.querySelector(".pubs-results-count");
      if (prevCount) prevCount.remove();
    }

    fetch(PUBLICATIONS_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`${PUBLICATIONS_URL} responded ${response.status}`);
        return response.json();
      })
      .then((publications) => {
        setupList(list, publications.map(augment));
      })
      .catch((error) => {
        console.warn("Could not load publications from ORCID data:", error);
        renderError(list, () => load(list, true));
      });
  }

  const lists = document.querySelectorAll(".pubs-list:not([data-pubs-static])");
  lists.forEach((list) => load(list, false));
})();
