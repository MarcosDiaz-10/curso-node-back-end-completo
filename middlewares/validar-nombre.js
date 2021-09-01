const { response } = require('express');
const { Categoria, Producto } = require('../models')

const validarNombre = async( req, res = response, next ) => {
    
    const nombre = req.body.nombre.toUpperCase();
    
        const categoriaDB = await Categoria.findOne( { nombre } );
    
        if( categoriaDB ){
            return res.status( 400 ).json({
                msg: `La categoria ${ categoriaDB.nombre } ya existe`
            })
        }

        req.body.nombre = nombre;

        next();
}

const validarNombreProducto = async( req, res = response, next ) => {
     
    const nombre = req.body.nombre.toUpperCase();
    
        const productoDB = await Producto.findOne( { nombre } );
    
        if( productoDB ){
            return res.status( 400 ).json({
                msg: `El producto ${ productoDB.nombre } ya existe`
            })
        }

        req.body.nombre = nombre;

        next();
}   




module.exports = {
    validarNombre,
    validarNombreProducto
}