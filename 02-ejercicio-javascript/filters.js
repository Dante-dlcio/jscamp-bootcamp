/* Aquí va la lógica para filtrar los resultados de búsqueda */
const techFiltros = document.querySelector("#filter-technology");
const ubiFiltros = document.querySelector("#filter-location");
const xpFiltros = document.querySelector("#filter-experience-level");
const searchbar = document.querySelector("#empleos-search-input");

// const combiFiltros = () => {
//   const cards = document.querySelectorAll(".job-listing-card");
//
//   const tecnoSeleccionada = techFiltros.value;
//   const ubiSeleccionada = ubiFiltros.value;
//   const xpSeleccionada = xpFiltros.value;
//   const valorBusqueda = searchbar.value.toLowerCase();
//
//   cards.forEach((card) => {
//     let tecnos = card.dataset.technology;
//     let ubis = card.dataset.modalidad;
//     let xps = card.dataset.nivel;
//     let actualTec = tecnos.split(",");
//     let titulos = card.querySelector("h3").textContent.toLowerCase();
//
//     console.log(titulos);
//
//     const resultBusqueda = titulos.includes(valorBusqueda);
//
//     const resultTecnos =
//       actualTec.includes(tecnoSeleccionada) || tecnoSeleccionada === "";
//
//     const resultUbi = ubiSeleccionada === ubis || ubiSeleccionada === "";
//
//     const resultXps = xpSeleccionada === xps || xpSeleccionada === "";
//
//     const quitaHidden =
//       resultTecnos && resultUbi && resultXps && resultBusqueda;
//
//     if (quitaHidden === true) {
//       card.classList.remove("is-hidden");
//     } else {
//       card.classList.add("is-hidden");
//     }
//   });
// };
// console.log(searchbar, "acá ameu");

// Otra manera de hacer lo mismo pero más simplificado:
const aplicarFiltros = () => {
  const cards = document.querySelectorAll(".job-listing-card");
  const tecno = techFiltros.value;
  const ubicacion = ubiFiltros.value;
  const experiencia = xpFiltros.value;
  const busqueda = searchbar.value.toLowerCase();

  cards.forEach((card) => {
    const tecnologias = card.dataset.technology.split(",");
    const titulo = card.querySelector("h3").textContent.toLowerCase();

    const coincideTecno = tecnologias.includes(tecno) || tecno === "";
    const coincideUbi = card.dataset.modalidad === ubicacion || ubicacion === "";
    const coincideXp = card.dataset.nivel === experiencia || experiencia === "";
    const coincideBusqueda = titulo.includes(busqueda);

    // Muestra u oculta la card según si cumple con todos los filtros
    card.classList.toggle(
      "is-hidden",
      !(coincideTecno && coincideUbi && coincideXp && coincideBusqueda),
    );
  });
};

techFiltros.addEventListener("change", aplicarFiltros);
ubiFiltros.addEventListener("change", aplicarFiltros);
xpFiltros.addEventListener("change", aplicarFiltros);
searchbar.addEventListener("input", aplicarFiltros);

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