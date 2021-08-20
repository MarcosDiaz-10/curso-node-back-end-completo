const { response, request } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");



const login  = async( req, res = response ) => {

    const { correo, contraseña } = req.body; 


    try{
     
        //Verificar si el email existe

        const usuario = await Usuario.findOne( {correo} )

        if( !usuario ){

            return res.status(400).json({
                msg: 'El Usuario o la contraseña no son correctas - correo'
            })

        }

        //Si el usuario esta activo 

        if( !usuario.estado ){

            return res.status(400).json({
                msg: 'El Usuario o la contraseña no son correctas - estado: false'
            })

        }

        //Verificar la contraseña

        const validarContraseña =  bcryptjs.compareSync( contraseña, usuario.contraseña )

        if( !validarContraseña ){
            return res.status(400).json({
                msg: 'El Usuario o la contraseña no son correctos - contraseña'
            })
        }


        //Generar el JWT 

        const token = await generarJWT( usuario.id );



        res.json({
            usuario,
            token
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }




}


module.exports = { 

    login
    
}