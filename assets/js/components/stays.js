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
const TMPL_stay_card = (data) => {
  let price_tag = "show"
  let discount_tag = "hide"
  if (data.discountInPercent > 0){
    price_tag = "cross"
    discount_tag = "show"
  }
  return `
<div class="card">
    <div class="title">
        <h1>${data.title}</h1>
        <p>${data.numberOfPersons} personer</p>
        <p><span class="${price_tag}">${data.price}</span><span class="${discount_tag}"> <span class="discount">${Math.round(data.price - (data.price * (data.discountInPercent / 100)))}</span> (${data.discountInPercent}%)</span>,-</p>
    </div>
    <img src="${data.image}" alt="" />
    <a href="ophold-single.html?id=${encodeURIComponent(data._id)}">LÆS MERE</a>
</div>
`;
};
const TMPL_stay_single = (data) => {
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

const Fetch = () => {
  console.log("fetch function")
  let title = ""
  let image = ""
  let error = ""
    // find id from url
    const params = new URLSearchParams(window.location.search);
    //

    // if id does not exist, print error
    const id = params.get("id");
    if (id) {
      const select = DATA_stays.find((item) => String(item._id) === String(id));
      if (select) {
        title = select.title
        image = select.image
      } else {
        error = "<h1>Could not find item matching ID</h1>";
      }
    } else {
      error = "<h1>URL did not provide ID</h1>";
    }

    return [title, image, error];
    // print single card using TMPL_stay_single
    ELMT_stay_single.insertAdjacentHTML("beforeend", TMPL_stay_single(select));
     return { title, image };
    //
}

// export code
export async function Stays () {
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
    const data = Fetch()
    console.log(data)
  }
  //
};
//

export function SingleStayData() {
return Fetch()
}