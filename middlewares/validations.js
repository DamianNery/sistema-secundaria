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