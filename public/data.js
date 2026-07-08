/* ------------------------------------------------------------------ *
 *  data.js — content source
 *
 *  The site renders from DEMO_DATA out of the box. When you fill in
 *  SANITY below, app.js fetches live content from Sanity instead and
 *  falls back to DEMO_DATA if the network call fails. Nothing else
 *  in the code needs to change.
 * ------------------------------------------------------------------ */

const SANITY = {
  projectId: '',              // <-- from sanity.io/manage  (e.g. 'ab12cd34')
  dataset: 'production',
  apiVersion: '2024-01-01',
  enabled: false,             // flip to true once projectId is set
};

/* Genre accent colours drive the whole UI. */
const DEMO_DATA = {
  genres: [
    { slug: 'pop',        title: 'Pop',            color: '#ff5da2', blurb: 'Bright, radio-ready, hook-first.' },
    { slug: 'rnb',        title: 'R&B',            color: '#9b6bff', blurb: 'Silk low end, air on top.' },
    { slug: 'hiphop',     title: 'Hip Hop & Rap',  color: '#f5a623', blurb: 'Knock, space and attitude.' },
    { slug: 'jazz',       title: 'Jazz',           color: '#38d6c3', blurb: 'Room, restraint, real dynamics.' },
    { slug: 'electronic', title: 'Electronic',     color: '#4ea8ff', blurb: 'Sound design and sub that moves air.' },
    { slug: 'gospel',     title: 'Gospel',         color: '#ff8a4c', blurb: 'Choirs, warmth, lift.' },
  ],

  /* roles: 'Mix' | 'Master' | 'Produce' — any combination.
     youtube: the real per-song YouTube URL (empty for now — to be filled from
              your Wix catalog). cover: real artwork URL/Sanity image, or empty
              for the generated waveform cover.
     NOTE: titles/artists below are PLACEHOLDERS awaiting your real catalog.   */
  tracks: [
    { title: 'Neon Sundays',     artist: 'Maya Sol',        genre: 'pop',        year: 2024, roles: ['Mix','Master'],           youtube: '', cover: '' },
    { title: 'Paper Planes',     artist: 'The Lofts',       genre: 'pop',        year: 2023, roles: ['Mix'],                    youtube: '', cover: '' },
    { title: 'Overexposed',      artist: 'Rue',             genre: 'pop',        year: 2025, roles: ['Mix','Master','Produce'], youtube: '', cover: '' },
    { title: 'Velvet Hours',     artist: 'Anaya',           genre: 'rnb',        year: 2024, roles: ['Mix','Master'],           youtube: '', cover: '' },
    { title: 'Slow Burn',        artist: 'Devon K',         genre: 'rnb',        year: 2023, roles: ['Mix'],                    youtube: '', cover: '' },
    { title: 'Cold Gold',        artist: 'Bilal Ray',       genre: 'hiphop',     year: 2025, roles: ['Mix','Master'],           youtube: '', cover: '' },
    { title: 'City of Ghosts',   artist: 'MC Aviator',      genre: 'hiphop',     year: 2024, roles: ['Produce','Mix'],          youtube: '', cover: '' },
    { title: 'Blue Note Diner',  artist: 'The Andheri Trio',genre: 'jazz',       year: 2023, roles: ['Mix','Master'],           youtube: '', cover: '' },
    { title: 'After Hours Set',  artist: 'Nadia Q',         genre: 'jazz',       year: 2022, roles: ['Master'],                 youtube: '', cover: '' },
    { title: 'Signal / Noise',   artist: 'HEX',             genre: 'electronic', year: 2025, roles: ['Produce','Mix','Master'], youtube: '', cover: '' },
    { title: 'Substation',       artist: 'Kilo Meter',      genre: 'electronic', year: 2024, roles: ['Mix'],                    youtube: '', cover: '' },
    { title: 'Rise (Choir Mix)', artist: 'New Dawn Voices', genre: 'gospel',     year: 2024, roles: ['Mix','Master'],           youtube: '', cover: '' },
    { title: 'Higher Ground',    artist: 'Grace Union',     genre: 'gospel',     year: 2023, roles: ['Mix'],                    youtube: '', cover: '' },
  ],

  projects: [
    { type: 'Netflix',  title: 'Ray — "Bahrupiya"',      client: 'Netflix',        year: 2021, role: 'BGM composition & production', link: '', note: 'Season 1, Episode 2.' },
    { type: 'Theatre',  title: 'Sitayana',               client: 'SNDA',           year: 2025, role: 'BGM mix & master',            link: '', note: 'Dance musical, 2025–26.' },
    { type: 'Ad',       title: 'One8',                   client: 'Virat Kohli',    year: 2023, role: 'Audio post',                 link: '', note: '' },
    { type: 'Ad',       title: 'Biolage',                client: 'Biolage',        year: 2022, role: 'Audio post',                 link: '', note: '' },
    { type: 'Ad',       title: 'Gillette',               client: 'Gillette',       year: 2022, role: 'Audio post',                 link: '', note: '' },
    { type: 'Ad',       title: 'Quista Pro',             client: 'Himalaya',       year: 2023, role: 'Audio post',                 link: '', note: '' },
    { type: 'Ad',       title: 'Nexa',                   client: 'Nexa',           year: 2022, role: 'Audio post',                 link: '', note: '' },
    { type: 'Ad',       title: 'Coding Ninjas',          client: 'Coding Ninjas',  year: 2023, role: 'Audio post',                 link: '', note: '' },
    { type: 'Content',  title: 'Sounds of Mumbai',       client: 'Shure',          year: 2022, role: 'Recording & mix',            link: '', note: 'Motiv Stories.' },
    { type: 'Content',  title: 'Sounds of Shillong',     client: 'Shure',          year: 2022, role: 'Recording & mix',            link: '', note: '' },
    { type: 'Content',  title: 'Sounds of Kochi',        client: 'Shure',          year: 2023, role: 'Recording & mix',            link: '', note: '' },
  ],
};

/* GROQ queries used when SANITY.enabled — see sanity/ for schema. */
const GROQ = {
  genres:   `*[_type=="genre"]|order(order asc){"slug":slug.current,title,color,blurb}`,
  tracks:   `*[_type=="track"]|order(year desc){title,artist,"genre":genre->slug.current,year,roles,youtube,"cover":cover.asset->url}`,
  projects: `*[_type=="project"]|order(year desc){type,title,client,year,role,link,note}`,
};

window.PORTFOLIO = { SANITY, DEMO_DATA, GROQ };
