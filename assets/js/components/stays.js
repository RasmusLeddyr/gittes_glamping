// import functions
import { GetData } from "../fetch.js";
//

// define variables
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/stays/",
  "data"
);
const ELMT_stays = document.querySelector("#stays");
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
  if (ELMT_stays) {
    const cards = ELMT_stays.querySelector(".cards");
    DATA_stays.forEach((item) => {
      cards.insertAdjacentHTML("beforeend", TMPL_stay_card(item));
    });
  }
};
//
