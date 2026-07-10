# Deploying tamzidrahman.in

Three parts, do them in this order:

1. **Ship the site** to Cloudflare Pages (works immediately with the built-in catalog).
2. **Point the domain** tamzidrahman.in at it.
3. **Wire Sanity** so you can edit the catalog without touching code.

The site renders from the real catalog baked into `public/data.js` (83 tracks, 15
projects, 6 genres), so you can deploy first and move to Sanity whenever you like.

---

## Part 1 — Cloudflare Pages (git-connected, auto-deploys)

The repo is already on GitHub at `tamzid-bit/tamzid-portfolio`. Connect it once and
every `git push` to `main` redeploys automatically.

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick `tamzid-bit/tamzid-portfolio`.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty — no build step)*
   - **Build output directory:** `public`
4. **Save and Deploy** → you get `tamzid-portfolio.pages.dev`.

Every push to `main` now rebuilds. (The `public/_headers` file is applied automatically.)

*Prefer no GitHub?* Pages → **Upload assets** and drag the **contents of `public/`**
(not the folder itself). You'd re-upload on every change, so the git route is better.

---

## Part 2 — Point tamzidrahman.in at it

**If the domain's DNS is already on Cloudflare:**
1. Pages project → **Custom domains** → **Set up a custom domain**.
2. Add `tamzidrahman.in`, then add `www.tamzidrahman.in`.
3. Cloudflare adds the records; SSL provisions in a few minutes. Apex ↔ www is handled for you.

**If the domain is registered elsewhere (GoDaddy, Namecheap, etc.):**
1. Cloudflare dashboard → **Add a site** → `tamzidrahman.in` → Free plan.
2. Copy the **two nameservers** Cloudflare gives you.
3. At your registrar, replace the nameservers with those two (propagation: minutes–hours).
4. When the site shows **Active**, do the Custom domains step above.

---

## Part 3 — Sanity (editable catalog) with one-shot import

Your whole catalog is pre-packaged as `sanity/catalog.ndjson` — you import it in one
command, no retyping. Covers aren't imported: the site derives every thumbnail from the
YouTube link, so there are no images to upload.

### 3.1 Create the Studio
```bash
npm create sanity@latest -- --template clean --create-project "Tamzid Portfolio" --dataset production
```
Log in, and note the **Project ID** it prints (also at <https://sanity.io/manage>).
Then copy this repo's schema into the generated studio:
- replace its `schemaTypes/` with the four files from **`sanity/schemaTypes/`** here, and
- set `projectId` in the studio's `sanity.config.js`.

### 3.2 Import the catalog (all 104 documents)
From inside the studio folder:
```bash
npx sanity dataset import /path/to/tamzid-portfolio/sanity/catalog.ndjson production
```
That creates 6 genres, 83 tracks (linked to their genre), and 15 projects.
*Re-run later?* Add `--replace` to overwrite by id instead of erroring on duplicates.

> Regenerate the file after editing `public/data.js`:
> `pip install json5 && python3 sanity/scripts/build-ndjson.py`

### 3.3 Fix the two known data gaps in the Studio
```bash
npm run dev        # http://localhost:3333
```
- **Roles:** every track imported as `Mix, Master` (YouTube exposes no role data).
  Correct any that were Produce / mix-only.
- **Years:** these are YouTube *upload* years; a few ad years look like brand re-uploads
  (flagged in each doc's note). Adjust where needed.

Deploy the Studio so you can edit from anywhere:
```bash
npm run deploy     # → tamzid.sanity.studio
```

### 3.4 Let the site read Sanity (CORS)
<https://sanity.io/manage> → project → **API** → **CORS origins** → add (no credentials):
`https://tamzidrahman.in`, `https://www.tamzidrahman.in`,
`https://tamzid-portfolio.pages.dev`, `http://localhost:4123`.

### 3.5 Flip the site to live data
In **`public/data.js`**, top block:
```js
const SANITY = {
  projectId: 'YOUR_PROJECT_ID',   // paste it
  dataset: 'production',
  apiVersion: '2024-01-01',
  enabled: true,                  // was false
};
```
`git push` → Cloudflare redeploys → the site now reads Sanity and auto-falls-back to the
baked-in catalog if the API is ever unreachable.

---

## Booking integration (already live)
The **Book a session** section deep-links to your Space Cat module at
`https://spacecat.in/?engineer=Tamzid#booking` (Tamzid pre-selected). spacecat.in sends
`X-Frame-Options: DENY`, so it can't be iframed — the deep-link is by design and keeps all
bookings + payment on Space Cat. To change the URL/param, edit the `BOOKING` block at the
top of `public/app.js`.

## Maintenance cheat-sheet
- **Add/edit a track or project:** Sanity Studio → Publish (live in seconds), *or* edit
  `public/data.js` and `git push`.
- **Change a genre colour:** edit the genre's `color` — the whole UI accent follows it.
- **Nothing shows after enabling Sanity?** Check CORS (3.4) and `enabled: true`.
