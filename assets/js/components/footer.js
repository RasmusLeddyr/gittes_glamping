function buildFooter() {
  const footer = document.querySelector('.Footer');
  if (!footer) {
    console.error('❌ Ingen <footer class="Footer"> fundet i HTML');
    return;
  }

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-social">
        <a href="/index.html" aria-label="Facebook" class="footer-icon">
          <img src="/assets/img/icons/square-facebook.svg" alt="Facebook">
        </a>
        <a href="/index.html" aria-label="Instagram" class="footer-icon">
          <img src="/assets/img/icons/square-instagram.svg" alt="Instagram">
        </a>
      </div>
      <div class="footer-brand">
        <a href="/index.html">
          <img src="/assets/img/logo/logo.png" alt="Gittes Glamping logo" class="footer-logo">
        </a>
        <span class="footer-text">Gittes Glamping</span>
      </div>
    </div>
  `;
  console.log('[footer] bygget');
}

export function initFooter() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooter, { once: true });
  } else {
    buildFooter();
  }
}