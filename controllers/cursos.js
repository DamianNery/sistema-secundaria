//CONTROLADOR
const Curso = require('../schemas/Curso.js');
const Estudiante = require('../schemas/Estudiante.js');
const Materia = require('../schemas/Materia.js');

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

//Agregar un estudiante a un curso
const addEstudianteToCurso = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { estudianteId } = req.body; // ID del estudiante que se va a agregar

    try {
        // Verificar que la estudiante existe
        const estudiante = await Estudiante.findById(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        // Encontrar el curso y agregar el ID del estudiante
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        // Evitar duplicados
        if (!curso.estudiantes.includes(estudianteId)) {
            curso.estudiantes.push(estudianteId);
            await curso.save();
            return res.status(200).json({ message: "Estudiante añadido al curso", curso });
        } else {
            return res.status(400).json({ message: "El estudiante ya está asociado a este curso" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Agregar una materia a un curso
const addMateriaToCurso = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { materiaId } = req.body; // ID de la materia que se va a agregar

    try {
        // Verificar que la materia existe
        const materia = await Materia.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }

        // Encontrar el curso y agregar el ID de la materia
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        // Evitar duplicados
        if (!curso.materias.includes(materiaId)) {
            curso.materias.push(materiaId);
            await curso.save();
            return res.status(200).json({ message: "Materia añadida al curso", curso });
        } else {
            return res.status(400).json({ message: "La materia ya está asociada a este curso" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCursos,
    getCurso,
    postCurso,
    updateCurso,
    deleteCurso,
    getEstudiantesEnCurso,
    addEstudianteToCurso,
    addMateriaToCurso
};
