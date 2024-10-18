//VISTA
const express = require('express'); //Importar express

const router = express.Router(); //Instancia de express

const { getEstudiantes, getEstudiante, 
    postEstudiante, updateEstudiante, deleteEstudiante } = require('../controllers/estudiantesFake'); //Cargar controladores
//const {getTodos, getById, deleteById, updateById, add} = require('../controllers/ingredientes');

//const {validarJwt, validarRol} = require('../middlewares/validations.js');//Cargar middlewares

router.get('/', getEstudiantes); //Ruta PUBLICA para obtener todos los estudiantes

router.get('/:id', getEstudiante); //Ruta PUBLICA para obtener un estudiante por su id --> USAR PARA PRUEBAS
//router.get('/:id', [validarJwt], getEstudiante); //Ruta CON VALIDACIÓN para obtener un estudiante por su id

router.post('/', postEstudiante); //Ruta PUBLICA para crear un estudiante

router.put('/:id', updateEstudiante); //Ruta PUBLICA para actualizar un estudiante por su id

router.delete('/:id', deleteEstudiante); //Ruta para eliminar un estudiante por su id --> USAR PARA PRUEBAS
//router.delete('/:id', [validarJwt, validarRol], deleteEstudiante); //Ruta CON VALIDACIÓN para eliminar un estudiante por su id

module.exports = router;