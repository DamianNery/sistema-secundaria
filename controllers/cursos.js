//CONTROLADOR
const Curso = require('../schemas/Curso.js');
const Estudiante = require('../schemas/Estudiante.js');
const Materia = require('../schemas/Materia.js');

//OK Obtener todos los cursos
const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.find(); //Espera que se resuelva la promesa
        console.log(cursos);
        res.status(200).json(cursos); //(200): Petición exitosa
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener cursos', error }); //(500): Internal Server Error
    }
};

//OK Obtener un curso específico
const getCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findById(id); //Espera a que se resuelva la promesa
        if (curso) {
            res.status(200).json(curso); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Curso no encontrado',
                id,
                encontrado: false
            }); //(404): Not Found (Curso no encontrado)
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener curso', error }); //(500): Internal Server Error
    }
};

//OK Crear un curso
const postCurso = async (req, res) => {
    const { anio, division, codigo } = req.body;
    try {
        const nuevoCurso = new Curso({ anio, division, codigo });
        await nuevoCurso.save();
        res.status(201).json(nuevoCurso); //(201): Created (Nuevo recurso creado)
    } catch (error) {
        res.status(500).json({ error: "Error al crear curso" }); //(500): Internal Server Error
    }
};

//OK Actualizar un curso por ID
const updateCurso = async (req, res) => {
    const { id } = req.params;
    const { anio, division, codigo } = req.body;
    try {
        const cursoActualizado = await Curso.findByIdAndUpdate(
            id,
            { anio, division, codigo },
            { new: true, runValidators: true }
            // "new: true" --> devuelve documento actualizado
            // "runValidators: true" --> datos actualizados cumplan con validación de schema
        );
        if (cursoActualizado) {
            res.status(200).json(cursoActualizado); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Curso no encontrado',
                id
            }); //(404): Not Found (Curso no encontrado)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar curso' }); //(500): Internal Server Error
    }
};

//OK Eliminar un curso
const deleteCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Curso.findByIdAndDelete(id); // Espera a que se resuelva la promesa
        if (resultado) {
            res.status(200).json({ 
                mensaje: 'Curso eliminado',
                id 
        }); //(200): Petición exitosa
        } else {
            res.status(404).json({ //(404): Not Found (Curso no encontrado)
                mensaje: 'Curso no encontrado',
                id
            }); 
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar curso', error }); //(500): Internal Server Error
    }
};

//OK Obtener estudiantes de un curso específico
const getEstudiantesEnCurso = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findById(id).populate('estudiantes'); //Espera a que se resuelva la promesa
        if (curso) {
            res.status(200).json(curso.estudiantes); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Curso no encontrado',
                id,
                encontrado: false
            }); //(404): Not Found (Curso no encontrado)
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener estudiantes del curso" }); //(500): Internal Server Error
    }
};

//OK Agregar un estudiante a un curso

const addEstudianteToCurso = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { estudianteId } = req.body; // ID del estudiante a agregar

    try {
        const estudiante = await Estudiante.findById(estudianteId); //Espera a que se resuelva la promesa
        if (estudiante) {
            const curso = await Curso.findById(id); //Espera a que se resuelva la promesa
            if (curso) {
                // Evitar duplicados en el curso
                if (!curso.estudiantes.includes(estudianteId)) {
                    curso.estudiantes.push(estudianteId);
                    await curso.save();

                    estudiante.curso = id;
                    //estudiante.curso.push(id);
                    await estudiante.save();
                    
                    res.status(200).json({ message: "Estudiante añadido al curso", curso }); //(200): Petición exitosa
                } else {
                    res.status(400).json({ message: "Estudiante ya está asociado a este curso" }); //(400): Bad Request - El servidor no pudo interpretar la solicitud dada una sintaxis inválida.
                }
            }
            else {
                res.status(404).json({ message: "Curso no encontrado" }); //(404): Not Found
            }
        }
        else {
            res.status(404).json({ message: "Estudiante no encontrado" }); //(404): Not Found
        }        
    } catch (error) {
        //res.status(500).json({ message: "Error al agregar estudiante al curso" }); //(500): Internal Server Error
        res.status(500).json({ message: error.message }); //(500): Internal Server Error
    }
};

//OK Agregar una materia a un curso
const addMateriaToCurso = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { materiaId } = req.body; // ID de la materia que se va a agregar

    try {
        // Verificar que la materia existe
        const materia = await Materia.findById(materiaId);
        if (materia) {
            const curso = await Curso.findById(id); //Espera a que se resuelva la promesa
            if (curso) {
                // Evitar duplicados en el curso
                if (!curso.materias.includes(materiaId)) {
                    curso.materias.push(materiaId);
                    await curso.save();

                    materia.cursos = id;
                    await materia.save();

                    res.status(200).json({ message: "Materia añadida al curso", curso }); //(200): Petición exitosa
                } else {
                    res.status(400).json({ message: "La materia ya está asociada a este curso" }); //(400): Bad Request - El servidor no pudo interpretar la solicitud dada una sintaxis inválida.
                }
            }
            else {
                res.status(404).json({ message: "Curso no encontrado" }); //(404): Not Found
            }
        }
        else {
            res.status(404).json({ message: "Materia no encontrada" }); //(404): Not Found
        } 
    } catch (error) {
        //res.status(500).json({ message: "Error al agregar estudiante al curso" }); //(500): Internal Server Error
        res.status(500).json({ message: error.message }); //(500): Internal Server Error
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
