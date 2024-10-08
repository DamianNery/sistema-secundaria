//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getCursos, getCurso, 
    postCurso, updateCurso, deleteCurso } = require('../controllers/Cursos'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

router.get('/', getCursos); //Ruta para obtener todos los Cursos
router.get('/:id', getCurso); //Ruta para obtener un Curso por su id
router.post('/', postCurso); //Ruta para crear un Curso
router.put('/:id', updateCurso); //Ruta para actualizar un Curso por su id
router.delete('/:id', deleteCurso); //Ruta para eliminar un Curso por su id

module.exports = router;