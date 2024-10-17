//NOMBRE DEL ARCHIVO EN MAYÚSCULA PORQUE ES UNA CLASE
const express = require('express'); //Importar express
//const mongodb = require('mongodb'); //Importar mongodb
const mongoose = require('mongoose'); //Importar mongoose

class Server {
    
    constructor() {
        this.port = process.env.PORT; //Puerto de escucha (default 3000)
        this.app = express(); //Instancia de express
        this.cargarMiddlewares(); //Cargar middlewares
        this.cargarRutas(); //Cargar rutas
        this.conectarABD(); //Conectar a base de datos
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`); //Imprimir en consola
        }); //Iniciar el servidor
    }

    cargarMiddlewares() {
        //this.app.use(express.json()); //Permitir peticiones con formato JSON
    }

    cargarRutas() {
        this.app.use("/api/estudiantes",require('./routes/estudiantes'));
    }

    conectarABD() {
        /*
        //PENDIENTE
        //Buscar link desde repo del profe para ver el paso a paso para conectar BD en la nube (MongoDB + Mongoose)
        //Checkear en clase si es correcto
        const uri = process.env.MONGODB_URI; //Cargar variable de entorno

        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        mongoose.connection.on("connected", () => {
            console.log("Conectado a MongoDB");
        });

        mongoose.connection.on("error", (error) => {
            console.log(error);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Desconectado de MongoDB");
        });
        //Seguir viendo código de recomendación
        //Checkear en clase si es correcto

        */
    }
}

module.exports = Server; //Exportar la clase Server