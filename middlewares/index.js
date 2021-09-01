const validarCampos = require('../middlewares/validar-campos')
const validarJWT  = require('../middlewares/validarJWT')
const  validarRoles = require('../middlewares/validar-roles')
const validarNombre = require('../middlewares/validar-nombre')






module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarNombre
}