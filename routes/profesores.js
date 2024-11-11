//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getProfesores, getProfesor, 
    postProfesor, updateProfesor, deleteProfesor } = require('../controllers/profesores'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

// Importar middlewares de validación
const { validarJwt, validarRolAdmin } = require('../middlewares/validations.js');

//getTodos --> Obtener todos los profesores
router.get('/', getProfesores); //PÚBLICA
//router.get('/', validarJwt, getProfesores); //VALIDACIÓN

//get>ById --> Obtener un profesor por su id
//router.get('/:id', getProfesor); //PÚBLICA
router.get('/:id', validarJwt, getProfesor); //VALIDACIÓN

//add --> Crear un profesor
//router.post('/', postProfesor); //PÚBLICA
router.post('/', [validarJwt, validarRolAdmin], postProfesor); //VALIDACIÓN

//updateById --> Actualizar un profesor por su id
//router.put('/:id', updateProfesor); //PÚBLICA
router.put('/:id', validarJwt, updateProfesor); //VALIDACIÓN

//Ruta para eliminar un profesor por su id
//router.delete('/:id', deleteProfesor); //PÚBLICA
router.delete('/:id', [validarJwt, validarRolAdmin], deleteProfesor); //VALIDACIÓN

module.exports = router;