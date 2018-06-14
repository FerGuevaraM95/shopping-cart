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
    // Al cargar el documento, mostrar Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
            <a href="#" class="borrar-curso" data-id=${curso.id}> X</a>
        </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);

}

// Eliminar el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}

// Elimina todos los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // listaCursos.innerHTML = '';
    // forma rápida(recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    // Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

// Almacena los cursos en el Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    // Toma el valor de un arreglo con datos de Local Storage o vacío
    cursos = obtenerCursosLocalStorage();
    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Comprobar si hay elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLs;
    // comprobamos si hay algo en el Local Storage
    if(localStorage.getItem('cursos') === null) {
        cursosLs = [];
    } else {
        cursosLs = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLs;
}

// Imprime los cursos de Local Storage en el carrito
function leerLocalStorage() {
    let cursosLs

    cursosLs = obtenerCursosLocalStorage();

    cursosLs.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${curso.id}> X</a>
        </td>
    `;

        listaCursos.appendChild(row);
    })
}

// Eliminar curso por el Id en Local Storage
function eliminarCursoLocalStorage(curso) {
    let cursosLs;
    //obtenemos el arreglo de cursos
    cursosLs = obtenerCursosLocalStorage();
    // iteramos comparando el Id de curso borrado conlos del LS
    cursosLs.forEach(function(cursoLs, index) {
        if(cursoLs.id === curso) {
            cursosLs.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a Local Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLs));
}

// Eliminar todos los cursos de Local Storage;
function vaciarLocalStorage() {
    localStorage.clear();
}