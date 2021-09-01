const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, validarRolAdmin, tieneRol } = require('../middlewares')

const { usersGet, usersGetById ,usersPost, usersPut, usersPatch, usersDelete } = require('../controls/users')
const { emailValidator,rolValidator, usuarioValidator } = require('../helpers/db-validators')



const router = Router();

    router.get('/',usersGet )  

    router.get('/:id', [
      check('id', 'No es un ID valido').isMongoId(),
	    check('id').custom( usuarioValidator ),
      validarCampos
    ], usersGetById)
 
     
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
      validarCampos
    ], usersPut )


    router.patch('/', usersPatch )


    router.delete('/:id',[
      validarJWT,
      validarRolAdmin,
      tieneRol( 'USER_ROL', 'ADMIN_ROL' ),
      check('id', 'No es un ID valido').isMongoId(),
	    check('id').custom( usuarioValidator ),
      validarCampos

    ], usersDelete )

 



module.exports = router;
