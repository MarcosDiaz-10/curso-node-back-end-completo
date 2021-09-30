const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, actualizarImagen, mostrarImagenes, actualizarImagenCloudinary } = require('../controls');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos, existeArchivo } = require('../middlewares')


const router = Router();

router.post('/', cargarArchivos)

router.put( '/:coleccion/:id' , [
    check('id', 'No es un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos', 'categoria'])),
    existeArchivo,
    validarCampos
], actualizarImagenCloudinary )

router.get('/:coleccion/:id', [ 
    check( 'id', 'No es un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos', 'categoria'])),
    validarCampos
], mostrarImagenes)


module.exports = router;