const Rol = require('../models/rol')
const Usuario = require('../models/usuario');

const emailValidator = async( correo = '' ) => {

   const  existeEmail = await Usuario.findOne({ correo })

      if ( existeEmail ){

	throw new Error (`El correo ${ correo } ya existe`)

  }
} 

const rolValidator =  async (rol = '') => {

   const existeRol = await Rol.findOne({ rol });

  if(  !existeRol ){

      throw new Error(`${ rol } no es un rol valido `)

  }
}

const usuarioValidator = async( id ) => {

   const existeId = await Usuario.findById(id);

  if( !existeId ){

    throw new Error (`El usuario con id ${ id } no existe`)

  }

}



module.exports = {
    emailValidator,
    rolValidator,
    usuarioValidator

}
