import { GetData } from "../fetch.js"
const activityHero = document.querySelector('.activity-hero')
const activityCardContainer = document.querySelector('.activity-card-container')

const activities = await GetData("https://glamping-rqu9j.ondigitalocean.app/activities/");

const activityHeroTmpl = () => {
        return ` <img src="assets/img/heros/aktiviteter.jpg" alt="">
                  <h1>Aktiviteter</h1>
                  <div class="activity-hero-desc">
                      <h2>Ingen skal kede sig hos Gitte</h2>
                      <p>Glamping er mere end blot en indkvartering – det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig en chancen for at finde indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker.</p>
                  </div>`   
}

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
    </div>
    `;
}

export const renderActivities = () => {
    
    if (activityHero) {
        activityHero.insertAdjacentHTML('beforeend', activityHeroTmpl())
    }

    if (activityCardContainer) {
        activities.data.forEach(activity => {

            activityCardContainer.insertAdjacentHTML('beforeend', activityTmpl(activity))
            
        });
    }

    const readMoreButtons = document.querySelectorAll('.activity-readmore')


    readMoreButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            const text = btn.nextElementSibling;
            text.classList.toggle("show");
            btn.parentElement.parentElement.classList.toggle("show")

            if (text.classList.contains('show')) {
                btn.textContent = "Læs Mindre"
            } else {
                btn.textContent = "Læs Mere"
            }

            
        })

    
    });

}