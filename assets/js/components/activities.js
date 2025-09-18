let likedArray = JSON.parse(localStorage.getItem("likedList")) || [];

export const renderActivities = () => {
  // Hero
  if (activityHero) {
    activityHero.insertAdjacentHTML("beforeend", activityHeroTmpl());
  }

  // Cards
  if (activityCardContainer) {
    activities.forEach((activity) => {
      activityCardContainer.insertAdjacentHTML(
        "beforeend",
        activityTmpl(activity)
      );
    });
  }

  // Read more toggle
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

  // Like buttons
  document.querySelectorAll(".like-btn").forEach((btn) => {
    const activityID = btn.id;

    // Sæt initial "liked"-state
    if (likedArray.some((item) => item._id === activityID)) {
      btn.classList.add("liked");
    }

    btn.addEventListener("click", () => {
      const index = likedArray.findIndex((item) => item._id === activityID);

      if (index === -1) {
        // Tilføj aktivitet
        const activityToAdd = activities.find((act) => act._id === activityID);
        if (activityToAdd) {
          likedArray.push(activityToAdd);
          btn.classList.add("liked");
        }
      } else {
        // Fjern aktivitet
        likedArray.splice(index, 1);
        btn.classList.remove("liked");
      }

      // Gem / fjern localStorage
      if (likedArray.length > 0) {
        localStorage.setItem("likedList", JSON.stringify(likedArray));
      } else {
        localStorage.removeItem("likedList");
      }
    });
  });
};
