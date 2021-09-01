const { request, response} = require('express');
const { Rol } = require('../models');

const validarRolAdmin = ( req = request, res = response, next) => {

    if( !req.usuarioAuth){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar primero el token'
        })
    }


    const { rol, nombre } = req.usuarioAuth;

    if( rol !== 'ADMIN_ROL'){

        return res.status(401).json({
            msg: `Rol de ${ nombre} no es valido para esta accion`
        })


    }

    next();

}

const tieneRol = ( ...roles ) => {

    return ( req = request, res = response, next ) => {

        if( !req.usuarioAuth){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero el token'
            })
        }

        if( !roles.includes(req.usuarioAuth.rol)){
            return res.status(401).json({
                msg: `Se requieren uno de estos roles: ${ roles }`
            })
        }



        next();
    }

}


const rolTokenValido = async( req, res = response, next ) => {

    const { rol } = req.usuarioAuth;

    const existeRol = await Rol.findOne({ rol });

    if( !existeRol ){
        res.status( 400 ).json({
            msg: `El rol ${ rol } no existe`
        });
    }

    next();

}



module.exports = {
    validarRolAdmin,
    tieneRol,
    rolTokenValido
}