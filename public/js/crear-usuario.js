const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/users'
            : 'https://restserver-curso-fher.herokuapp.com/api/users';


const miFormulario = document.querySelector('form');

const txtError = document.querySelector('#txt-error')

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements ) {
        if ( el.name.length > 0 ) 
            formData[el.name] = el.value
    }

    fetch( url , {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( (usuario) => {

        if( usuario.errors ){

            txtError.style.display = '';

            return txtError.innerText = `No se pudo crear el usuario: ${ usuario.errors[0].msg}`
        }

        window.location = 'index.html'

    })
    .catch( err => {
        txtError.style.display = '';
        console.log(err)
    })
    
});
