//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getCursos, getCurso, 
    postCurso, updateCurso, deleteCurso, getEstudiantesEnCurso } = require('../controllers/cursos'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

router.get('/', getCursos); //Ruta para obtener todos los Cursos
router.get('/:id', getCurso); //Ruta para obtener un Curso por su id
router.post('/', postCurso); //Ruta para crear un Curso
router.put('/:id', updateCurso); //Ruta para actualizar un Curso por su id
router.delete('/:id', deleteCurso); //Ruta para eliminar un Curso por su id

router.get('/:id/estudiantes', getEstudiantesEnCurso); //Ruta para obtener los estudiantes de un Curso específico
module.exports = router;