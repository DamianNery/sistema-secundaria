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
});

const Materia = mongoose.model("Materia", materiaSchema); //Crear modelo

module.exports = Materia; //Exportar modelo