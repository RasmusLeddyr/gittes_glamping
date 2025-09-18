// import functions
import { GetData } from "../fetch.js";
import { Search } from "./search.js";
//

// define variables
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/stays/",
  "data"
);
const ELMT_stay_list = document.querySelector("#stays");
const ELMT_stay_page = document.querySelector("#stay_page");
//

// set up HTML templates
const TMPL_stay_card = (data) => {
  return `
<div class="card">
    <div class="title">
        <h1>${data.title}</h1>
        <p>${data.numberOfPersons} personer</p>
        <p>${data.price},-</p>
    </div>
    <img src="${data.image}" alt="" />
    <a href="ophold-single.html?id=${encodeURIComponent(data._id)}">LÆS MERE</a>
</div>
`;
};
const TMPL_stay_page = (data) => {
  const includes = data.includes.map((item) => `<li>${item}</li>`).join("");
  return `
<h1>${data.title}</h1>
<p>${data.description}</p>
<p>Med i pakken, er der inkluderet:</p>
<ul class="includes">${includes}</ul>
<p>price</p>
<button>BOOK NU</button>
`;
};
//

// export code
export const Stays = () => {
  // check if page is "ophold"
  if (ELMT_stay_list) {
    // print cards using TMPL_stay_card
    const cards = ELMT_stay_list.querySelector(".cards");
    Search({
      bar: "#stays",
      list: DATA_stays,
      output: cards,
      template: TMPL_stay_card,
      fields: ["title"],
      placeholder: "Søg ophold.",
    });
    //
  }
  //

  // check if page is "ophold-single"
  if (ELMT_stay_page) {
    // find id from url
    const params = new URLSearchParams(window.location.search);
    //

    // if id does not exist, print error
    const id = params.get("id");
    if (!id) {
      ELMT_stay_page.innerHTML = "<h1>URL did not provide ID</h1>";
      return;
    }
    //

    // if select does not exist, print error
    const select = DATA_stays.find((item) => String(item._id) === String(id));
    if (!select) {
      ELMT_stay_page.innerHTML = "<h1>Could not find item matching ID</h1>";
    }
    //

    // print single card using TMPL_stay_page
    ELMT_stay_page.insertAdjacentHTML("beforeend", TMPL_stay_page(select));
    //
  }
  //
};
//
