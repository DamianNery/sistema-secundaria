//NOMBRE DEL ARCHIVO EN MAYÚSCULA PORQUE ES UNA CLASE
const express = require('express'); //Importar express

class Server {

    constructor() {
        this.port = process.env.PORT; //Puerto de escucha (default 3000)
        this.app = express(); //Instancia de express
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`); //Imprimir en consola
        }); //Iniciar el servidor
    }
}

module.exports = Server; //Exportar la clase Server