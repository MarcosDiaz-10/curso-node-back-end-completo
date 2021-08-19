const { response, request } = require( 'express' );
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');




const usersGet = async( req = request, res = response ) => { 

      const { limite = 5, desde = 0} = req.query;
      const query = { estado: true }


      const [ total, usuarios ] = await Promise.all([
            
            Usuario.countDocuments( query ),
            Usuario.find( query )
                  .skip( Number(desde) ) 
                  .limit(Number(limite))
      ]);



      res.json( { total, usuarios } )

}



const usersPost = async ( req, res = response ) => { 

      const { nombre, correo, contraseña, rol } = req.body;

      
      const usuario = new Usuario( { nombre, correo, contraseña, rol } );


      // Encriptar la contraseña

      const salt = bcryptjs.genSaltSync()

      usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

      //Guardar en DB
      await usuario.save();


            res.json( {
            usuario 
            } )
     }

const usersPut = async( req, res = response ) => { 

      const { id } = req.params;

      const { _id,contraseña, google, ...resto} = req.body;

      //Validar contra en base de datos
  
      if( contraseña ){
	
	const salt = bcryptjs.genSaltSync()

	resto.contraseña = bcryptjs.hashSync( contraseña, salt );
      }


      const usuario = await Usuario.findByIdAndUpdate(id, resto) 
      
            res.json( usuario )
     }

const usersPatch = ( req, res = response ) => { 

      res.json( {

          msg:"patch api- By controller"

          } )
     }

const usersDelete = async( req, res = response ) => { 

      const { id } = req.params;

      //Borrar fisicamente de la base de datos

      const usuario = await Usuario.findByIdAndUpdate( id, {estado: false });


      res.json( {

            usuario

          } )
     }


module.exports = {

    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

} 
