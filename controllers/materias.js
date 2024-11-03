//CONTROLADOR
const Materia = require('../schemas/materia.js');

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
/*
// Obtener estudiantes de un curso específico
const getEstudiantesEnCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findById(id).populate('estudiantes'); // Cargar datos de estudiantes
        if (!curso) {
            return res.status(404).json({ mensaje: 'Curso no encontrado' });
        }
        res.status(200).json(curso.estudiantes); // Enviar la lista de estudiantes
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los estudiantes del curso', error });
    }
};
*/
module.exports = {
    getMaterias,
    getMateria,
    postMateria,
    updateMateria,
    deleteMateria
};
