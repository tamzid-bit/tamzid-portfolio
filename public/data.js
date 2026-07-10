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

  /* Real catalog pulled from tamzid1506.wixsite.com/tamzid-rahman (per-genre pages).
     title/artist/year/youtube are REAL. year = YouTube upload year.
     roles default to ['Mix','Master'] for every track pending Tamzid's per-track
     confirmation in Sanity (YouTube exposes no role data). cover left empty →
     generated waveform cover is shown. */
  tracks: [
    /* ---- Pop ---- */
    { title: 'Khuli Hawa',           artist: 'Burrah, GNDHI',                          genre: 'pop', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/0doOf8pXQzU', cover: 'https://i.ytimg.com/vi/0doOf8pXQzU/hqdefault.jpg' },
    { title: 'Deja Vu',              artist: 'Sahir',                                  genre: 'pop', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/RX06p6KXJ4Y', cover: 'https://i.ytimg.com/vi/RX06p6KXJ4Y/hqdefault.jpg' },
    { title: 'Jeene Do Mujhe',       artist: 'Aary',                                   genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/fQvvYKU4ZTI', cover: 'https://i.ytimg.com/vi/fQvvYKU4ZTI/hqdefault.jpg' },
    { title: 'Pixel Perfect',        artist: 'Aary',                                   genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/Pzi5eY9hszk', cover: 'https://i.ytimg.com/vi/Pzi5eY9hszk/hqdefault.jpg' },
    { title: 'Colour',               artist: 'Aary',                                   genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/YZDC5zWCNxU', cover: 'https://i.ytimg.com/vi/YZDC5zWCNxU/hqdefault.jpg' },
    { title: 'Mazzaak',              artist: 'Sugandha',                               genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/6Klqm5EwRxI', cover: 'https://i.ytimg.com/vi/6Klqm5EwRxI/hqdefault.jpg' },
    { title: 'Kabootar',             artist: 'Arham Fulfagar',                         genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/SViDyykM-QY', cover: 'https://i.ytimg.com/vi/SViDyykM-QY/hqdefault.jpg' },
    { title: 'Befizool',             artist: 'Darcy & Soham (feat. The Rish, Sahir, AAKASH)', genre: 'pop', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/V_osb9J7tZE', cover: 'https://i.ytimg.com/vi/V_osb9J7tZE/hqdefault.jpg' },
    { title: "I'm Not Complaining",  artist: 'Evad',                                   genre: 'pop', year: 2022, roles: ['Mix','Master'], youtube: 'https://youtu.be/ky8-dq6HEhA', cover: 'https://i.ytimg.com/vi/ky8-dq6HEhA/hqdefault.jpg' },
    { title: 'Every Single Day',     artist: 'Tamzid',                                 genre: 'pop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/WKBNPDB-JtQ', cover: 'https://i.ytimg.com/vi/WKBNPDB-JtQ/hqdefault.jpg' },
    { title: 'Lost',                 artist: 'Evad',                                   genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/yZcMch9y5sc', cover: 'https://i.ytimg.com/vi/yZcMch9y5sc/hqdefault.jpg' },
    { title: 'Haule Se',             artist: 'Arham Fulfagar',                         genre: 'pop', year: 2022, roles: ['Mix','Master'], youtube: 'https://youtu.be/NIc8iavy9qs', cover: 'https://i.ytimg.com/vi/NIc8iavy9qs/hqdefault.jpg' },
    { title: 'IDK',                  artist: 'Adi & Dishaan (ft. Mary Ann Alexander)', genre: 'pop', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/QNezGEXvX0s', cover: 'https://i.ytimg.com/vi/QNezGEXvX0s/hqdefault.jpg' },
    { title: 'Bad Timing',           artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/0sBj_y1VvhU', cover: 'https://i.ytimg.com/vi/0sBj_y1VvhU/hqdefault.jpg' },
    { title: 'SAY',                  artist: 'Adi & Dishaan (ft. Perp)',               genre: 'pop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/_MwS-Wg3s0o', cover: 'https://i.ytimg.com/vi/_MwS-Wg3s0o/hqdefault.jpg' },
    { title: 'Got To Me',            artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/MRqt9WCw8f8', cover: 'https://i.ytimg.com/vi/MRqt9WCw8f8/hqdefault.jpg' },
    { title: 'Hold Me',              artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/L0k2nSectBM', cover: 'https://i.ytimg.com/vi/L0k2nSectBM/hqdefault.jpg' },
    { title: 'Roye Jaye',            artist: 'Vivek Singh',                            genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/Daa1ThHsAbU', cover: 'https://i.ytimg.com/vi/Daa1ThHsAbU/hqdefault.jpg' },
    { title: "Say You're Wrong",     artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/xUnssBNN23c', cover: 'https://i.ytimg.com/vi/xUnssBNN23c/hqdefault.jpg' },
    { title: "Don't Tell",           artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/kzbTRX_0XsM', cover: 'https://i.ytimg.com/vi/kzbTRX_0XsM/hqdefault.jpg' },
    { title: 'Pile On',              artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/V3orGJcsIz8', cover: 'https://i.ytimg.com/vi/V3orGJcsIz8/hqdefault.jpg' },
    { title: 'Bite Size',            artist: 'Dishaan',                                genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/9MkE-i_rim8', cover: 'https://i.ytimg.com/vi/9MkE-i_rim8/hqdefault.jpg' },
    { title: 'Wake Up In The Morning', artist: 'Kenny Sebastian',                      genre: 'pop', year: 2020, roles: ['Mix','Master'], youtube: 'https://youtu.be/-4juyZYjLeg', cover: 'https://i.ytimg.com/vi/-4juyZYjLeg/hqdefault.jpg' },
    { title: 'Banjaara',             artist: 'Aary',                                   genre: 'pop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/39niadKrFrw', cover: 'https://i.ytimg.com/vi/39niadKrFrw/hqdefault.jpg' },

    /* ---- R&B ---- */
    { title: 'Meantime',             artist: 'Katya Krishnan',                         genre: 'rnb', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/eYkTxOeDqCE', cover: 'https://i.ytimg.com/vi/eYkTxOeDqCE/hqdefault.jpg' },
    { title: 'Heart of Glass',       artist: 'Xane',                                   genre: 'rnb', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/ci2s0lVSk3k', cover: 'https://i.ytimg.com/vi/ci2s0lVSk3k/hqdefault.jpg' },
    { title: 'Easily',               artist: 'Xane',                                   genre: 'rnb', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/wj4dWKERX-g', cover: 'https://i.ytimg.com/vi/wj4dWKERX-g/hqdefault.jpg' },
    { title: 'Fight For You',        artist: 'Tamzid',                                 genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/123RcxuGGLk', cover: 'https://i.ytimg.com/vi/123RcxuGGLk/hqdefault.jpg' },
    { title: 'Step Back',            artist: 'Moosa',                                  genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/RPOkrMcabLk', cover: 'https://i.ytimg.com/vi/RPOkrMcabLk/hqdefault.jpg' },
    { title: 'Better Off',           artist: 'KBIR',                                   genre: 'rnb', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/S2aaFWR81Zg', cover: 'https://i.ytimg.com/vi/S2aaFWR81Zg/hqdefault.jpg' },
    { title: 'Hold You Back',        artist: 'KBIR',                                   genre: 'rnb', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/sqiAxf1MU_Y', cover: 'https://i.ytimg.com/vi/sqiAxf1MU_Y/hqdefault.jpg' },
    { title: 'Something To Lose',    artist: 'KBIR',                                   genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/4l44Pj-naUs', cover: 'https://i.ytimg.com/vi/4l44Pj-naUs/hqdefault.jpg' },
    { title: 'Off My Mind',          artist: 'Tamzid (feat. Trichia Rebello)',         genre: 'rnb', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/yKLDNhRSOqE', cover: 'https://i.ytimg.com/vi/yKLDNhRSOqE/hqdefault.jpg' },
    { title: 'Only You',             artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/eLSwmrg0Gek', cover: 'https://i.ytimg.com/vi/eLSwmrg0Gek/hqdefault.jpg' },
    { title: 'Pieces Of My Mind',    artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/wtpeAuFIlJs', cover: 'https://i.ytimg.com/vi/wtpeAuFIlJs/hqdefault.jpg' },
    { title: 'Follow (feat. ILLAH)', artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/WShE_oX5Zwg', cover: 'https://i.ytimg.com/vi/WShE_oX5Zwg/hqdefault.jpg' },
    { title: 'A Way Back To You',    artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/hVi7tJ9wIrY', cover: 'https://i.ytimg.com/vi/hVi7tJ9wIrY/hqdefault.jpg' },
    { title: 'Love',                 artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/0U2EzIeujIc', cover: 'https://i.ytimg.com/vi/0U2EzIeujIc/hqdefault.jpg' },
    { title: 'Find Me',              artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/dyMQUTTUiNQ', cover: 'https://i.ytimg.com/vi/dyMQUTTUiNQ/hqdefault.jpg' },
    { title: 'Beyond',               artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/Z0ZO-CVOD_w', cover: 'https://i.ytimg.com/vi/Z0ZO-CVOD_w/hqdefault.jpg' },
    { title: 'Timeless',             artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/pY0tlni-3V4', cover: 'https://i.ytimg.com/vi/pY0tlni-3V4/hqdefault.jpg' },
    { title: 'For You',              artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/6_jpAJYE0pA', cover: 'https://i.ytimg.com/vi/6_jpAJYE0pA/hqdefault.jpg' },
    { title: 'Angel',                artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/jXYi96gRLgg', cover: 'https://i.ytimg.com/vi/jXYi96gRLgg/hqdefault.jpg' },
    { title: 'Fall',                 artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/XtLrHYRO6zE', cover: 'https://i.ytimg.com/vi/XtLrHYRO6zE/hqdefault.jpg' },
    { title: 'Unleash',              artist: 'zulton says',                            genre: 'rnb', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/539PB7mU934', cover: 'https://i.ytimg.com/vi/539PB7mU934/hqdefault.jpg' },

    /* ---- Hip Hop & Rap ---- */
    { title: 'Haye Ri Duniya',       artist: 'Rashmeet Kaur (ft. Ikka)',               genre: 'hiphop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/oTuAaAU8yT0', cover: 'https://i.ytimg.com/vi/oTuAaAU8yT0/hqdefault.jpg' },
    { title: 'MATH',                 artist: 'Adi, Hakimetc. & Dishaan',               genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/sm--1UU-6K0', cover: 'https://i.ytimg.com/vi/sm--1UU-6K0/hqdefault.jpg' },
    { title: 'Bomboclat',            artist: 'Turaab',                                 genre: 'hiphop', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/H5EsA3G5GyM', cover: 'https://i.ytimg.com/vi/H5EsA3G5GyM/hqdefault.jpg' },
    { title: 'Bediyan',              artist: 'Rashmeet Kaur',                          genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/kevoFtj18hY', cover: 'https://i.ytimg.com/vi/kevoFtj18hY/hqdefault.jpg' },
    { title: 'Sherni',               artist: 'Rashmeet Kaur',                          genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/Hn5j8wLxlrY', cover: 'https://i.ytimg.com/vi/Hn5j8wLxlrY/hqdefault.jpg' },
    { title: 'Bairi Piya',           artist: 'Rashmeet Kaur',                          genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/b-mBgSV5v-g', cover: 'https://i.ytimg.com/vi/b-mBgSV5v-g/hqdefault.jpg' },
    { title: 'Limitless Pyar',       artist: 'Rashmeet Kaur',                          genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/aLmg3xhB_64', cover: 'https://i.ytimg.com/vi/aLmg3xhB_64/hqdefault.jpg' },
    { title: 'NFT',                  artist: 'K-Nav, Jay Kila & NLYTN',                genre: 'hiphop', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/ihpHUIvM_20', cover: 'https://i.ytimg.com/vi/ihpHUIvM_20/hqdefault.jpg' },
    { title: 'OVA',                  artist: 'LOKA',                                   genre: 'hiphop', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/7jZAJMyZagE', cover: 'https://i.ytimg.com/vi/7jZAJMyZagE/hqdefault.jpg' },
    { title: 'Beautiful Mind',       artist: 'Dee MC (ft. EPR)',                       genre: 'hiphop', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/E1LPLLz1PBc', cover: 'https://i.ytimg.com/vi/E1LPLLz1PBc/hqdefault.jpg' },
    { title: 'Khoyi Si',             artist: 'Dee MC',                                 genre: 'hiphop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/Jve8DANAiTk', cover: 'https://i.ytimg.com/vi/Jve8DANAiTk/hqdefault.jpg' },
    { title: 'Pataka',               artist: 'Kaam Bhaari (feat. Yoku B.I.G., D\'Evil, Vibha Saraf)', genre: 'hiphop', year: 2022, roles: ['Mix','Master'], youtube: 'https://youtu.be/WzezT1Xz530', cover: 'https://i.ytimg.com/vi/WzezT1Xz530/hqdefault.jpg' },
    { title: 'LA To Bombay',         artist: 'Dee MC',                                 genre: 'hiphop', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/d0OSCrLfZqw', cover: 'https://i.ytimg.com/vi/d0OSCrLfZqw/hqdefault.jpg' },
    { title: 'What Am I To You',     artist: 'Dee MC',                                 genre: 'hiphop', year: 2022, roles: ['Mix','Master'], youtube: 'https://youtu.be/cNZsKM0M88Y', cover: 'https://i.ytimg.com/vi/cNZsKM0M88Y/hqdefault.jpg' },

    /* ---- Jazz ---- */
    { title: 'Ethio-Todi',           artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/oGmrG5MlUVk', cover: 'https://i.ytimg.com/vi/oGmrG5MlUVk/hqdefault.jpg' },
    { title: 'Cold Turkey',          artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/Oo7MEKZIIwM', cover: 'https://i.ytimg.com/vi/Oo7MEKZIIwM/hqdefault.jpg' },
    { title: 'Valhalla',             artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/KP4jbvux7GY', cover: 'https://i.ytimg.com/vi/KP4jbvux7GY/hqdefault.jpg' },
    { title: 'Fault in Thy Heart',   artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/dJjZOCk0q78', cover: 'https://i.ytimg.com/vi/dJjZOCk0q78/hqdefault.jpg' },
    { title: 'Resurgence',           artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/j0peOx8hFi4', cover: 'https://i.ytimg.com/vi/j0peOx8hFi4/hqdefault.jpg' },
    { title: 'Urban Junglist',       artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/OhkhKvj2wII', cover: 'https://i.ytimg.com/vi/OhkhKvj2wII/hqdefault.jpg' },
    { title: 'Initiation Dance',     artist: 'Many Roots Ensemble',                    genre: 'jazz', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/FoPLI5fGKRg', cover: 'https://i.ytimg.com/vi/FoPLI5fGKRg/hqdefault.jpg' },
    { title: 'Insaniyat',            artist: 'Many Roots Ensemble (ft. MC TodFod & MC Mawali)', genre: 'jazz', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/mXw4Te_lD-o', cover: 'https://i.ytimg.com/vi/mXw4Te_lD-o/hqdefault.jpg' },

    /* ---- Electronic ---- */
    { title: 'Hitchki',              artist: 'Gurbax & Chitralekha Sen',               genre: 'electronic', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/3EPes-f4buc', cover: 'https://i.ytimg.com/vi/3EPes-f4buc/hqdefault.jpg' },
    { title: 'Moon Worship',         artist: 'Shallwe?',                               genre: 'electronic', year: 2020, roles: ['Mix','Master'], youtube: 'https://youtu.be/JZQuJrLEsbQ', cover: 'https://i.ytimg.com/vi/JZQuJrLEsbQ/hqdefault.jpg' },
    { title: 'Planet Leisure',       artist: 'Shallwe?',                               genre: 'electronic', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/9hUHkDMzv2M', cover: 'https://i.ytimg.com/vi/9hUHkDMzv2M/hqdefault.jpg' },
    { title: 'Emergence',            artist: 'Flex Machina',                           genre: 'electronic', year: 2019, roles: ['Mix','Master'], youtube: 'https://youtu.be/ujlrxoBYMX4', cover: 'https://i.ytimg.com/vi/ujlrxoBYMX4/hqdefault.jpg' },
    { title: 'Pilot',                artist: 'Flex Machina',                           genre: 'electronic', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/p_AdObQl_eQ', cover: 'https://i.ytimg.com/vi/p_AdObQl_eQ/hqdefault.jpg' },
    { title: 'Bandra Tanpura',       artist: 'NDiPA X Flex Machina (feat. Sandeep Mishra)', genre: 'electronic', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/gyJoymrw8qI', cover: 'https://i.ytimg.com/vi/gyJoymrw8qI/hqdefault.jpg' },
    { title: 'Blissbodied',          artist: 'NLYTN',                                  genre: 'electronic', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/eVlAp1_rcDA', cover: 'https://i.ytimg.com/vi/eVlAp1_rcDA/hqdefault.jpg' },
    { title: 'Befikar',              artist: 'Punch.M',                                genre: 'electronic', year: 2020, roles: ['Mix','Master'], youtube: 'https://youtu.be/6qQt0UXn_P8', cover: 'https://i.ytimg.com/vi/6qQt0UXn_P8/hqdefault.jpg' },
    { title: 'Jogan',                artist: 'Gurbax, Chitralekha Sen & GNDHI',        genre: 'electronic', year: 2023, roles: ['Mix','Master'], youtube: 'https://youtu.be/HLU_z8lzKmc', cover: 'https://i.ytimg.com/vi/HLU_z8lzKmc/hqdefault.jpg' },
    { title: 'Solora',               artist: 'Punch.M',                                genre: 'electronic', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/MIKc-uhyhwA', cover: 'https://i.ytimg.com/vi/MIKc-uhyhwA/hqdefault.jpg' },
    { title: 'Yaariyan',             artist: 'Gurbax, Rashmeet Kaur & GANZ',           genre: 'electronic', year: 2022, roles: ['Mix','Master'], youtube: 'https://youtu.be/r1X0MT6fe1k', cover: 'https://i.ytimg.com/vi/r1X0MT6fe1k/hqdefault.jpg' },
    { title: 'Bagaal',               artist: 'Gurbax',                                 genre: 'electronic', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/w7MTZ1t5P74', cover: 'https://i.ytimg.com/vi/w7MTZ1t5P74/hqdefault.jpg' },
    { title: 'I Know',               artist: 'Gurbax',                                 genre: 'electronic', year: 2025, roles: ['Mix','Master'], youtube: 'https://youtu.be/Hoyf523IIMo', cover: 'https://i.ytimg.com/vi/Hoyf523IIMo/hqdefault.jpg' },
    { title: 'BULLSHXT',             artist: 'GNDHI',                                  genre: 'electronic', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/djw444NMwM8', cover: 'https://i.ytimg.com/vi/djw444NMwM8/hqdefault.jpg' },
    { title: 'Cry Me A River',       artist: 'GNDHI',                                  genre: 'electronic', year: 2024, roles: ['Mix','Master'], youtube: 'https://youtu.be/bYtcSFYc-gU', cover: 'https://i.ytimg.com/vi/bYtcSFYc-gU/hqdefault.jpg' },

    /* ---- Gospel ---- */
    { title: 'Cuando Los Extraños (Acoustic)', artist: 'HETROCK',                      genre: 'gospel', year: 2021, roles: ['Mix','Master'], youtube: 'https://youtu.be/x7EUV5OhAlk', cover: 'https://i.ytimg.com/vi/x7EUV5OhAlk/hqdefault.jpg' },
  ],

  /* Projects: real YouTube links; year = upload year (verify — some brand
     channels re-upload, so a few ad years predate Tamzid's involvement). */
  projects: [
    { type: 'Netflix',  title: 'Ray — "Bahrupiya"',       client: 'Netflix',            year: 2021, role: 'BGM composition & production', link: '',                              note: 'Season 1, Episode 2.' },
    { type: 'Theatre',  title: 'Sitayana',                client: 'SNDA',               year: 2025, role: 'BGM mix & master',            link: '',                              note: 'Dance musical, 2025–26.' },
    { type: 'Ad',       title: 'Biolage — Advanced Fiberstrong', client: 'Biolage',     year: 2013, role: 'Audio post',                 link: 'https://youtu.be/enc4TA6SzyI',  note: 'Upload year looks like a brand re-upload — verify.' },
    { type: 'Ad',       title: 'Gillette Mach3',          client: 'Gillette',           year: 2024, role: 'Audio post',                 link: 'https://youtu.be/ml8oYYfFjwo', cover: 'https://i.ytimg.com/vi/ml8oYYfFjwo/hqdefault.jpg',  note: '' },
    { type: 'Ad',       title: 'one8 Innerwear',          client: 'one8 / Virat Kohli', year: 2019, role: 'Audio post',                 link: 'https://youtu.be/9ljbQwFYrng', cover: 'https://i.ytimg.com/vi/9ljbQwFYrng/hqdefault.jpg',  note: '' },
    { type: 'Ad',       title: 'Himalaya Quista Pro',     client: 'Himalaya',           year: 2018, role: 'Audio post',                 link: 'https://youtu.be/CXqVt-WVjpE', cover: 'https://i.ytimg.com/vi/CXqVt-WVjpE/hqdefault.jpg',  note: '' },
    { type: 'Ad',       title: 'NEXA IGNIS — Street Art', client: 'NEXA',               year: 2017, role: 'Audio post',                 link: 'https://youtu.be/w_xMB9yKwW8',  note: '' },
    { type: 'Ad',       title: 'Coding Ninjas',           client: 'Coding Ninjas',      year: 2024, role: 'Audio & music production',    link: 'https://youtu.be/Ry8hwquqJgk', cover: 'https://i.ytimg.com/vi/Ry8hwquqJgk/hqdefault.jpg',  note: '' },
    { type: 'Ad',       title: 'Classplus — Guru Dakshina', client: 'Classplus',        year: 2021, role: 'Audio post',                 link: 'https://youtu.be/XpLRLbhTmnk', cover: 'https://i.ytimg.com/vi/XpLRLbhTmnk/hqdefault.jpg',  note: 'Teachers Day tribute.' },
    { type: 'Content',  title: 'Sounds of Mumbai',        client: 'Shure',              year: 2019, role: 'Recording & mix',            link: 'https://youtu.be/TDTiki0WamY',  note: 'Motiv Stories.' },
    { type: 'Content',  title: 'Sounds of Shillong',      client: 'Shure',              year: 2020, role: 'Recording & mix',            link: 'https://youtu.be/jUcwo9j_OW4',  note: '' },
    { type: 'Content',  title: 'Sounds of Kochi',         client: 'Shure',              year: 2019, role: 'Recording & mix',            link: 'https://youtu.be/tJ7p_2Hyl-A',  note: '' },
    { type: 'Content',  title: 'Motiv Stories Mumbai — Ch.1: Hardik Verma', client: 'Shure', year: 2019, role: 'Recording & mix',      link: 'https://youtu.be/FKPB2SIG7q8', cover: 'https://i.ytimg.com/vi/FKPB2SIG7q8/hqdefault.jpg',  note: '' },
    { type: 'Content',  title: 'Motiv Stories Mumbai — Ch.2: Sambit Chatterjee', client: 'Shure', year: 2019, role: 'Recording & mix', link: 'https://youtu.be/z07pSebJ_2o',  note: '' },
    { type: 'Content',  title: 'Motiv Stories Mumbai — Ch.3: Parag Bhide', client: 'Shure', year: 2019, role: 'Recording & mix',       link: 'https://youtu.be/xQC7mYnH8AU', cover: 'https://i.ytimg.com/vi/xQC7mYnH8AU/hqdefault.jpg',  note: '' },
  ],
};

/* GROQ queries used when SANITY.enabled — see sanity/ for schema. */
const GROQ = {
  genres:   `*[_type=="genre"]|order(order asc){"slug":slug.current,title,color,blurb}`,
  tracks:   `*[_type=="track"]|order(year desc){title,artist,"genre":genre->slug.current,year,roles,youtube,"cover":cover.asset->url}`,
  projects: `*[_type=="project"]|order(year desc){type,title,client,year,role,link,note,"cover":cover.asset->url}`,
};

window.PORTFOLIO = { SANITY, DEMO_DATA, GROQ };
