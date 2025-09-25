// assets/js/components/gitteIntro.js
import { GetData } from "../fetch.js";

/**
 * Henter tekstindhold fra API (hvis tilgængeligt) og bygger "Gitte-intro" sektionen.
 * Hvis API ikke svarer, bruges fallback-tekster.
 */
export async function renderGitteIntro() {
  // kør KUN på forsiden (eller hvis der findes et anker #gitte_intro)
  const isForside = document.body.id === "forside";
  const mount = document.querySelector("#gitte_intro") || (isForside && document.querySelector("main"));
  if (!mount) return;

  // Prøv at hente data (tilpas URL hvis I har en anden endpoint)
  let intro = {
    title: "Kom og prøv<br/>glamping hos Gitte!",
    body:
      "Vi er stolte af at byde dig velkommen til Gitte’s Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. " +
      "Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. " +
      "Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller solo-eventyrer. " +
      "Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. " +
      "Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter.",
    ctaText: "SE VORES OPHOLD"
  };

  try {
    // Hvis I har et rigtigt endpoint, sæt det her:
    // Eksempel: const data = await GetData("https://glamping-rqu9j.ondigitalocean.app/about/", "data");
    const data = null; // <- lad stå som null hvis ikke I har endpoint endnu
    if (data && Array.isArray(data) && data.length) {
      // Forventede felter: title, body, ctaText
      intro.title   = data[0].title   || intro.title;
      intro.body    = data[0].body    || intro.body;
      intro.ctaText = data[0].ctaText || intro.ctaText;
    }
  } catch (err) {
    // falder bare tilbage til fallback-tekster
    console.warn("[gitteIntro] Brugte fallback-tekster:", err);
  }

  const html = `
    <section class="gitte-intro">
      <div class="gi-wrap">
        <h2 class="gi-title">${intro.title}</h2>

        <p class="gi-text">
          ${intro.body}
        </p>

        <figure class="gi-photo-wrap">
          <img
            class="gi-photo"
            src="assets/img/heros/gitte.jpg"
            alt="Gitte – smilende ved søen"
            loading="lazy"
          />
        </figure>

        <a href="ophold.html" class="btn gi-cta">${intro.ctaText}</a>
      </div>
    </section>
  `;

  // Hvis #gitte_intro eksisterer, udskriv i det; ellers tilføj sidst i <main>
  if (mount.id === "gitte_intro") mount.innerHTML = html;
  else mount.insertAdjacentHTML("beforeend", html);
}