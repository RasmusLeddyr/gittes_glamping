// assets/js/components/contactform.js

// Bygger hele kontaktsektionen, kun når <body id="kontakt">
export function initContactForm() {
  if (document.body.id !== "kontakt") return;

  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="contact-overlap"></section>

    <section class="contact-section">
      <div class="contact-inner">

        <div class="contact-intro">
          <h2>Vil du booke et ophold?<br/>Eller har du blot et spørgsmål?</h2>
          <p>
            Så tøv ikke med at tage kontakt til os herunder. Vi bestræber os på at svare
            på henvendelser indenfor 24 timer, men op til ferie kan der være travlt, og
            svartiden kan derfor være op til 48 timer.
          </p>
        </div>

        <form class="contact-form" novalidate>
          <label class="sr-only" for="cf-name">Navn</label>
          <input id="cf-name" name="name" type="text" placeholder="Navn" required minlength="2" autocomplete="name" />

          <label class="sr-only" for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder="Email" required autocomplete="email" />

          <label class="sr-only" for="cf-cat">Hvad drejer henvendelsen sig om?</label>
          <select id="cf-cat" name="category" required>
            <option value="">Hvad drejer henvendelsen sig om?</option>
            <option value="booking">Booking</option>
            <option value="spørgsmål">Generelt spørgsmål</option>
            <option value="andet">Andet</option>
          </select>

          <label class="sr-only" for="cf-msg">Besked</label>
          <textarea id="cf-msg" name="message" placeholder="Besked (Skriv datoer, hvis det drejer sig om booking)" required minlength="10"></textarea>

          <button type="submit" class="btn">INDSEND</button>

          <p class="contact-success" hidden>Tak! Din besked er sendt ✅</p>
        </form>

        <div class="contact-tools">
          <a href="mine-beskeder.html" class="msg-link">
            Se mine beskeder (<span id="msg-count">0</span>)
          </a>
        </div>

      </div>
    </section>
  `;

  const form = main.querySelector(".contact-form");
  const success = main.querySelector(".contact-success");
  const countEl = main.querySelector("#msg-count");

  // helper: læs/skriv localStorage
  const readList = () => JSON.parse(localStorage.getItem("sentMessages") || "[]");
  const writeList = (arr) => localStorage.setItem("sentMessages", JSON.stringify(arr));

  const updateCounter = () => {
    const n = readList().length;
    if (countEl) countEl.textContent = String(n);
  };

  updateCounter(); // vis aktuel mængde ved load

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const categoryValue = (fd.get("category") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    // Brug valgt option-tekst som "subject"/emne
    const catSel = form.querySelector("#cf-cat");
    let subject = "";
    if (catSel && catSel instanceof HTMLSelectElement) {
      subject = catSel.selectedOptions[0]?.textContent?.trim() || "";
    }

    const entry = {
      name,
      email,
      subject: subject || categoryValue || "Ingen emne",
      message,
      ts: Date.now(),
    };

    const list = readList();
    list.push(entry);
    writeList(list);

    updateCounter();
    success.hidden = false;
    form.reset();
  });
}