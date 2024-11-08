//CONTROLADOR
const Estudiante = require("../schemas/Estudiante.js");

//OK Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find(); //Espera que se resuelva la promesa
    console.log(estudiantes);
    res.status(200).json(estudiantes); //(200): Petición exitosa
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener estudiantes" }); //(500): Internal Server Error
  }
};

//OK Obtener un estudiante por ID
const getEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findById(id); //Espera a que se resuelva la promesa
    if (estudiante) {
      res.status(200).json(estudiante); //(200): Petición exitosa
    } else {
      res.status(404).json({
        mensaje: 'Estudiante no encontrado',
        id,
        encontrado: false,
      }); //(404): Not Found (Estudiante no encontrado)
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiante" }); //(500): Internal Server Error
  }
};

//OK Agregar un nuevo estudiante
const postEstudiante = async (req, res) => {
  const { nombre, apellido, dni } = req.body;
  try {
    const nuevoEstudiante = new Estudiante({ nombre, apellido, dni });
    await nuevoEstudiante.save(); 
    res.status(201).json(nuevoEstudiante); //(201): Created (Nuevo recurso creado)
  } catch (error) {
    res.status(500).json({ error: "Error al agregar estudiante" }); //(500): Internal Server Error
  }
};

//OK Actualizar un estudiante por ID

const updateEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni } = req.body;
  try {
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      id,
      { nombre, apellido, dni },
      { new: true, runValidators: true } 
      // "new: true" --> devuelve documento actualizado
      // "runValidators: true" --> datos actualizados cumplan con validación de schema
    );
    if (estudianteActualizado) {
      res.status(200).json(estudianteActualizado); //(200): Petición exitosa
    } else {
      res.status(404).json({
        msg: "Estudiante no encontrado",
        id,
      }); //(404): Not Found (Estudiante no encontrado)
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estudiante" }); //(500): Internal Server Error
  }
};

//OK Eliminar un estudiante por ID
const deleteEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Estudiante.findByIdAndDelete(id); // Espera a que se resuelva la promesa
    if (resultado) {
      res.status(200).json({
        msg: "Estudiante eliminado",
        id,
      }); //(200): Petición exitosa
    } else {
      res.status(404).json({
        msg: "Estudiante no encontrado",
        id,
      }); //(404): Not Found (Estudiante no encontrado)
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar estudiante" }); //(500): Internal Server Error
  }
};

//OK Obtener un estudiante con su curso, materias y profesores
const obtenerEstudianteConCursoYMaterias = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiante.findById(id) // Espera a que se resuelva la promesa
      .populate({
        path: "curso", // Se llena la información del curso
        populate: {
          path: "materias", // Se llenan las materias del curso
          populate: {
            path: "profesores", // Se llenan los profesores de cada materia
          },
        },
      }); // Espera a que se resuelva la promesa

    if (estudiante) {
      res.status(200).json(estudiante); // (200): Petifción exitosa
    } else {
      res.status(404).json({ message: "Estudiante no encontrado" }); //(404): Not Found (Estudiante no encontrado)
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del estudiante" }); //(500): Internal Server Error
  }
};

module.exports = {
  getEstudiantes,
  getEstudiante,
  postEstudiante,
  updateEstudiante,
  deleteEstudiante,
  obtenerEstudianteConCursoYMaterias,
};
