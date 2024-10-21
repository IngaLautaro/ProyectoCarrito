let carrito = [];
let productos = [];
const contenedorProductos = document.querySelector("#productos");


async function cargarProductos() {
    try {
        const respuesta = await fetch("./productos.json");
        if (!respuesta.ok) throw new Error("Error al cargar el JSON");
        productos = await respuesta.json();
        mostrarProductos(); 
    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
    }
}


function mostrarProductos() {
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


function agregarAlCarrito(productoId) {
    let producto = productos.find(p => p.id === productoId);
    if (producto) {
        let itemEnCarrito = carrito.find(item => item.id === producto.id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        tostify();
        actualizarCarrito();
    }
}


function tostify() {
    Toastify({
        text: "Producto Agregado!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
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

            let botonEliminar = item.querySelector('.boton-eliminar');
            botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto.id));
        });
        let total = carrito.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);
        totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}


function eliminarDelCarrito(productoId) {
    let productoIndex = carrito.findIndex(item => item.id === productoId);
    if (productoIndex !== -1) {
        carrito[productoIndex].cantidad--;
        if (carrito[productoIndex].cantidad <= 0) {
            carrito.splice(productoIndex, 1);
        }
        actualizarCarrito();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    mostrarProductosEnCarrito();
    cargarProductos(); 
});
