const likedListContainer = document.querySelector('.liked-list-container')
const likedHeroContainer = document.querySelector('.liked-hero-container')
const storedLikes = localStorage.getItem("likedList");
const likedList = storedLikes ? JSON.parse(storedLikes) : [];


import { activityTmpl } from "./activities.js"

const likedHeroTmpl = () => {
  return ` <img src="assets/img/heros/min-liste.jpg" alt="">
                  <h1>Min liste</h1>
                  <div class="liked-hero-desc">
                      <h2>Antal aktiviteter tilføjet: <br> <span class="added-counter">0</span></h2>
                      <p>Herunder kan du se listen over de aktiviteter som du har føjet til din liste</p>
                  </div>`; }


export const renderLikedHero = () => {
    if (likedHeroContainer) {
        likedHeroContainer.innerHTML = ""
        likedHeroContainer.insertAdjacentHTML("beforeend", likedHeroTmpl());

        const addedCounter = document.querySelector('.added-counter')

        addedCounter.innerHTML = likedList.length
    }

}

const emptyListTmpl = () => {
    return `<p class="empty-text">Du har ikke tilføjet nogle aktiviteter til din liste.</p>`
}



export const likedListRender = () => {

    if (likedList.length == 0) {
      likedListContainer.insertAdjacentHTML("beforeend", emptyListTmpl());
    }
    
    if (likedListContainer) {

        likedListContainer.innerHTML = ""
        likedList.forEach(item => {

            likedListContainer.insertAdjacentHTML("beforeend", activityTmpl(item))
            
        });
        
    };
    
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
    
    const listLikes = () => {

        if (likedListContainer) {
            const likeBtns = document.querySelectorAll(".like-btn");

            likeBtns.forEach((btn) => {
              btn.classList.add("liked");

              btn.addEventListener("click", (e) => {
                let likedID = e.currentTarget.id;
                const activityToRemove = likedList.find(
                  (activity) => activity._id == likedID
                );

                likedList.splice(activityToRemove, 1);

                localStorage.setItem("likedList", JSON.stringify(likedList));

                likedListRender()
                renderLikedHero()

                if (likedList.length == 0) {
                  localStorage.removeItem("likedList");
                  renderCounter()
                }
              });
            });
        }
      

    }
    
    listLikes()

}

