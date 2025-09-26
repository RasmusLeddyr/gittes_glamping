// assets/js/components/gitteIntro.js
import { GetData } from "../fetch.js";

/**
 * Bygger "Gitte-intro" sektionen på forsiden.
 * - Forsøger at hente indhold fra API (fx /about)
 * - Hvis API ikke svarer, bruges fallback-tekster
 * - Indsætter HTML i <main> eller i en container med id="gitte_intro"
 */
export async function renderGitteIntro() {
  // === 1. Find ud af om vi overhovedet skal køre koden ===
  // Tjekker om vi står på forsiden (body#forside) eller der findes et #gitte_intro element
  const isForside = document.body.id === "forside";
  const mount = document.querySelector("#gitte_intro") || (isForside && document.querySelector("main"));

  // Hvis vi ikke er på forsiden og heller ikke har et #gitte_intro element → stop
  if (!mount) return;

  // === 2. Default fallback-data (bruges hvis API fejler/ikke findes) ===
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

  // === 3. Prøv at hente indhold fra API ===
  try {
    // Her kunne I sætte jeres rigtige endpoint ind, fx:
    // const data = await GetData("https://glamping-rqu9j.ondigitalocean.app/about/", "data");
    const data = null; // ← lige nu sat til null = ingen API

    // Hvis API returnerer data og det ligner en liste med objekter
    if (data && Array.isArray(data) && data.length) {
      // Brug API-data hvis felterne findes, ellers behold fallback
      intro.title   = data[0].title   || intro.title;
      intro.body    = data[0].body    || intro.body;
      intro.ctaText = data[0].ctaText || intro.ctaText;
    }
  } catch (err) {
    // Hvis API fejler → vis advarsel i konsollen og brug fallback
    console.warn("[gitteIntro] Brugte fallback-tekster:", err);
  }

  // === 4. Byg HTML-udgaven af sektionen ===
  const html = `
    <section class="gitte-intro">
      <div class="gi-wrap">
        <!-- Overskrift -->
        <h2 class="gi-title">${intro.title}</h2>

        <!-- Brødtekst -->
        <p class="gi-text">
          ${intro.body}
        </p>

        <!-- Billede -->
        <figure class="gi-photo-wrap">
          <img
            class="gi-photo"
            src="assets/img/heros/gitte.jpg"
            alt="Gitte – smilende ved søen"
            loading="lazy"
          />
        </figure>

        <!-- Call-to-action knap -->
        <a href="ophold.html" class="btn gi-cta">${intro.ctaText}</a>
      </div>
    </section>
  `;

  // === 5. Indsæt HTML på siden ===
  // Hvis der findes et #gitte_intro element → erstat indholdet
  if (mount.id === "gitte_intro") {
    mount.innerHTML = html;
  } 
  // Ellers tilføj sektionen til sidst i <main>
  else {
    mount.insertAdjacentHTML("beforeend", html);
  }
}