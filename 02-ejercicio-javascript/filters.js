/* Aquí va la lógica para filtrar los resultados de búsqueda */
const techFiltros = document.querySelector("#filter-technology");
const ubiFiltros = document.querySelector("#filter-location");
const xpFiltros = document.querySelector("#filter-experience-level");

console.log(
  "esto es tecnologías",
  techFiltros,
  "esto es ubicaciones",
  ubiFiltros,
  "esto es experiencia",
  xpFiltros,
);

const cards = document.querySelectorAll(".job-listing-card");

const combiFiltros = techFiltros.addEventListener("change", (tecnoChange) => {
  console.log(tecnoChange, "Acá cambiaste filtro");
});

// ubiFiltros.addEventListener("change", (e) => {
//   let cards = document.querySelectorAll(".job-listing-card");
//   cards.forEach((card) => {
//     if (e.target.value === "" || card.dataset.modalidad === e.target.value) {
//       card.classList.remove("is-hidden");
//     } else {
//       card.classList.add("is-hidden");
//     }
//   });
// });
