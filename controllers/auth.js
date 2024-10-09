const jwt = require('jsonwebtoken'); //Importar jwt (JSON Web Token)

    /*
        Validar user y clave.
        Si son correctos:
            Crear, firmar y retornar un JWT
        Sino:
            Enviar error 403
    */
const login = async (req, res) => {
    // ESTO NO VA...
    const userEsperado = {
        _id: "idDeMentiritas",
        nombre: "juan",
        pass: "1234"
    }
    const {_id, nombre, pass} = userEsperado;
    
    try {
        const {user, clave} = req.body;
        // Validar user existente
        if (user !== nombre) { //user !== userEsperado.nombre
            return res.status(401).json({ //401: No autorizado
                msg: "Credenciales invalidas"
            });
        }
        // Validar clave
        if (clave !== pass) { //clave !== userEsperado.pass
            return res.status(401).json({ //401: No autorizado
                msg: "Credenciales invalidas"
            });
        }
        // Generar el JWT
        const token = await generarJWT( userEsperado ); //Devuelve el token
        
        res.json({ //200: OK
            userEsperado,
            token
        })
    } catch(error) { 
        console.log(error)
        res.status(500).json({ //500: Error interno
            status: 'error',
            msg: error
        });    
    }
} 

const generarJWT = ( user ) => {
    return new Promise( (resolve, reject) => { //Devuelve una promesa
        const payload = { //el payload es el objeto que se va a firmar ?
            id: user?.id,
            nombre: user?.nombre
        };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { //Firmar el token
            expiresIn: 10 // 10 segundos para probar que se venza
        }, ( err, token ) => {
            if ( err ) { //
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token ); //Devolver el token
            }
        })
    })
}
module.exports = {
    login
}