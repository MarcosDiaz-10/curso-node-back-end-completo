const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { createServer } = require('http');

const { conectionDb } = require('../DB/config')
const { socketController } = require('../sockets/controller');

class Server{

  constructor(){
      this.app = express(); 
      this.port =  process.env.PORT; 
      this.server = createServer( this.app );
      this.io     = require('socket.io')(this.server)

      this.paths = {
        usuarios: '/api/users',
        auth:     '/api/auth',
        categorias: '/api/categorias',
        productos: '/api/productos',
        buscar: '/api/buscar',
        cargarArchivo: '/api/uploads'
      }



      //Conectar a la base de datos

      this.conectToDb();

      /*Middlewares*/

      this.middlewares();

      /*Rutas de mi aplicacion */
      this.routes();

      // Sockets
      this.sockets();
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


    //Carga de arvhivos

    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));



  }



  routes() {

    
  this.app.use( this.paths.auth, require('../routes/auth' ));

  this.app.use( this.paths.usuarios, require('../routes/users' ));

  this.app.use( this.paths.categorias, require('../routes/categorias'))

  this.app.use( this.paths.productos, require('../routes/productos'))

  this.app.use( this.paths.buscar, require('../routes/buscar'))

  this.app.use( this.paths.cargarArchivo, require('../routes/uploads'))

} 
  sockets() {
    this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
  }

  listen() {
    this.server.listen( this.port, () => {
        console.clear()
        console.log('Servidor corriendo en puerto', this.port );
    });
  }

}




module.exports = Server;
