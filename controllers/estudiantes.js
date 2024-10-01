//CONTROLADOR
const estudiantesModel = require('../models/estudiantesFake');

const getEstudiantes = (req, res) => {
    res.json(estudiantesModel.getEstudiantes());
};

const getEstudiante = (req, res) => {
    let { id } = req.params;
    const idEntero = parseInt(id);
    const estudiante = estudiantesModel.getEstudiante(idEntero);
    //res.send(`El id es ${id}`);
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).json({ 
            id, 
            encontrado: false
        });
    }
};

const postEstudiante = (req, res) => {
    //TO DO
};

const updateEstudiante = (req, res) => {
    //TO DO
};

const deleteEstudiante = (req, res) => {
    //TO DO
};

module.exports = {
    getEstudiantes,
    getEstudiante,
    postEstudiante,
    updateEstudiante,
    deleteEstudiante,
}