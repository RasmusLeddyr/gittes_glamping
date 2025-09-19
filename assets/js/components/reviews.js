// import functions
import { GetData } from "../fetch.js";
//

// define variables
const DATA_reviews = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/reviews/",
  "data"
);
const ELMT_reviews = document.querySelector("#reviews");
//

// set up HTML templates
const TMPL_page = (data) => {
  return `
<div class="heading">Vores gæster udtaler</div>
<ul class="review_list"></ul>
`;
};
const TMPL_review = (data) => {
  return `
<li class="review">
    <div class="title">
        <p>${data.name}, ${data.age} år</p>
        <p>Har været på ${data.stay}</p>
    </div>
    <p class="desc">${data.review}</p>
</li>
`;
};
//

// export code
export const Reviews = () => {
  // check if page is "index"
  if (ELMT_reviews) {
    ELMT_reviews.insertAdjacentHTML("beforeend", TMPL_page());
    const list = ELMT_reviews.querySelector(".review_list");
    DATA_reviews.forEach((item) => {
      list.insertAdjacentHTML("beforeend", TMPL_review(item));
    });
  }
  //
};
//
