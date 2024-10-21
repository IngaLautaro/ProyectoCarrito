let carrito = [];

let productos = [
    {
        id: 1,
        nombre: "IPHONE 12",
        precio: 1100000.00,
        imagen: "../img/destacados/iphone-12.png"
    },
    {
        id: 2,
        nombre: "Iphone 13 Pro Max",
        precio: 1200000.00,
        imagen: "../img/destacados/iphone-13promax.png"
    },
    {
        id: 3,
        nombre: "Motorola Edge 40",
        precio: 800000.00,
        imagen: "../img/destacados/moto-edge40.png"
    },
    {
        id: 4,
        nombre: "Motorola G23",
        precio: 230000.00,
        imagen: "../img/destacados/moto-g23.png"
    },
    {
        id: 5,
        nombre: "Samsung A23",
        precio: 450000.00,
        imagen: "../img/destacados/samsung-A23.png"
    },
    {
        id: 6,
        nombre: "Samsung A54",
        precio: 350000.00,
        imagen: "../img/destacados/samsung-a54.png"
    }
];

const contenedorProductos = document.querySelector("#productos");

if (contenedorProductos) {

    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("tarjeta-producto");
        div.innerHTML = `
            <img src=${producto.imagen} alt="Imagen del Producto" class="tarjeta-imagen">
            <div class="tarjeta-info">
                <h3 class="tarjeta-nombre">${producto.nombre}</h3>
                <p class="tarjeta-precio">$${producto.precio}</p>
            </div>
        `;

        let button = document.createElement("button");
        button.classList.add("tarjeta-boton");
        button.innerText = "Comprar";

        button.addEventListener("click", () => agregarAlCarrito(producto.id));

        div.querySelector(".tarjeta-info").appendChild(button);
        contenedorProductos.appendChild(div);
    });
}


function tostify (){
    Toastify({
        text: "Producto Agregado!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} 
    }).showToast();
}
function agregarAlCarrito(productoId) {
    let producto = productos.find(p => p.id === productoId);
    if (producto) {
        let itemEnCarrito = carrito.find(item => item.id === producto.id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        tostify ()
        actualizarCarrito();
    }
}

function eliminarDelCarrito(productoId) {
    let productoIndex = carrito.findIndex(item => item.id === productoId);
    if (productoIndex !== -1) {
        // Disminuir la cantidad del producto
        carrito[productoIndex].cantidad--;

        // Si la cantidad llega a 0, eliminar el producto del carrito
        if (carrito[productoIndex].cantidad <= 0) {
            carrito.splice(productoIndex, 1);
        }

        actualizarCarrito();
    }
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
}

function mostrarProductosEnCarrito() {
    let carritoContainer = document.querySelector(".carrito-items");
    let totalContainer = document.getElementById("total");

    if (carritoContainer) {
        carritoContainer.innerHTML = ''; 
        carrito.forEach(producto => {
            if (producto.precio !== undefined) {
                let item = document.createElement('div');
                item.classList.add("carrito-item");
                item.innerHTML = `
                <li>
                    <div class="carrito-detalles">
                        <div class="carrito-lista">
                            <p class="carrito-nombre">${producto.nombre}</p>
                            <p class="carrito-precio">$${producto.precio.toFixed(2)}</p>
                            <p class="carrito-cantidad">Cantidad: ${producto.cantidad}</p>
                            <button class="boton-eliminar" data-id="${producto.id}">✖️</button>
                        </div>
                    </div>
                </li>
                `;
                carritoContainer.appendChild(item);

                // Agregar el evento de eliminar al botón
                let botonEliminar = item.querySelector('.boton-eliminar');
                botonEliminar.addEventListener('click', () => {
                    eliminarDelCarrito(producto.id);
                });
            }
        });
        let total = calcularTotal();
        if (totalContainer) {
            totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    let carritoContainer = document.querySelector(".carrito-items");
    if (carritoContainer) {
        mostrarProductosEnCarrito(); 
    }

    let botonVaciarCarrito = document.getElementById("vaciar-carrito");
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener("click", () => {
            carrito = [];
            localStorage.removeItem("carrito"); 
            mostrarProductosEnCarrito();
        });
    }
});   
