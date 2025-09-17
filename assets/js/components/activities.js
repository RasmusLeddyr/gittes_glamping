import { GetData } from "../fetch.js";
const activityHero = document.querySelector(".activity-hero");
const activityCardContainer = document.querySelector(
  ".activity-card-container"
);

const activities = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/activities/",
  "data"
);

const activityHeroTmpl = () => {
  return ` <img src="assets/img/heros/aktiviteter.jpg" alt="">
                  <h1>Aktiviteter</h1>
                  <div class="activity-hero-desc">
                      <h2>Ingen skal kede sig hos Gitte</h2>
                      <p>Glamping er mere end blot en indkvartering – det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig en chancen for at finde indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker.</p>
                  </div>`;
};

const activityTmpl = (activity) => {
  return `
    <div class="activity-card">
        <div class="activity-title">${activity.title}</div>
            <img src="${activity.image}" alt="" class="activity-img">
        <div class="activity-info">
            <p class="activity-day">${activity.date}</p>
            <p class="activity-time">kl. ${activity.time}</p>
            <button class="activity-readmore btn-clear">Læs mere</button>
            <p class="activity-readmore-text">${activity.description}</p>
        </div>
        <svg fill="#B9C6C4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" alt="Heart Icon" class="like-btn" id="${activity._id}"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
    </div>
    `;
};

let likedArray = JSON.parse(localStorage.getItem("likedList")) || [];

export const renderActivities = () => {
  if (activityHero) {
    activityHero.insertAdjacentHTML("beforeend", activityHeroTmpl());
  }

  if (activityCardContainer) {
    activities.forEach((activity) => {
      activityCardContainer.insertAdjacentHTML(
        "beforeend",
        activityTmpl(activity)
      );
    });
  }

  const readMoreButtons = document.querySelectorAll(".activity-readmore");

  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.nextElementSibling;
      text.classList.toggle("show");
      btn.parentElement.parentElement.classList.toggle("show");

      if (text.classList.contains("show")) {
        btn.textContent = "Læs Mindre";
      } else {
        btn.textContent = "Læs Mere";
      }
    });
  });

  const likeButton = () => {
    const likeBtns = document.querySelectorAll(".like-btn");

    likeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let activityID = e.currentTarget.id;
        const activityToAdd = activities.find(
          (activity) => activity._id == activityID
        );

        const exist = likedArray.find((liked) => liked._id == activityID);

        if (!exist) {
          likedArray.push(activityToAdd);
          localStorage.setItem("likedList", JSON.stringify(likedArray));
          btn.classList.toggle("liked");
        } else {
          console.log("Aktiviteten findes allerede i like-listen");
          btn.classList.toggle("liked");
          likedArray.splice(activityToAdd, 1);
          if (likedArray.length == 0) {
            localStorage.removeItem("likedList");
          } else {
            localStorage.setItem("likedList", JSON.stringify(likedArray));
          }
        }
      });
    });
  };

  likeButton();
};
