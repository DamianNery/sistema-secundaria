require('dotenv').config(); //Cargar variables de entorno

const Server = require('./Server'); //Importar clase Server

const elServer = new Server(); //Instancia de Server
elServer.listen(); //Iniciar el servidor