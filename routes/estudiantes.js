//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getEstudiantes, getEstudiante, 
        postEstudiante, updateEstudiante, deleteEstudiante, obtenerEstudianteConCursoYMaterias } = require('../controllers/estudiantes'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

// Importar middlewares de validación
const { validarJwt, validarRolAdmin } = require('../middlewares/validations.js');
//const {validarJwt, validarRol} = require('../middlewares/validations.js');//Cargar middlewares

router.get('/', getEstudiantes); //Ruta PUBLICA --> Obtener todos los estudiantes 

router.get('/:id', getEstudiante); //Ruta PUBLICA --> Obtener estudiante por su id --> USAR PARA PRUEBAS
//router.get('/:id', [validarJwt], getEstudiante); //Ruta CON VALIDACIÓN para obtener un estudiante por su id

router.post('/', postEstudiante); //Ruta PUBLICA --> Crear un estudiante

router.put('/:id', updateEstudiante); //Ruta PUBLICA --> Actualizar estudiante por su id

//router.delete('/:id', deleteEstudiante); //Ruta para eliminar un estudiante por su id --> USAR PARA PRUEBAS
router.delete('/:id', [validarJwt, validarRolAdmin], deleteEstudiante); //Ruta CON VALIDACIÓN --> Eliminar estudiante por su id

//router.get('/:id/curso-materias', obtenerEstudianteConCursoYMaterias); //Ruta para obtener un estudiante con sus cursos y materias --> USAR PARA PRUEBAS
router.get('/:id/curso-materias', validarJwt, obtenerEstudianteConCursoYMaterias); //Ruta CON VALIDACIÓN --> Obtener estudiante con sus cursos y materias --> USAR PARA PRUEBAS

module.exports = router;