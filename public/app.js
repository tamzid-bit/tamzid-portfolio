/* ================================================================
   app.js — Tamzid Rahman portfolio
   ================================================================ */
(() => {
  const { SANITY, DEMO_DATA, GROQ } = window.PORTFOLIO;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let DATA = DEMO_DATA;

  /* -------- 0. youtube helpers -------- */
  const ytId = url => {
    if (!url) return '';
    const m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{6,})/);
    return m ? m[1] : '';
  };
  const ytThumb = id => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;   // 16:9, always present
  const ytEmbed = id => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

  /* cover source for a track: explicit image, else YouTube thumbnail */
  const trackArt = t => t.cover || (ytId(t.youtube) ? ytThumb(ytId(t.youtube)) : '');

  /* -------- 2. render genre slider -------- */
  function renderGenreRail() {
    const rail = $('#genreRail');
    rail.innerHTML = DATA.genres.map(g => {
      const tracks = tracksIn(g.slug);
      const n = tracks.length;
      const arts = [...new Set(tracks.map(trackArt).filter(Boolean))].slice(0, 6);
      const layers = arts.length
        ? arts.map((src, i) => `<span class="art-layer${i === 0 ? ' is-on' : ''}" style="background-image:url('${src}')"></span>`).join('')
        : `<span class="art-layer art-layer--empty is-on"></span>`;
      return `
        <button class="genre-card" role="listitem" data-genre="${g.slug}" style="--c:${g.color}"
                aria-label="Open ${esc(g.title)} — ${n} tracks">
          <span class="genre-card__art">${layers}</span>
          <span class="genre-card__glow"></span>
          <span class="genre-card__body">
            <span class="genre-card__count"><b>${n}</b> track${n === 1 ? '' : 's'}</span>
            <span class="genre-card__title">${esc(g.title)}</span>
            <span class="genre-card__blurb">${esc(g.blurb)}</span>
            <span class="genre-card__cta">Open the lane <em>→</em></span>
          </span>
        </button>`;
    }).join('');
    $$('.genre-card', rail).forEach(c =>
      c.addEventListener('click', () => openGenre(c.dataset.genre)));
    startArtCycle(rail);
    initRail('#genreRail', '#railPrev', '#railNext');
  }

  /* crossfade each card's artwork collage (staggered so they don't flip in unison) */
  function startArtCycle(rail) {
    if (reduceMotion) return;
    $$('.genre-card__art', rail).forEach((art, ci) => {
      const layers = $$('.art-layer', art);
      if (layers.length < 2) return;
      let i = 0;
      setInterval(() => {
        layers[i].classList.remove('is-on');
        i = (i + 1) % layers.length;
        layers[i].classList.add('is-on');
      }, 2600 + ci * 190);
    });
  }

  /* hover-the-edges (and wheel / drag / swipe) horizontal scrolling — shared by both sliders */
  const railUpdaters = {};
  function initRail(railSel, prevSel, nextSel) {
    const rail = $(railSel);
    const prev = $(prevSel), next = $(nextSel);
    let raf = null, dir = 0;
    const tick = () => { rail.scrollLeft += dir * 13; updateEdges(); raf = requestAnimationFrame(tick); };
    const start = d => { if (reduceMotion) return; dir = d; if (!raf) raf = requestAnimationFrame(tick); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    const updateEdges = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      prev.classList.toggle('is-off', rail.scrollLeft <= 2);
      next.classList.toggle('is-off', rail.scrollLeft >= max);
    };
    prev.addEventListener('pointerenter', () => start(-1));
    next.addEventListener('pointerenter', () => start(1));
    [prev, next].forEach(b => { b.addEventListener('pointerleave', stop); b.addEventListener('pointerdown', stop); });
    prev.addEventListener('click', () => rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: 'smooth' }));
    rail.addEventListener('scroll', updateEdges, { passive: true });
    rail.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { rail.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });
    addEventListener('resize', updateEdges);
    updateEdges();
    railUpdaters[railSel] = updateEdges;
  }

  /* -------- 2b. hero collage: every artwork, drifting slowly -------- */
  function buildCollage() {
    const host = $('#heroCollage');
    if (!host) return;
    const ids = [
      ...DATA.tracks.map(t => ytId(t.youtube)),
      ...DATA.projects.map(p => ytId(p.link)),
    ].filter(Boolean);
    const arts = [...new Set(ids)].map(ytThumb);           // small tier: tiles render ~160px wide
    if (!arts.length) return;
    // deterministic shuffle so the collage looks mixed but stable across loads
    const hash = s => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) & 0xffff; return h; };
    arts.sort((a, b) => hash(a) - hash(b));
    const nCols = 6;
    const cols = Array.from({ length: nCols }, () => []);
    arts.forEach((u, i) => cols[i % nCols].push(u));
    host.innerHTML = cols.map((imgs, i) => {
      // 4 copies: translateY(-50%) lands exactly two copies in, so the loop is
      // seamless and the column always over-fills the tilted container
      const loop = [...imgs, ...imgs, ...imgs, ...imgs];
      return `
      <div class="collage-col" style="--d:${180 + i * 26}s">
        ${loop.map(u => `<img src="${u}" alt="" loading="lazy" decoding="async" />`).join('')}
      </div>`;
    }).join('');
    // don't burn GPU while the hero is offscreen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) =>
        host.classList.toggle('is-paused', !en.isIntersecting)
      ).observe($('#hero'));
    }
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
    $$('.track[data-yt]', overlayBody).forEach(row => {
      row.addEventListener('click', () => openMini(row.dataset));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMini(row.dataset); }
      });
    });
  }

  function trackRow(t, i) {
    const roles = t.roles.map(r => `<span class="role-tag">${r}</span>`).join('');
    const id = ytId(t.youtube);
    const yt = id
      ? `<span class="track__yt" aria-hidden="true">
           <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg>
         </span>`
      : '';
    const data = id ? ` data-yt="${id}" data-title="${esc(t.title + ' — ' + t.artist)}" data-url="${esc(t.youtube)}" role="button" tabindex="0" aria-label="Play ${esc(t.title)} by ${esc(t.artist)}"` : '';
    return `
      <div class="track"${data} style="animation-delay:${reduceMotion ? 0 : i * 45}ms">
        <span class="track__idx">${String(i + 1).padStart(2, '0')}</span>
        ${cover(t)}
        <div class="track__main">
          <div class="track__title">${esc(t.title)}</div>
          <div class="track__artist">${esc(t.artist)}</div>
        </div>
        <div class="track__roles">${roles}</div>
        <span class="track__year">${t.year ?? ''}</span>
        ${yt}
      </div>`;
  }

  /* cover art: real image / YouTube thumbnail if available, else a generated waveform cover.
     Rows render at 52px, so prefer the small yt thumb there; a custom (non-yt) cover still wins. */
  function cover(t) {
    const custom = t.cover && !t.cover.includes('i.ytimg.com');
    const id = ytId(t.youtube);
    const art = custom ? t.cover : (id ? ytThumb(id) : t.cover);
    if (art) {
      return `<img class="track__cover" src="${art}" alt="${esc(t.title)} cover art" loading="lazy" width="52" height="52" />`;
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

  /* -------- 4. mini-player (Mix & Master tracks dock bottom-left) -------- */
  const mini = $('#mini'), miniFrame = $('#miniFrame'), miniTitle = $('#miniTitle'), miniExt = $('#miniExt');
  function openMini(d) {
    if (!d || !d.yt) return;
    miniFrame.innerHTML = `<iframe src="${ytEmbed(d.yt)}" title="${d.title || 'Now playing'}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    miniTitle.textContent = d.title || 'Now playing';
    miniExt.href = d.url || `https://youtu.be/${d.yt}`;
    mini.classList.add('is-open');
    mini.setAttribute('aria-hidden', 'false');
    $$('.track.is-playing').forEach(el => el.classList.remove('is-playing'));
    $$(`.track[data-yt="${d.yt}"]`).forEach(el => el.classList.add('is-playing'));
  }
  function closeMini() {
    mini.classList.remove('is-open');
    mini.setAttribute('aria-hidden', 'true');
    miniFrame.innerHTML = '';
    $$('.track.is-playing').forEach(el => el.classList.remove('is-playing'));
  }
  $('#miniClose').addEventListener('click', closeMini);

  /* -------- 4b. project pop-up (Beyond the record → embedded video) -------- */
  const lightbox = $('#lightbox'), lbFrame = $('#lbFrame'), lbMeta = $('#lbMeta');
  function openProject(p) {
    const id = ytId(p.link);
    lbFrame.innerHTML = id
      ? `<iframe src="${ytEmbed(id)}" title="${esc(p.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
      : `<div class="lb-noembed">Video coming soon.</div>`;
    lbMeta.innerHTML = `
      <div class="lb-meta__kicker">${esc(p.type)}</div>
      <h3 id="lbTitle" class="lb-meta__title">${esc(p.title)}</h3>
      <p class="lb-meta__sub">${esc(p.client || '')}${p.year ? ' · ' + p.year : ''}</p>
      <p class="lb-meta__role">${esc(p.role)}.${p.note ? ' ' + esc(p.note) : ''}</p>`;
    lastFocus = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    setTimeout(() => $('.lightbox__close').focus(), 60);
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbFrame.innerHTML = '';
    document.body.classList.remove('is-locked');
    lastFocus?.focus?.();
  }
  $$('[data-lb-close]', lightbox).forEach(el => el.addEventListener('click', closeLightbox));

  /* -------- overlay open/close plumbing (genre shelf) -------- */
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
    grid.innerHTML = DATA.projects.map((p, i) => {
      const id = ytId(p.link);
      const art = p.cover || (id ? ytThumb(id) : '');
      const thumb = art
        ? `<span class="project-card__thumb" style="background-image:url('${art}')"></span>`
        : `<span class="project-card__thumb project-card__thumb--empty"></span>`;
      const play = id ? `<span class="project-card__play" aria-hidden="true">▶</span>` : '';
      return `
      <button class="project-card" role="listitem" data-type="${esc(p.type)}" data-i="${i}"
              aria-label="Open ${esc(p.title)} — ${esc(p.type)}">
        ${thumb}${play}
        <span class="project-card__body">
          <span class="project-card__type">${esc(p.type)}</span>
          <span class="project-card__title">${esc(p.title)}</span>
          <span class="project-card__meta">${esc(p.client)}${p.year ? ' · ' + p.year : ''}</span>
        </span>
      </button>`;
    }).join('');

    $$('.project-card', grid).forEach(c =>
      c.addEventListener('click', () => openProject(DATA.projects[+c.dataset.i])));
    $$('.chip', filters).forEach(chip => chip.addEventListener('click', () => {
      $$('.chip', filters).forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const t = chip.dataset.type;
      $$('.project-card', grid).forEach(c =>
        c.classList.toggle('is-hidden', t !== 'All' && c.dataset.type !== t));
      grid.scrollTo({ left: 0, behavior: 'auto' });   // filtered set starts from the front
      railUpdaters['#projectGrid']?.();
    }));
    initRail('#projectGrid', '#projPrev', '#projNext');
  }

  /* -------- 6. command palette (⌘K) -------- */
  const palette = $('#palette');
  const palInput = $('#paletteInput');
  const palList = $('#paletteList');
  let palItems = [], palIdx = 0;

  function buildPaletteIndex() {
    const items = [
      ...['work', 'projects', 'about', 'contact'].map(id => ({
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
    if (e.key === 'Escape') {
      // close the topmost layer first
      if (lightbox.classList.contains('is-open')) return closeLightbox();
      if (palette.classList.contains('is-open')) return closePalette();
      if (overlay.classList.contains('is-open')) return closeOverlay();
      if (mini.classList.contains('is-open')) return closeMini();
    }
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
    buildCollage();
    renderGenreRail();
    renderProjects();
    initReveal();
    onScroll();
  }
  boot();
})();
