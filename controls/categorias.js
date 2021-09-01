const { response } = require("express");

const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate

const obtenerCategorias = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado : true }
    try {
        
        const [ total, categotias] = await Promise.all([
            Categoria.countDocuments( query ),
            Categoria.find( query )
                    .skip( Number( desde ))
                    .limit( Number( limite ))
                    .populate('usuario', 'nombre')
        ])


        res.status( 200 ).json({
            total,
            categotias
        })
        
    } catch (error) {

        res.status( 400 ).json({
            msg: 'Hable con el admistrador'
        })

    }

}


// obtenerCategoria - populate {}

const obtenerCategoria = async( req, res = response) => {

    const { id } = req.params;


    const categoria = await Categoria.findById( id )
                                    .populate('usuario', 'nombre')

    if( !categoria.estado ){
        return res.status( 400 ).json({
            msg: 'Hable con el administrador el usuario ha sido borrado'
        })
    }

    res.status( 200 ).json(categoria)

}


const crearCategoria = async( req, res = response ) => {

    const { nombre } = req.body;

    const data = {
        nombre,
        usuario: req.usuarioAuth._id
    }

    const categoria = new Categoria( data );

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizar categoria

const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuarioAuth._id
    }
    try {
           
        const categoria = await Categoria.findByIdAndUpdate( id , data, { new: true });
    

        res.status( 200 ).json( categoria );

    } catch (error) {

        res.status( 400 ).json( {
            msg: 'Hable con el administrador'
        })
    }



}

//borrarCategoria

const borrarCategoria = async( req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false })

    res.json( categoria )
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}