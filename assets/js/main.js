// import and run component functions

import { renderActivities } from "./components/activities.js";
renderActivities();
import { likedListRender } from "./components/myList.js";
likedListRender();
import { renderLikedHero } from "./components/myList.js";
renderLikedHero();

import { Stays } from "./components/stays.js";
Stays();

import { Reviews } from "./components/reviews.js";
Reviews();

import { initTopbar } from "./components/topbar.js";
initTopbar();
import { initSlider } from "./components/slider.js";
initSlider();
import { initFooter } from "./components/footer.js";
initFooter();
