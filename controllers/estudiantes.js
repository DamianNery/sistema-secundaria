//CONTROLADOR
const Estudiante = require('../schemas/Estudiante.js');

//Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        console.log(estudiantes)
        res.json(estudiantes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los estudiantes' }); //(500): Internal Server Error
    }
};

// Obtener un estudiante por ID
const getEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const estudiante = await Estudiante.findById(id);
        if (estudiante) {
            res.json(estudiante);
        } else {
            res.status(404).json({ //(404): Not Found (Estudiante no encontrado)
                id,
                encontrado: false
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el estudiante' }); //(500): Internal Server Error
    }
};

// Agregar un nuevo estudiante
const postEstudiante = async (req, res) => {
    const { nombre, apellido, dni } = req.body;
    try {
        const nuevoEstudiante = new Estudiante({ nombre, apellido, dni });
        await nuevoEstudiante.save();
        res.status(201).json(nuevoEstudiante); //(201): Created
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el estudiante' }); //(500): Internal Server Error
    }
};

// Actualizar un estudiante por ID

const updateEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni } = req.body;
    try {
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(
            id,
            { nombre, apellido, dni },
            { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
        );
        if (estudianteActualizado) {
            res.json(estudianteActualizado);
        } else {
            res.status(404).json({ //(404): Not Found (Estudiante no encontrado)
                msg: 'estudiante no encontrado',
                id
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' }); //(500): Internal Server Error
    }
};

// Eliminar un estudiante por ID
const deleteEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Estudiante.findByIdAndDelete(id);
        if (resultado) {
            res.json({
                msg: 'Estudiante eliminado',
                id
            });
        } else {
            res.status(404).json({ //(404): Not Found (Estudiante no encontrado)
                msg: 'Estudiante no encontrado',
                id
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' }); //(500): Internal Server Error
    }
};

module.exports = {
    getEstudiantes,
    getEstudiante,
    postEstudiante,
    updateEstudiante,
    deleteEstudiante,
}