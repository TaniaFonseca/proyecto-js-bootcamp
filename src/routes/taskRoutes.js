import express from "express";
import {
  createEjercicio,
  getEjercicios,
  getEjercicioById,
  updateEjercicio,
  deleteEjercicio,
} from "../controllers/taskController.js";

const router = express.Router();

// Crear un ejercicio
router.post("/ejercicios", createEjercicio);

// Obtener todos los ejercicios
router.get("/ejercicios", getEjercicios);

// Obtener un ejercicio por ID
router.get("/ejercicios/:id", getEjercicioById);

// Actualizar un ejercicio
router.put("/ejercicios/:id", updateEjercicio);

// Eliminar un ejercicio
router.delete("/ejercicios/:id", deleteEjercicio);

export default router;
