//CONTROLADOR
const Curso = require('../schemas/Curso.js');

//Obtener todos los cursos
const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.find();
        console.log(cursos);
        res.status(200).json(cursos); //(200): OK
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener los cursos', error }); //(500): Internal Server Error
    }
};

//Obtener un curso específico
const getCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findById(id);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({ 
                mensaje: 'Curso no encontrado',//(404): Not Found (Curso no encontrado)
                id,
                encontrado: false
            });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el curso', error }); //(500): Internal Server Error
    }
};

// Crear un curso
const postCurso = async (req, res) => {
    const { año, división, código } = req.body;
    try {
        const nuevoCurso = new Curso({ año, división, código });
        await nuevoCurso.save();
        res.status(201).json(nuevoCurso); //(201): Created
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el curso', error }); //(500): Internal Server Error
    }
};

// Actualizar un curso por ID
const updateCurso = async (req, res) => {
    const { id } = req.params;
    const { año, division, código } = req.body;
    try {
        const cursoActualizado = await Curso.findByIdAndUpdate(
            id,
            { año, division, código },
            { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
        );
        if (cursoActualizado) {
            res.status(200).json(cursoActualizado); //(200): OK
        } else {
            res.status(404).json({ //(404): Not Found (Curso no encontrado)
                mensaje: 'Curso no encontrado',
                id
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el curso' }); //(500): Internal Server Error
    }
};

// Eliminar un curso
const deleteCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Curso.findByIdAndDelete(id);
        if (resultado) {
            res.status(200).json({ 
                mensaje: 'Curso eliminado',
                id 
        });
        } else {
            res.status(404).json({ //(404): Not Found (Curso no encontrado)
                mensaje: 'Curso no encontrado',
                id
            }); 
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el curso', error }); //(500): Internal Server Error
    }
};

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

module.exports = {
    getCursos,
    getCurso,
    postCurso,
    updateCurso,
    deleteCurso,
    getEstudiantesEnCurso
};