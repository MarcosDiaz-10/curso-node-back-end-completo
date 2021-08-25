const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSingIn } = require('../controls/auth');
const { validarCampos } = require('../middlewares/validar-campos')


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



module.exports = router;