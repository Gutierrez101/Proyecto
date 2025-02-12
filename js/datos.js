document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-list");

    fetch("../php/productos.php")
        .then(response => response.json())
        .then(data => {
            productsContainer.innerHTML = ""; // Limpiar contenido existente

            data.forEach(producto => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");
                productDiv.setAttribute("data-model", producto.modelo);
                productDiv.setAttribute("data-price", producto.precio);

                productDiv.innerHTML = `
                    <a href="../html/description.html">
                        <img src="../Images/pictures/${producto.imagen}" alt="${producto.nombre}">
                    </a>
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <button class="carrito_button" data-id="${producto.id}">Añadir al carrito</button>
                `;

                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});
