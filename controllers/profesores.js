//CONTROLADOR
const Profesor = require('../schemas/Profesor.js');

//OK Obtener todos los profesores
const getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find(); //Espera a que se resuelva la promesa
        console.log(profesores);
        res.status(200).json(profesores); //(200): Petición exitosa
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener profesores', error }); //(500): Internal Server Error
    }
};

//OK Obtener un profesor específico
const getProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const profesor = await Profesor.findById(id); //Espera a que se resuelva la promesa
        if (profesor) {
            res.status(200).json(profesor); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Profesor no encontrado',
                id,
                encontrado: false
            }); //(404): Not Found (Profesor no encontrado)
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener profesor', error }); //(500): Internal Server Error
    }
};

//OK Agregar un profesor
const postProfesor = async (req, res) => {
    const { nombre, apellido, dni } = req.body;
    try {
        const nuevoProfesor = new Profesor({ nombre, apellido, dni });
        await nuevoProfesor.save();
        res.status(201).json(nuevoProfesor); //(201): Created (Nuevo recurso creado)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar profesor', error }); //(500): Internal Server Error
    }
};

//OK Actualizar un profesor por ID
const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni } = req.body;
    try {
        const profesorActualizado = await Profesor.findByIdAndUpdate(
            id,
            { nombre, apellido, dni },
            { new: true, runValidators: true } 
            // "new: true" --> devuelve documento actualizado
            // "runValidators: true" --> datos actualizados cumplan con validación de schema
        );
        if (profesorActualizado) {
            res.status(200).json(profesorActualizado); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Profesor no encontrado',
                id
            }); //(404): Not Found (Curso no encontrado)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el profesor' }); //(500): Internal Server Error
    }
};

// Eliminar un profesor
const deleteProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Profesor.findByIdAndDelete(id);
        if (resultado) {
            res.status(200).json({ 
                mensaje: 'Profesor eliminado',
                id 
        });
        } else {
            res.status(404).json({ 
                mensaje: 'Profesor no encontrado',
                id
            }); //(404): Not Found (Profesor no encontrado)
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el curso', error }); //(500): Internal Server Error
    }
};

module.exports = {
    getProfesores,
    getProfesor,
    postProfesor,
    updateProfesor,
    deleteProfesor
};
