// assets/js/components/activities.js
import { GetData } from "../fetch.js";
import { Search } from "./search.js";

const activityHero = document.querySelector(".activity-hero");
const activityCardContainer = document.querySelector(".activity-card-container");
const activitySingleContainer = document.querySelector(".activity-single-container");

const activities = await GetData(
  "https://glamping-rqu9j.ondigitalocean.app/activities/",
  "data"
);

const activityHeroTmpl = () => `
  <img src="assets/img/heros/aktiviteter.jpg" alt="">
  <h1>Aktiviteter</h1>
  <div class="activity-hero-desc">
    <h2>Ingen skal kede sig hos Gitte</h2>
    <p>
      Glamping er mere end blot en indkvartering – det er en mulighed for at fordybe dig i naturen
      og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en
      oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som
      vinsmagning eller morgenyoga, der giver dig en chancen for at finde indre ro og balance i
      naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker.
    </p>
  </div>
`;

export const activityTmpl = (activity) => `
  <div class="activity-card">
    <div class="activity-title">${activity.title}</div>
    <img src="${activity.image}" alt="" class="activity-img">
    <div class="activity-info">
      <p class="activity-day">${activity.date}</p>
      <p class="activity-time">kl. ${activity.time}</p>
      <button class="activity-readmore btn-clear">Læs mere</button>
      <p class="activity-readmore-text">${activity.description}</p>
    </div>
    <a href="aktivitet-single.html?id=${encodeURIComponent(activity._id)}">
      <button class="single-page-open btn">Se Aktivitet</button>
    </a>
    <svg fill="#B9C6C4" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512" alt="Heart Icon"
         class="like-btn" id="${activity._id}">
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9
        27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347
        36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2
        0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
    </svg>
  </div>
`;

const activitySingleTmpl = (activity) => `
  <div class="activity-card">
    <div class="activity-title s">${activity.title}</div>
    <img src="${activity.image}" alt="" class="activity-img s">
    <div class="activity-info s">
      <p class="activity-day s">${activity.date}</p>
      <p class="activity-time s">kl. ${activity.time}</p>
      <p class="activity-readmore-text show">${activity.description}</p>
    </div>
  </div>
`;

//opretter localstorage variablet
let likedArray = JSON.parse(localStorage.getItem("likedList")) || [];

// === RENDER FUNKTION ===
export const renderActivities = () => {
  // print activity-hero hvis sidens id er aktiviteter
  if (document.body.id === "aktiviteter") {
    if (activityHero) {
      activityHero.insertAdjacentHTML("beforeend", activityHeroTmpl());
    }

    //hvis cardcontainer så print hver aktivitet i cardcontainer
    if (activityCardContainer) {
      Search({
        bar_parent: activityCardContainer,
        bar_placement: "beforebegin",
        list: activities,
        output: activityCardContainer,
        template: activityTmpl,
        fields: ["title"],
        placeholder: "Søg aktivitet.",
      });
    }
  }

  // === ENKELTSIDE ===
  //hvis på enkeltside udksriv aktivitet med id fra URL
  if (document.body.id === "aktivitet-single") {
    if (activitySingleContainer) {
      const searchBar = new URLSearchParams(window.location.search);
      const id = searchBar.get("id");

      //fejlmelding hvis ingen id i URL
      if (!id) {
        activitySingleContainer.insertAdjacentHTML(
          "beforeend",
          `<div>Kunne ikke finde aktiviteten (mangler id i URL)</div>`
        );
        return;
      }

      const selectedActivity = activities.find((item) => item._id == id);

      //fejlmelding hvis ingen aktivitet matcher id 
      if (!selectedActivity) {
        activitySingleContainer.insertAdjacentHTML(
          "beforeend",
          `<div>Kunne ikke finde aktiviteten (id matcher ingen aktivitet)</div>`
        );
        return;
      }

      //hvis ingen fejl blev meldt, print aktiviteten
      activitySingleContainer.insertAdjacentHTML(
        "beforeend",
        activitySingleTmpl(selectedActivity)
      );
    }
  }

    // pakker alle læsmere knappe ned i en array 
  const readMoreButtons = document.querySelectorAll(".activity-readmore");
  //foreach'er over knapperne og tilføjer klikevent
  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      //pakker teksten der hører til knappen ned i variabel
      const text = btn.nextElementSibling;
      //tilføjer css-classen der viser teksten
      text.classList.toggle("show");
      //parent.parent giver mig activitycard
      btn.parentElement.parentElement.classList.toggle("show");

      //hvis tekst bliver vist siger knappen læs mindre, og omvendt
      btn.textContent = text.classList.contains("show")
        ? "Læs Mindre"
        : "Læs Mere";
    });
  });

  const likeButton = () => {
    const likeBtns = document.querySelectorAll(".like-btn");
    likeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        //henter id fra den trykte knap
        let activityID = e.currentTarget.id;
        //finder aktiviteten der passer med id'et
        const activityToAdd = activities.find(
          (activity) => activity._id == activityID
        );

        //laver et variabel der fortæller om min aktivitet allerede findes i localstorage
        const exist = likedArray.find((liked) => liked._id == activityID);

        //hvis ikke den allerede findes tilføjes den til likedArray og localstorage, og opdatere likeknappen til at vise den er liked
        if (!exist) {
          likedArray.push(activityToAdd);
          localStorage.setItem("likedList", JSON.stringify(likedArray));
          btn.classList.toggle("liked");
        } else {
          //hvis den allerede findes fjernes den fra likes
          btn.classList.toggle("liked");
          likedArray = likedArray.filter((item) => item._id !== activityID);
          if (likedArray.length === 0) {
            localStorage.removeItem("likedList");
          } else {
            localStorage.setItem("likedList", JSON.stringify(likedArray));
          }
        }
      });
    });
  };
 // kalder funktionen
  likeButton();
};