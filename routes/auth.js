const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSingIn, renovarToken } = require('../controls/auth');
const { validarCampos, validarJWT } = require('../middlewares')


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn );

router.get('/', validarJWT, renovarToken );


module.exports = router;