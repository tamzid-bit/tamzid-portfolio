# Deploying tamzidrahman.in

Two pieces:
1. **The website** (folder `public/`) → Cloudflare Pages (free, fast, HTTPS).
2. **The content** → Sanity (free "Growth" tier is plenty).

The site works with built-in demo data immediately, so you can deploy **first**
and wire Sanity **after**. Do them in this order.

---

## Part 1 — Put the site on Cloudflare Pages

You don't need a build step. `public/` is plain static files.

### Option A — Direct upload (fastest, no GitHub)
1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name it `tamzid-portfolio`.
3. Drag the **contents of the `public/` folder** (index.html, styles.css, app.js, data.js) into the uploader. *(Upload the files inside `public/`, not the `public` folder itself.)*
4. **Deploy**. You get a live URL like `tamzid-portfolio.pages.dev`.

### Option B — GitHub (auto-deploys on every push — recommended long term)
1. Push this project to a GitHub repo.
2. Cloudflare → Pages → **Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `public`
4. **Save and Deploy**.

---

## Part 2 — Point tamzidrahman.in at it

You said the domain is one you know/own.

**If the domain's DNS is already on Cloudflare:**
1. In your Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `tamzidrahman.in`, then also add `www.tamzidrahman.in`.
3. Cloudflare adds the DNS records automatically. Done — SSL provisions in a few minutes.

**If the domain is registered elsewhere (GoDaddy, Namecheap, etc.):**
1. Add the site to Cloudflare first: Cloudflare dashboard → **Add a site** → `tamzidrahman.in` → Free plan.
2. Cloudflare shows you **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. At your registrar, replace the existing nameservers with those two. (Propagation: minutes to a few hours.)
4. Once the site is "Active" in Cloudflare, do the **Custom domains** step above.

Redirect apex ↔ www: Cloudflare Pages handles both automatically once both custom
domains are attached.

---

## Part 3 — Wire up Sanity (live, editable content)

### 3.1 Create the Studio
```bash
# in a terminal, from anywhere
npm create sanity@latest -- --template clean --create-project "Tamzid Portfolio" --dataset production
```
- Log in (Google/GitHub).
- When it finishes, note the **Project ID** it prints (also at <https://sanity.io/manage>).
- Replace the schema in the generated project with the files in **`sanity/schemaTypes/`**
  here (`genre.js`, `track.js`, `project.js`, `index.js`), and set the `projectId`
  in `sanity/sanity.config.js`.

### 3.2 Allow your website to read the data (CORS)
<https://sanity.io/manage> → your project → **API** → **CORS origins** → **Add**:
- `https://tamzidrahman.in`
- `https://www.tamzidrahman.in`
- `https://tamzid-portfolio.pages.dev`
- `http://localhost:4123` (for local testing)

Leave **"Allow credentials"** unchecked — reads are public, no token needed.

### 3.3 Run the Studio and add content
```bash
cd your-studio-folder
npm install
npm run dev        # opens http://localhost:3333
```
Add your **Genres** first (each needs a slug + hex colour), then **Tracks**
(reference a genre, tick Mix/Master/Produce), then **Projects**.
Publish each document.

Deploy the Studio so you can edit from anywhere:
```bash
npm run deploy     # gives you tamzid.sanity.studio
```

### 3.4 Flip the site to live data
In **`public/data.js`**, edit the top block:
```js
const SANITY = {
  projectId: 'YOUR_PROJECT_ID',   // <-- paste it here
  dataset: 'production',
  apiVersion: '2024-01-01',
  enabled: true,                  // <-- was false
};
```
Re-upload `data.js` (or push to GitHub). The site now reads from Sanity and falls
back to the demo data automatically if the API is ever unreachable.

---

## Maintenance cheat-sheet
- **Add a song/genre/project:** edit in Sanity Studio → Publish. Live in ~seconds (CDN cache).
- **Change a genre colour:** edit the genre's `color` field — the whole UI accent follows it.
- **Change site copy/design:** edit files in `public/`, re-upload or `git push`.
- **Nothing shows up?** Check CORS origins (3.2) and that `enabled: true`.
