// carrito_pro.js (modificado con imágenes, disposición de botones y confirmación de compra)
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".products")) {
        inicializarProductosMain();
    } else if (document.querySelector(".contenedor")) {
        inicializarCarrito();
    }

    document.getElementById("finalizar-compra")?.addEventListener("click", GenerarPDF);
});

function inicializarCarrito() {
    const contenedorCarrito = document.querySelector(".contenedor");
    if (!contenedorCarrito) return;

    function cargarCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let subtotal = 0;

        contenedorCarrito.innerHTML = `<span class="cerrado">&times;</span><h2>Tu carrito</h2><img src="../Images/entrega.png" width="50" height="50">`;
        if (carrito.length === 0) {
            contenedorCarrito.innerHTML += `<p class="carrito-vacio">No tienes productos en el carrito aún.</p>`;
        } else {
            const listaProductos = document.createElement("div");
            listaProductos.classList.add("lista-productos");

            carrito.forEach((producto, index) => {
                subtotal += parseFloat(producto.precio) * producto.cantidad;
                listaProductos.innerHTML += `
                    <div class="producto-carrito">
                        <img src="${producto.imgSrc}" alt="${producto.nombre}" class="producto-imagen">
                        <div class="info-producto">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion || "Sin descripción"}</p>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad: ${producto.cantidad}</p>
                        </div>
                        <button class="eliminar" data-index="${index}">Eliminar</button>
                    </div>`;
            });
            contenedorCarrito.appendChild(listaProductos);
            contenedorCarrito.innerHTML += `
                <div class="botones-carrito">
                    <button id="vaciar-carrito">Vaciar Carrito</button>
                </div>`;
        }
        actualizarTotal(subtotal);
    }

    function actualizarTotal(subtotal) {
        let envio = document.querySelector("input[name='envio']:checked")?.value === "6" ? 6 : 0;
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("total").textContent = `$${(subtotal + envio).toFixed(2)}`;
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
        } else if (event.target.id === "vaciar-carrito") {
            vaciarCarrito();
        }
    });

    cargarCarrito();
}

function GenerarPDF() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        Swal.fire("Tu carrito está vacío", "Agrega productos antes de finalizar la compra", "warning");
        return;
    }

    Swal.fire({
        title: "Generando factura...",
        text: "Por favor, espera unos segundos",
        icon: "info",
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        const doc = new jsPDF();
        doc.setFont("times");
        doc.setFontSize(18);
        doc.text(80, 10, "Factura de Compra");
        doc.setFontSize(12);

        let total = 0;
        const data = carrito.map(prod => {
            total += parseFloat(prod.precio) * prod.cantidad;
            return [prod.nombre, prod.descripcion || "Sin descripción", `$${prod.precio}`];
        });

        doc.autoTable({
            head: [["Nombre", "Descripción", "Precio Unitario"]],
            body: data,
            startY: 20
        });

        doc.text(20, doc.autoTable.previous.finalY + 10, `Total: $${total.toFixed(2)}`);
        doc.save("Factura.pdf");
        window.location.href = "home.html";
    });
}
