#!/usr/bin/env python3
"""Fetch publications for the lab's ORCID iD(s) and write assets/publications.json.

Usage:
    python scripts/fetch_orcid_publications.py

Requires a .env file at the repo root with ORCID_CLIENT_ID, ORCID_CLIENT_SECRET
and ORCID_IDS (see .env.example). See readme.md for the one-time ORCID app
registration steps.
"""

from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv
import os

REPO_ROOT = Path(__file__).resolve().parent.parent
TOKEN_CACHE_PATH = Path(__file__).resolve().parent / ".token_cache.json"
OVERRIDES_PATH = Path(__file__).resolve().parent / "publications-overrides.json"
OUTPUT_PATH = REPO_ROOT / "assets" / "publications.json"

TOKEN_URL = "https://orcid.org/oauth/token"
WORKS_URL_TEMPLATE = "https://pub.orcid.org/v3.0/{orcid_id}/works"
WORKS_BULK_URL_TEMPLATE = "https://pub.orcid.org/v3.0/{orcid_id}/works/{put_codes}"
WORKS_BULK_CHUNK_SIZE = 50  # ORCID API limit per bulk request
ORCID_ID_RE = re.compile(r"^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$")


def load_config() -> dict[str, Any]:
    load_dotenv(REPO_ROOT / ".env")

    client_id = os.environ.get("ORCID_CLIENT_ID", "").strip()
    client_secret = os.environ.get("ORCID_CLIENT_SECRET", "").strip()
    orcid_ids_raw = os.environ.get("ORCID_IDS", "").strip()

    missing = [
        name
        for name, value in (
            ("ORCID_CLIENT_ID", client_id),
            ("ORCID_CLIENT_SECRET", client_secret),
            ("ORCID_IDS", orcid_ids_raw),
        )
        if not value
    ]
    if missing:
        print(
            "Missing required config in .env: " + ", ".join(missing) + "\n"
            "Copy .env.example to .env and fill in your ORCID app credentials "
            "and ORCID iD(s). See readme.md for how to register an ORCID app.",
            file=sys.stderr,
        )
        sys.exit(1)

    orcid_ids = [oid.strip() for oid in orcid_ids_raw.split(",") if oid.strip()]
    invalid = [oid for oid in orcid_ids if not ORCID_ID_RE.match(oid)]
    if invalid:
        print(
            "ORCID_IDS contains invalid ORCID iD(s): " + ", ".join(invalid) + "\n"
            "Expected format: 0000-0000-0000-0000 (last character may be X).",
            file=sys.stderr,
        )
        sys.exit(1)

    return {
        "client_id": client_id,
        "client_secret": client_secret,
        "orcid_ids": orcid_ids,
    }


def get_access_token(client_id: str, client_secret: str) -> str:
    """Client Credentials Grant against the ORCID public API (read-only, no user OAuth)."""
    if TOKEN_CACHE_PATH.exists():
        try:
            cached = json.loads(TOKEN_CACHE_PATH.read_text(encoding="utf-8"))
            if cached.get("client_id") == client_id and cached.get("access_token"):
                return cached["access_token"]
        except (json.JSONDecodeError, OSError):
            pass

    response = requests.post(
        TOKEN_URL,
        headers={"Accept": "application/json"},
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "client_credentials",
            "scope": "/read-public",
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    access_token = payload["access_token"]

    TOKEN_CACHE_PATH.write_text(
        json.dumps({"client_id": client_id, "access_token": access_token}, indent=2),
        encoding="utf-8",
    )
    return access_token


def fetch_works_for_orcid(orcid_id: str, access_token: str) -> list[dict[str, Any]]:
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json",
    }

    response = requests.get(
        WORKS_URL_TEMPLATE.format(orcid_id=orcid_id),
        headers=headers,
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()

    summaries: list[dict[str, Any]] = []
    for group in payload.get("group", []):
        group_summaries = group.get("work-summary", [])
        if not group_summaries:
            continue
        # Each group can list the same work from multiple sources; take the first.
        summaries.append(group_summaries[0])

    put_codes = [s["put-code"] for s in summaries if s.get("put-code") is not None]
    full_works = fetch_full_works(orcid_id, put_codes, headers)

    entries: list[dict[str, Any]] = []
    for summary in summaries:
        full_work = full_works.get(summary.get("put-code"))
        entries.append(parse_work_summary(summary, full_work))
    return entries


def fetch_full_works(
    orcid_id: str, put_codes: list[int], headers: dict[str, str]
) -> dict[int, dict[str, Any]]:
    """Bulk-fetch full work records (needed for contributors/authors, absent from summaries)."""
    results: dict[int, dict[str, Any]] = {}
    for i in range(0, len(put_codes), WORKS_BULK_CHUNK_SIZE):
        chunk = put_codes[i : i + WORKS_BULK_CHUNK_SIZE]
        url = WORKS_BULK_URL_TEMPLATE.format(
            orcid_id=orcid_id, put_codes=",".join(str(c) for c in chunk)
        )
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        payload = response.json()
        for item in payload.get("bulk", []):
            work = item.get("work")
            if work and work.get("put-code") is not None:
                results[work["put-code"]] = work
    return results


def extract_authors(full_work: dict[str, Any] | None) -> list[str]:
    if not full_work:
        return []
    contributors = (full_work.get("contributors") or {}).get("contributor", [])
    authors = []
    for contributor in contributors:
        credit_name = (contributor.get("credit-name") or {}).get("value")
        if credit_name:
            authors.append(credit_name)
    return authors


def parse_work_summary(
    summary: dict[str, Any], full_work: dict[str, Any] | None = None
) -> dict[str, Any]:
    title = (
        summary.get("title", {}).get("title", {}).get("value")
        or "Untitled"
    )

    pub_date = summary.get("publication-date") or {}
    year_field = pub_date.get("year") or {}
    year = int(year_field["value"]) if year_field.get("value") else None

    journal = (summary.get("journal-title") or {}).get("value")

    doi = None
    url = (summary.get("url") or {}).get("value")
    for ext_id in (summary.get("external-ids") or {}).get("external-id", []):
        if ext_id.get("external-id-type") == "doi":
            doi = ext_id.get("external-id-value")
            ext_url = (ext_id.get("external-id-url") or {}).get("value")
            if ext_url:
                url = ext_url
            break

    if not url and doi:
        url = f"https://doi.org/{doi}"

    authors = extract_authors(full_work)

    return {
        "year": year,
        "title": title,
        "doi": doi,
        "journal": journal,
        "url": url,
        "authors": authors,
    }


def dedupe_and_sort(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen: dict[str, dict[str, Any]] = {}
    for entry in entries:
        key = (entry.get("doi") or normalize_title(entry["title"])).lower()
        if key not in seen:
            seen[key] = entry
    return sorted(
        seen.values(),
        key=lambda e: (e.get("year") or 0),
        reverse=True,
    )


def normalize_title(title: str) -> str:
    return re.sub(r"\s+", " ", title).strip().lower()


def load_overrides() -> dict[str, dict[str, Any]]:
    if not OVERRIDES_PATH.exists():
        return {}
    return json.loads(OVERRIDES_PATH.read_text(encoding="utf-8"))


def apply_overrides(
    entries: list[dict[str, Any]], overrides: dict[str, dict[str, Any]]
) -> list[dict[str, Any]]:
    merged = []
    for entry in entries:
        key = entry.get("doi") or normalize_title(entry["title"])
        override = overrides.get(key, {})
        default_byline = ", ".join(entry["authors"]) if entry["authors"] else None
        merged.append(
            {
                **entry,
                "tag": override.get("tag"),
                "byline": override.get("byline") or default_byline,
                "why": override.get("why"),
                "cites": override.get("cites"),
            }
        )
    return merged


def main() -> None:
    config = load_config()
    access_token = get_access_token(config["client_id"], config["client_secret"])

    all_entries: list[dict[str, Any]] = []
    for i, orcid_id in enumerate(config["orcid_ids"]):
        print(f"Fetching works for {orcid_id}...")
        all_entries.extend(fetch_works_for_orcid(orcid_id, access_token))
        if i < len(config["orcid_ids"]) - 1:
            time.sleep(0.5)

    deduped = dedupe_and_sort(all_entries)
    overrides = load_overrides()
    final_entries = apply_overrides(deduped, overrides)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(final_entries, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(final_entries)} publications to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
