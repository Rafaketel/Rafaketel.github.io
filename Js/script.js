// Variables
const baseDeDatos = [
  {
      id: 1,
      nombre: 'Santa Cruz Dollar Flame Dot',
      precio: 17999,
      imagen: '../images/SKATESANTACRUZ1.png'
  },
  {
      id: 2,
      nombre: 'Santa Cruz Crane Dot',
      precio: 24999,
      imagen: '../images/SKATESANTACRUZ2.png'
  },
  {
      id: 3,
      nombre: 'Santa Cruz Rad Dot',
      precio: 24999,
      imagen: '../images/SKATESANTACRUZ3.png'
  },
  {
      id: 4,
      nombre: 'Santa Cruz Lucky Cat',
      precio: 17999,
      imagen: '../images/SKATESANTACRUZ4.png'
  },
  {
      id: 5,
      nombre: 'Santa Cruz Wooten Alive',
      precio: 17999,
      imagen: '../images/SKATESANTACRUZ5.png'
  },
  {
    id: 6,
    nombre: 'Creature Erosion',
    precio: 24999,
    imagen: '../images/SKATECREATURE1.png'
},
{
    id: 7,
    nombre: 'Creature Russell Skull',
    precio: 17999,
    imagen: '../images/SKATECREATURE2.png'
},
{
    id: 8,
    nombre: 'Creature Russell',
    precio: 17999,
    imagen: '../images/SKATECREATURE3.png'
},
{
    id: 9,
    nombre: 'Creature Martinez',
    precio: 17999,
    imagen: '../images/SKATECREATURE4.png'
},
{
    id: 10,
    nombre: 'Creature Deathcard',
    precio: 24999,
    imagen: '../images/SKATECREATURE5.png'
},
{
    id: 11,
    nombre: 'Santa Cruz Flier Hand',
    precio: 34999,
    imagen: '../images/COMPLETESANTACRUZ1.png'
},
{
    id: 12,
    nombre: 'Santa Cruz Screaming Hand',
    precio: 34999,
    imagen: '../images/COMPLETESANTACRUZ2.png'
},
{
    id: 13,
    nombre: 'Santa Cruz Classic Dot',
    precio: 34999,
    imagen: '../images/COMPLETESANTACRUZ3.png'
},
{
    id: 14,
    nombre: 'Santa Cruz Dot',
    precio: 34999,
    imagen: '../images/COMPLETESANTACRUZ4.png'
},
{
    id: 15,
    nombre: 'Santa Cruz Flier Dot',
    precio: 34999,
    imagen: '../images/COMPLETESANTACRUZ5.png'
},
{
  id: 16,
  nombre: 'Creature Prowler',
  precio: 34999,
  imagen: '../images/COMPLETECREATURE1.png'
},
{
  id: 17,
  nombre: 'Creature Deathcard',
  precio: 34999,
  imagen: '../images/COMPLETECREATURE2.png'
},
{
  id: 18,
  nombre: 'Creature Metallic Logo',
  precio: 34999,
  imagen: '../images/COMPLETECREATURE3.png'
},
{
  id: 19,
  nombre: 'Creature Mummy Logo',
  precio: 34999,
  imagen: '../images/COMPLETECREATURE4.png'
},
{
  id: 20,
  nombre: 'Creature Large Logo',
  precio: 34999,
  imagen: '../images/COMPLETECREATURE5.png'
},

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
* Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
*/
function renderizarProductos() {
  baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement('div');
      miNodo.classList.add('cardd');
      // Body
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      // Titulo
      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info.imagen);
      //Descripcion
      const miNodoDescripcion = document.createElement('p');
      miNodoDescripcion.classList.add('description');
      miNodoDescripcion.textContent = info.description;
      // Precio
      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = `${info.precio}${divisa}`;
      // Boton 
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-danger', 'Agregar');
      miNodoBoton.textContent = 'Agregar al Carrito';
      miNodoBoton.setAttribute('marcador', info.id);
      miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
  });
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute('marcador'))
  // Actualizamos el carrito 
  renderizarCarrito();

}

/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = '';
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
      // Obtenemos el item que necesitamos de la variable base de datos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
          // ¿Coincide las id? Solo puede existir un caso
          return itemBaseDatos.id === parseInt(item);
      });
      // Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
          return itemId === item ? total += 1 : total;
      }, 0);
      // Creamos el nodo del item del carrito
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-auto');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      // Boton de borrar
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });
  // volvemos a renderizar
  renderizarCarrito();
}

/**
* Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calcularTotal() {
  // Recorremos el array del carrito 
  return carrito.reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
      });
      // Los sumamos al total
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
  // Limpiamos los productos guardados
  carrito = [];
  // Renderizamos los cambios
  renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();