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
},
/* Rastrear cuándo fue creado "createdAt" o modificado "updatedAt un documento
{
    timestamps: true,
},
*/
);

const Materia = mongoose.model("Materia", materiaSchema); //Crear modelo

module.exports = Materia; //Exportar modelo