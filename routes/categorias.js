const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controls/categorias');
const { categoriaValidator } = require('../helpers/db-validators');
const { validarJWT, validarCampos, validarNombre, tieneRol, rolTokenValido, validarRolAdmin } = require('../middlewares');



const router = Router();


// Obtener todas las categorias - public
router.get( '/', obtenerCategorias )

// Obtener una categoria por id - public
router.get( '/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( categoriaValidator ),
    validarCampos
], obtenerCategoria)

// Crear categoria - privado - cualquier persona con un token valido 
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarNombre,
    validarCampos
], crearCategoria)


// Actualizar categoria - privado - cualquier persona con un token valido 
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRol('VENTAS_ROL','ADMIN_ROL'),
    rolTokenValido,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( categoriaValidator ),
    validarCampos
], actualizarCategoria )

// Borrar categoria - privado - cualquier persona con un token valido 
router.delete( '/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( categoriaValidator ),
    validarCampos
], borrarCategoria)



module.exports = router;