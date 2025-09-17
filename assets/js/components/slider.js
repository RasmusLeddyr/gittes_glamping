// assets/js/components/slider.js
// Hero-konfiguration pr. side (default titler + billeder)
const HERO = {
  forside: {
    imgs: ['assets/img/heros/forside.jpg'],
    title: 'Glamping',
    subtitle: 'Gittes',
    showLogo: true,
    ctaLink: 'kontakt.html'     // "Book nu" sender til kontakt-siden
  },
  ophold:      { imgs: ['assets/img/heros/ophold.jpg'],      title: 'Vores ophold' },
  kontakt:     { imgs: ['assets/img/heros/kontakt.jpg'],     title: 'Kontakt Gitte' },
  aktiviteter: { imgs: ['assets/img/heros/aktiviteter.jpg'], title: 'Aktiviteter' },
  'min-liste': { imgs: ['assets/img/heros/min-liste.jpg'],   title: 'Min liste' },
  gitte:       { imgs: ['assets/img/heros/gitte.jpg'],       title: 'Gitte' },
};

// fallback hvis body-id mangler
function guessId() {
  const name = location.pathname.split('/').pop().replace('.html','').toLowerCase();
  if (!name || name === 'index') return 'forside';
  if (name === 'liste') return 'min-liste';
  return name;
}

function buildSlider() {
  const host = document.querySelector('.Slider');
  if (!host) return;

  const pageId = document.body.id || guessId();
  const conf   = HERO[pageId] || HERO['forside'];

  // tillad at overskrive titel uden at røre JS (via data-attributter)
  const attrTitle =
    document.body.dataset.heroTitle ||
    host.dataset.title;

  const title = (attrTitle && attrTitle.trim()) || conf.title || '';

  // klargør container
  host.classList.toggle('home', pageId === 'forside'); // giver .Slider.home på forsiden
  host.innerHTML = '';

  // billeder
  conf.imgs.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if (i === 0) img.classList.add('active');
    host.appendChild(img);
  });

  // overlay (forside vs undersider)
  const overlay = document.createElement('div');
  overlay.className = 'slider-overlay';

  if (pageId === 'forside') {
    overlay.innerHTML = `
      ${conf.showLogo ? `<img src="assets/img/logo/logo.png" alt="Logo" class="hero-logo">` : ''}
      ${conf.subtitle ? `<p class="hero-subtitle">${conf.subtitle}</p>` : ''}
      <h1 class="hero-title">${title}</h1>
      <a href="${conf.ctaLink || '#'}" class="cta-btn">Book nu</a>
    `;
  } else {
    overlay.innerHTML = `<h2 class="hero-title">${title}</h2>`;
  }
  host.appendChild(overlay);

  // fade hvis flere billeder
  if (conf.imgs.length > 1) {
    let i = 0;
    const slides = host.querySelectorAll('img');
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 4000);
  }
}

export function initSlider() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSlider, { once: true });
  } else {
    buildSlider();
  }
}