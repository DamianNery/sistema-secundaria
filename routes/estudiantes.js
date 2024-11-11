//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getEstudiantes, getEstudiante, postEstudiante, updateEstudiante, deleteEstudiante, obtenerEstudianteConCursoYMaterias } = require('../controllers/estudiantes'); //Cargar controladores

// Importar middlewares de validación
const { validarJwt, validarRolAdmin } = require('../middlewares/validations.js');

//getTodos --> Obtener todos los estudiantes
router.get('/', getEstudiantes); //PÚBLICA  
//router.get('/:id', validarJwt, getEstudiantes); //VALIDACIÓN

//get>ById --> Obtener estudiante por su id
//router.get('/:id', getEstudiante); //PÚBLICA
router.get('/:id', validarJwt, getEstudiante); //VALIDACIÓN

//add --> Crear un estudiante
//router.post('/', postEstudiante); //PÚBLICA
router.post('/', [validarJwt, validarRolAdmin], postEstudiante); //VALIDACIÓN

//updateById --> Actualizar estudiante por su id
//router.put('/:id', updateEstudiante); //PÚBLICA
router.put('/:id', validarJwt, updateEstudiante); //VALIDACIÓN

//deleteById --> Eliminar estudiante por su id
//router.delete('/:id', deleteEstudiante); //PÚBLICA 
router.delete('/:id', [validarJwt, validarRolAdmin], deleteEstudiante); //VALIDACIÓN

//Obtener un estudiante con sus cursos y materias
//router.get('/:id/curso-materias', obtenerEstudianteConCursoYMaterias); //PÚBLICA
router.get('/:id/curso-materias', validarJwt, obtenerEstudianteConCursoYMaterias); //VALIDACIÓN

module.exports = router;