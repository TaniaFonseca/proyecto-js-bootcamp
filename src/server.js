import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { connect } from "./prismaClient.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos con Prisma
connect()
  .then(() => console.log("✅ Conectado a la base de datos con Prisma"))
  .catch((error) => console.error("❌ Error al conectar con Prisma:", error));

// Rutas
app.use("/api", taskRoutes);

// Puerto desde variables de entorno o 4000 por defecto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
