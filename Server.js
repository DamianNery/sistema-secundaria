//NOMBRE DEL ARCHIVO EN MAYÚSCULA PORQUE ES UNA CLASE
const express = require('express'); //Importar express

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
        //PENDIENTE
    }

    cargarRutas() {
        this.app.use("/api/ingredientes",require('./routes/ingredientes'));
    }

    conectarABD() {
        //PENDIENTE
    }
}

module.exports = Server; //Exportar la clase Server