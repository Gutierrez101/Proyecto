document.addEventListener("DOMContentLoaded", () => {
    // Verifica si estamos en productos1.html o carrito.html
    if (document.querySelector(".products-container")) {
        inicializarProductos();
    } else if (document.querySelector(".contenedor")) {
        inicializarCarrito();
    }
});

// Función para manejar los productos en productos1.html
function inicializarProductos() {
    const botones = document.querySelectorAll(".carrito_button");

    if (botones.length === 0) {
        console.error("No se encontraron botones de 'Añadir al carrito'. Verifica la estructura del HTML.");
        return;
    }

    botones.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const producto = event.target.closest(".product");
            if (!producto) return;

            const nombre = producto.querySelector("h3")?.textContent || "Producto desconocido";
            const precio = producto.querySelector("p")?.textContent.replace("Precio: $", "") || "0.00";
            const imgSrc = producto.querySelector("img")?.src || "";

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Verificar si el producto ya está en el carrito
            let productoExistente = carrito.find(p => p.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push({ nombre, precio, imgSrc, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert("Producto añadido al carrito.");
        });
    });
}

// Función para manejar el carrito en carrito.html
function inicializarCarrito() {
    const contenedorCarrito = document.querySelector(".contenedor");

    if (!contenedorCarrito) {
        console.error("No se encontró el contenedor del carrito. Verifica la estructura del HTML.");
        return;
    }

    function cargarCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        contenedorCarrito.innerHTML = `
            <span class="cerrado">&times;</span>
            <h2>Tu carrito</h2>
            <img src="../Images/entrega.png" width="50" height="50">
        `;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML += `<p>No tienes productos en el carrito aún.</p>`;
        } else {
            carrito.forEach((producto, index) => {
                contenedorCarrito.innerHTML += `
                    <div class="producto-carrito">
                        <img src="${producto.imgSrc}" width="50" height="50">
                        <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                        <button class="eliminar" data-index="${index}">Eliminar</button>
                    </div>
                `;
            });

            contenedorCarrito.innerHTML += `<button class="checkout-btn" onclick="vaciarCarrito()">Vaciar Carrito</button>`;
        }
    }

    function eliminarProducto(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    function vaciarCarrito() {
        localStorage.removeItem("carrito");
        cargarCarrito();
    }

    contenedorCarrito.addEventListener("click", (event) => {
        if (event.target.classList.contains("eliminar")) {
            eliminarProducto(event.target.dataset.index);
        }
    });

    cargarCarrito();
}
