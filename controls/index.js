const users = require('./users');
const auth = require('./auth');
const productos = require('./productos');
const categorias = require('./categorias');
const buscar  = require('./buscar')
const  uploads = require('./uploads');



module.exports = {
    ...users,
    ...auth,
    ...productos,
    ...categorias,
    ...buscar,
    ...uploads
}
