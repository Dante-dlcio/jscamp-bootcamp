/* Aquí va la lógica para filtrar los resultados de búsqueda */
const techFiltros = document.querySelector("#filter-technology");
const ubiFiltros = document.querySelector("#filter-location");
const xpFiltros = document.querySelector("#filter-experience-level");
const searchbar = document.querySelector("#empleos-search-input");

const combiFiltros = () => {
  const cards = document.querySelectorAll(".job-listing-card");

  const tecnoSeleccionada = techFiltros.value;
  const ubiSeleccionada = ubiFiltros.value;
  const xpSeleccionada = xpFiltros.value;
  const valorBusqueda = searchbar.value.toLowerCase();

  cards.forEach((card) => {
    let tecnos = card.dataset.technology;
    let ubis = card.dataset.modalidad;
    let xps = card.dataset.nivel;
    let actualTec = tecnos.split(",");
    let titulos = card.querySelector("h3").textContent.toLowerCase();

    console.log(titulos);

    const resultBusqueda = titulos.includes(valorBusqueda);

    const resultTecnos =
      actualTec.includes(tecnoSeleccionada) || tecnoSeleccionada === "";

    const resultUbi = ubiSeleccionada === ubis || ubiSeleccionada === "";

    const resultXps = xpSeleccionada === xps || xpSeleccionada === "";

    const quitaHidden =
      resultTecnos && resultUbi && resultXps && resultBusqueda;

    if (quitaHidden === true) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
};
techFiltros.addEventListener("change", combiFiltros);
ubiFiltros.addEventListener("change", combiFiltros);
xpFiltros.addEventListener("change", combiFiltros);
searchbar.addEventListener("input", combiFiltros);

console.log(searchbar, "acá ameu");

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
