# Tamzid Rahman — Portfolio

A fast, no-build static site (deploys to Cloudflare Pages) with content in Sanity.
Rebuild of the Wix portfolio around a clearer, interaction-first design flow.

```
tamzid-portfolio/
├─ public/            ← the website (deploy this)
│  ├─ index.html
│  ├─ styles.css      ← design tokens + all styling
│  ├─ data.js         ← content source: DEMO_DATA + Sanity switch
│  └─ app.js          ← rendering, floating screens, ⌘K palette, motion
├─ sanity/            ← the CMS (schema + config)
│  └─ schemaTypes/    ← genre.js, track.js, project.js
├─ DEPLOY.md          ← step-by-step: Cloudflare + domain + Sanity
└─ README.md
```

## The design flow

The old site listed genres and works as flat pages. The rebuild makes the
**genre the entry point** and everything else a consequence of it.

1. **Hero** states who + what in one line, with live counts pulled from data.
2. **Work → genre grid.** Each tile is colour-coded and shows a live track count.
   Clicking a tile opens a **floating shelf** (right-side panel) listing every
   record in that genre — exactly the "click Pop, see all Pop songs" flow.
3. **Inside the shelf**, role filters (All / Mix / Master / Produce) narrow the
   list in place. The genre's colour themes the whole panel.
4. **Projects** (Netflix, Theatre, Ads, Content) use the same pattern: filter
   chips + cards that open a floating detail panel.
5. **⌘K command palette** indexes every section, genre and track so anything is
   two keystrokes away — the "advanced script" layer that ties it together.

## Motion principles (from your reference repos)

Following `design-motion-principles` (portfolio = expressive but disciplined) and
`impeccable`'s anti-slop rules:
- Transform/opacity only (GPU-friendly); no blur-on-everything, no hover-scale spam.
- One signature move per surface: shelf slides + track rows stagger once.
- `prefers-reduced-motion` fully honored — all motion collapses to instant.
- Colour carries meaning (per-genre accent), not decoration.

## Content model

`genre` (title, slug, **color**, blurb, order) · `track` (title, artist, →genre,
year, roles[], link) · `project` (type, title, client, year, role, note, link).
The genre `color` field drives the entire UI accent for that lane.

See **DEPLOY.md** for setup and going live.
