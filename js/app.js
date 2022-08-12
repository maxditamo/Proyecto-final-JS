let carritoDeCompras = []

//Constantes globales
const mostrarUsuario = document.getElementById("mostrar-usuario");
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const selecPasaje = document.getElementById('selecPasaje')
const buscador = document.getElementById('search')

mostrarProductos(stockProductos)

//Ingreso usuario

let nombreUsuario;
document.getElementById("formulario-usuario").addEventListener("submit", formularioUsuario);

function formularioUsuario(e) {
  e.preventDefault();

  nombreUsuario = document.getElementById("user").value;
  if (user.value == '') {
    hiddenUsuario();
    Swal.fire('Por favor, ingrese nombre de usuario')

  } else {
    (user.value !== '')
    visibleUsuario();
    mostrarPanel();
  }
  user.value = ''
}

function hiddenUsuario() {

  document.getElementById("mostrar-usuario").style.visibility = "hidden";
}
function visibleUsuario() {

  document.getElementById("mostrar-usuario").style.visibility = "visible";
}
function mostrarPanel() {

  mostrarUsuario.innerHTML =
    `<h4>Bienvenido ${nombreUsuario}</h4>`
}

//Agregar al carrito

function agregarAlCarrito(id) {

  let productoAgregar = stockProductos.find(item => item.id === id)
  carritoDeCompras.push(productoAgregar)

  localStorage.setItem('carritoCompras', JSON.stringify(carritoDeCompras))
}

//Mostrar productos 
function mostrarProductos(array) {

  contenedorProductos.innerHTML = ""

  array.forEach(el => {
    let div = document.createElement('div')
    div.className = 'producto'

    div.innerHTML = `<div class="card" style="width: 18rem;">
                    <img src="${el.img}" class="card-img-top img-fluid">
                        <div class="card-body">
                            <h5 class="card-title">${el.nombre}</h5>
                            <div class="card-content">
                                <p class="card-text">${el.desc}</p>
                                <p>País:${el.pais}</p>
                                <p>Tipo:${el.tipo}</p>
                                <p>Pasaje:${el.pasaje}</p>
                                <p>Precio: $${el.precio}</p>
                            </div>
                            <a id="boton${el.id}" href="#" class="btn btn-primary">Add Cart<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill ms-2" viewBox="0 0 16 16" style="vertical-align:0px;">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg></a>
                        </div>
                    </div> `

    contenedorProductos.appendChild(div)

    // Boton add carrito
    let btnAgregar = document.getElementById(`boton${el.id}`)
    btnAgregar.addEventListener('click', (e) => {
      e.preventDefault();
      agregarAlCarrito(el.id);
      mostrarCarrito();
    })
  })
}

//actualizar carrito
function actualizarCarrito(array) {
  contadorCarrito.innerText = array.length
  precioTotal.innerText = array.reduce((acc, el) => acc + el.precio, 0)
  
}


//Mostrar carrito

function mostrarCarrito() {

  contenedorCarrito.innerHTML = "";

  let array = JSON.parse(localStorage.getItem('carritoCompras'))
  if (array.length > 0 ){
      
    actualizarCarrito(array)
} else {
    contenedorCarrito.innerHTML = "<p>El carrito se encuentra vacio </p>"
   
}
  array.forEach(el => {
    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML = `<p style="margin-bottom: 0%;"><font style="vertical-align: inherit;">${el.nombre}</font></p>
                          <p style="margin-bottom: 0%;"><font class="precioProducto" style="vertical-align: inherit;">$${el.precio}</font></p>
                          <button id="eliminar${el.id}" class="boton-eliminar" type="button" class="btn btn-outline-danger ms-4 d-flex align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg></button>`



    contenedorCarrito.appendChild(div);

    //Boton eliminar
    let btnEliminar = document.getElementById(`eliminar${el.id}`)
    btnEliminar.addEventListener('click', () => {
      btnEliminar.parentElement.remove()
      array = array.filter(obj => obj.id !== el.id)
      Swal.fire({
        icon: 'error',
        title: 'Eliminado',
        text: 'Has eliminado un producto de tu carrito',
      })
      
      actualizarCarrito(array)

    })

  })
}
mostrarCarrito();