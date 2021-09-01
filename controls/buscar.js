const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos'
]

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ){

        const usuario = await Usuario.findById( termino );

        return res.status( 200 ).json({
            results: ( usuario )? [ usuario] : []
        })
    }

    const regexp = new RegExp( termino, 'i' )

    const query = { 
        $or: [{ nombre: regexp },{ correo: regexp } ],
        $and: [ { estado: true }] 
    }

    const [ total, usuarios ] = await Promise.all([
    
        Usuario.countDocuments( query ),
        Usuario.find( query )

    ])
 
 
    res.status( 200 ).json({
        total, 
        results: usuarios
    })

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ){

        const categoria = await Categoria.findById( termino );

        return res.status(200).json( { results: ( categoria ) ? [ categoria ] : [] } )
    }

    const regexp = new RegExp( termino, 'i' )

    const query = { nombre: regexp, $and: [ { estado: true }]}

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
    ])

    res.status(200).json( {
        total,
        results: categorias
    } )

}

const buscarProductos = async( termino = '', res ) => {


    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ){

                const producto = await Producto.findById( termino ).populate('categoria', 'nombre');

        return res.status(200).json( { results: ( producto ) ? [ producto ] : [] } );
    }

    const regexp = new RegExp( termino, 'i' )

    const query = { nombre: regexp, $and: [ { estado: true }]}

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
                .populate('categoria', 'nombre')
    ])

    res.status(200).json( {
        total,
        results: productos
    } )


}




const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion )){ 
        
        return res.status( 400 ).json({
            msg: `Las coleccion ${ coleccion }, no esta dentro de las permitidas: ${ coleccionesPermitidas }`
        });

    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'categorias':
            buscarCategorias( termino, res );
        break;

        case 'productos':
            buscarProductos( termino, res );
        break;


        default :
            res.status( 500 ).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }



}



module.exports = {
    buscar
}