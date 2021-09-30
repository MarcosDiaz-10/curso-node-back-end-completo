const path = require( 'path' )
const fs = require( 'fs' )

const { response } = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )

const { Usuario, Producto, Categoria } = require('../models')
const { subirArchivo } = require('../helpers/subir-archivo');



const cargarArchivos = async( req, res = response ) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
      res.status(400).json( { msg: 'No hay archivos en la peticion'});
      return;
  }
 
  try {
    
    const nombre = await subirArchivo( req.files)
      
    res.json({
      nombre
    })

  } catch (msg) {
    res.status( 400 ).json({ msg })
  }
  

}

const actualizarImagen  = async( req, res = response ) => {

  const { coleccion, id } = req.params;

  let modelo;

  switch ( coleccion ) {
    case 'usuarios':
      
      modelo = await Usuario.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Usuario no existe'
        })
      }




    break;
    
    case 'categoria':
      
      modelo = await Categoria.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'Categoria no existe'
        })
      }

    break;

    case 'productos':

      modelo = await Producto.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Producto no existe'
        })
      }

    break;
  
    default:
      res.status( 500 ).json({
        msg: 'Hable con el administrador'
      })
    break;
  }

  if( modelo.img ){

    const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img )

    if( fs.existsSync(pathImg) ){
      fs.unlinkSync( pathImg )
    }

  }
  

    const nombre = await subirArchivo( req.files, undefined, coleccion )
    modelo.img = nombre;
  
    await modelo.save();
    
    res.json( modelo )

  
  
}

const mostrarImagenes = async( req, res = response ) => {

  const { coleccion, id } = req.params;

  let modelo;

  switch ( coleccion ) {
    case 'usuarios':
      
      modelo = await Usuario.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Usuario no existe'
        })
      }




    break;
    
    case 'categoria':
      
      modelo = await Categoria.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'Categoria no existe'
        })
      }

    break;

    case 'productos':

      modelo = await Producto.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Producto no existe'
        })
      }

    break;
  
    default:
      res.status( 500 ).json({
        msg: 'Hable con el administrador'
      })
    break;
  }

  if( modelo.img ){

    const urlImg =  modelo.img 

    if( urlImg ){
      return res.redirect(urlImg)
    }

  }
  
  const pathPlaceHolder = path.join( __dirname, '../assets/imagen-no-existe.jpg' )

  res.sendFile(pathPlaceHolder)
    


}

const actualizarImagenCloudinary  = async( req, res = response ) => {

  const { coleccion, id } = req.params;

  let modelo;

  switch ( coleccion ) {
    case 'usuarios':
      
      modelo = await Usuario.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Usuario no existe'
        })
      }




    break;
    
    case 'categoria':
      
      modelo = await Categoria.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'Categoria no existe'
        })
      }

    break;

    case 'productos':

      modelo = await Producto.findById( id )

      if( !modelo ){
         return res.status( 400 ).json({
          msg: 'El Producto no existe'
        })
      }

    break;
  
    default:
      res.status( 500 ).json({
        msg: 'Hable con el administrador'
      })
    break;
  }

  if( modelo.img ){

    const nombreArr = modelo.img.split('/');
    const nombre    = nombreArr[ nombreArr.length -1 ];

    const [ public_id ] = nombre.split('.')

   cloudinary.uploader.destroy( public_id );


  }
  
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url ;
  
    await modelo.save();
    
    res.json( modelo )

  
  
}


module.exports = { 
  cargarArchivos,
  actualizarImagen,
  mostrarImagenes,
  actualizarImagenCloudinary
}