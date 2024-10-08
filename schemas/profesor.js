const mongoose = require("mongoose"); //Importar mongoose

const profesorSchema = new mongoose.Schema({ //Crear esquema
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    dni: {
        type: String, //o Number?
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    legajo: {
        type: String,
        required: true,
    },
});

const Profesor = mongoose.model("Profesor", profesorSchema); //Crear modelo

module.exports = Profesor; //Exportar modelo