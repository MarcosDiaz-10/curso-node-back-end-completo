const mongoose = require( 'mongoose' ) 



const conectionDb = async() => {

    try{


      await mongoose.connect( process.env.MONGODB_CNN, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false});
 


      console.log('CONEXION EXITOSA!!!!');

    }catch( error ){

      console.log(error);

      throw new Error('Error en la conexion con la base de datos');

    }
}



module.exports = {

  conectionDb

}
