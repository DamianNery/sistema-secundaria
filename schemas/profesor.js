//En express-rest-server models/Ingrediente.js
const mongoose = require("mongoose"); //Importar mongoose

const ProfesorSchema = new mongoose.Schema({ //Crear esquema
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    dni: {
        type: Number, //o String?
        required: true,
    },
    /*
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    telefono: {
        type: Number,
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
        type: Number,
        required: true,
    },
    */
    //Relacion entre schemas
    materias: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Materia",
        },
    ],
},{
    collection: 'profesores', // Nombre de la colección especificado,
    timestamps: true // Añade campos de createdAt (Cuando fue creado) y updatedAt (Cuando fue modificado)
});

const Profesor = mongoose.model("Profesor", ProfesorSchema); //Crear modelo

module.exports = Profesor; //Exportar modelo