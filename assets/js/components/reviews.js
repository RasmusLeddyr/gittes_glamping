// import functions
import { GetData } from "../fetch.js";
//

// define variables
const DATA_stays = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/reviews/",
  "data"
);
const ELMT_reviews = document.querySelector("#review");
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
//

// export code
export const Stays = () => {
  // check if page is "index"
  if (ELMT_reviews) {
    const cards = ELMT_stay_list.querySelector(".cards");
    DATA_stays.forEach((item) => {
      cards.insertAdjacentHTML("beforeend", TMPL_stay_card(item));
    });
  }
  //
};
//
