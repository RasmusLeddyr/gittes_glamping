// assets/js/components/staysIntro.js
export function initStaysIntro() {
  // Kun på ophold-siden
  if (document.body.id !== "ophold") return;

  const stays_lead = document.querySelector("#stays-lead");
  if (!stays_lead) return;

  stays_lead.innerHTML = `
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
