// assets/js/components/messages.js
export function renderMessages() {
  if (document.body.id !== "beskeder") return;

  const host = document.querySelector("#messages");
  if (!host) return;

  const load = () => JSON.parse(localStorage.getItem("sentMessages") || "[]");
  const save = (arr) => localStorage.setItem("sentMessages", JSON.stringify(arr));

  const emptyView = () => {
    host.innerHTML = `
      <div class="msg-empty">
        <h2>Mine beskeder</h2>
        <p>Du har ingen gemte beskeder endnu.</p>
      </div>
    `;
  };

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

  const draw = () => {
    let list = load();

    if (!Array.isArray(list) || list.length === 0) {
      emptyView();
      return;
    }

    // Nyeste først
    list = list.sort((a, b) => (b.ts || 0) - (a.ts || 0));

    // Byg HTML
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

    // Slet én
    host.querySelectorAll(".js-delete").forEach((btn, domIndex) => {
      btn.addEventListener("click", () => {
        // Find rigtig index i den viste (sorterede) liste:
        const cardEl = btn.closest(".msg-item");
        const whenText = cardEl?.querySelector(".msg-ts")?.textContent?.trim() || "";
        const subject = cardEl?.querySelector("h3")?.textContent?.trim() || "";

        // Genindlæs fuld liste (usorteret), og fjern første match på ts+subject
        const full = load();
        const idx = full.findIndex((m) => {
          const tsMatch = new Date(m.ts || 0).toLocaleString("da-DK") === whenText;
          const subMatch = (m.subject || "Ingen emne") === subject;
          return tsMatch && subMatch;
        });

        if (idx > -1) {
          full.splice(idx, 1);
          if (full.length) save(full);
          else localStorage.removeItem("sentMessages");
        }

        draw(); // re-render
      });
    });

    // Slet alle
    const clearAll = host.querySelector(".js-clearall");
    if (clearAll) {
      clearAll.addEventListener("click", () => {
        if (confirm("Vil du slette alle sendte beskeder?")) {
          localStorage.removeItem("sentMessages");
          draw();
        }
      });
    }
  };

  draw();
}