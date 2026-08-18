/* Aquí va la lógica para filtrar los resultados de búsqueda */
const techFiltros = document.querySelector("#filter-technology");
const ubiFiltros = document.querySelector("#filter-location");
const xpFiltros = document.querySelector("#filter-experience-level");

const combiFiltros = () => {
  const cards = document.querySelectorAll(".job-listing-card");

  const tecnoSeleccionada = techFiltros.value;
  const ubiSeleccionada = ubiFiltros.value;
  const xpSeleccionada = xpFiltros.value;

  cards.forEach((card) => {
    let tecnos = card.dataset.technology;
    let ubis = card.dataset.modalidad;
    let xps = card.dataset.nivel;
    let actualTec = tecnos.split(",");

    const resultTecnos =
      actualTec.includes(tecnoSeleccionada) || tecnoSeleccionada === "";

    const resultUbi = ubiSeleccionada === ubis || ubiSeleccionada === "";

    const resultXps = xpSeleccionada === xps || xpSeleccionada === "";

    const quitaHidden = resultTecnos && resultUbi && resultXps;

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
