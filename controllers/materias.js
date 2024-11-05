//CONTROLADOR
const Materia = require('../schemas/Materia.js');
const Profesor = require('../schemas/Profesor.js');

//Obtener todos las materias
const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        console.log(materias);
        res.status(200).json(materias); //(200): OK
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener las materias', error }); //(500): Internal Server Error
    }
};

//Obtener un curso específico
const getMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const materia = await Materia.findById(id);
        if (materia) {
            res.status(200).json(materia);
        } else {
            res.status(404).json({ 
                mensaje: 'Materia no encontrada',//(404): Not Found (Materia no encontrada)
                id,
                encontrado: false
            });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la materia', error }); //(500): Internal Server Error
    }
};

// Crear un curso
const postMateria = async (req, res) => {
    const { año, división, código } = req.body;
    try {
        const nuevoMateria = new Materia({ año, división, código });
        await nuevoMateria.save();
        res.status(201).json(nuevoMateria); //(201): Created
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la materia', error }); //(500): Internal Server Error
    }
};

// Actualizar un curso por ID
const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { año, division, código } = req.body;
    try {
        const materiaActualizada = await Materia.findByIdAndUpdate(
            id,
            { año, division, código },
            { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
        );
        if (materiaActualizada) {
            res.status(200).json(materiaActualizada); //(200): OK
        } else {
            res.status(404).json({ //(404): Not Found (Materia no encontrada)
                mensaje: 'Materia no encontrada',
                id
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la materia' }); //(500): Internal Server Error
    }
};

// Eliminar un curso
const deleteMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Materia.findByIdAndDelete(id);
        if (resultado) {
            res.status(200).json({ 
                mensaje: 'Materia eliminada',
                id 
        });
        } else {
            res.status(404).json({ //(404): Not Found (Materia no encontrada)
                mensaje: 'Materia no encontrada',
                id
            }); 
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la materia', error }); //(500): Internal Server Error
    }
};

// Asignar un profesor a una materia
const assignProfesorToMateria = async (req, res) => {
    const { id } = req.params; // ID de la materia
    const { profesorId } = req.body; // ID del profesor a asignar

    try {
        // Verificar que el profesor existe
        const profesor = await Profesor.findById(profesorId);
        if (!profesor) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }

        // Actualizar la materia para asignarle el ID del profesor
        const materia = await Materia.findByIdAndUpdate(
            id,
            { $addToSet: { profesores: profesorId } }, // Usar $addToSet para evitar duplicados
            //{ profesores: profesorId },
            { new: true }
        ).populate('profesores'); //Datos completos del profesor asignado

        if (!materia) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }

        return res.status(200).json({ message: "Profesor asignado a la materia", materia });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMaterias,
    getMateria,
    postMateria,
    updateMateria,
    deleteMateria, 
    assignProfesorToMateria
};
