//MODELO
const arrayDeEstudiantes = require("../data/estudiantesFake.js"); //Importar array de estudiantes

const getEstudiantes = () => { //Función para obtener todos los estudiantes
    return arrayDeEstudiantes;
};

const getEstudiante = (id) => { //Función para obtener un estudiante por su id
    return arrayDeEstudiantes.find((estudiante) => estudiante.id === id);
};

const postEstudiante = (estudiante) => { //Función para crear un estudiante
    arrayDeEstudiantes.push(estudiante); //Agregar el estudiante
};

const updateEstudiante = (id, estudiante) => { //Función para actualizar un estudiante por su id
    const index = arrayDeEstudiantes.findIndex((estudiante) => estudiante.id === id); //Buscar el indice del estudiante
    arrayDeEstudiantes[index] = estudiante; //Actualizar el estudiante
};

const deleteEstudiante = (id) => { //Función para eliminar un estudiante por su id
    const index = arrayDeEstudiantes.findIndex((estudiante) => estudiante.id === id); //Buscar el indice del estudiante
    arrayDeEstudiantes.splice(index, 1); //Eliminar el estudiante
};

module.exports = {
    getEstudiantes,
    getEstudiante,
    postEstudiante,
    updateEstudiante,
    deleteEstudiante,
};
