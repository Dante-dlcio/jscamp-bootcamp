/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */

//recupero elemento padre
const contPadre = document.querySelector(".jobs-listings");

contPadre.addEventListener("click", (e) => {
  if (e.target.className === "button-apply-job") {
    const btnAplicar = e.target;
    btnAplicar.innerText = "¡Aplicado!";
    btnAplicar.classList.add("is-applied");
    btnAplicar.disabled = true;
  }
});
