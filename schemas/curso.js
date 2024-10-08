const mongoose = require("mongoose"); //Importar mongoose

const cursoSchema = new mongoose.Schema({ //Crear esquema
    año: {
        type: Number,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    codigo: {
        type: String, //o Number?
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
},
/* Rastrear cuándo fue creado "createdAt" o modificado "updatedAt un documento
{
    timestamps: true,
},
*/
);

const Curso = mongoose.model("Curso", cursoSchema); //Crear modelo

module.exports = Curso; //Exportar modelo