//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getProfesores, getProfesor, 
    postProfesor, updateProfesor, deleteProfesor } = require('../controllers/profesores'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

router.get('/', getProfesores); //Ruta para obtener todos los Profesores
router.get('/:id', getProfesor); //Ruta para obtener un Profesor por su id
router.post('/', postProfesor); //Ruta para crear un Profesor
router.put('/:id', updateProfesor); //Ruta para actualizar un Profesor por su id
router.delete('/:id', deleteProfesor); //Ruta para eliminar un Profesor por su id

module.exports = router;