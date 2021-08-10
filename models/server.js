const express = require('express');
const cors = require('cors');


class Server{

  constructor(){
      this.app = express(); 
      this.port =  process.env.PORT; 
      this.usuariosPath = '/api/users';


      /*Middlewares*/

      this.middlewares();

      /*Rutas de mi aplicacion */
      this.routes();
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


  this.app.use( this.usuariosPath, require('../routes/users' ));



} 
  listen(){
    
      this.app.listen( this.port , () => { console.log(`Escuchando en el puerto ${ this.port }`)});

  }


}




module.exports = Server;
