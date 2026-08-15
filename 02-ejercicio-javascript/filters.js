/* Aquí va la lógica para filtrar los resultados de búsqueda */
const ubiFiltros = document.querySelector("#filter-location");

ubiFiltros.addEventListener("change", (e) => {
  let cards = document.querySelectorAll(".job-listing-card");
  cards.forEach((card) => {
    if (e.target.value === "" || card.dataset.modalidad === e.target.value) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
});

const xpFiltros = document.querySelector("#filter-experience-level");
