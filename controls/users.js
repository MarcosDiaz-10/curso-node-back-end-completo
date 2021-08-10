const { response, request } = require( 'express' );



const usersGet = ( req = request, res = response ) => { 

const { q, nombre, apikey} = req.query;

      res.json( {

          msg:"get api- By controller",
	  q,
	  nombre,
	  apikey
          } )
     }


const usersPost = ( req, res = response ) => { 

const body = req.body;

      res.json( {

          msg:"post api- By controller",
	  body
          } )
     }

const usersPut = ( req, res = response ) => { 

      const { id } = req.params;

      res.json( {

          msg:"put api- By controller",
	  id
          } )
     }

const usersPatch = ( req, res = response ) => { 

      res.json( {

          msg:"patch api- By controller"

          } )
     }

const usersDelete = ( req, res = response ) => { 

      res.json( {

          msg:"delete api- By controller"

          } )
     }


module.exports = {

    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

} 
