//NOMBRE DEL ARCHIVO EN MAYÚSCULA PORQUE ES UNA CLASE
const express = require('express'); //Importar express
//const mongodb = require('mongodb'); //Importar mongodb
const mongoose = require('mongoose'); //Importar mongoose

const estudiantesRoutes = require('./routes/estudiantes');
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
        this.app.use(express.json()); //Permitir peticiones con formato JSON
    }

    cargarRutas() {
        this.app.use("/api/estudiantes",require('./routes/estudiantes'));
        //this.app.use("/api", require('./routes/auth'));
    }

    async conectarABD() {
        
        // Link de interes: https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

        // Las credenciales de acceso deberían estar en el .env para no exponerlas en el codigo fuente

        const user = process.env.MONGODB_USER; //Cargar variable de entorno
        const pass = process.env.MONGODB_PASS; //Cargar variable de entorno
        
        //const uri = `mongodb+srv://${user}:${pass}@micluster.umg5e.mongodb.net/recetorium?retryWrites=true&w=majority&appName=miCluster`;
        const uri = process.env.MONGODB_URI; //Cargar variable de entorno

        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri);
            console.log("Conectado a BD en la nube");
        }
        catch (e) {
            console.log("Error al conectar a BD en la nube");
        }
        
    }
}

module.exports = Server; //Exportar la clase Server