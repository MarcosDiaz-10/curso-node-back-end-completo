const { Usuario, Rol, Categoria, Producto } = require('../models');

const emailValidator = async( correo = '' ) => {

   const  existeEmail = await Usuario.findOne({ correo })

      if ( existeEmail ){

	      throw new Error (`El correo ${ correo } ya existe`)

  }
} 

const rolValidator =  async (rol = '' ) => {

   const existeRol = await Rol.findOne({ rol });

  if(  !existeRol ){

      throw new Error(`${ rol } no es un rol valido `)

  }

}

const usuarioValidator = async( id ) => {

   const existeId = await Usuario.findById( id, { estado: true } );


  if( !existeId ){

    throw new Error (`El usuario con id ${ id } no existe`)

  }



}

const categoriaValidator = async( id ) => {

    const existeId = await Categoria.findById( id, { estado: true } )

  if( !existeId ){
    
    throw new Error ( `La categoria con el id: ${ id } no existe`)

  }

}

const productoValidator = async( id ) => {

  const existeId = await Producto.findById( id, { estado: true } )

if( !existeId ){
  
  throw new Error ( `El producto con el id: ${ id } no existe`)

}

}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

  if( !colecciones.includes( coleccion ) ){

    throw new Error ( `La coleccion no esta dentro de la siguiente lista ${ colecciones }`)

  }

  return true

}



module.exports = {
    emailValidator,
    rolValidator,
    usuarioValidator,
    categoriaValidator,
    productoValidator,
    coleccionesPermitidas

}
