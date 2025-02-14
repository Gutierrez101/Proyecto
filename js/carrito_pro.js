document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".products")) {
        inicializarProductosMain();
    } else if (document.querySelector(".contenedor")) {
        inicializarCarrito();
    }
});

// Función para agregar productos desde `<main>` en la tienda principal
function inicializarProductosMain() {
    const botones = document.querySelectorAll(".product-card button");

    if (botones.length === 0) {
        console.error("⚠ No se encontraron botones de 'Añadir al carrito'. Verifica la estructura del HTML.");
        return;
    }

    botones.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const producto = event.target.closest(".product-card");
            if (!producto) return;

            const nombre = producto.querySelector(".title-product")?.textContent.replace("\n", " ") || "Producto sin nombre";
            const precio = producto.querySelector(".precio-product")?.textContent.replace("$", "") || "0.00";
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

           // 🔥 Nuevo Alert con SweetAlert2
           Swal.fire({
            title: "¡Producto añadido!",
            text: `"${nombre}" ha sido agregado al carrito.`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Ir al carrito 🛒",
            cancelButtonText: "Seguir comprando",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#007BFF"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "carrito.html";
            }
        });

        console.log("🛒 Carrito actualizado:", carrito);
        });
    });
}

// Función para mostrar productos en `carrito.html`
function inicializarCarrito() {
    const contenedorCarrito = document.querySelector(".contenedor");

    if (!contenedorCarrito) {
        console.error("No se encontró el contenedor del carrito.");
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
            contenedorCarrito.innerHTML += `<p class="carrito-vacio">No tienes productos en el carrito aún.</p>`;
        } else {
            const listaProductos = document.createElement("div");
            listaProductos.classList.add("lista-productos");

            carrito.forEach((producto, index) => {
                listaProductos.innerHTML += `
                    <div class="producto-carrito">
                        <img src="${producto.imgSrc}" alt="${producto.nombre}">
                        <div class="info-producto">
                            <h3>${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                        </div>
                        <button class="eliminar" data-index="${index}">Eliminar</button>
                    </div>
                `;
            });

            contenedorCarrito.appendChild(listaProductos);

            // Agregar botones "Vaciar Carrito" e "Ir a pagar"
            contenedorCarrito.innerHTML += `
                <button class="checkout-btn" id="vaciar-carrito">Vaciar Carrito</button>
                <button class="checkout-btn pagar-btn" onclick="GenerarPDF()">Ir a pagar</button>
            `;
        }

        // Asignar evento al botón "Vaciar Carrito"
        document.getElementById("vaciar-carrito")?.addEventListener("click", vaciarCarrito);
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
