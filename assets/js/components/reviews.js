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
const TMPL_review = (data) => {
  return `
<div class="review">
    <div class="title">
        <p>${data.name}, ${data.age} år</p>
        <p>Har været på ${data.stay}</p>
    </div>
    <p>${data.review}</p>
</div>
`;
};
//

// export code
export const Reviews = () => {
  // check if page is "index"
  if (ELMT_reviews) {
    DATA_reviews.forEach((item) => {
      ELMT_reviews.insertAdjacentHTML("beforeend", TMPL_review(item));
    });
  }
  //
};
//
