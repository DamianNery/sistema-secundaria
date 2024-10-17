require('dotenv').config(); //Cargar variables de entorno
// El archivo .example.env es para que los estudiantes tengan un ejemplo de como recrearlo en su máquina local. Recordar que el archivo debe llamarse '.env' para que pueda ser levantado por el renglón anterior (y entonces Git dejará de versionarlo por lo que pusimos en .gitignore)

const Server = require('./Server'); //Importar clase Server

const elServer = new Server(); //Instancia de Server
elServer.listen(); //Iniciar el servidor