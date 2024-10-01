//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getEstudiantes, getEstudiante, 
    postEstudiante, updateEstudiante, deleteEstudiante } = require('../controllers/estudiantes'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

router.get('/', getEstudiantes); //Ruta para obtener todos los estudiantes
router.get('/:id', getEstudiante); //Ruta para obtener un estudiante por su id
router.post('/', postEstudiante); //Ruta para crear un estudiante
router.put('/:id', updateEstudiante); //Ruta para actualizar un estudiante por su id
router.delete('/:id', deleteEstudiante); //Ruta para eliminar un estudiante por su id

module.exports = router;