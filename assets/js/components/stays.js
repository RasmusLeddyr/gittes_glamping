// import functions
import { GetData } from "../fetch.js";
import { Search } from "./search.js";
//

// get API data
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/stays/",
  "data"
);

// define HTML variables
const ELMT_stays = document.querySelector("#stays");
const ELMT_stay_single = document.querySelector("#stay_page");
//

// set HTML template for price tags
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
  //

  // set HTML template for stay cards
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
  //

  // set HTML template for stay single page
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
<button type="button" class="btn js-book" 
data-id="${data._id}" 
data-title="${data.title}">
  BOOK NU
</button>
`;
};
//

// fetch URL data, export for use in other scripts
export const SingleStayData = () => {
  // define placeholder variables
  let title = "";
  let image = "";
  let error = "";
  let select = "";
  //

  // find id from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  //

  // fill title and image data if id exists. fill error data if not
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

// export function
export async function Stays() {
  // if "#stays" exists; create search bar using the imported "Search" function
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
  //

  // if "#stay_page" exists; run code
  if (ELMT_stay_single) {
    // fetch data
    const [title, image, error, select] = SingleStayData();
    //

    // if "error" has a value; print it into HTML. otherwise; print single stay template
    if (error) {
      ELMT_stay_single.innerHTML = error;
    } else {
      ELMT_stay_single.insertAdjacentHTML(
        "beforeend",
        TMPL_stay_single(select)
      );

      // Mathias code
      const bookBtn = ELMT_stay_single.querySelector(".js-book");
      if (bookBtn) {
        bookBtn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          const title = e.currentTarget.dataset.title;
          localStorage.setItem("selectedStay", JSON.stringify({ id, title }));
          window.location.href = "kontakt.html";
        });
      }
      //
    }
    //
  }
  //
}
//
