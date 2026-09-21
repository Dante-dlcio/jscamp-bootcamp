import { randomUUID } from "node:crypto";
import { writeFileSync } from "node:fs";
import jobs from "../jobs.json" with { type: "json" };

/* Aquí deberá ir la lógica de tu modelo */
/* Recuerda que el modelo SOLO debe manejar la lógica de los datos, en este caso nuestro JSON */

// Vamos a persistir el estado actual del array en jobs.json: sin esto los cambios solo viven en memoria y se pierden al reiniciar el servidor.
// Es opcional, pero lo queremos agregar para que te quede como un recurso extra.
const save = () =>
  writeFileSync(
    new URL("../jobs.json", import.meta.url),
    JSON.stringify(jobs, null, 2) + "\n",
  );

export class JobModel {
  static getAll({ title, text, technology, level, limit, offset }) {
    let filteredJobs = jobs;
    if (title) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.titulo.toLowerCase().includes(title.toLowerCase());
      });
    }
    if (text) {
      const normalizedText = text.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        return (
          job.titulo.toLowerCase().includes(normalizedText) ||
          job.descripcion.toLowerCase().includes(normalizedText)
        );
      });
    }
    if (technology) {
      const normalizedText = technology.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        return job.data.technology.some(
          (tech) => tech.toLowerCase() === normalizedText,
        );
      });
    }
    if (level) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.data.nivel.toLowerCase() === level.toLowerCase();
      });
    }
    const total = filteredJobs.length;
    const data = filteredJobs.slice(offset, offset + limit);
    return { data, total };
  }
  static getById(id) {
    return jobs.find((job) => job.id === id);
  }
  static create({ titulo, empresa, ubicacion, descripcion, data, content }) {
    const newJob = {
      id: randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    };
    jobs.push(newJob);
    save(); // Persiste el nuevo job en jobs.json
    return newJob;
  }
  static update(
    id,
    { titulo, empresa, ubicacion, descripcion, data, content },
  ) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) return null;
    jobs[index] = {
      id,
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    };
    save();
    return jobs[index];
  }
  static partialUpdate(id, updates) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) return null;
    jobs[index] = {
      ...jobs[index],
      ...updates,
      id,
    };
    save();
    return jobs[index];
  }
  static delete(id) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) return null;
    const [deletedJob] = jobs.splice(index, 1);
    save();
    return deletedJob;
  }
}
