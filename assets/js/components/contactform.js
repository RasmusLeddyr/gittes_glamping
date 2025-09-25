// assets/js/components/contactform.js

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
          <div class="field">
            <label class="sr-only" for="cf-name">Navn</label>
            <input id="cf-name" name="name" type="text" placeholder="Navn" required minlength="2" autocomplete="name" />
            <small class="field-error" data-for="name" hidden></small>
          </div>

          <div class="field">
            <label class="sr-only" for="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" placeholder="Email" required autocomplete="email" />
            <small class="field-error" data-for="email" hidden></small>
          </div>

          <div class="field">
            <label class="sr-only" for="cf-cat">Hvad drejer henvendelsen sig om?</label>
            <select id="cf-cat" name="category" required>
              <option value="">Hvad drejer henvendelsen sig om?</option>
              <option value="booking">Booking</option>
              <option value="spørgsmål">Generelt spørgsmål</option>
              <option value="andet">Andet</option>
            </select>
            <small class="field-error" data-for="category" hidden></small>
          </div>

          <div class="field">
            <label class="sr-only" for="cf-msg">Besked</label>
            <textarea id="cf-msg" name="message" placeholder="Besked (Skriv datoer, hvis det drejer sig om booking)" required minlength="10"></textarea>
            <small class="field-error" data-for="message" hidden></small>
          </div>

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

  const readList = () => JSON.parse(localStorage.getItem("sentMessages") || "[]");
  const writeList = (arr) => localStorage.setItem("sentMessages", JSON.stringify(arr));
  const updateCounter = () => { if (countEl) countEl.textContent = String(readList().length); };
  updateCounter();

  const nameInput = form.querySelector('#cf-name');
  const emailInput = form.querySelector('#cf-email');
  const categorySel = form.querySelector('#cf-cat'); // 
  const messageTxt = form.querySelector('#cf-msg');

  // === : Auto-fill category from selected stay (localStorage)
  (function hydrateFromStay() {
    try {
      const selected = JSON.parse(localStorage.getItem("selectedStay") || "null");
      if (selected && categorySel) {
        let opt = categorySel.querySelector('option[data-from="stay"]');
        if (!opt) {
          opt = document.createElement('option');
          opt.dataset.from = "stay";
          categorySel.prepend(opt);
        }
        opt.value = `stay:${selected.id}`;
        opt.textContent = selected.title;
        categorySel.value = opt.value;

        localStorage.removeItem("selectedStay"); // cleanup
      }
    } catch (_) {}
  })();

  // === Validering ===
  const getErrEl = (name) => form.querySelector(`.field-error[data-for="${name}"]`);
  const showErr = (inputEl, msg, nameKey) => {
    const err = getErrEl(nameKey);
    if (!err) return;
    if (msg) {
      err.textContent = msg;
      err.hidden = false;
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.classList.add('is-invalid');
    } else {
      err.hidden = true;
      err.textContent = "";
      inputEl.removeAttribute('aria-invalid');
      inputEl.classList.remove('is-invalid');
    }
  };

  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ '\-]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (el) => {
    if (el === nameInput) {
      const v = el.value.trim();
      if (!v) return "Skriv dit navn.";
      if (v.length < 2) return "Navn skal være mindst 2 tegn.";
      if (!namePattern.test(v)) return "Navn må kun indeholde bogstaver.";
      return "";
    }
    if (el === emailInput) {
      const v = el.value.trim();
      if (!v) return "Skriv din email.";
      if (!emailPattern.test(v)) return "Indtast en gyldig email (fx navn@domæne.dk).";
      return "";
    }
    if (el === categorySel) {
      if (!el.value) return "Vælg et emne for din henvendelse.";
      return "";
    }
    if (el === messageTxt) {
      const v = el.value.trim();
      if (!v) return "Skriv en besked.";
      if (v.length < 10) return "Beskeden skal være mindst 10 tegn.";
      return "";
    }
    return "";
  };

  const fields = [
    { el: nameInput, key: 'name' },
    { el: emailInput, key: 'email' },
    { el: categorySel, key: 'category' },
    { el: messageTxt, key: 'message' },
  ];

  const validateAndPaint = (el, key) => {
    const msg = validateField(el);
    showErr(el, msg, key);
    return msg === "";
  };

  fields.forEach(({ el, key }) => {
    ['input', 'blur', 'change'].forEach(evt =>
      el.addEventListener(evt, () => validateAndPaint(el, key))
    );
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstInvalid = null;
    fields.forEach(({ el, key }) => {
      const ok = validateAndPaint(el, key);
      if (!ok && !firstInvalid) firstInvalid = el;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const catText = categorySel.selectedOptions[0]?.textContent?.trim() || "";
    const entry = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: catText || categorySel.value || "Ingen emne",
      message: messageTxt.value.trim(),
      ts: Date.now(),
    };

    const list = readList();
    list.push(entry);
    writeList(list);

    updateCounter();
    success.hidden = false;
    form.reset();
    fields.forEach(({ el, key }) => showErr(el, "", key));
  });
}