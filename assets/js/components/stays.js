// import functions
import { GetData } from "../fetch.js";
//

// define variables
const DATA_stays = await GetData("assets/data/stays.json");
const section = document.querySelector("#stays");
const cards = section.querySelector(".cards");
//

// set up HTML templates
const TMPL_stay_card = (item) => {
  return `
<div class="card">
    <div class="title">
        <h1>${item.title}</h1>
        <p>${item.people}</p>
        <p>${item.price}</p>
    </div>
    <img src="assets/img/ophold/${item.image}" alt="${item.alt}" />
    <a href="">LÆS MERE</a>
</div>
`;
};
//

// export code
export const Stays = () => {
  if (section && cards) {
    DATA_stays.forEach((item) => {
      cards.insertAdjacentHTML("beforeend", TMPL_stay_card(item));
    });
  }
};
//
