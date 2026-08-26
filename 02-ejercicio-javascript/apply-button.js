/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */

//recupero elemento padre
const contPadre = document.querySelector(".jobs-listings");

// contPadre.addEventListener("click", (e) => {
//   if (e.target.className === "button-apply-job") {
//     const btnAplicar = e.target;
//     btnAplicar.innerText = "¡Aplicado!";
//     btnAplicar.classList.add("is-applied");
//     btnAplicar.disabled = true;
//   }
// });

contPadre.addEventListener("click", (e) => {
  const btnAplicar = e.target.closest(".button-apply-job"); // con closest es mas robusto. Lo que hiciste no está mal! Es solo una alternativa.
  if (!btnAplicar) return; // Evitamos el IF con mucho código dentro haciendo la negación. Si no es el botón de aplicar, no hagas nada. Y si lo es, sigue con la ejecución del código.

  btnAplicar.textContent = "¡Aplicado!";
  btnAplicar.classList.add("is-applied");
  btnAplicar.disabled = true;
});