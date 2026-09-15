/*
 * Aquí debes escribir tus tests para la API de jobs
 *
 * Recuerda:
 * - Usar node:test y node:assert (sin dependencias externas)
 * - Levantar el servidor con before() y cerrarlo con after()
 * - Testear todos los endpoints: GET, POST, PUT, PATCH, DELETE
 * - Verificar validaciones con Zod
 * - Comprobar códigos de estado HTTP correctos
 */

import assert from "node:assert/strict";
import { before, after, describe, it } from "node:test";

const TEST_PORT = 5678;

const baseURL = `http://localhost:${TEST_PORT}`;

let server;

before(async () => {
  process.env.NODE_ENV = "test";
  const { default: app } = await import("./app.js");

  server = app.listen(TEST_PORT);
});

after(() => {
  server?.close();
});

describe("GET/jobs", () => {
  it("Responde 200 y devuelve un array", async () => {
    const response = await fetch(`${baseURL}/jobs`);
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(json.data));
  });
  it("filtra por teconología", async () => {
    const response = await fetch(`${baseURL}/jobs?technology=react`);
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.ok(
      json.data.length > 0 &&
        json.data.every((job) =>
          job.data.technology.some((tech) => tech.toLowerCase() === "react"),
        ),
    );
  });
  it("respeta limit", async () => {
    const response = await fetch(`${baseURL}/jobs?limit=2`);
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(json.data.length, 2);
    assert.strictEqual(json.limit, 2);
  });
  it("respeta offset", async () => {
    const response = await fetch(`${baseURL}/jobs?offset=1`);
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(json.offset, 1);
    assert.strictEqual(json.data[0].id, "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57");
  });
});

describe("GET/jobs/:id", () => {
  it("Responde 200 y devuelve un job válido", async () => {
    const id = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";
    const response = await fetch(`${baseURL}/jobs/${id}`);
    const json = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(json.id, id);
    assert.strictEqual(json.titulo, "Analista de Datos");
  });
  it("Responde 404 si no existe el job", async () => {
    const response = await fetch(`${baseURL}/jobs/999`);
    const json = await response.json();
    assert.strictEqual(response.status, 404);
    assert.ok(json.error);
  });
});

describe("POST/jobs", () => {
  const validJob = {
    titulo: "Test Backend Developer",
    empresa: "Test Solutions",
    ubicacion: "Test City",
    descripcion: "Test description",
    data: {
      technology: ["Node.js", "Express"],
      modalidad: "Remoto",
      nivel: "Senior",
    },
  };
  it("Debe crear un job válido y responder 201", async () => {
    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validJob),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 201);
    assert.strictEqual(json.titulo, validJob.titulo);
    assert.ok(json.id);
    const { id, ...createdJob } = json;
    assert.deepStrictEqual(createdJob, validJob);
  });
  it("El titulo es obligatorio y debe tener al menos 3 caracteres", async () => {
    const invalidJob = {
      ...validJob,
      titulo: "ab",
    };
    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidJob),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 400);
    assert.ok(json.error);
  });
  it("El titulo no puede exceder los 100 caracteres", async () => {
    const invalidJob = {
      ...validJob,
      titulo: "A".repeat(101),
    };
    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidJob),
    });
    const json = await response.json();
    assert.strictEqual(response.status, 400);
    assert.ok(json.error);
  });
  it("El job tiene que tener titulo", async () => {
    const { titulo, ...jobWithoutTitle } = validJob;
    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jobWithoutTitle),
    });
    assert.strictEqual(response.status, 400);
  });
  it("El titulo debe ser un string", async () => {
    const invalidJob = { ...validJob, titulo: 123 };
    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);
  });
  it("permite crear un job sin descripción", async () => {
    const { descripcion, ...jobWithoutDescription } = validJob;

    const response = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobWithoutDescription),
    });

    assert.strictEqual(response.status, 201);
  });
});

describe("PUT /jobs/:id", () => {
  const validId = "a9f31a8e-ec38-4fd3-9114-88cc6d37a92b";
  const invalidId = "00000000-0000-0000-0000-000000000000";

  const updatedJob = {
    titulo: "Frontend Developer Senior",
    empresa: "Empresa PUT",
    ubicacion: "Madrid",
    descripcion: "Job actualizado completamente mediante PUT",
    data: {
      technology: ["javascript", "react"],
      modalidad: "remoto",
      nivel: "senior",
    },
  };

  it("devuelve 204 y actualiza completamente el job", async () => {
    const response = await fetch(`${baseURL}/jobs/${validId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });

    assert.strictEqual(response.status, 204);

    const getResponse = await fetch(`${baseURL}/jobs/${validId}`);
    const json = await getResponse.json();

    assert.strictEqual(getResponse.status, 200);
    assert.strictEqual(json.id, validId);

    const { id, ...jobWithoutId } = json;

    assert.deepStrictEqual(jobWithoutId, updatedJob);
  });

  it("devuelve 404 si el ID no existe", async () => {
    const response = await fetch(`${baseURL}/jobs/${invalidId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });

    assert.strictEqual(response.status, 404);
  });
});

describe("PATCH /jobs/:id", () => {
  const validId = "f62d8a34-923a-4ac2-9b0b-14e0ac2f5405";
  const invalidId = "00000000-0000-0000-0000-000000000000";

  it("devuelve 204 y actualiza solamente los campos enviados", async () => {
    const beforeResponse = await fetch(`${baseURL}/jobs/${validId}`);
    const beforeJob = await beforeResponse.json();

    const changes = {
      titulo: "DevOps actualizado",
      ubicacion: "Barcelona",
    };

    const response = await fetch(`${baseURL}/jobs/${validId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    assert.strictEqual(response.status, 204);

    const afterResponse = await fetch(`${baseURL}/jobs/${validId}`);
    const afterJob = await afterResponse.json();

    assert.strictEqual(afterResponse.status, 200);

    // Cambiaron los campos enviados
    assert.strictEqual(afterJob.titulo, changes.titulo);
    assert.strictEqual(afterJob.ubicacion, changes.ubicacion);

    // El resto sigue igual
    assert.strictEqual(afterJob.empresa, beforeJob.empresa);
    assert.strictEqual(afterJob.descripcion, beforeJob.descripcion);
    assert.deepStrictEqual(afterJob.data, beforeJob.data);
    assert.strictEqual(afterJob.id, beforeJob.id);
  });

  it("devuelve 404 si el ID no existe", async () => {
    const response = await fetch(`${baseURL}/jobs/${invalidId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: "Job inexistente",
      }),
    });

    assert.strictEqual(response.status, 404);
  });
});

describe("DELETE /jobs/:id", () => {
  const validId = "c1b65b42-68c5-4f1c-a8c2-8d52c5a7a5d1";
  const invalidId = "00000000-0000-0000-0000-000000000000";

  it("devuelve 204 y elimina el job", async () => {
    const response = await fetch(`${baseURL}/jobs/${validId}`, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 204);

    const getResponse = await fetch(`${baseURL}/jobs/${validId}`);

    assert.strictEqual(getResponse.status, 404);
  });

  it("devuelve 404 si el ID no existe", async () => {
    const response = await fetch(`${baseURL}/jobs/${invalidId}`, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 404);
  });
});
