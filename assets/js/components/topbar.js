// assets/js/components/topbar.js

/**
 * Bygger topbaren (logo + burger + overlay-menu) direkte ind i <header class="Topbar">.
 * - Tilgængelighed: ARIA-attributter, fokusfælde i åben menu, Escape lukker.
 * - Scroll-lås: body.no-scroll når overlay-menu er aktiv.
 * - Lukker når man klikker på et link eller uden for indholdet i overlayet.
 */
function buildTopbar() {
  // Find mountpoint (kræver <header class="Topbar"> i HTML)
  const mount = document.querySelector('.Topbar');
  if (!mount) return; // Ingen topbar på siden → stop stille og roligt

  // Indsæt logo, burger-knap og overlay-navigation
  mount.innerHTML = `
    <!-- Logo til venstre (link til forside) -->
    <a class="topbar-logo" href="index.html" aria-label="Gå til forside">
      <img src="assets/img/logo/logo.png" alt="Gittes Glamping" class="topbar-logo__img">
    </a>

    <!-- Burger-knap (åbner/lukker overlay-menu) -->
    <button
      class="burger"
      id="burger"
      aria-label="Åbn menu"
      aria-expanded="false"
      aria-controls="mobileMenu"
    >
      <span></span><span></span><span></span>
    </button>

    <!-- Overlay-menu (skjult fra start) -->
    <nav class="mobile-menu" id="mobileMenu" aria-hidden="true">
      <button class="close-btn" id="closeBtn" aria-label="Luk menu">&times;</button>
      <a href="ophold.html">Ophold</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="aktiviteter.html">Aktiviteter</a>
      <a href="liste.html">Min Liste</a>
      <a href="mine-beskeder.html">Mine beskeder</a> <!-- ⭐ NYT -->
    </nav>
  `;

  // Cache elementer der bruges løbende
  const burger   = mount.querySelector('#burger');     // burger-knappen
  const menu     = mount.querySelector('#mobileMenu'); // overlay-menu
  const closeBtn = mount.querySelector('#closeBtn');   // kryds-knap i overlay

  // Husk hvor fokus var, før vi åbner menuen (så vi kan returnere fokus ved luk)
  let lastFocused = null;

  // Hjælper: alle fokuserbare elementer inde i overlayet (links, knapper m.m.)
  const getFocusable = () =>
    menu.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');

  /**
   * Åbn overlay-menuen
   * - Sætter ARIA korrekt
   * - Låser baggrundens scroll
   * - Flytter fokus ind i overlayet (første fokuserbare element)
   */
  const open = () => {
    if (menu.classList.contains('active')) return; // allerede åben

    // Gem nuværende fokus (typisk burger-knappen)
    lastFocused = document.activeElement;

    // Vis overlay + opdatér ARIA
    menu.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');

    // Lås scroll på body (forhindrer at siden scroller bag overlayet)
    document.body.classList.add('no-scroll');

    // Flyt fokus ind i overlayet (første interaktive element)
    const focusables = getFocusable();
    (focusables[0] || closeBtn).focus();
  };

  /**
   * Luk overlay-menuen
   * - Ryd ARIA-attributter
   * - Genåbn scroll på body
   * - Returnér fokus til burger-knappen (eller sidste fokuserede)
   */
  const close = () => {
    if (!menu.classList.contains('active')) return; // allerede lukket

    menu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('no-scroll');

    // Returnér fokus til tidligere element (fallback: burger)
    (lastFocused || burger).focus();
  };

  /**
   * Toggle (skift) mellem åben og lukket tilstand
   */
  const toggle = () => {
    if (menu.classList.contains('active')) {
      close();
    } else {
      open();
    }
  };

  // --- Event listeners ---

  // Klik på burger → åbn/luk
  burger.addEventListener('click', toggle);

  // Klik på kryds i overlay → luk
  closeBtn.addEventListener('click', close);

  // Klik på selve overlay-bagrunden (uden for indhold) → luk
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  // Klik på et link i overlay → luk (navigér dernæst)
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  /**
   * Tastaturstyring når overlay er åbent:
   * - Escape → luk
   * - Tab/Shift+Tab → fokusfælde inde i overlayet (loop)
   */
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('active')) return; // kun når menu er åben

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(getFocusable());
      if (focusables.length === 0) return;

      const currentIndex = focusables.indexOf(document.activeElement);
      let nextIndex = currentIndex;

      // Shift+Tab: baglæns, ellers fremad
      if (e.shiftKey) {
        nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
      }

      focusables[nextIndex].focus();
      e.preventDefault(); // undgå at browseren håndterer fokus-springet selv
    }
  });
}

/**
 * Offentlig init-funktion:
 * - Kører buildTopbar() når DOM er klar.
 * - Kaldes fra main.js.
 */
export function initTopbar() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTopbar, { once: true });
  } else {
    buildTopbar();
  }
}