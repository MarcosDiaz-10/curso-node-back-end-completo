const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto,  } = require('../controls');
const { categoriaValidator, productoValidator } = require('../helpers/db-validators');
const { validarJWT, validarNombreProducto, validarCampos, tieneRol, validarRolAdmin } = require('../middlewares');


const router = Router();


router.get('/',obtenerProductos );

router.get('/:id', [
    check('id', 'Este no es un id valido de mongo').isMongoId(),
    check( 'id').custom( productoValidator ),
    validarCampos
],obtenerProducto);

router.post('/', [
    validarJWT,
    tieneRol('VENTAS_ROL','ADMIN_ROL'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarNombreProducto,
    check('categoria', 'Este no es un id valido de mongo').isMongoId(),
    check('categoria').custom( categoriaValidator ),
    check('descripcion','Se nesecita una descripcion').notEmpty(),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    tieneRol('VENTAS_ROL','ADMIN_ROL'),
    check('id', 'Este no es un id valido de mongo').isMongoId(),
    check( 'id').custom( productoValidator ),
    check('categoria', 'Este no es un id valido de mongo').isMongoId(),
    check('categoria').custom( categoriaValidator ),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'Este no es un id valido de mongo').isMongoId(),
    check( 'id').custom( productoValidator ),
    validarCampos
],borrarProducto);



module.exports = router;