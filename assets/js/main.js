// import and run component functions
import { Stays } from "./components/stays.js";
Stays();
//
import { initTopbar } from "./components/topbar.js";
import { initSlider } from "./components/slider.js";
import { initFooter } from "./components/footer.js";

console.log("[main.js] loaded");

initTopbar();
initSlider();
initFooter();
