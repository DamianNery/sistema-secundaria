const mongoose = require("mongoose"); //Importar mongoose

const estudianteSchema = new mongoose.Schema({ //Crear esquema
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
/* Rastrear cuándo fue creado "createdAt" o modificado "updatedAt un documento
{
    timestamps: true,
},
*/
);

const Estudiante = mongoose.model("Estudiante", estudianteSchema); //Crear modelo

module.exports = Estudiante; //Exportar modelo