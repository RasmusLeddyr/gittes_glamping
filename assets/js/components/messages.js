// assets/js/components/messages.js

/**
 * Viser "Mine beskeder"-siden.
 * - Loader beskeder fra localStorage
 * - Viser dem i kort (seneste først)
 * - Tillader at slette enkelte beskeder eller alle
 */
export function renderMessages() {
  // === 1. Skal vi køre? ===
  // Kører kun hvis vi er på siden med <body id="beskeder">
  if (document.body.id !== "beskeder") return;

  // Find container til at udskrive beskeder
  const host = document.querySelector("#messages");
  if (!host) return;

  // === 2. Hjælpefunktioner til localStorage ===
  // Loader liste af beskeder (eller tom array)
  const load = () => JSON.parse(localStorage.getItem("sentMessages") || "[]");
  // Gemmer liste af beskeder
  const save = (arr) => localStorage.setItem("sentMessages", JSON.stringify(arr));

  // === 3. UI-templates ===
  // Vises hvis der ingen beskeder er
  const emptyView = () => {
    host.innerHTML = `
      <div class="msg-empty">
        <h2>Mine beskeder</h2>
        <p>Du har ingen gemte beskeder endnu.</p>
      </div>
    `;
  };

  // Template for ét besked-kort
  const card = (msg, i) => `
    <div class="msg-item" data-index="${i}">
      <h3>${msg.subject || "Ingen emne"}</h3>
      <p><strong>Navn:</strong> ${msg.name || "-"}</p>
      <p><strong>Email:</strong> ${msg.email || "-"}</p>
      <p><strong>Besked:</strong> ${msg.message || "-"}</p>
      <p class="msg-ts">${new Date(msg.ts || Date.now()).toLocaleString("da-DK")}</p>
      <div class="actions">
        <button type="button" class="btn-clear js-delete">Slet</button>
      </div>
    </div>
  `;

  // === 4. Tegn hele listen ===
  const draw = () => {
    let list = load();

    // Hvis der ingen beskeder er
    if (!Array.isArray(list) || list.length === 0) {
      emptyView();
      return;
    }

    // Sortér beskeder: nyeste først
    list = list.sort((a, b) => (b.ts || 0) - (a.ts || 0));

    // Byg alle kort som HTML
    const items = list.map(card).join("");
    host.innerHTML = `
      <div class="msg-list">
        <div class="msg-head">
          <h2>Mine beskeder</h2>
          <div class="msg-actions">
            <span class="count">${list.length} besked${list.length === 1 ? "" : "er"}</span>
            <button type="button" class="btn-clear js-clearall">Slet alle</button>
          </div>
        </div>
        ${items}
      </div>
    `;

    // === 5. Funktionalitet: Slet én besked ===
    host.querySelectorAll(".js-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Find den besked, der skal slettes (matcher på tidspunkt + emne)
        const cardEl = btn.closest(".msg-item");
        const whenText = cardEl?.querySelector(".msg-ts")?.textContent?.trim() || "";
        const subject = cardEl?.querySelector("h3")?.textContent?.trim() || "";

        // Hent hele listen igen (i usorteret form)
        const full = load();
        // Find første match i den originale liste
        const idx = full.findIndex((m) => {
          const tsMatch = new Date(m.ts || 0).toLocaleString("da-DK") === whenText;
          const subMatch = (m.subject || "Ingen emne") === subject;
          return tsMatch && subMatch;
        });

        // Hvis fundet → fjern den
        if (idx > -1) {
          full.splice(idx, 1);
          if (full.length) save(full);
          else localStorage.removeItem("sentMessages"); // hvis tom liste → fjern helt
        }

        draw(); // tegn listen igen
      });
    });

    // === 6. Funktionalitet: Slet alle beskeder ===
    const clearAll = host.querySelector(".js-clearall");
    if (clearAll) {
      clearAll.addEventListener("click", () => {
        if (confirm("Vil du slette alle sendte beskeder?")) {
          localStorage.removeItem("sentMessages");
          draw(); // tegn listen igen (tom)
        }
      });
    }
  };

  // Første kald → tegn siden
  draw();
}