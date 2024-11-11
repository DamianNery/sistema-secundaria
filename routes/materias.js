//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getMaterias, getMateria, postMateria, updateMateria, deleteMateria, assignProfesorToMateria } = require('../controllers/Materias');

// Importar middlewares de validación
const { validarJwt, validarRolAdmin } = require('../middlewares/validations.js');

//getTodos --> Obtener todos los Materias
router.get('/', getMaterias); //PÚBLICA 
//router.get('/', validarJwt, getMaterias); //VALIDACIÓN

//Obtener un Materia por su id
router.get('/:id', getMateria); //PÚBLICA
//router.get('/:id', validarJwt, getMateria); //VALIDACIÓN

//Crear un Materia
//router.post('/', postMateria); //PÚBLICA
router.post('/', [validarJwt, validarRolAdmin], postMateria); //VALIDACIÓN

//Actualizar un Materia por su id
//router.put('/:id', updateMateria); //PÚBLICA
router.put('/:id', [validarJwt, validarRolAdmin], updateMateria); //VALIDACIÓN

//Eliminar un Materia por su id
//router.delete('/:id', deleteMateria); //PÚBLICA
router.delete('/:id', [validarJwt, validarRolAdmin], deleteMateria); //VALIDACIÓN

// Asignar un profesor a una materia
//router.post('/:id/profesores', assignProfesorToMateria); //PÚBLICA 
router.post('/:id/profesores', [validarJwt, validarRolAdmin], assignProfesorToMateria); //VALIDACIÓN

module.exports = router;