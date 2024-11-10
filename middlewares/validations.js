const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Estudiante = require('../schemas/Estudiante.js'); // Modelo de Usuario

// Middleware para validar JWT
const validarJwt = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Decodificar el token
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Buscar el usuario en la base de datos
        const usuario = await Estudiante.findById(id);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        
        /*
        // Verificar si el usuario tiene un estado activo (opcional)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            });
        }
        */

        // Adjuntar usuario a la request para usarlo en otros middlewares
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

// Middleware para validar rol de administrador
const validarRolAdmin = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN') {
        return res.status(403).json({
            msg: `El usuario ${nombre} no tiene permisos de administrador`
        });
    }

    next();
}

module.exports = {
    validarJwt,
    validarRolAdmin
}


/*
const { response, request } = require('express'); //Importar express
const jwt = require('jsonwebtoken'); //Importar jwt (JSON Web Token)

const validarJwt = async( req = request, res = response, next ) => { //Función de validación de token

    // ESTO NO VA...
    const userEsperado = {
        _id: "idDeMentiritas",
        nombre: "juan",
        pass: "1234"
    }

    const token = req.header('x-token'); //Obtener el token

    if ( !token ) { //Si no hay token
        return res.status(401).json({ //401: No autorizado
            msg: 'No hay token en la petición'
        });
    }

    try { 
        
        const data = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); //Firmar el token
        const {nombre} = data;

        // const usuario = await Usuario.findById( uid );

        if( userEsperado.nombre !== nombre ) {
            return res.status(401).json({ //401: No autorizado
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        
        req.nombreDeUsuario = nombre;
        next();

    } catch (error) { 
        console.log(error);
        res.status(401).json({ //401: No autorizado
            msg: 'Token no válido'
        })
    }

}

const validarRol = (req, resp, next) => {
    // ESTO NO VA...
    const userEsperado = {
        _id: "idDeMentiritas",
        nombre: "juan",
        rol: "pichi",
        pass: "1234"
    }
    // buscar usuario "juan"

    if (req.nombreDeUsuario === userEsperado.nombre) {
        if (userEsperado.rol === "ADMIN") {
            next();
        } else {
            resp.status(401).json({ //401: No autorizado
                msg: "afueraaaa, sos pichi, no sos admin"
            })
        }
    } else {
        resp.status(401).json({ //401: No autorizado    
            msg: "afueraaaa"
        })
    }

    console.log(req.nombreDeUsuario)
    next();
}

module.exports = {
    validarJwt,
    validarRol
}

*/