#!/usr/bin/env python3
"""Build the De Felice Lab static site from ``src/``.

Produces, from one set of English source pages:

* clean-URL English pages at ``/``, ``/study/``, ``/team/``, ``/publications/``
* Portuguese counterparts at ``/pt/``, ``/pt/study/``, ...
* reciprocal ``hreflang`` annotations on every page
* the publication list pre-rendered into the HTML (so it is indexable and
  visible without JavaScript) from ``assets/publications.json``
* ``.html`` redirect stubs at the pre-clean-URL paths

Run it after editing anything in ``src/``, ``scripts/i18n.json`` or
``assets/publications.json``::

    python scripts/build_site.py
"""

from __future__ import annotations

import html as html_mod
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# Absolute origin the site is served from. Used only for hreflang annotations
# today; canonical tags and the sitemap (see todoSEO.md) should reuse it.
# NOTE: confirm apex vs. www before relying on this in production.
BASE_URL = "https://defelicelab.com"

LANGS = {"en": "en", "pt": "pt-BR"}

# source file -> directory the clean URL lives in ("" means the site root)
PAGES = {
    "index.html": "",
    "study.html": "study/",
    "team.html": "team/",
    "publications.html": "publications/",
}

# how many publications each list renders; None means "all of them"
TAG_CLASS_COUNT = 3

VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "source", "track", "wbr",
}


# --------------------------------------------------------------------------
# tiny HTML helpers — enough to walk well-formed markup we control ourselves
# --------------------------------------------------------------------------

def end_of_tag(doc: str, start: int) -> int:
    """Index just past the ``>`` closing the tag that begins at ``start``."""
    quote = None
    i = start + 1
    while i < len(doc):
        char = doc[i]
        if quote:
            if char == quote:
                quote = None
        elif char in "\"'":
            quote = char
        elif char == ">":
            return i + 1
        i += 1
    raise ValueError(f"unterminated tag at offset {start}")


def inner_range(doc: str, start: int) -> tuple[int, int]:
    """Range of the element's inner HTML, for the tag opening at ``start``."""
    match = re.match(r"<([A-Za-z][A-Za-z0-9]*)", doc[start:])
    if not match:
        raise ValueError(f"no tag at offset {start}")
    tag = match.group(1)
    open_end = end_of_tag(doc, start)
    if tag.lower() in VOID_TAGS or doc[open_end - 2] == "/":
        return open_end, open_end

    pattern = re.compile(rf"<(/?){re.escape(tag)}(?=[\s/>])", re.IGNORECASE)
    depth = 1
    cursor = open_end
    while True:
        found = pattern.search(doc, cursor)
        if not found:
            raise ValueError(f"unclosed <{tag}> at offset {start}")
        depth += -1 if found.group(1) else 1
        if depth == 0:
            return open_end, found.start()
        cursor = end_of_tag(doc, found.start())


def tag_start(doc: str, offset: int) -> int:
    """Start of the opening tag whose attributes contain ``offset``."""
    start = doc.rfind("<", 0, offset)
    if start == -1:
        raise ValueError(f"no opening tag before offset {offset}")
    return start


def set_attribute(tag_html: str, attr: str, value: str) -> str:
    """Set ``attr`` on an opening tag, replacing it if already present."""
    escaped = html_mod.escape(value, quote=True)
    pattern = re.compile(rf"(\s{re.escape(attr)}=)\"[^\"]*\"", re.IGNORECASE)
    if pattern.search(tag_html):
        return pattern.sub(lambda m: m.group(1) + f'"{escaped}"', tag_html, count=1)
    closing = "/>" if tag_html.endswith("/>") else ">"
    return f'{tag_html[: -len(closing)]} {attr}="{escaped}"{closing}'


def drop_attribute(tag_html: str, attr: str) -> str:
    return re.sub(rf"\s{re.escape(attr)}=\"[^\"]*\"", "", tag_html, count=1)


# --------------------------------------------------------------------------
# translation
# --------------------------------------------------------------------------

def apply_translations(doc: str, strings: dict, page: str) -> str:
    """Resolve every ``data-i18n`` / ``data-i18n-attr-*`` marker in ``doc``.

    Markers are consumed as they are applied, which both terminates the loops
    and keeps the built output free of build-time scaffolding.
    """
    attr_marker = re.compile(r"\sdata-i18n-attr-([A-Za-z-]+)=\"([^\"]+)\"")
    while True:
        found = attr_marker.search(doc)
        if not found:
            break
        target_attr, key = found.group(1), found.group(2)
        start = tag_start(doc, found.start())
        end = end_of_tag(doc, start)
        tag_html = drop_attribute(doc[start:end], f"data-i18n-attr-{target_attr}")
        if key in strings:
            tag_html = set_attribute(tag_html, target_attr, strings[key])
        else:
            print(f"  ! {page}: unknown i18n key {key!r}")
        doc = doc[:start] + tag_html + doc[end:]

    text_marker = re.compile(r"\sdata-i18n=\"([^\"]+)\"")
    while True:
        found = text_marker.search(doc)
        if not found:
            break
        key = found.group(1)
        start = tag_start(doc, found.start())
        end = end_of_tag(doc, start)
        tag_html = drop_attribute(doc[start:end], "data-i18n")
        doc = doc[:start] + tag_html + doc[end:]
        if key not in strings:
            print(f"  ! {page}: unknown i18n key {key!r}")
            continue
        inner_start, inner_end = inner_range(doc, start)
        doc = doc[:inner_start] + strings[key] + doc[inner_end:]

    return doc


# --------------------------------------------------------------------------
# publications
# --------------------------------------------------------------------------

def publication_row(pub: dict, index: int) -> str:
    """One ``.pub-row``, matching the markup ``assets/pubs.js`` builds."""
    def text(value) -> str:
        return html_mod.escape("" if value is None else str(value))

    url = pub.get("url")
    attrs = f' href="{html_mod.escape(url or "#", quote=True)}"'
    if url:
        attrs += ' target="_blank" rel="noopener noreferrer"'

    body = []
    if pub.get("tag"):
        tag_class = f"pub-tag pub-tag--{(index % TAG_CLASS_COUNT) + 1}"
        body.append(f'<span class="{tag_class}">{text(pub["tag"])}</span>')
    body.append(f'<span class="pub-title">{text(pub.get("title"))}</span>')
    if pub.get("byline") or pub.get("journal"):
        parts = []
        if pub.get("byline"):
            parts.append(text(pub["byline"]) + (" · " if pub.get("journal") else ""))
        if pub.get("journal"):
            parts.append(f"<em>{text(pub['journal'])}</em>")
        body.append(f'<span class="pub-byline">{"".join(parts)}</span>')
    if pub.get("why"):
        body.append(f'<span class="pub-why">{text(pub["why"])}</span>')

    year = "" if pub.get("year") is None else text(pub["year"])
    return (
        f'<a class="pub-row"{attrs}>\n'
        f'          <span class="pub-year">{year}</span>\n'
        f'          <span>{"".join(body)}</span>\n'
        f'          <span class="pub-cites">{text(pub.get("cites") or "")}</span>\n'
        f"        </a>"
    )


def render_publications(doc: str, publications: list) -> str:
    """Replace each ``.pubs-list`` placeholder with pre-rendered rows."""
    ordered = sorted(publications, key=lambda p: -(p.get("year") or 0))
    marker = re.compile(r"<div class=\"pubs-list\"")
    cursor = 0
    while True:
        found = marker.search(doc, cursor)
        if not found:
            return doc
        start = found.start()
        open_end = end_of_tag(doc, start)
        limit = re.search(r'data-pubs-limit="(\d+)"', doc[start:open_end])
        shown = ordered[: int(limit.group(1))] if limit else ordered
        rows = "\n        ".join(
            publication_row(pub, i) for i, pub in enumerate(shown)
        )
        inner_start, inner_end = inner_range(doc, start)
        replacement = f"\n        {rows}\n      "
        doc = doc[:inner_start] + replacement + doc[inner_end:]
        cursor = inner_start + len(replacement)


# --------------------------------------------------------------------------
# links, hreflang, output
# --------------------------------------------------------------------------

def page_path(slug: str, lang: str) -> str:
    prefix = "/pt/" if lang == "pt" else "/"
    return prefix + slug


def localise_links(doc: str, lang: str) -> str:
    """Point site-internal links at the current language's URL space."""
    if lang == "en":
        return doc

    def repl(match: re.Match) -> str:
        target = match.group(1)
        if target.startswith("/assets/"):
            return match.group(0)
        return f'href="/pt{target}"'

    return re.sub(r'href="(/[^"]*)"', repl, doc)


def apply_language_switch(doc: str, slug: str, lang: str) -> str:
    """Fill the language toggle's placeholders and mark the current language."""
    doc = doc.replace("{{ALT_EN}}", page_path(slug, "en"))
    doc = doc.replace("{{ALT_PT}}", page_path(slug, "pt"))

    marker = re.compile(rf'<a class="lang-btn" data-lang="{lang}"')
    cursor = 0
    while True:
        found = marker.search(doc, cursor)
        if not found:
            return doc
        start, end = found.start(), end_of_tag(doc, found.start())
        tag_html = set_attribute(doc[start:end], "aria-current", "true")
        doc = doc[:start] + tag_html + doc[end:]
        cursor = start + len(tag_html)


def inject_hreflang(doc: str, slug: str) -> str:
    links = [
        f'<link rel="alternate" hreflang="en" href="{BASE_URL}{page_path(slug, "en")}">',
        f'<link rel="alternate" hreflang="pt-BR" href="{BASE_URL}{page_path(slug, "pt")}">',
        f'<link rel="alternate" hreflang="x-default" href="{BASE_URL}{page_path(slug, "en")}">',
    ]
    return doc.replace("</head>", "\n".join(links) + "\n</head>", 1)


def redirect_stub(target: str, title: str) -> str:
    """A no-JavaScript redirect from a legacy ``.html`` URL to its clean URL."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url={target}">
<link rel="canonical" href="{BASE_URL}{target}">
<title>{title} moved</title>
</head>
<body>
<p>This page has moved to <a href="{target}">{target}</a>.</p>
</body>
</html>
"""


def build() -> None:
    strings = json.loads((ROOT / "scripts" / "i18n.json").read_text(encoding="utf-8"))
    publications = json.loads(
        (ROOT / "assets" / "publications.json").read_text(encoding="utf-8")
    )
    print(f"{len(publications)} publications, {len(strings['en'])} strings per language")

    shutil.rmtree(ROOT / "pt", ignore_errors=True)

    for source, slug in PAGES.items():
        template = (SRC / source).read_text(encoding="utf-8")
        for lang, html_lang in LANGS.items():
            doc = template
            doc = re.sub(r'<html lang="[^"]*">', f'<html lang="{html_lang}">', doc, count=1)
            doc = localise_links(doc, lang)
            doc = apply_language_switch(doc, slug, lang)
            doc = apply_translations(doc, strings[lang], f"{source} [{lang}]")
            doc = render_publications(doc, publications)
            doc = inject_hreflang(doc, slug)

            out = ROOT / ("pt/" if lang == "pt" else "") / slug / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(doc, encoding="utf-8")
            print(f"  {out.relative_to(ROOT)}")

        if slug:
            legacy = ROOT / source
            legacy.write_text(
                redirect_stub(page_path(slug, "en"), source), encoding="utf-8"
            )
            print(f"  {legacy.relative_to(ROOT)} (redirect)")


if __name__ == "__main__":
    build()
