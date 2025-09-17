// assets/js/components/topbar.js
function buildTopbar() {
  const mount = document.querySelector('.Topbar');
  if (!mount) return;

  // Logo, burger og menu direkte inde i .Topbar
  mount.innerHTML = `
    <a class="topbar-logo" href="index.html" aria-label="Gå til forside">
      <img src="assets/img/logo/logo.png" alt="Gittes Glamping" class="topbar-logo__img">
    </a>

    <button class="burger" id="burger" aria-label="Åbn menu" aria-expanded="false" aria-controls="mobileMenu">
      <span></span><span></span><span></span>
    </button>

    <nav class="mobile-menu" id="mobileMenu" aria-hidden="true">
      <button class="close-btn" id="closeBtn" aria-label="Luk menu">&times;</button>
      <a href="ophold.html">Ophold</a>
      <a href="kontakt.html">Kontakt</a>
      <a href="aktiviteter.html">Aktiviteter</a>
      <a href="liste.html">Min Liste</a>
    </nav>
  `;

  const burger   = mount.querySelector('#burger');
  const menu     = mount.querySelector('#mobileMenu');
  const closeBtn = mount.querySelector('#closeBtn');

  let lastFocused = null;

  const getFocusable = () =>
    menu.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');

  const open = () => {
    if (menu.classList.contains('active')) return;
    lastFocused = document.activeElement;

    menu.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    // fokus ind i menuen
    const focusables = getFocusable();
    (focusables[0] || closeBtn).focus();
  };

  const close = () => {
    if (!menu.classList.contains('active')) return;

    menu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    // fokus tilbage til burger
    (lastFocused || burger).focus();
  };

  const toggle = () => {
    if (menu.classList.contains('active')) {
      close();
    } else {
      open();
    }
  };

  // Handlers
  burger.addEventListener('click', toggle);
  closeBtn.addEventListener('click', close);

  // Klik i overlay (uden for links/indhold) lukker
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  // Luk på link-klik
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Escape for at lukke + fokus-trap med Tab
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('active')) return;

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

      if (e.shiftKey) {
        nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
      }

      focusables[nextIndex].focus();
      e.preventDefault();
    }
  });
}

export function initTopbar() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTopbar, { once: true });
  } else {
    buildTopbar();
  }
}