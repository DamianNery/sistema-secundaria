//CONTROLADOR
const estudiantesModel = require('../models/estudiantesFake.js'); //Importar modelo

const getEstudiantes = (req, res) => {
    res.json(estudiantesModel.getEstudiantes()); //Enviar el array de estudiantes
};

const getEstudiante = (req, res) => {
    let { id } = req.params; //Obtener el id del estudiante
    const idEntero = parseInt(id);
    const estudiante = estudiantesModel.getEstudiante(idEntero); //Obtener el estudiante según el id
    //res.send(`El id es ${id}`);
    if (estudiante) {
        res.json(estudiante); //Enviar el estudiante
    } else {
        res.status(404).json({ //Enviar error 404
            id, 
            encontrado: false
        });
    }
};

const postEstudiante = (req, res) => {
    //TO DO
    let { estudiante } = req.body; //Obtener el estudiante desde el cuerpo de la petición POST (ej: formulario)
    const estudiantePost = estudiantesModel.postEstudiante(estudiante); //Crear el estudiante
    res.json(estudiantePost);
    //Mostrar mensaje de confirmación
};

const updateEstudiante = (req, res) => {
    //TO DO
    let { id } = req.body.id;
    let { estudiante } = req.body;
    const idEntero = parseInt(id);
    const estudiantePut = estudiantesModel.updateEstudiante(idEntero, estudiante); //Actualizar el estudiante
    res.json(estudiantePut);
    //Mostrar mensaje de confirmación
};

const deleteEstudiante = (req, res) => {
    //TO DO
    let { id } = req.params;
    const idEntero = parseInt(id);
    estudiantesModel.deleteEstudiante(idEntero); //Eliminar el estudiante
    //Mostrar mensaje de confirmación
    res.status(200).json({ //200: OK
        msg: "Estudiante eliminado"
    });
};

module.exports = {
    getEstudiantes,
    getEstudiante,
    postEstudiante,
    updateEstudiante,
    deleteEstudiante,
}