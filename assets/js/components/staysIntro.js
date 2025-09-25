// assets/js/components/staysIntro.js
export function initStaysIntro() {
  // Kun på ophold-siden
  if (document.body.id !== "ophold") return;

  const main = document.querySelector("main");
  if (!main) return;

  // Brug eksisterende placeholder hvis den findes – ellers opret én øverst i <main>
  let host = document.querySelector("#stays-lead");
  if (!host) {
    host = document.createElement("section");
    host.id = "stays-lead";
    // placér introduktionen før kort-listen (#stays), hvis den findes
    const stays = document.querySelector("#stays");
    stays ? main.insertBefore(host, stays) : main.prepend(host);
  }

  // Indhold
  host.innerHTML = `
    <div class="stays-lead__box">
      <h2 class="stays-lead__title">Vi har ophold til<br/>enhver smag</h2>
      <p class="stays-lead__text">
        Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning.
        Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade
        batterierne i en naturskøn indstilling.
      </p>
      <p class="stays-lead__text">
        Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri.
        Vi ser frem til at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed.
      </p>
    </div>
  `;
}