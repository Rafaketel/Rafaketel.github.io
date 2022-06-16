// Variables
const baseDeDatos = [
  {
      id: 1,
      nombre: 'Santa Cruz Dollar Flame',
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
    nombre: 'Santa Cruz Screaming ',
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


function anyadirProductoAlCarrito(evento) {

  carrito.push(evento.target.getAttribute('marcador')) 
  renderizarCarrito();

}

function renderizarCarrito() {
  
  DOMcarrito.textContent = '';
  
  const carritoSinDuplicados = [...new Set(carrito)];
  
  carritoSinDuplicados.forEach((item) => {
      
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
         
          return itemBaseDatos.id === parseInt(item);
      });
      
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
          return itemId === item ? total += 1 : total;
      }, 0);
      
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right', 'mx-auto');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
  });

  DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
  
  const id = evento.target.dataset.item;
  
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });
  
  renderizarCarrito();
}

function calcularTotal() {
  
  return carrito.reduce((total, item) => {
      
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
      });
      
      return total + miItem[0].precio;
  }, 0).toFixed(2);
}

function vaciarCarrito() {
  
  carrito = [];
  renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();