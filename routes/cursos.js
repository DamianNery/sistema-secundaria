//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getCursos, getCurso, postCurso, updateCurso, deleteCurso, getEstudiantesEnCurso, addEstudianteToCurso, addMateriaToCurso } = require('../controllers/cursos'); //Cargar controladores

// Importar middlewares de validación
const { validarJwt, validarRolAdmin } = require('../middlewares/validations.js');

//getTodos --> Obtener todos los cursos
router.get('/', getCursos); //PÚBLICA
//router.get('/:id', validarJwt, getCursos); //VALIDACIÓN

//get>ById --> Obtener curso por su id
router.get('/:id', getCurso); //PÚBLICA
//router.get('/:id', validarJwt, getCurso); //VALIDACIÓN

//add --> Crear un curso
//router.post('/', postCurso); //PÚBLICA 
router.post('/', [validarJwt, validarRolAdmin], postCurso); //VALIDACIÓN

//updateById --> Actualizar curso por su id
//router.put('/:id', updateCurso); //PÚBLICA 
router.put('/:id', [validarJwt, validarRolAdmin], updateCurso); //VALIDACIÓN

//deleteById --> Eliminar curso por su id
//router.delete('/:id', deleteCurso); //PÚBLICA
router.delete('/:id', [validarJwt, validarRolAdmin], deleteCurso); //VALIDACIÓN

//Obtener los estudiantes de un curso específico
//router.get('/:id/estudiantes', getEstudiantesEnCurso); //PÚBLICA 
router.get('/:id/estudiantes', validarJwt, getEstudiantesEnCurso); //VALIDACIÓN

//Agregar un estudiante a un curso
//router.post('/:id/estudiantes', addEstudianteToCurso); //PÚBLICA 
router.post('/:id/estudiantes', [validarJwt, validarRolAdmin], addEstudianteToCurso); //VALIDACIÓN

//Agregar una materia a un curso
//router.post('/:id/materias', addMateriaToCurso); //PÚBLICA 
router.post('/:id/materias', [validarJwt, validarRolAdmin],addMateriaToCurso); //VALIDACIÓN

module.exports = router;