const mongoose = require("mongoose"); //Importar mongoose

const EstudianteSchema = new mongoose.Schema({ //Crear esquema
    // Se asume que el Schema tiene un atributo _id autogenerado por MongoDB
    nombre: {
        type: String,
        required: true,
        trim: true, //Eliminar espacios en blanco al inicio y final de la cadena
    },
    apellido: {
        type: String,
        required: true,
        trim: true, //Eliminar espacios en blanco al inicio y final de la cadena
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
    // email y password van acá?
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // email y password van acá?
    legajo: {
        type: String,
        required: true,
    },
    //Relacion entre schemas
    curso:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso",
        },
},

{
    collection: 'estudiantes', // Nombre de la colección especificado
    timestamps: true // Rastrear cuándo fue creado "createdAt" o modificado "updatedAt un documento
});

const Estudiante = mongoose.model("Estudiante", EstudianteSchema); //Crear modelo

module.exports = Estudiante; //Exportar modelo