// VARIABLES
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


// ESCUCHADORES
cargarEventLisenerteners();

function cargarEventLisenerteners() {
    // Dispara cuando se presiona en agregar carrito
    cursos.addEventListener('click', comprarCurso);
    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// FUNCIONES
// Función que agrega el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Leer los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id"=${curso.id}"> X</a>
        </td>
    `;

    listaCursos.appendChild(row);

}

// Eliminar el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}

// Elimina todos los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // listaCursos.innerHTML = '';
    // forma rápida(recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
}