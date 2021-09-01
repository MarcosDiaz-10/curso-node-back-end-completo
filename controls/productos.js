const { response } = require('express')
const { Producto } = require('../models');

const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0, categ  } = req.query;

    
    const query = ( categ ) 
                            ? { estado: true, categoria: categ } 
                            : { estado: true }
    
    
    
    try {
        
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments( query ),
            Producto.find( query )
                    .limit( Number( limite ) )
                    .skip( Number( desde ) )
                    .populate('categoria', 'nombre' )
                    .populate( 'usuario', 'nombre' )
        ])

        res.status( 200 ).json({
            total,
            productos
        })


    } catch (error) {
        
        res.status( 500 ).json({
            msg: 'Hable con el admistrador'
        })

    }

}

const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params;

    try {
        
        const producto = await Producto.findById( id )
                                    .populate('categoria', 'nombre' )
                                    .populate( 'usuario', 'nombre' )

        res.status( 200 ).json( producto )

    } catch (error) {
        
        res.status( 500 ).json({
            msg: 'Hable con el admistrador'
        })

    }

}


const crearProducto = async( req, res = response ) => {

    const { nombre, categoria, precio, descripcion } = req.body;

    const data = {

        nombre,
        categoria,
        usuario: req.usuarioAuth._id,
        precio,
        descripcion

    }

    try {
        
        const producto = new Producto( data );
    
        await producto.save();
    
        res.status( 201 ).json( producto )
    
    } catch (error) {

       res.status( 500 ).json({
           msg: 'Hable con el admistrador'
       });

    }


}

const actualizarProducto = async( req, res = response) => {

    const { id } = req.params;

    const {  categoria, precio, descripcion, disponible = true } = req.body;

    nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        categoria,
        usuario: req.usuarioAuth._id,
        precio,
        descripcion,
        disponible
    }

    try {
        
        const producto = await Producto.findByIdAndUpdate( id , data, { new: true })


        res.status( 200 ).json( producto );
        
    } catch (error) {

        res.status( 500 ).json({
            msg: 'Hable con el admistrador'
        })

    }



}

const borrarProducto = async( req, res = response ) => {

    const { id } = req.params;

    try {

        const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false } )
        
        res.json( productoBorrado)

    } catch (error) {
        
        res.status( 500 ).json({
            msg: 'Hable con el admistrador'
        })
    }



}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}