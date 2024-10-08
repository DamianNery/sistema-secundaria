//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getMaterias, getMateria, 
    postMateria, updateMateria, deleteMateria } = require('../controllers/Materias'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

router.get('/', getMaterias); //Ruta para obtener todos los Materias
router.get('/:id', getMateria); //Ruta para obtener un Materia por su id
router.post('/', postMateria); //Ruta para crear un Materia
router.put('/:id', updateMateria); //Ruta para actualizar un Materia por su id
router.delete('/:id', deleteMateria); //Ruta para eliminar un Materia por su id

module.exports = router;