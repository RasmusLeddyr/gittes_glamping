// assets/js/components/slider.js

// Importér funktion til at hente data for ét ophold (bruges på ophold-single)
import { SingleStayData } from "./stays.js";

// Hent titel + billede for det valgte ophold (hvis vi står på ophold-single.html)
const [stay_title, stay_image] = SingleStayData();

/**
 * Konfiguration af hero/slideren for hver side
 * - Angiver standard-billeder, titler og evt. ekstra indhold (logo, CTA osv.)
 * - Hvis en side-ID ikke findes her, falder vi tilbage til "forside"
 */
const HERO = {
  forside: {
    imgs: ['assets/img/heros/forside.jpg'], // baggrundsbillede
    title: 'Glamping',                      // hovedtitel
    subtitle: 'Gittes',                     // underoverskrift
    showLogo: true,                         // vis logo i overlay
    ctaLink: 'kontakt.html'                 // CTA-knap link
  },
  ophold:          { imgs: ['assets/img/heros/ophold.jpg'],      title: 'Vores ophold' },
  'ophold-single': { imgs: [stay_image],    title: stay_title }, // Dynamisk indhold fra API/URL
  kontakt:         { imgs: ['assets/img/heros/kontakt.jpg'],     title: 'Kontakt Gitte' },
  aktiviteter:     { imgs: ['assets/img/heros/aktiviteter.jpg'], title: 'Aktiviteter' },
  'aktivitet-single': { imgs: ['assets/img/heros/aktiviteter.jpg'], title: 'Aktivitet' },
  'min-liste':     { imgs: ['assets/img/heros/min-liste.jpg'],   title: 'Min liste' },
  gitte:           { imgs: ['assets/img/heros/gitte.jpg'],       title: 'Gitte' },
  beskeder:        { imgs: ['assets/img/heros/kontakt.jpg'],     title: 'Mine beskeder' },
};

/**
 * Hvis <body id=""> mangler, prøver vi at gætte side-ID
 * - Finder filnavnet (fx ophold.html → "ophold")
 * - Konverterer til lowercase
 * - Index.html → "forside"
 * - liste.html → "min-liste"
 */
function guessId() {
  const name = location.pathname.split('/').pop().replace('.html','').toLowerCase();
  if (!name || name === 'index') return 'forside';
  if (name === 'liste') return 'min-liste';
  return name;
}

/**
 * Bygger hele slideren:
 * - Finder korrekt konfiguration for den aktuelle side
 * - Indsætter billeder, overlay (titel/logo/CTA)
 * - Hvis flere billeder → starter et simpelt fade/rotation loop
 */
function buildSlider() {
  const host = document.querySelector('.Slider');
  if (!host) return; // hvis ingen slider på siden → stop

  // Bestem hvilken side vi er på (via body-id eller fallback)
  const pageId = document.body.id || guessId();
  const conf   = HERO[pageId] || HERO['forside'];

  // Mulighed: overskriv titel via data-attributter i HTML (data-hero-title eller data-title)
  const attrTitle =
    document.body.dataset.heroTitle ||
    host.dataset.title;

  // Brug overskrevet titel, ellers config-titel
  const title = (attrTitle && attrTitle.trim()) || conf.title || '';

  // Forbered slider container
  host.classList.toggle('home', pageId === 'forside'); // giver .Slider.home på forsiden
  host.innerHTML = ''; // ryd containeren

  // === Billeder ===
  conf.imgs.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if (i === 0) img.classList.add('active'); // første billede vises først
    host.appendChild(img);
  });

  // === Overlay (tekst ovenpå billedet) ===
  const overlay = document.createElement('div');
  overlay.className = 'slider-overlay';

  if (pageId === 'forside') {
    // Forsiden har logo, underoverskrift og CTA-knap
    overlay.innerHTML = `
      ${conf.showLogo ? `<img src="assets/img/logo/logo.png" alt="Logo" class="hero-logo">` : ''}
      ${conf.subtitle ? `<p class="hero-subtitle">${conf.subtitle}</p>` : ''}
      <h1 class="hero-title">${title}</h1>
      <a href="${conf.ctaLink || '#'}" class="cta-btn">Book nu</a>
    `;
  } else {
    // Undersider har kun en titel
    overlay.innerHTML = `<h2 class="hero-title">${title}</h2>`;
  }
  host.appendChild(overlay);

  // === Flere billeder → start slideshow ===
  if (conf.imgs.length > 1) {
    let i = 0;
    const slides = host.querySelectorAll('img');
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length; // næste billede
      slides[i].classList.add('active');
    }, 4000); // skift hvert 4. sekund
  }
}

/**
 * Init-funktion:
 * - Sørger for at slider først bygges, når DOM er klar
 */
export function initSlider() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSlider, { once: true });
  } else {
    buildSlider();
  }
}