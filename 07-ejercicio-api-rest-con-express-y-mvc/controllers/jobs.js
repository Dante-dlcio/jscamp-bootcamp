/* Aquí debe ir la lógica de tu controlador */
import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/jobs.js";

export class JobController {
  static getAll(req, res) {
    const { text, title, technology, level } = req.query;
    /* Con Number() || default un limit=0 caía al default por accidente y los negativos pasaban sin control
    const limit = Number(req.query.limit) || DEFAULTS.LIMIT_PAGINATION;
    const offset = Number(req.query.offset) || DEFAULTS.LIMIT_OFFSET;
    */

    // Number.isInteger + < 0 descartan NaN, decimales, -Infinity, Infinity y negativos; solo aceptan enteros válidos y usan el default de config.js en caso contrario. Es la manera más estricta con pocas lineas de código de hacer una validación numérica.
    const limitParam = Number(req.query.limit);
    const offsetParam = Number(req.query.offset);
    const limit =
      !Number.isInteger(limitParam) || limitParam < 0
        ? DEFAULTS.LIMIT_PAGINATION
        : limitParam;
    const offset =
      !Number.isInteger(offsetParam) || offsetParam < 0
        ? DEFAULTS.LIMIT_OFFSET
        : offsetParam;
    const { data, total } = JobModel.getAll({
      text,
      title,
      technology,
      level,
      limit,
      offset,
    });
    return res.json({ data, total, limit, offset });
  }
  static getId(req, res) {
    const { id } = req.params;
    const job = JobModel.getById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(job);
  }
  static create(req, res) {
    const createJob = JobModel.create(req.body);
    return res.status(201).json(createJob);
  }
  static update(req, res) {
    const { id } = req.params;
    const updatedJob = JobModel.update(id, req.body);
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(updatedJob);
  }
  static partialUpdate(req, res) {
    const { id } = req.params;
    const patchedJob = JobModel.partialUpdate(id, req.body);
    if (!patchedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(patchedJob);
  }
  static delete(req, res) {
    const { id } = req.params;
    const deletedJob = JobModel.delete(id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.status(204).send();
  }
}
