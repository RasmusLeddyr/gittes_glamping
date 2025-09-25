// import functions
import { GetData } from "../fetch.js";
import { Search } from "./search.js";
//

// define variables
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/stays/",
  "data"
);
const ELMT_stays = document.querySelector("#stays");
const ELMT_stay_single = document.querySelector("#stay_page");
//

// set up HTML templates
const TMPL_stay_price = (data) => {
  let price_tag = "price";
  let discount_tag = "hide";
  if (data.discountInPercent > 0) {
    price_tag = "cross";
    discount_tag = "discount";
  }
  return `
<span class="${price_tag}">${
    data.price
  }</span><span class="${discount_tag}"> <span class="price">${Math.round(
    data.price - data.price * (data.discountInPercent / 100)
  )} </span>(${data.discountInPercent}%)</span>,-
`;
};

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
    <a href="ophold-single.html?id=${encodeURIComponent(data._id)}">LÆS MERE</a>
</div>
`;
};

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
<button class="btn">BOOK NU</button>
`;
};
//

//
const FetchURLData = () => {
  // define variables
  let title = "";
  let image = "";
  let error = "";
  let select = "";
  //

  // find id from url
  const params = new URLSearchParams(window.location.search);
  //

  // if id does not exist, print error
  const id = params.get("id");
  if (id) {
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
  //

  // return data
  return [title, image, error, select];
  //
};
//

// export code
export async function Stays() {
  // check if page is "ophold"
  if (ELMT_stays) {
    // print cards using TMPL_stay_card
    const cards = ELMT_stays.querySelector(".cards");
    Search({
      bar_parent: ELMT_stays,
      bar_placement: "afterbegin",
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
  if (ELMT_stay_single) {
    const [title, image, error, select] = SingleStayData();
    if (error) {
      ELMT_stay_single.innerHTML = error;
    } else {
      ELMT_stay_single.insertAdjacentHTML(
        "beforeend",
        TMPL_stay_single(select)
      );
    }
  }
  //
}
//

// export single stay data for header
export function SingleStayData() {
  return FetchURLData();
}
//
