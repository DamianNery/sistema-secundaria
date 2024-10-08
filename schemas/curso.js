const mongoose = require("mongoose"); //Importar mongoose

const cursoSchema = new mongoose.Schema({ //Crear esquema
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
});

const Curso = mongoose.model("Curso", cursoSchema); //Crear modelo

module.exports = Curso; //Exportar modelo