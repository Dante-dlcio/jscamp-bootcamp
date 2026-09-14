import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile();

const port = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader("content-type", "application/json; charset=utf-8");
  if (requestUrl.pathname === "/users") {
    if (req.method === "GET") {
      const name = requestUrl.searchParams.get("name");
      const minAge = requestUrl.searchParams.get("minAge");
      const maxAge = requestUrl.searchParams.get("maxAge");
      const limit = requestUrl.searchParams.get("limit");
      const offset = requestUrl.searchParams.get("offset");
      let filteredUsers = users;
      if (name) {
        filteredUsers = filteredUsers.filter((user) => {
          return user.name.toLowerCase().includes(name.toLowerCase());
        });
      }
      if (minAge !== null) {
        filteredUsers = filteredUsers.filter((user) => {
          return user.age >= Number(minAge);
        });
      }
      if (maxAge !== null) {
        filteredUsers = filteredUsers.filter((user) => {
          return user.age <= Number(maxAge);
        });
      }
      if (limit !== null || offset !== null) {
        const start = offset !== null ? Number(offset) : 0;
        const end = limit !== null ? start + Number(limit) : undefined;
        filteredUsers = filteredUsers.slice(start, end);
      }
      res.statusCode = 200;
      return res.end(JSON.stringify(filteredUsers));
    }
    if (req.method === "POST") {
      try {
        const body = await json(req);
        const newUser = {
          id: randomUUID(),
          name: body.name,
          age: body.age,
        };
        users.push(newUser);
        res.statusCode = 201;
        return res.end(JSON.stringify(newUser));
      } catch {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    }
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Método no permitido" }));
  }
  if (requestUrl.pathname === "/health") {
    if (req.method !== "GET") {
      res.statusCode = 405;
      return res.end(JSON.stringify({ error: "Metodo no permitido" }));
    }
    res.statusCode = 200;
    const uptime = process.uptime();
    return res.end(JSON.stringify({ status: "ok", uptime }));
  }
  res.statusCode = 404;
  return res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});
server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
});

const users = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    name: "Miguel",
    age: 28,
  },
  {
    id: "f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b",
    name: "Mateo",
    age: 34,
  },
  {
    id: "9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d",
    name: "Pablo",
    age: 22,
  },
  {
    id: "3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f",
    name: "Lucía",
    age: 31,
  },
  {
    id: "7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e",
    name: "Ana",
    age: 26,
  },
  {
    id: "5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a",
    name: "Juan",
    age: 29,
  },
  {
    id: "2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d",
    name: "Sofía",
    age: 25,
  },
  {
    id: "8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c",
    name: "Carlos",
    age: 37,
  },
  {
    id: "4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f",
    name: "Elena",
    age: 23,
  },
  {
    id: "0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b",
    name: "Diego",
    age: 30,
  },
];
