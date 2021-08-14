const { Router } = require('express')
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controls/users')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { emailValidator,rolValidator, usuarioValidator } = require('../helpers/db-validators')



const router = Router();

    router.get('/',usersGet )  
 
     
    router.post('/', [
    
      check('nombre','El nombre es obligatorio').not().isEmpty(), 
      check('correo', 'El correo ingresado no es valido').isEmail(),
      check('correo').custom( emailValidator ),
      check('contraseña', 'Ingrese una contraseña con mas de 6 letras').isLength({ min: 6 }),
      check('rol').custom( rolValidator ),
      validarCampos

    ],usersPost ) 


    router.put('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom( usuarioValidator ),
        check('rol').custom( rolValidator ),
	check('correo', 'El correo ingresado no es valido').isEmail(),
	check('correo').custom( emailValidator ),
      validarCampos
    ], usersPut )


    router.patch('/', usersPatch )


    router.delete('/', usersDelete )

 



module.exports = router;
