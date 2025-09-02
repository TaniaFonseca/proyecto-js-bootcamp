import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo ejercicio
export const createEjercicio = async (req, res) => {
  const { nombre, descripcion, musculo_objetivo } = req.body;
  try {
    const ejercicio = await prisma.ejercicios.create({
      data: { nombre, descripcion, musculo_objetivo },
    });
    res.json(ejercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error("Error al crear el ejercicio:", error);
  }
};

// Obtener todos los ejercicios
export const getEjercicios = async (req, res) => {
  try {
    const ejercicios = await prisma.ejercicios.findMany({
      include: {
        rutina_ejercicios: true, // opcional: muestra si está relacionado a rutinas
      },
    });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error al obtener los ejercicios:", error);
  }
};

// Obtener un ejercicio por ID
export const getEjercicioById = async (req, res) => {
  const { id } = req.params;
  try {
    const ejercicio = await prisma.ejercicios.findUnique({
      where: { id_ejercicio: Number(id) },
      include: {
        rutina_ejercicios: true,
      },
    });
    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.json(ejercicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error al obtener el ejercicio:", error);
  }
};

// Actualizar un ejercicio
export const updateEjercicio = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, musculo_objetivo } = req.body;
  try {
    const ejercicio = await prisma.ejercicios.update({
      where: { id_ejercicio: Number(id) },
      data: { nombre, descripcion, musculo_objetivo },
    });
    res.json(ejercicio);
  } catch (error) {
    res.status(404).json({ error: "Ejercicio no encontrado" });
    console.error("Error al actualizar el ejercicio:", error);
  }
};

// Eliminar un ejercicio
export const deleteEjercicio = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ejercicios.delete({
      where: { id_ejercicio: Number(id) },
    });
    res.json({ message: "Ejercicio eliminado" });
  } catch (error) {
    res.status(404).json({ error: "Ejercicio no encontrado" });
    console.error("Error al eliminar el ejercicio:", error);
  }
};
