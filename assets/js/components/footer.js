// ===============================
// Bygger footeren dynamisk
// ===============================
function buildFooter() {
  // Finder footer-elementet i DOM'en
  const footer = document.querySelector('.Footer');

  // Hvis der IKKE findes et <footer class="Footer"> i HTML, log en fejl og stop
  if (!footer) {
    console.error('❌ Ingen <footer class="Footer"> fundet i HTML');
    return;
  }

  // Indsætter HTML-strukturen for footeren
  footer.innerHTML = `
    <div class="footer-inner">

      <!-- Sociale medier ikoner -->
      <div class="footer-social">
        <a href="/index.html" aria-label="Facebook" class="footer-icon">
          <img src="/assets/img/icons/square-facebook.svg" alt="Facebook">
        </a>
        <a href="/index.html" aria-label="Instagram" class="footer-icon">
          <img src="/assets/img/icons/square-instagram.svg" alt="Instagram">
        </a>
      </div>

      <!-- Logo + tekst-brand -->
      <div class="footer-brand">
        <a href="/index.html">
          <img src="/assets/img/logo/logo.png" alt="Gittes Glamping logo" class="footer-logo">
        </a>
        <span class="footer-text">Gittes Glamping</span>
      </div>

    </div>
  `;

  // Debug log til konsollen, så vi kan se om footeren blev bygget
  console.log('[footer] bygget');
}

// ===============================
// Init-funktion til at starte footeren
// ===============================
export function initFooter() {
  // Hvis DOM'en stadig loader → vent på DOMContentLoaded event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooter, { once: true });
  } 
  // Hvis DOM'en allerede er klar → byg footeren med det samme
  else {
    buildFooter();
  }
}