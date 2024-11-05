//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getMaterias, getMateria, 
    postMateria, updateMateria, deleteMateria, assignProfesorToMateria } = require('../controllers/Materias'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

//RUTAS
router.get('/', getMaterias); //Obtener todos los Materias
router.get('/:id', getMateria); //Obtener un Materia por su id
router.post('/', postMateria); //Crear un Materia
router.put('/:id', updateMateria); //Actualizar un Materia por su id
router.delete('/:id', deleteMateria); //Eliminar un Materia por su id

router.post('/:id/profesores', assignProfesorToMateria); // Asignar un profesor a una materia

module.exports = router;