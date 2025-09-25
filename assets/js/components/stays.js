// ==========================
// stays.js – Håndterer ophold
// ==========================

// import functions
import { GetData } from "../fetch.js";
import { Search } from "./search.js";

// ==========================
// Hent data fra API'et
// ==========================
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/stays/",
  "data"
);
const ELMT_stays = document.querySelector("#stays");
const ELMT_stay_single = document.querySelector("#stay_page");

// ==========================
// Templates – HTML bygges som string
// ==========================

// Pris-template: viser pris + evt. rabat
const TMPL_stay_price = (data) => {
  let price_tag = "price";
  let discount_tag = "hide";
  if (data.discountInPercent > 0) {
    price_tag = "cross";       // kryds over normal pris
    discount_tag = "discount"; // rabatpris vises
  }
  return `
<span class="${price_tag}">${
    data.price
  }</span><span class="${discount_tag}"> <span class="price">${Math.round(
    data.price - data.price * (data.discountInPercent / 100)
  )} </span>(${data.discountInPercent}%)</span>,-
`;
};

// Opholdskort (listevisning)
const TMPL_stay_card = (data) => {
  return `
<div class="card">
    <div class="title">
        <h1>${data.title}</h1>
        <p>${TMPL_stay_price(data)}</p>
        <p>${data.numberOfPersons} personer</p>
    </div>
    <div class="image_overlay">
      <img src="${data.image}" alt="" />
    </div>
    <!-- Sender id i URL til ophold-single.html -->
    <a href="ophold-single.html?id=${encodeURIComponent(data._id)}">LÆS MERE</a>
</div>
`;
};

// Enkelt ophold (single page)
// OBS: Book-knap er nu et <button>, ikke <a>
const TMPL_stay_single = (data) => {
  const includes = data.includes.map((item) => `<li>${item}</li>`).join("");
  return `
<h1 class="title">Tag væk en weekend, med én du holder af</h1>
<div class="info">
  <p class="desc">${data.description}</p>
  <p class="include_title">Med i pakken, er der inkluderet:</p>
  <ul class="includes">${includes}</ul>
</div>

<p class="price_container">Pris ${TMPL_stay_price(data)}</p>

<!-- BOOK-knap: gemmer valgt ophold i localStorage -->
<button type="button" class="btn js-book" 
        data-id="${data._id}" 
        data-title="${data.title}">
  BOOK NU
</button>
`;
};

// ==========================
// Hjælpefunktion – finder ophold ud fra URL-id
// ==========================
const FetchURLData = () => {
  let title = "";
  let image = "";
  let error = "";
  let select = "";

  // find id i URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    // find match i data
    select = DATA_stays.find((item) => String(item._id) === String(id));
    if (select) {
      title = select.title;
      image = select.image;
    } else {
      error = "<h1>Could not find item matching ID</h1>";
    }
  } else {
    error = "<h1>URL did not provide ID</h1>";
  }

  return [title, image, error, select];
};

// ==========================
// Hovedfunktion til at bygge ophold-sider
// ==========================
export async function Stays() {
  // Hvis vi er på ophold.html (liste)
  if (ELMT_stays) {
    const cards = ELMT_stays.querySelector(".cards");
    Search({
      bar_parent: cards,
      bar_placement: "beforebegin",
      list: DATA_stays,
      output: cards,
      template: TMPL_stay_card,
      fields: ["title"],
      placeholder: "Søg ophold.",
    });
  }

  // Hvis vi er på ophold-single.html
  if (ELMT_stay_single) {
    const [title, image, error, select] = SingleStayData();
    if (error) {
      ELMT_stay_single.innerHTML = error;
    } else {
      // Indsæt selve opholdets HTML
      ELMT_stay_single.insertAdjacentHTML(
        "beforeend",
        TMPL_stay_single(select)
      );

      // Tilføj eventlistener til BOOK-knap
      const bookBtn = ELMT_stay_single.querySelector(".js-book");
      if (bookBtn) {
        bookBtn.addEventListener("click", (e) => {
          // Læs data fra dataset
          const id = e.currentTarget.dataset.id;
          const title = e.currentTarget.dataset.title;

          // Gem i localStorage, så kontakt-form kan læse det
          localStorage.setItem("selectedStay", JSON.stringify({ id, title }));

          // Redirect til kontakt-siden
          window.location.href = "kontakt.html";
        });
      }
    }
  }
}

// Hjælpefunktion bruges af headeren
export function SingleStayData() {
  return FetchURLData();
}