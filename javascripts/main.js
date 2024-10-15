
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

function agregarAlCarrito(productoId) {
    let producto = productos.find(p => p.id === productoId);
    if (producto) {
        let existe = carrito.some(item => item.id === producto.id);
        if (!existe) {
            carrito.push(producto);
        }
        actualizarCarrito();
    }
}


function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
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
                    <div class="carrito-detalles">
                        <div class="carrito-lista">
                            <p>${producto.nombre}</p>
                            <p>$${producto.precio.toFixed(2)}</p>
                        </div>
                        <div>
                            <button>✖️</button>
                        </div>
                    </div>
                `;
                carritoContainer.appendChild(item);
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

    let botonesComprar = document.querySelectorAll(".tarjeta-boton");
    botonesComprar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(productos[index].id);
        });
    });
    
    let botonVaciarCarrito = document.getElementById("vaciar-carrito");
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener("click", () => {
            carrito = [];
            localStorage.removeItem("carrito"); 
            mostrarProductosEnCarrito();
        });
    }
});
