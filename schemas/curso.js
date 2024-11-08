//En express-rest-server models/Ingrediente.js
const mongoose = require("mongoose"); //Importar mongoose

const cursoSchema = new mongoose.Schema({ //Crear esquema
    anio: {
        type: Number,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    //Relacion entre schemas
    materias: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Materia",
        },
    ],
    estudiantes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estudiante",
        },
    ],
},{
    collection: 'cursos', // Nombre de la colección especificado,
    timestamps: true // Añade campos de createdAt (Cuando fue creado) y updatedAt (Cuando fue modificado)
});

const Curso = mongoose.model("Curso", cursoSchema); //Crear modelo

module.exports = Curso; //Exportar modelo