// import functions
import { GetData } from "../fetch.js";
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
    <a href="">LÆS MERE</a>
</div>
`;
};
const TMPL_stay_page = (data) => {};
//

// export code
export const Stays = () => {
  // check if page is "ophold"
  if (ELMT_stay_list) {
    const cards = ELMT_stay_list.querySelector(".cards");
    DATA_stays.forEach((item) => {
      cards.insertAdjacentHTML("beforeend", TMPL_stay_card(item));
    });
  }
  //

  // check if page is "ophold-single"
  if (ELMT_stay_page) {
  }
  //
};
//
