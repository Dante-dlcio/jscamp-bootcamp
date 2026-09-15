import cors from "cors";

/* Aquí debe ir la lógica de tu middleware */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:1234",
  "https://midu.dev",
  "http://jscamp.dev",
  "http://localhost:5173",
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
});
