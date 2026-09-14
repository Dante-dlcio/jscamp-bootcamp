/* Aquí debe ir la lógica de tu controlador */
import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/jobs.js";

export class JobController {
  static getAll(req, res) {
    const { text, title, technology, level } = req.query;
    const limit = Number(req.query.limit) || DEFAULTS.LIMIT_PAGINATION;
    const offset = Number(req.query.offset) || DEFAULTS.LIMIT_OFFSET;
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
}
