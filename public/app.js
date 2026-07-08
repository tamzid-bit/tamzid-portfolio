/* ================================================================
   app.js — Tamzid Rahman portfolio
   ================================================================ */
(() => {
  const { SANITY, DEMO_DATA, GROQ } = window.PORTFOLIO;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let DATA = DEMO_DATA;

  /* -------- 1. load content (Sanity or demo) -------- */
  async function loadData() {
    if (!SANITY.enabled || !SANITY.projectId) return DEMO_DATA;
    const base = `https://${SANITY.projectId}.apicdn.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}`;
    const q = url => fetch(`${base}?query=${encodeURIComponent(url)}`).then(r => r.json()).then(r => r.result);
    try {
      const [genres, tracks, projects] = await Promise.all([q(GROQ.genres), q(GROQ.tracks), q(GROQ.projects)]);
      if (!genres?.length) throw new Error('empty');
      return { genres, tracks, projects };
    } catch (e) {
      console.warn('[portfolio] Sanity fetch failed, using demo data.', e);
      return DEMO_DATA;
    }
  }

  const tracksIn = slug => DATA.tracks.filter(t => t.genre === slug);

  /* -------- 2. render genre grid -------- */
  function renderGenres() {
    const grid = $('#genreGrid');
    grid.innerHTML = DATA.genres.map(g => {
      const n = tracksIn(g.slug).length;
      return `
        <button class="genre-tile" role="listitem" data-genre="${g.slug}"
                style="--c:${g.color}" aria-label="Open ${g.title} — ${n} tracks">
          <span class="genre-tile__dot"></span>
          <div>
            <h3 class="genre-tile__title">${g.title}</h3>
            <p class="genre-tile__blurb">${g.blurb}</p>
          </div>
          <span class="genre-tile__count"><b>${n}</b> track${n === 1 ? '' : 's'}
            <span class="genre-tile__go">→</span></span>
        </button>`;
    }).join('');
    $$('.genre-tile', grid).forEach(t =>
      t.addEventListener('click', () => openGenre(t.dataset.genre)));
  }

  /* -------- 3. floating screen: genre shelf -------- */
  const overlay = $('#overlay');
  const overlayPanel = $('#overlayPanel');
  const overlayBody = $('#overlayBody');
  let activeRole = 'All';
  let lastFocus = null;

  function openGenre(slug) {
    const g = DATA.genres.find(x => x.slug === slug);
    if (!g) return;
    activeRole = 'All';
    overlayPanel.style.setProperty('--c', g.color);
    paintGenre(g);
    openOverlay();
  }

  function paintGenre(g) {
    const all = tracksIn(g.slug);
    const roles = ['All', 'Mix', 'Master', 'Produce'];
    const rows = (activeRole === 'All' ? all : all.filter(t => t.roles.includes(activeRole)));
    overlayBody.innerHTML = `
      <header class="ov-head">
        <div class="ov-head__kicker"><span class="dot"></span> Mix &amp; Master · Genre</div>
        <h2 id="overlayTitle" class="ov-head__title">${g.title}</h2>
        <p class="ov-head__blurb">${g.blurb}</p>
      </header>
      <div class="ov-filters" role="group" aria-label="Filter by role">
        ${roles.map(r => `<button class="ov-filter ${r === activeRole ? 'is-active' : ''}" data-role="${r}">${r}</button>`).join('')}
      </div>
      <div class="ov-list">
        ${rows.length ? rows.map((t, i) => trackRow(t, i)).join('')
          : `<p class="ov-empty">No ${activeRole} credits in ${g.title} yet.</p>`}
      </div>`;
    $$('.ov-filter', overlayBody).forEach(b =>
      b.addEventListener('click', () => { activeRole = b.dataset.role; paintGenre(g); }));
  }

  function trackRow(t, i) {
    const roles = t.roles.map(r => `<span class="role-tag">${r}</span>`).join('');
    const yt = t.youtube
      ? `<a class="track__yt" href="${t.youtube}" target="_blank" rel="noopener" aria-label="Watch ${t.title} on YouTube" title="Watch on YouTube">
           <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>
         </a>`
      : '';
    return `
      <div class="track" style="animation-delay:${reduceMotion ? 0 : i * 45}ms">
        <span class="track__idx">${String(i + 1).padStart(2, '0')}</span>
        ${cover(t)}
        <div class="track__main">
          <div class="track__title">${t.title}</div>
          <div class="track__artist">${t.artist}</div>
        </div>
        <div class="track__roles">${roles}</div>
        <span class="track__year">${t.year}</span>
        ${yt}
      </div>`;
  }

  /* cover art: real image if provided, else a generated waveform cover */
  function cover(t) {
    if (t.cover) {
      return `<img class="track__cover" src="${t.cover}" alt="${t.title} cover art" loading="lazy" width="52" height="52" />`;
    }
    const g = DATA.genres.find(x => x.slug === t.genre) || { color: '#6c8cff' };
    const initials = t.title.replace(/[^A-Za-z0-9 ]/g, '').split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
    // deterministic little waveform from the title
    let seed = 0; for (const ch of t.title) seed = (seed * 31 + ch.charCodeAt(0)) & 0xffff;
    const bars = Array.from({ length: 9 }, (_, k) => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const h = 20 + (seed % 60);
      return `<rect x="${6 + k * 5}" y="${(80 - h) / 2}" width="3" height="${h}" rx="1.5" fill="rgba(255,255,255,.85)"/>`;
    }).join('');
    return `
      <span class="track__cover track__cover--gen" style="--c:${g.color}" aria-hidden="true">
        <svg viewBox="0 0 80 80" width="52" height="52">
          <rect width="80" height="80" rx="10" fill="url(#none)"/>
          ${bars}
        </svg>
        <b class="track__cover-ini">${initials}</b>
      </span>`;
  }

  /* -------- 4. floating screen: project detail -------- */
  function openProject(p) {
    overlayPanel.style.setProperty('--c', 'var(--accent)');
    const link = p.link
      ? `<a class="btn btn--primary" href="${p.link}" target="_blank" rel="noopener">Watch / listen ↗</a>`
      : `<span class="ov-empty" style="text-align:left;padding:0">Link coming soon.</span>`;
    overlayBody.innerHTML = `
      <header class="ov-head">
        <div class="ov-head__kicker"><span class="dot"></span> ${p.type}</div>
        <h2 id="overlayTitle" class="ov-head__title">${p.title}</h2>
        <p class="ov-head__blurb">${p.client} · ${p.year}</p>
      </header>
      <p style="color:var(--text-dim);max-width:44ch">${p.role}.${p.note ? ' ' + p.note : ''}</p>
      <div style="margin-top:26px">${link}</div>`;
    openOverlay();
  }

  /* -------- overlay open/close plumbing -------- */
  function openOverlay() {
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    setTimeout(() => $('.overlay__close').focus(), 60);
  }
  function closeOverlay() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    lastFocus?.focus?.();
  }
  $$('[data-close]', overlay).forEach(el => el.addEventListener('click', closeOverlay));

  /* -------- 5. projects grid + filters -------- */
  function renderProjects() {
    const types = ['All', ...new Set(DATA.projects.map(p => p.type))];
    const filters = $('#projectFilters');
    filters.innerHTML = types.map((t, i) =>
      `<button class="chip ${i === 0 ? 'is-active' : ''}" data-type="${t}" role="tab">${t}</button>`).join('');

    const grid = $('#projectGrid');
    grid.innerHTML = DATA.projects.map((p, i) => `
      <button class="project-card" role="listitem" data-type="${p.type}" data-i="${i}">
        <span class="project-card__type">${p.type}</span>
        <span class="project-card__title">${p.title}</span>
        <span class="project-card__meta">${p.client} · ${p.year}</span>
      </button>`).join('');

    $$('.project-card', grid).forEach(c =>
      c.addEventListener('click', () => openProject(DATA.projects[+c.dataset.i])));
    $$('.chip', filters).forEach(chip => chip.addEventListener('click', () => {
      $$('.chip', filters).forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const t = chip.dataset.type;
      $$('.project-card', grid).forEach(c =>
        c.classList.toggle('is-hidden', t !== 'All' && c.dataset.type !== t));
    }));
  }

  /* -------- 6. command palette (⌘K) -------- */
  const palette = $('#palette');
  const palInput = $('#paletteInput');
  const palList = $('#paletteList');
  let palItems = [], palIdx = 0;

  function buildPaletteIndex() {
    const items = [
      ...['work', 'projects', 'about', 'teaching', 'contact'].map(id => ({
        label: id[0].toUpperCase() + id.slice(1), kind: 'Section', action: () => scrollTo(`#${id}`),
      })),
      ...DATA.genres.map(g => ({
        label: g.title, kind: 'Genre', color: g.color, action: () => openGenre(g.slug),
      })),
      ...DATA.tracks.map(t => ({
        label: `${t.title} — ${t.artist}`, kind: 'Track', action: () => openGenre(t.genre),
      })),
    ];
    return items;
  }
  function openPalette() {
    palette.classList.add('is-open');
    palette.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    palInput.value = ''; filterPalette('');
    setTimeout(() => palInput.focus(), 40);
  }
  function closePalette() {
    palette.classList.remove('is-open');
    palette.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
  }
  function filterPalette(q) {
    const src = buildPaletteIndex();
    const term = q.trim().toLowerCase();
    palItems = term ? src.filter(i => i.label.toLowerCase().includes(term)) : src;
    palIdx = 0;
    palList.innerHTML = palItems.length
      ? palItems.map((it, i) => `
          <li class="palette__item ${i === 0 ? 'is-active' : ''}" role="option" data-i="${i}">
            ${it.color ? `<span class="swatch" style="background:${it.color}"></span>` : ''}
            <span>${it.label}</span><span class="k">${it.kind}</span>
          </li>`).join('')
      : `<li class="palette__empty">Nothing matches "${q}".</li>`;
    $$('.palette__item', palList).forEach(el => {
      el.addEventListener('mouseenter', () => setPalIdx(+el.dataset.i));
      el.addEventListener('click', () => runPal(+el.dataset.i));
    });
  }
  function setPalIdx(i) {
    palIdx = i;
    $$('.palette__item', palList).forEach((el, n) => el.classList.toggle('is-active', n === i));
  }
  function runPal(i) {
    const it = palItems[i]; if (!it) return;
    closePalette(); setTimeout(it.action, 120);
  }

  palInput.addEventListener('input', e => filterPalette(e.target.value));
  palInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setPalIdx(Math.min(palIdx + 1, palItems.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setPalIdx(Math.max(palIdx - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); runPal(palIdx); }
  });
  $('[data-palette-close]').addEventListener('click', closePalette);
  $('#openPalette').addEventListener('click', openPalette);

  /* -------- 7. global keys -------- */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
    if (e.key === 'Escape') { closeOverlay(); closePalette(); }
  });

  /* -------- 8. smooth in-page nav -------- */
  function scrollTo(sel) {
    const el = $(sel); if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  $$('[data-scroll-to]').forEach(b => b.addEventListener('click', () => scrollTo(b.dataset.scrollTo)));

  /* -------- 9. scroll chrome: rail + sticky nav + reveal -------- */
  const nav = $('#nav'), rail = $('#railFill');
  function onScroll() {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    rail.style.width = (p * 100).toFixed(2) + '%';
    nav.classList.toggle('is-stuck', h.scrollTop > 24);
  }
  addEventListener('scroll', onScroll, { passive: true });

  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      $$('[data-reveal]').forEach(el => el.classList.add('is-in')); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
  }

  /* -------- 10. boot -------- */
  async function boot() {
    $('#year').textContent = new Date().getFullYear();
    DATA = await loadData();
    $('#statTracks').textContent = DATA.tracks.length;
    $('#statGenres').textContent = DATA.genres.length;
    renderGenres();
    renderProjects();
    initReveal();
    onScroll();
  }
  boot();
})();
