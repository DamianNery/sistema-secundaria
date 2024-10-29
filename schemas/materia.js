//En express-rest-server models/Ingrediente.js
const mongoose = require("mongoose"); //Importar mongoose

const materiaSchema = new mongoose.Schema({ //Crear esquema
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    codigo: {
        type: String, //o Number?
        required: true,
    },
    //Relacion entre schemas
    cursos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso",
        },
    ],
    profesores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profesor",
        },
    ],
},{
    collection: 'materias', // Nombre de la colección especificado,
    timestamps: true // Añade campos de createdAt (Cuando fue creado) y updatedAt (Cuando fue modificado)
});

const Materia = mongoose.model("Materia", materiaSchema); //Crear modelo

module.exports = Materia; //Exportar modelo