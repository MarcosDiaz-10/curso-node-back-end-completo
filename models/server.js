const express = require('express');
const cors = require('cors');
const { conectionDb } = require('../DB/config')

class Server{

  constructor(){
      this.app = express(); 
      this.port =  process.env.PORT; 
      this.usuariosPath = '/api/users';
      this.authPath = '/api/auth';

      //Conectar a la base de datos

      this.conectToDb();

      /*Middlewares*/

      this.middlewares();

      /*Rutas de mi aplicacion */
      this.routes();
  }

  
  async conectToDb(){

   await conectionDb(); 


  } 







  middlewares(){


    //Cors
  
    this.app.use( cors() );



    //Lectura y parseo del body

    this.app.use( express.json() );    

    //Directorio Publico
    this.app.use( express.static( 'public' ) );

  }



  routes() {

    
  this.app.use( this.authPath, require('../routes/auth' ));

  this.app.use( this.usuariosPath, require('../routes/users' ));



} 
  listen(){
    
      this.app.listen( this.port , () => { console.clear();
          console.log(`Escuchando en el puerto ${ this.port }`)});

  }


}




module.exports = Server;
