// Esperar a que el documento cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos de filtro
    const searchInput = document.getElementById('buscar');
    const modelSelect = document.getElementById('model');
    const priceInput = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    const productsContainer = document.getElementById('products-list'); // Asegúrate de que el contenedor de productos tenga este id
    
    // Función para filtrar productos
    function filterProducts() {
        // Obtener valores de los filtros
        const searchValue = searchInput.value.toLowerCase();
        const selectedModel = modelSelect.value;
        const maxPrice = parseFloat(priceInput.value);

        // Actualizar el valor mostrado del rango de precio
        if (priceValue) {
            priceValue.textContent = `$${maxPrice.toFixed(2)}`;
        }

        // Filtrar los productos
        const products = productsContainer.getElementsByClassName('product');
        Array.from(products).forEach(product => {
            // Obtener el nombre, modelo y precio del producto
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productModel = product.getAttribute('data-model'); // Debes agregar este atributo en los productos HTML
            const productPrice = parseFloat(product.getAttribute('data-price')); // Debes agregar este atributo en los productos HTML

            // Verificar si el producto cumple con todos los criterios de filtro
            const matchesSearch = productName.includes(searchValue);
            const matchesModel = selectedModel === 'all' || productModel === selectedModel;
            const matchesPrice = productPrice <= maxPrice;

            // Mostrar u ocultar el producto dependiendo del filtro
            if (matchesSearch && matchesModel && matchesPrice) {
                product.style.display = 'block'; // Mostrar producto
            } else {
                product.style.display = 'none'; // Ocultar producto
            }
        });
    }

    // Asignar eventos a los filtros
    searchInput.addEventListener('input', filterProducts); // Filtrar al escribir en el campo de búsqueda
    modelSelect.addEventListener('change', filterProducts); // Filtrar al cambiar el modelo
    priceInput.addEventListener('input', filterProducts); // Filtrar al mover el control de precio

    // Inicializar el filtrado en caso de que haya un filtro activo al cargar la página
    filterProducts();
});
