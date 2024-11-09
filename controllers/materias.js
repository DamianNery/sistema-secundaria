//CONTROLADOR
const Materia = require('../schemas/Materia.js');
const Profesor = require('../schemas/Profesor.js');

//OK Obtener todos las materias
const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.find(); //Espera que se resuelva la promesa
        console.log(materias);
        res.status(200).json(materias); //(200): Petición exitosa
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener materias', error }); //(500): Internal Server Error
    }
};

//OK Obtener una materia específica
const getMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const materia = await Materia.findById(id); //Espera a que se resuelva la promesa
        if (materia) {
            res.status(200).json(materia); //(200): Petición exitosa
        } else {
            res.status(404).json({ 
                mensaje: 'Materia no encontrada',
                id,
                encontrado: false
            }); //(404): Not Found (Materia no encontrada)
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener materia', error }); //(500): Internal Server Error
    }
};

//OK Crear una materia
const postMateria = async (req, res) => {
    const { nombre, descripcion, codigo } = req.body;
    try {
        const nuevoMateria = new Materia({ nombre, descripcion, codigo });
        await nuevoMateria.save();
        res.status(201).json(nuevoMateria); //(201): Created (Nuevo recurso creado)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la materia', error }); //(500): Internal Server Error
    }
};

//OK Actualizar una materia por ID
const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo } = req.body;
    try {
        const materiaActualizada = await Materia.findByIdAndUpdate(
            id,
            { nombre, descripcion, codigo },
            { new: true, runValidators: true } 
            // "new: true" --> devuelve documento actualizado
            // "runValidators: true" --> datos actualizados cumplan con validación de schema
        );
        if (materiaActualizada) {
            res.status(200).json(materiaActualizada); //(200): Petición exitosa
        } else {
            res.status(404).json({
                mensaje: "Materia no encontrada",
                id
            }); //(404): Not Found (Materia no encontrada)
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar materia" }); //(500): Internal Server Error
    }
};

//OK Eliminar una materia
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
            res.status(404).json({ 
                mensaje: 'Materia no encontrada',
                id
            }); //(404): Not Found (Materia no encontrada)
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la materia', error }); //(500): Internal Server Error
    }
};

// Asignar un profesor a una materia
const assignProfesorToMateria = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { profesorId } = req.body; // ID del estudiante a agregar

    try {
        const profesor = await Profesor.findById(profesorId); //Espera a que se resuelva la promesa
        if (profesor) {
            const materia = await Materia.findById(id); //Espera a que se resuelva la promesa
            if (materia) {
                // Evitar duplicados en el materia
                if (!materia.profesores.includes(profesorId)) {
                    materia.profesores.push(profesorId);
                    await materia.save();

                    profesor.materias = id;
                    //profesor.materia.push(id);
                    await profesor.save();
                    
                    res.status(200).json({ message: "Profesor añadido a la materia", materia }); //(200): Petición exitosa
                } else {
                    res.status(400).json({ message: "Profesor ya está asociado a esta materia" }); //(400): Bad Request - El servidor no pudo interpretar la solicitud dada una sintaxis inválida.
                }
            }
            else {
                res.status(404).json({ message: "Materia no encontrada" }); //(404): Not Found
            }
        }
        else {
            res.status(404).json({ message: "Profesor no encontrado" }); //(404): Not Found
        }        
    } catch (error) {
        //res.status(500).json({ message: "Error al agregar estudiante al curso" }); //(500): Internal Server Error
        res.status(500).json({ message: error.message }); //(500): Internal Server Error
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
