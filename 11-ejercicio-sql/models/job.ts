import crypto from 'node:crypto'
import { db } from '../db/database'
import type { CreateJobDTO, Job, JobFilters, UpdateJobDTO } from '../types'

type JobRow = {
  id: string
  title: string
  company: string
  location: string
  description: string
  modality: Job['data']['modality']
  level: Job['data']['level']
  technologies: string | null
  content_description: string | null
  responsibilities: string | null
  requirements: string | null
  about: string | null
}

type JobRowWithContent = JobRow & {
  content_description: string
  responsibilities: string
  requirements: string
  about: string
}

const jobSelect = `
  SELECT
    jobs.*,
    GROUP_CONCAT(job_technologies.technology) AS technologies,
    job_content.description AS content_description,
    job_content.responsibilities,
    job_content.requirements,
    job_content.about
  FROM jobs
  LEFT JOIN job_technologies ON jobs.id = job_technologies.job_id
  LEFT JOIN job_content ON jobs.id = job_content.job_id
`

function hasContent(row: JobRow): row is JobRowWithContent {
  return (
    row.content_description !== null &&
    row.responsibilities !== null &&
    row.requirements !== null &&
    row.about !== null
  )
}

function rowToJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.description,
    data: {
      technology: row.technologies?.split(',') ?? [],
      modality: row.modality,
      level: row.level,
    },
    content: hasContent(row)
      ? {
          description: row.content_description,
          responsibilities: row.responsibilities,
          requirements: row.requirements,
          about: row.about,
        }
      : undefined,
  }
}

const insertJob = db.prepare(`
  INSERT INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

const insertTechnology = db.prepare(`
  INSERT INTO job_technologies (job_id, technology)
  VALUES (?, ?)
`)

const insertContent = db.prepare(`
  INSERT INTO job_content
    (id, job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?, ?)
`)

// Esto que hacemos se llama Prepared statements a nivel de módulo: se compila una sola vez al arrancar y se reutiliza en cada llamada a update(), evitando recompilar por llamada. El `prepare` es una función pesada y es mejor ejecutarla una sola vez y no varias en cada consulta.
const updateJobStmt = db.prepare(`
  UPDATE jobs
  SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
  WHERE id = ?
`)
const deleteTechnologiesStmt = db.prepare('DELETE FROM job_technologies WHERE job_id = ?')
const deleteContentStmt = db.prepare('DELETE FROM job_content WHERE job_id = ?')

export class JobModel {
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    const conditions: string[] = []
    const params: Array<string | number> = []

    if (filters?.tech) {
      conditions.push(`
        jobs.id IN (
          SELECT job_id FROM job_technologies WHERE technology = ?
        )
      `)
      params.push(filters.tech)
    }

    if (filters?.modality) {
      conditions.push('jobs.modality = ?')
      params.push(filters.modality)
    }

    if (filters?.level) {
      conditions.push('jobs.level = ?')
      params.push(filters.level)
    }

    let query = jobSelect

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    query += ' GROUP BY jobs.id ORDER BY jobs.rowid'

    if (filters?.limit !== undefined || filters?.offset !== undefined) {
      const parsedLimit = Number(filters.limit)
      const parsedOffset = Number(filters.offset)
      const limit = Number.isInteger(parsedLimit) && parsedLimit >= 0 ? parsedLimit : -1
      const offset = Number.isInteger(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0

      query += ' LIMIT ? OFFSET ?'
      params.push(limit, offset)
    }

    const rows = db.prepare(query).all(...params) as JobRow[]
    return rows.map(rowToJob)
  }

  static async getById(id: string): Promise<Job | undefined> {
    const row = db
      .prepare(`${jobSelect} WHERE jobs.id = ? GROUP BY jobs.id`)
      .get(id) as JobRow | undefined

    return row ? rowToJob(row) : undefined
  }

  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    }

    const createJob = db.transaction(() => {
      insertJob.run(
        newJob.id,
        newJob.title,
        newJob.company,
        newJob.location,
        newJob.description,
        newJob.data.modality,
        newJob.data.level,
      )

      for (const technology of newJob.data.technology) {
        insertTechnology.run(newJob.id, technology)
      }

      if (newJob.content) {
        insertContent.run(
          `${newJob.id}-content`,
          newJob.id,
          newJob.content.description,
          newJob.content.responsibilities,
          newJob.content.requirements,
          newJob.content.about,
        )
      }
    })

    createJob()
    return newJob
  }

  static async delete(id: string): Promise<boolean> {
    const result = db.prepare('DELETE FROM jobs WHERE id = ?').run(id)
    return result.changes > 0
  }

  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const currentJob = await this.getById(id)

    if (!currentJob) return null

    const updatedJob: Job = {
      ...currentJob,
      ...input,
      id,
      data: input.data ?? currentJob.data,
      content: input.content ?? currentJob.content,
    }

    const updateJob = db.transaction(() => {
      updateJobStmt.run(
        updatedJob.title,
        updatedJob.company,
        updatedJob.location,
        updatedJob.description,
        updatedJob.data.modality,
        updatedJob.data.level,
        id,
      )

      if (input.data) {
        deleteTechnologiesStmt.run(id)

        for (const technology of updatedJob.data.technology) {
          insertTechnology.run(id, technology)
        }
      }

      if (input.content) {
        deleteContentStmt.run(id)
        insertContent.run(
          `${id}-content`,
          id,
          input.content.description,
          input.content.responsibilities,
          input.content.requirements,
          input.content.about,
        )
      }

      /*
      // Se preparaba las sentencias dentro de la transacción,
      // lo que recompilaba el SQL en cada llamada a update()
      db.prepare(`
        UPDATE jobs
        SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
        WHERE id = ?
      `).run(
        updatedJob.title,
        updatedJob.company,
        updatedJob.location,
        updatedJob.description,
        updatedJob.data.modality,
        updatedJob.data.level,
        id,
      )

      if (input.data) {
        db.prepare('DELETE FROM job_technologies WHERE job_id = ?').run(id)
      }

      if (input.content) {
        db.prepare('DELETE FROM job_content WHERE job_id = ?').run(id)
      }
      */
    })

    updateJob()
    return updatedJob
  }
}
