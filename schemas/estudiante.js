//En express-rest-server models/Ingrediente.js
const mongoose = require("mongoose"); //Importar mongoose
const bcrypt = require('bcryptjs'); // Importar bcrypt para encriptación de contraseñas

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
        type: Number, //o String?
        required: true,
        unique: true, //No puede haber dos estudiantes con el mismo DNI
    },
    /*
    fechaNacimiento: {
        type: Date,
        required: false,
    },
    telefono: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true, //No puede haber dos estudiantes con el mismo email
        match: [/.+\@.+\..+/, "Formato de correo no válido"], //Validar que sea un correo
    },
    */
    password: {
        type: String,
        required: true,
        minlength: 4, //Mínimo 4 caracteres
    },
    rol: {
        type: String,
        required: true,
    },
    /*
    legajo: {
        type: Number,
        required: false,
        unique: true, //No puede haber dos estudiantes con el mismo legajo
    },  
    */   
    //Relacion entre schemas
    curso:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso",
        },
  
},{
    collection: 'estudiantes', // Nombre de la colección especificado
    timestamps: true // Añade campos de createdAt (Cuando fue creado) y updatedAt (Cuando fue modificado)
});

/*
// Middleware para encriptar el password antes de guardar
EstudianteSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
*/

const Estudiante = mongoose.model("Estudiante", EstudianteSchema); //Crear modelo

module.exports = Estudiante; //Exportar modelo