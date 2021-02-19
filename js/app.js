// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener(){

    //Muestro los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') || []);
        carritoHTML();
    });

    //Agrego cursos al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Quita cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

//Funciones
function agregarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Vacio el carrito
function vaciarCarrito(){
    articulosCarrito = [];
    limpiarHTML();
    carritoHTML();
}

//Elimino curso del carrito
function eliminarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){

        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina el curso del carrito
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        //Muestro el carrito
        carritoHTML();
    }

}

//Extrar info del curso
function leerDatosCurso(curso){    

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Valido si el curso ya esta en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        //actualizo la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [ ...cursos ];
    }else{
        //agrego al carrito
        articulosCarrito = [ ...articulosCarrito, infoCurso];
    }
    //Muestro el carrito
    carritoHTML();

}

//Muestro el carrito de compras
function carritoHTML(){

    //Limpio el HTML del carrito
    limpiarHTML();

    //Recorro los articulos y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>`
        contenedorCarrito.appendChild(row);
    });

    //Agregar el carrito al storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Limpio el carrito de compras
function limpiarHTML(){
    
    //Mientras haya un hijo voy eliminando
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}