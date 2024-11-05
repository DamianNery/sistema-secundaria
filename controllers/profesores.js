//CONTROLADOR
const Profesor = require('../schemas/Profesor.js');

//Obtener todos los profesores
const getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        console.log(profesores);
        res.status(200).json(profesores); //(200): OK
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener los profesores', error }); //(500): Internal Server Error
    }
};

//Obtener un profesor específico
const getProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const profesor = await Profesor.findById(id);
        if (profesor) {
            res.status(200).json(profesor);
        } else {
            res.status(404).json({ 
                mensaje: 'Profesor no encontrado',//(404): Not Found (Profesor no encontrado)
                id,
                encontrado: false
            });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el profesor', error }); //(500): Internal Server Error
    }
};

// Crear un curso
const postProfesor = async (req, res) => {
    const { año, división, código } = req.body;
    try {
        const nuevoProfesor = new Profesor({ año, división, código });
        await nuevoProfesor.save();
        res.status(201).json(nuevoProfesor); //(201): Created
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el profesor', error }); //(500): Internal Server Error
    }
};

// Actualizar un curso por ID
const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { año, division, código } = req.body;
    try {
        const profesorActualizado = await Profesor.findByIdAndUpdate(
            id,
            { año, division, código },
            { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
        );
        if (profesorActualizado) {
            res.status(200).json(profesorActualizado); //(200): OK
        } else {
            res.status(404).json({ //(404): Not Found (Curso no encontrado)
                mensaje: 'Profesor no encontrado',
                id
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el profesor' }); //(500): Internal Server Error
    }
};

// Eliminar un curso
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
            res.status(404).json({ //(404): Not Found (Profesor no encontrado)
                mensaje: 'Profesor no encontrado',
                id
            }); 
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
