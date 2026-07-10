#!/usr/bin/env python3
"""
Generate a Sanity import file (catalog.ndjson) from public/data.js.

Covers are intentionally NOT imported — the site derives each thumbnail from the
YouTube link, so there are no image assets to upload. Roles default to
['Mix','Master']; correct per-track in the Studio after import.

Usage:  python3 build-ndjson.py   (writes ../catalog.ndjson)
Requires: pip install json5
"""
import json, json5, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA_JS = HERE.parent.parent / "public" / "data.js"
OUT = HERE.parent / "catalog.ndjson"

src = DATA_JS.read_text(encoding="utf-8")

def extract_object(text, marker):
    """Return the {...} object literal after `marker`, ignoring braces/quotes
    that appear inside strings or // and /* */ comments."""
    i = text.index("{", text.index(marker))
    depth, j, n = 0, i, len(text)
    in_str, quote, esc = False, "", False
    while j < n:
        c = text[j]
        two = text[j:j + 2]
        if in_str:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == quote: in_str = False
        elif two == "//":
            j = text.index("\n", j) if "\n" in text[j:] else n
            continue
        elif two == "/*":
            j = text.index("*/", j) + 2
            continue
        elif c in "\"'`":
            in_str, quote = True, c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return text[i:j + 1]
        j += 1
    raise ValueError("unbalanced braces")

DEMO = json5.loads(extract_object(src, "const DEMO_DATA"))

def slug(s):
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", s.lower()))[:60]

docs = []
for i, g in enumerate(DEMO["genres"]):
    docs.append({"_id": f"genre-{g['slug']}", "_type": "genre", "title": g["title"],
                 "slug": {"_type": "slug", "current": g["slug"]},
                 "color": g["color"], "blurb": g.get("blurb", ""), "order": i})

for i, t in enumerate(DEMO["tracks"], 1):
    d = {"_id": f"track-{i}-{slug(t['title'])}"[:120], "_type": "track",
         "title": t["title"], "artist": t["artist"],
         "genre": {"_type": "reference", "_ref": f"genre-{t['genre']}"},
         "roles": t["roles"], "youtube": t.get("youtube", "")}
    if t.get("year") is not None:
        d["year"] = t["year"]
    docs.append(d)

for i, p in enumerate(DEMO["projects"], 1):
    d = {"_id": f"project-{i}-{slug(p['title'])}"[:120], "_type": "project",
         "type": p["type"], "title": p["title"]}
    for k in ("client", "role", "note", "link"):
        if p.get(k):
            d[k] = p[k]
    if p.get("year") is not None:
        d["year"] = p["year"]
    docs.append(d)

with OUT.open("w", encoding="utf-8") as f:
    for d in docs:
        f.write(json.dumps(d, ensure_ascii=False) + "\n")

print(f"wrote {OUT} — {len(docs)} docs "
      f"({len(DEMO['genres'])} genres, {len(DEMO['tracks'])} tracks, {len(DEMO['projects'])} projects)")
