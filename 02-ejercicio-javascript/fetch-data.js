/* Aquí va la lógica para mostrar los resultados de búsqueda */

const jobsList = document.querySelector(".jobs-listings");

console.log(jobsList);

fetch("./data.json")
  .then((res) => res.json())
  .then((jobs) =>
    jobs.forEach((job) => {
      const technology = job.data.technology;
      const modalidad = job.data.modalidad;
      const nivel = job.data.nivel;
      const li = document.createElement("li");
      const article = document.createElement("article");
      article.className = "job-listing-card";
      article.dataset.technology = technology;
      article.dataset.modalidad = modalidad;
      article.dataset.nivel = nivel;
      li.appendChild(article);
      article.innerHTML = `
      <div>
      <h3>${job.titulo}</h3>
      <small>${job.empresa} | ${job.ubicacion}</small>
      <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>
    `;
      jobsList.appendChild(li);
    }),
  );
