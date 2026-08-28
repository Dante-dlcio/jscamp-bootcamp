/* Aquí va la lógica para mostrar los resultados de búsqueda */

const jobsList = document.querySelector(".jobs-listings");

// console.log(jobsList);

// fetch("./data.json")
//   .then((res) => res.json())
//   .then((jobs) =>
//     jobs.forEach((job) => {
//       const technology = job.data.technology;
//       const modalidad = job.data.modalidad;
//       const nivel = job.data.nivel;
//       const li = document.createElement("li");
//       const article = document.createElement("article");
//       article.className = "job-listing-card";
//       article.dataset.technology = technology;
//       article.dataset.modalidad = modalidad;
//       article.dataset.nivel = nivel;
//       li.appendChild(article);
//       article.innerHTML = `
//       <div>
//       <h3>${job.titulo}</h3>
//       <small>${job.empresa} | ${job.ubicacion}</small>
//       <p>${job.descripcion}</p>
//     </div>
//     <button class="button-apply-job">Aplicar</button>
//     `;
//       jobsList.appendChild(li);
//     }),
//   );

/* Lo que hiciste está genial! Vamos a mostrarte una manera más simplificada y clara de hacerlo, por si te interesa: */
fetch("./data.json")
  .then((res) => res.json())
  .then((jobs) => jobs.forEach((job) => renderJob(job))) // pinta cada empleo
  .catch((error) => console.error("No se pudieron cargar los empleos:", error)); // maneja errores de red

// Crea el <li> de un empleo y lo agrega a la lista. Lo hacemos como función para que quede limpio el fetch
function renderJob(job) {
  const { titulo, empresa, ubicacion, descripcion, data } = job;
  const li = document.createElement("li");
  li.innerHTML = `
    <article class="job-listing-card">
      <div>
        <h3>${titulo}</h3>
        <small>${empresa} | ${ubicacion}</small>
        <p>${descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
    </article>
  `;
  // Guardamos los dataset
  li.firstElementChild.dataset.technology = data.technology;
  li.firstElementChild.dataset.modalidad = data.modalidad;
  li.firstElementChild.dataset.nivel = data.nivel;
  jobsList.appendChild(li);
}