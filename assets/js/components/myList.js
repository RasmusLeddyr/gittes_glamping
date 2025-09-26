import { activityTmpl } from "./activities.js";

const likedListContainer = document.querySelector(".liked-list-container");
const likedHeroContainer = document.querySelector(".liked-hero-container");

const likedHeroTmpl = () => `
  <img src="assets/img/heros/min-liste.jpg" alt="">
  <h1>Min liste</h1>
  <div class="liked-hero-desc">
      <h2>Antal aktiviteter tilføjet: <br>
          <span class="added-counter">0</span>
      </h2>
      <p>Herunder kan du se listen over de aktiviteter som du har føjet til din liste</p>
  </div>
`;

const emptyListTmpl = () =>
  `<p class="empty-text">Du har ikke tilføjet nogle aktiviteter til din liste.</p>`;

export const renderLikedHero = () => {
  if (!likedHeroContainer) return;
  
  likedHeroContainer.innerHTML = likedHeroTmpl();
  
  //henter likede aktiviteter og gemmer dem i array
  const storedLikes = localStorage.getItem("likedList");
  const likedList = storedLikes ? JSON.parse(storedLikes) : [];
  
  const addedCounter = document.querySelector(".added-counter");
  if (addedCounter) addedCounter.textContent = likedList.length;

};


export const likedListRender = () => {
  if (!likedListContainer) return;

  const storedLikes = localStorage.getItem("likedList");
  const likedList = storedLikes ? JSON.parse(storedLikes) : [];

  likedListContainer.innerHTML = "";

  if (likedList.length === 0) {
    likedListContainer.insertAdjacentHTML("beforeend", emptyListTmpl());
    return;
  }

  likedList.forEach((item) => {
    likedListContainer.insertAdjacentHTML("beforeend", activityTmpl(item));
  });


  document.querySelectorAll(".activity-readmore").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.nextElementSibling;
      text.classList.toggle("show");
      btn.parentElement.parentElement.classList.toggle("show");
      btn.textContent = text.classList.contains("show")
        ? "Læs Mindre"
        : "Læs Mere";
    });
  });

 
    document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.classList.add("liked");
    btn.addEventListener("click", (e) => {
      const likedID = e.currentTarget.id;
      const index = likedList.findIndex((act) => act._id == likedID);
      if (index > -1) likedList.splice(index, 1);

      if (likedList.length > 0) {
        localStorage.setItem("likedList", JSON.stringify(likedList));
      } else {
        localStorage.removeItem("likedList");
      }

      likedListRender();
      renderLikedHero();
    });
  });
};
